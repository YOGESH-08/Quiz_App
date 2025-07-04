import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import pg from "pg";

dotenv.config();

const db = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

db.connect();

const port = process.env.PORT;

const corsOption = {
  origin: ["http://localhost:5173"],
};

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOption));

app.post("/quize/createquiz/", async (req, res) => {
  const quizName = req.body.QuizName;
  const numberofquestions = req.body.noofquestions;
  const duration = req.body.duration;
  const user_id = 1; // temporary

  try {
    await db.query(
      "INSERT INTO quizzes(user_id, quiz_name, total_questions, duration_minutes) VALUES ($1, $2, $3, $4)",
      [user_id, quizName, numberofquestions, duration]
    );
    console.log(
      "Successfully added to database (quiz details Name , duration and numofquestions)"
    );
    res.send("Quiz created successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to create quiz");
  }
});
app.post("/quize/submit-score", async (req, res) => {
  const { quiz_id, score, total_questions } = req.body;

  try {
    await db.query(
      "INSERT INTO scores (quiz_id, score, total_questions) VALUES ($1, $2, $3)",
      [quiz_id, score, total_questions]
    );
    res.status(200).send("Score saved successfully");
  } catch (err) {
    console.error("Error saving score:", err.message);
    res.status(500).send("Failed to save score");
  }
});

app.get("/quize/start/:selectedQuizId",async(req,res)=>{
  try{

    const {selectedQuizId} = req.params;
    const response = await db.query("SELECT question_text, option_a, option_b, option_c, option_d, correct_option FROM questions WHERE quiz_id = $1",[selectedQuizId]);
    res.send(response.rows);
    console.log("successfully fetched question details for quiz start");
  }
  catch(err){
    console.log("error in getting questions to start the quiz : \n",err.message);
  }
})
app.post(`/quize/:quizName/addquestion`, async (req, res) => {
  try {
    const { quizName } = req.params;
    const { QuestionName, option1, option2, option3, option4, correctOption } =
      req.body;

    if (
      !QuestionName ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctOption
    ) {
      return res.status(400).send("All fields are required");
    }

    const quizResult = await db.query(
      "SELECT quiz_id FROM quizzes WHERE quiz_name = $1",
      [quizName]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).send("Quiz not found");
    }

    const quizId = quizResult.rows[0].quiz_id;

    await db.query(
      "INSERT INTO questions(quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [quizId, QuestionName, option1, option2, option3, option4, correctOption]
    );

    console.log("Successfully added question to DB");
    res.send("Question added");
  } catch (err) {
    console.error("error adding quiz question", err.message);
    res.status(500).send("Failed to add question");
  }
});

app.delete("/quize/delete/:quizName/:quizId", (req, res) => {
  try {
    const { quizName, quizId } = req.params;

    // Only allows one or more digits (no leading zeros unless the ID is 0)
    const quizIdRegex = /^[1-9][0-9]*$/;

    if (!quizIdRegex.test(quizId)) {
      return res.status(404).send("Enter valid quiz ID");
    }
    db.query(
      "DELETE FROM quizzes WHERE user_id=$1 AND quiz_id=$2 AND quiz_name=$3",
      [1, quizId, quizName]
    );
    res.send("Successfull in Deleting !");
  } catch (err) {
    res.send("Error in deleteing in backend");
    console.log(err.message);
  }
});

app.get("/quize/edit/:selectedQuizId", async (req, res) => {
  try {
    const selectedQuizId = req.params.selectedQuizId;

    const response = await db.query(
      `SELECT 
         quizzes.quiz_name, 
         quizzes.quiz_id, 
         quizzes.total_questions, 
         quizzes.duration_minutes, 
         questions.question_id, 
         questions.question_text, 
         questions.option_a, 
         questions.option_b, 
         questions.option_c, 
         questions.option_d, 
         questions.correct_option 
       FROM quizzes 
       JOIN questions ON quizzes.quiz_id = questions.quiz_id 
       WHERE quizzes.quiz_id = $1`,
      [selectedQuizId]
    );

    res.send(response.rows);
  } catch (err) {
    console.log("Error at backend while fetching edit details:", err.message);
    res.status(500).send("Failed to fetch quiz data");
  }
});

app.put("/quize/:quizId/:questionId/edit", async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const updatedForm = req.body;
    const { QuestionName, option1, option2, option3, option4, correctOption } =
      updatedForm;

    await db.query(
      `UPDATE questions 
       SET question_text = $1, option_a = $2, option_b = $3, option_c = $4, option_d = $5, correct_option = $6 
       WHERE quiz_id = $7 AND question_id = $8`,
      [
        QuestionName,
        option1,
        option2,
        option3,
        option4,
        correctOption,
        quizId,
        questionId,
      ]
    );

    console.log("Successfully updated question");
    res.status(200).send("Question updated");
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).send("Error saving question updates in DB");
  }
});

app.put(
  "/quize/edit/:selectedQuizName/:selectedQuizId/details/update",
  async (req, res) => {
    try {
      const { selectedQuizName, selectedQuizId } = req.params;
      const { updatedQuizName, updatedQuizNumberOfQues, updatedQuizDuration } =
        req.body;
      const response = await db.query(
        `UPDATE quizzes SET quiz_name = $1,total_questions = $2,duration_minutes = $3 WHERE quiz_id = $4`,
        [
          updatedQuizName,
          updatedQuizNumberOfQues,
          updatedQuizDuration,
          selectedQuizId,
        ]
      );
      res.status(200).send("updated Name NUm And Duration in db successfully");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error");
    }
  }
);

app.get("/quize", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT q.*, s.score
      FROM quizzes q
      LEFT JOIN (
        SELECT DISTINCT ON (quiz_id) quiz_id, score
        FROM scores
        ORDER BY quiz_id, submitted_at DESC
      ) s ON q.quiz_id = s.quiz_id
    `);
    res.send(result.rows);
  } catch (err) {
    res.status(500).send("Error fetching quizzes with scores");
  }
});



app.put("/quize/addquestions/edit/:selectedQuizId", async (req, res) => {
  try {
    const selectedQuizId = parseInt(req.params.selectedQuizId);
    const { updatedNum } = req.body;
    await db.query(
      "UPDATE quizzes SET total_questions = $1 WHERE quiz_id = $2",
      [parseInt(updatedNum), selectedQuizId]
    );
    res.status(200).send("Number of questions updated.");
  } catch (err) {
    console.error(" Error updating question:", err.stack);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/quize/addquestions/edit/:quiz_id", async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const { QuestionName, option1, option2, option3, option4, correctOption } =
      req.body;
    await db.query(
      "INSERT INTO questions (quiz_id,question_text,option_a,option_b,option_c,option_d,correct_option)VALUES($1,$2,$3,$4,$5,$6,$7)",
      [quiz_id, QuestionName, option1, option2, option3, option4, correctOption]
    );
    console.log("Sucessfully added extra questions");
    res.status(200).send("Success");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in saving the extra questions");
  }
});

app.delete("/quize/delete/:question_id", async (req, res) => {
  const { question_id } = req.params;
  const { quiz_id } = req.body;

  try {
    await db.query("DELETE FROM questions WHERE question_id = $1", [
      question_id,
    ]);

    await db.query(
      "UPDATE quizzes SET total_questions = total_questions - 1 WHERE quiz_id = $1",
      [quiz_id]
    );

    res.status(200).send("Question deleted and quiz count updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting question");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/quize`);
});
