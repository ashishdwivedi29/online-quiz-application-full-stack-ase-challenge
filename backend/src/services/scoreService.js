function calculateScore(userAnswers, questions) {
  let score = 0;
  const breakdown = questions.map((q, i) => {
    const correct = userAnswers[i] === q.correctOptionIndex;
    if (correct) score++;
    return {
      question: q.questionText,
      userAnswerIndex: userAnswers[i],
      correctAnswerIndex: q.correctOptionIndex,
      isCorrect: correct
    };
  });
  return { score, total: questions.length, breakdown };
}

module.exports = { calculateScore };