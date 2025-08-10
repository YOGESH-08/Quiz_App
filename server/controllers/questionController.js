import db from "../db.js";

export const addQuestion = async (req, res) => {
  try {
    const { quizName } = req.params;
    const { QuestionName, option1, option2, option3, option4, correctOption } = req.body;

    if (!quizName) {
      console.error("Quiz name missing in params");
      return res.status(400).send("Quiz name is required");
    }
    if (!QuestionName || !option1 || !option2 || !option3 || !option4 || !correctOption) {
      console.error("Missing fields in request body");
      return res.status(400).send("All fields are required");
    }

    const quizResult = await db.query(
      "SELECT quiz_id FROM quizzes WHERE quiz_name = $1",
      [quizName]
    );

    if (quizResult.rows.length === 0) {
      console.error(`Quiz not found: ${quizName}`);
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
    console.error("Error adding question:", err.message);
    res.status(500).send("Failed to add question");
  }
};

export const addExtraQuestion = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const { QuestionName, option1, option2, option3, option4, correctOption } = req.body;

    if (!quiz_id) {
      console.error("Quiz ID missing in params");
      return res.status(400).send("Quiz ID is required");
    }
    if (!QuestionName || !option1 || !option2 || !option3 || !option4 || !correctOption) {
      console.error("Missing fields in request body");
      return res.status(400).send("All fields are required");
    }

    await db.query(
      "INSERT INTO questions (quiz_id,question_text,option_a,option_b,option_c,option_d,correct_option)VALUES($1,$2,$3,$4,$5,$6,$7)",
      [quiz_id, QuestionName, option1, option2, option3, option4, correctOption]
    );
    console.log("Successfully added extra question");
    res.status(200).send("Success");
  } catch (err) {
    console.error("Error saving extra question:", err.message);
    res.status(500).send("Error in saving the extra questions");
  }
};

export const editQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { QuestionName, option1, option2, option3, option4, correctOption } = req.body;

    if (!quizId || !questionId) {
      console.error("Quiz ID or Question ID missing in params");
      return res.status(400).send("Quiz ID and Question ID are required");
    }
    if (!QuestionName || !option1 || !option2 || !option3 || !option4 || !correctOption) {
      console.error("Missing fields in request body");
      return res.status(400).send("All fields are required");
    }

    const result = await db.query(
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

    if (result.rowCount === 0) {
      console.error("No question updated, check IDs");
      return res.status(404).send("Question not found");
    }

    console.log("Successfully updated question");
    res.status(200).send("Question updated");
  } catch (err) {
    console.error("Error updating question:", err.message);
    res.status(500).send("Error saving question updates in DB");
  }
};

export const deleteQuestion = async (req, res) => {
  const { question_id } = req.params;
  const { quiz_id } = req.body;

  if (!question_id) {
    console.error("Question ID missing in params");
    return res.status(400).send("Question ID is required");
  }
  if (!quiz_id) {
    console.error("Quiz ID missing in body");
    return res.status(400).send("Quiz ID is required");
  }

  try {
    const result = await db.query("DELETE FROM questions WHERE question_id = $1", [
      question_id,
    ]);
    if (result.rowCount === 0) {
      console.error("No question deleted, check ID");
      return res.status(404).send("Question not found");
    }

    await db.query(
      "UPDATE quizzes SET total_questions = total_questions - 1 WHERE quiz_id = $1",
      [quiz_id]
    );

    console.log("Question deleted and quiz count updated");
    res.status(200).send("Question deleted and quiz count updated");
  } catch (err) {
    console.error("Error deleting question:", err.message);
    res.status(500).send("Error deleting question");
  }
};

export const getQuizQuestions = async (req, res) => {
  try {
    const { selectedQuizId } = req.params;
    if (!selectedQuizId) {
      console.error("Quiz ID missing in params");
      return res.status(400).send("Quiz ID is required");
    }
    const response = await db.query(
      "SELECT question_text, option_a, option_b, option_c, option_d, correct_option FROM questions WHERE quiz_id = $1",
      [selectedQuizId]
    );
    res.send(response.rows);
    console.log("Successfully fetched question details for quiz start");
  } catch (err) {
    console.error("Error getting questions to start the quiz:", err.message);
    res.status(500).send("Error fetching questions");
  }
};

export const getQuizEditDetails = async (req, res) => {
  try {
    const selectedQuizId = req.params.selectedQuizId;
    if (!selectedQuizId) {
      console.error("Quiz ID missing in params");
      return res.status(400).send("Quiz ID is required");
    }
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
    console.log("Successfully fetched quiz edit details");
  } catch (err) {
    console.error("Error fetching quiz edit details:", err.message);
    res.status(500).send("Failed to fetch quiz data");
  }
};