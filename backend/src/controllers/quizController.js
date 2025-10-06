const Question = require('../models/Question');
const { calculateScore } = require('../services/scoreService');

// GET /api/quiz
const getQuizQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}, { questionText: 1, options: 1, _id: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// POST /api/quiz/submit
const submitQuizAnswers = async (req, res) => {
  try {
    const { userAnswers } = req.body;
    const questions = await Question.find({});

    if (questions.length !== userAnswers.length) {
      return res.status(400).json({ message: 'Invalid number of answers' });
    }

    const result = calculateScore(userAnswers, questions);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getQuizQuestions,
  submitQuizAnswers,
};