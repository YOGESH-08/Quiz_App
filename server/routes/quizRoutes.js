import express from "express";
import {
  createQuiz,
  getQuizzes,
  deleteQuiz,
  editQuizDetails,
  updateNumQuestions,
} from "../controllers/quizController.js";
import { submitScore } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/createquiz", createQuiz);
router.get("/", getQuizzes);
router.delete("/delete/:quizName/:quizId", deleteQuiz);
router.put("/edit/:selectedQuizName/:selectedQuizId/details/update", editQuizDetails);
router.put("/addquestions/edit/:selectedQuizId", updateNumQuestions);
router.post("/submit-score", submitScore);

export default router;