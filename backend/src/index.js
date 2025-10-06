// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./db');
// const quizRoutes = require('./routes/quizRoutes');
// const Question = require('./models/Question');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/quiz', quizRoutes);

// // Seed data
// const seedDatabase = async () => {
//   try {
//     const existingQuestions = await Question.countDocuments();
//     if (existingQuestions === 0) {
//       const questions = [
//         {
//           questionText: "What is the capital of France?",
//           options: ["Berlin", "Madrid", "Paris", "Rome"],
//           correctOptionIndex: 2
//         },
//         {
//           questionText: "Which planet is known as the Red Planet?",
//           options: ["Earth", "Mars", "Jupiter", "Venus"],
//           correctOptionIndex: 1
//         },
//         {
//           questionText: "What is 2 + 2?",
//           options: ["3", "4", "5", "6"],
//           correctOptionIndex: 1
//         },
//         {
//           questionText: "Who wrote 'To Kill a Mockingbird'?",
//           options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"],
//           correctOptionIndex: 0
//         },
//         {
//           questionText: "What is the largest ocean on Earth?",
//           options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
//           correctOptionIndex: 3
//         }
//       ];
//       await Question.insertMany(questions);
//       console.log('✅ Database seeded with quiz questions.');
//     }
//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//   }
// };

// seedDatabase();

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// backend/src/index.js
require('dotenv').config();
const connectDB = require('./db');
const app = require('./app'); // Import the app
const Question = require('./models/Question'); // For seeding

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Seed data
const seedDatabase = async () => {
  try {
    const existingQuestions = await Question.countDocuments();
    if (existingQuestions === 0) {
      const questions = [
        // ... your question data here
      ];
      await Question.insertMany(questions);
      console.log('✅ Database seeded with quiz questions.');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};
seedDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});