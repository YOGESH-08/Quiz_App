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
    console.log("Successfully added to database (quiz details)");
    res.send("Quiz created successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to create quiz");
  }
});

app.post(`/quize/:quizName/addquestion`, async (req, res) => {
  try {
    const { quizName } = req.params;
    const { QuestionName, option1, option2, option3, option4, correctOption } =
      req.body;

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

app.get("/quize/edit/:selectedQuizName/:selectedQuizId", async (req, res) => {
  try {
    const { selectedQuizName, selectedQuizId } = req.params;

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
       WHERE quizzes.quiz_id = $1 AND quizzes.quiz_name = $2`,
      [selectedQuizId, selectedQuizName]
    );

    res.send(response.rows);
  } catch (err) {
    console.log("Error at backend while fetching edit details:", err.message);
    res.status(500).send("Failed to fetch quiz data");
  }
});

app.put("/quize/edit/:selectedQuizName/details/update", (req, res) => {
  try {
    const selectedQuizName = req.params;
    const { updatedQuizName, updatedQuizNumberOfQues, updatedQuizDuration } =
      req.body;

      res.send("Got the details to be updated in db successfully");
  } catch (err) {
    console.log(err.message);
  }
});




app.get("/quize", async (req, res) => {
  const user_id = 1;
  try {
    const response = await db.query(
      "SELECT quiz_id, quiz_name, total_questions, duration_minutes FROM quizzes WHERE user_id=$1",
      [user_id]
    );
    res.send(response.rows);
  } catch (err) {
    console.error("Error fetching quizzes:", err.message);
    res.status(500).send("Failed to fetch quizzes");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/quize`);
});
