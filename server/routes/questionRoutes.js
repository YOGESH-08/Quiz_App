import express from "express";
import {
  addQuestion,
  addExtraQuestion,
  editQuestion,
  deleteQuestion,
  getQuizQuestions,
  getQuizEditDetails,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/:quizName/addquestion", addQuestion);
router.post("/addquestions/edit/:quiz_id", addExtraQuestion);
router.put("/:quizId/:questionId/edit", editQuestion);
router.delete("/delete/:question_id", deleteQuestion);
router.get("/start/:selectedQuizId", getQuizQuestions);
router.get("/edit/:selectedQuizId", getQuizEditDetails);

export default router;