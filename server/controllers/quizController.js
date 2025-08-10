import db from "../db.js";

export const createQuiz = async (req, res) => {
  const quizName = req.body.QuizName;
  const numberofquestions = req.body.noofquestions;
  const duration = req.body.duration;
  const user_id = 1; // temporary

  if (!quizName || !numberofquestions || !duration) {
    console.error("Missing quiz creation fields");
    return res.status(400).send("Quiz name, number of questions, and duration are required");
  }

  try {
    await db.query(
      "INSERT INTO quizzes(user_id, quiz_name, total_questions, duration_minutes) VALUES ($1, $2, $3, $4)",
      [user_id, quizName, numberofquestions, duration]
    );
    console.log("Successfully added quiz to database");
    res.send("Quiz created successfully!");
  } catch (err) {
    console.error("Error creating quiz:", err.message);
    res.status(500).send("Failed to create quiz");
  }
};

export const getQuizzes = async (req, res) => {
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
    console.log("Fetched quizzes with scores");
  } catch (err) {
    console.error("Error fetching quizzes:", err.message);
    res.status(500).send("Error fetching quizzes with scores");
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { quizName, quizId } = req.params;
    const quizIdRegex = /^[1-9][0-9]*$/;

    if (!quizName || !quizId) {
      console.error("Quiz name or ID missing in params");
      return res.status(400).send("Quiz name and ID are required");
    }
    if (!quizIdRegex.test(quizId)) {
      console.error("Invalid quiz ID format");
      return res.status(404).send("Enter valid quiz ID");
    }

    const result = await db.query(
      "DELETE FROM quizzes WHERE user_id=$1 AND quiz_id=$2 AND quiz_name=$3",
      [1, quizId, quizName]
    );
    if (result.rowCount === 0) {
      console.error("No quiz deleted, check IDs");
      return res.status(404).send("Quiz not found");
    }
    console.log("Successfully deleted quiz");
    res.send("Successfully deleted!");
  } catch (err) {
    console.error("Error deleting quiz:", err.message);
    res.status(500).send("Error in deleting in backend");
  }
};

export const editQuizDetails = async (req, res) => {
  try {
    const { selectedQuizName, selectedQuizId } = req.params;
    const { updatedQuizName, updatedQuizNumberOfQues, updatedQuizDuration } = req.body;

    if (!selectedQuizName || !selectedQuizId) {
      console.error("Quiz name or ID missing in params");
      return res.status(400).send("Quiz name and ID are required");
    }
    if (!updatedQuizName || !updatedQuizNumberOfQues || !updatedQuizDuration) {
      console.error("Missing fields in request body");
      return res.status(400).send("All fields are required");
    }

    const result = await db.query(
      `UPDATE quizzes SET quiz_name = $1, total_questions = $2, duration_minutes = $3 WHERE quiz_id = $4`,
      [updatedQuizName, updatedQuizNumberOfQues, updatedQuizDuration, selectedQuizId]
    );
    if (result.rowCount === 0) {
      console.error("No quiz updated, check ID");
      return res.status(404).send("Quiz not found");
    }
    console.log("Successfully updated quiz details");
    res.status(200).send("Updated name, number, and duration in DB successfully");
  } catch (err) {
    console.error("Error updating quiz details:", err.message);
    res.status(500).send("Error");
  }
};

export const updateNumQuestions = async (req, res) => {
  try {
    const selectedQuizId = parseInt(req.params.selectedQuizId);
    const { updatedNum } = req.body;

    if (!selectedQuizId || !updatedNum) {
      console.error("Quiz ID or updated number missing");
      return res.status(400).send("Quiz ID and updated number are required");
    }

    const result = await db.query(
      "UPDATE quizzes SET total_questions = $1 WHERE quiz_id = $2",
      [parseInt(updatedNum), selectedQuizId]
    );
    if (result.rowCount === 0) {
      console.error("No quiz updated, check ID");
      return res.status(404).send("Quiz not found");
    }
    console.log("Successfully updated number of questions");
    res.status(200).send("Number of questions updated.");
  } catch (err) {
    console.error("Error updating number of questions:", err.message);
    res.status(500).send("Internal Server Error");
  }
};