const express = require('express');
const { getQuizQuestions, submitQuizAnswers } = require('../controllers/quizController');
const router = express.Router();

router.get('/', getQuizQuestions);
router.post('/submit', submitQuizAnswers);

module.exports = router;