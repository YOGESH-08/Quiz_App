import db from "../db.js";

export const submitScore = async (req, res) => {
  const { quiz_id, score, total_questions } = req.body;

  if (!quiz_id || score === undefined || !total_questions) {
    console.error("Missing score submission fields");
    return res.status(400).send("Quiz ID, score, and total questions are required");
  }

  try {
    await db.query(
      "INSERT INTO scores (quiz_id, score, total_questions) VALUES ($1, $2, $3)",
      [quiz_id, score, total_questions]
    );
    console.log("Score saved successfully");
    res.status(200).send("Score saved successfully");
  } catch (err) {
    console.error("Error saving score:", err.message);
    res.status(500).send("Failed to save score");
  }
};