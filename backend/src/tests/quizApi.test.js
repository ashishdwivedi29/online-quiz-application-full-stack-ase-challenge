// backend/src/tests/quizApi.test.js
const request = require('supertest');
const app = require('../app'); // Import app from the new file
const mongoose = require('mongoose');
const Question = require('../models/Question');

describe('Quiz API Endpoints', () => {
  beforeAll(async () => {
    // Connect to the test database and seed data before all tests
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany({}); // Clear existing data

    // Seed test data
    const questions = [
      { questionText: "Test Q1", options: ["A", "B"], correctOptionIndex: 0 },
      { questionText: "Test Q2", options: ["C", "D"], correctOptionIndex: 1 },
    ];
    await Question.insertMany(questions);
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  // Test case for GET /api/quiz
  test('GET /api/quiz should return all questions without correct answers', async () => {
    const res = await request(app).get('/api/quiz');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2); // Check if we get 2 questions
    expect(res.body[0]).toHaveProperty('questionText', 'Test Q1');
    expect(res.body[0]).not.toHaveProperty('correctOptionIndex'); // Crucial: check for no correct answer
  });

  // Test case for POST /api/quiz/submit
  test('POST /api/quiz/submit should return a correct score', async () => {
    const userAnswers = [0, 1]; // Correct answers for both questions
    const res = await request(app)
      .post('/api/quiz/submit')
      .send({ userAnswers });
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.score).toEqual(2);
    expect(res.body.total).toEqual(2);
    expect(res.body.breakdown[0].isCorrect).toEqual(true);
    expect(res.body.breakdown[1].isCorrect).toEqual(true);
  });
});