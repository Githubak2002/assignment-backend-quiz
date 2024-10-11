import { Quiz } from "../Models/Quiz.js";


// Create a Quiz
export const createQuiz = async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.status(201).json({
    msg:"New quiz created",
    success:true,
    quiz,
  });
};

// Get All Quizzes
export const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json({
    noOfQuizes: quizzes.length,
    success:true,
    quizzes
  });
};

// Get Quiz by ID
export const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ 
    message: 'Quiz not found',
    success:false
  });
  res.json({
    success:true,
    quiz
  });
};



// Take a Quiz (Submit Answers)
export const takeQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

  const { answers } = req.body; // { answers: [ 'A', 'C', ... ] }
  let score = 0;

  quiz.questions.forEach((question, index) => {
      if (question.answer === answers[index]) score++;
  });

  res.json({ score, total: quiz.questions.length });
};