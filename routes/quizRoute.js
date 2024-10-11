import express from "express";
import { createQuiz, getQuizById, getQuizzes, takeQuiz } from "../controllers/quizController.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

router.get('/', getQuizzes);
router.get('/:id', getQuizById);

router.post('/', checkAuth, createQuiz);
router.post('/take/:id', takeQuiz);


export default router;