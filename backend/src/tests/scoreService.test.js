const { calculateScore } = require('../services/scoreService');

describe('calculateScore', () => {
  const mockQuestions = [
    { correctOptionIndex: 0 },
    { correctOptionIndex: 1 },
    { correctOptionIndex: 2 },
    { correctOptionIndex: 3 },
    { correctOptionIndex: 0 },
  ];

  test('should correctly calculate score for all correct answers', () => {
    const userAnswers = [0, 1, 2, 3, 0];
    const result = calculateScore(userAnswers, mockQuestions);
    expect(result.score).toBe(5);
    expect(result.total).toBe(5);
    expect(result.breakdown.every(item => item.isCorrect)).toBe(true);
  });

  test('should correctly calculate score for mixed correct and incorrect answers', () => {
    const userAnswers = [0, 3, 2, 1, 0];
    const result = calculateScore(userAnswers, mockQuestions);
    expect(result.score).toBe(3);
    expect(result.total).toBe(5);
    expect(result.breakdown[0].isCorrect).toBe(true);
    expect(result.breakdown[1].isCorrect).toBe(false);
    expect(result.breakdown[2].isCorrect).toBe(true);
    expect(result.breakdown[3].isCorrect).toBe(false);
    expect(result.breakdown[4].isCorrect).toBe(true);
  });

  test('should return score of 0 for all incorrect answers', () => {
    const userAnswers = [1, 0, 1, 2, 1];
    const result = calculateScore(userAnswers, mockQuestions);
    expect(result.score).toBe(0);
    expect(result.total).toBe(5);
    expect(result.breakdown.every(item => !item.isCorrect)).toBe(true);
  });

  test('should handle quizzes with no answers gracefully', () => {
    const userAnswers = [];
    const result = calculateScore(userAnswers, mockQuestions);
    expect(result.score).toBe(0);
    expect(result.total).toBe(5);
  });
});