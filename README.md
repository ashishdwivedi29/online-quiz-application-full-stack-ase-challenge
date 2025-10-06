# MERN Quiz App

### Overview

This is a full-stack web application that allows users to take a quiz and view their results. The project is built using the **MERN (MongoDB, Express.js, React, Node.js)** stack, focusing on a modern, responsive design and robust backend logic. It includes features like a countdown timer, real-time feedback, and comprehensive backend testing.

**Key Features:**

  * **Quiz Flow:** Seamless navigation from a start screen to the quiz, and finally to a results page.
  * **Dynamic UI:** A responsive, interactive user interface built with **React** and styled using **Tailwind CSS**.
  * **State Management:** User answers and quiz progress are managed using **React Context** for a smooth user experience.
  * **Backend Logic:** A RESTful API handles fetching questions and accurately calculating scores.
  * **Testing:** The backend includes **Jest** tests for both core scoring logic and API endpoint functionality.
  * **Timer:** A countdown timer that automatically submits the quiz when time runs out.

-----

### Backend

The backend is an **Express.js** application that serves as the API for the frontend. It uses **Mongoose** to interact with a **MongoDB Atlas** database, which stores the quiz questions.

#### Folder Structure

```
backend/
├── src/
│   ├── app.js            # Express app setup
│   ├── index.js          # Server entry point
│   ├── db.js             # MongoDB connection
│   ├── models/
│   │   └── Question.js   # Mongoose schema
│   ├── routes/
│   │   └── quizRoutes.js # API endpoints
│   ├── controllers/
│   │   └── quizController.js # API logic
│   ├── services/
│   │   └── scoreService.js   # Scoring logic
│   ├── tests/
│   │   └── scoreService.test.js # Unit tests
│   │   └── quizApi.test.js      # API tests
│   ├── .env              # Environment variables
│   └── package.json      # Dependencies
```

#### Setup and Run

1.  Navigate to the `backend` directory in your terminal.

    ```bash
    cd backend
    ```

2.  Install the required Node.js packages.

    ```bash
    npm install
    ```

3.  Create a `.env` file based on the `.env.example` template and add your MongoDB Atlas connection string.

    ```
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.svzhcwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    PORT=5000
    ```

4.  Run the backend server in development mode.

    ```bash
    npm run dev
    ```

-----

### Frontend

The frontend is a **React** application created with **Vite** and styled with **Tailwind CSS**. It manages the quiz UI, user interactions, and communication with the backend API via **Axios**.

#### Folder Structure

```
frontend/
├── src/
│   ├── main.jsx          # React app entry point
│   ├── App.jsx           # Main component with routes
│   ├── index.css         # Tailwind CSS imports and base styles
│   ├── pages/
│   │   ├── StartPage.jsx     # Welcome screen
│   │   ├── QuizPage.jsx      # Quiz interface
│   │   └── ResultPage.jsx    # Score breakdown
│   ├── components/
│   │   ├── QuestionCard.jsx  # Renders a single question
│   │   ├── ProgressBar.jsx   # Shows quiz progress
│   │   └── Timer.jsx         # Countdown timer
│   └── context/
│       └── QuizContext.jsx   # Global state management
├── .env                  # Environment variable for API URL
└── package.json          # Dependencies
```

#### Setup and Run

1.  Navigate to the `frontend` directory in your terminal.

    ```bash
    cd frontend
    ```

2.  Install the required Node.js packages.

    ```bash
    npm install
    ```

3.  Create a `.env` file for the frontend and specify the backend API URL.

    ```
    VITE_API_URL=http://localhost:5000/api
    ```

4.  Run the frontend development server.

    ```bash
    npm run dev
    ```

-----

### Testing

The backend is thoroughly tested to ensure its functionality and reliability.

#### Testing Procedures

  * **Unit Testing:** We used **Jest** to test the core scoring logic in `scoreService.js`. This isolates the function and verifies it works correctly under various conditions (all correct, mixed, all incorrect answers).
  * **Integration Testing:** We used **Supertest** to simulate HTTP requests to our API endpoints. This verifies that the routes, controllers, and database interactions are working together as expected. The test suite checks if the `/api/quiz` endpoint returns questions correctly and if the `/api/quiz/submit` endpoint calculates the score as intended.

#### How to Run Tests

1.  Ensure you are in the `backend` directory.

    ```bash
    cd backend
    ```

2.  Run the test command. The script is configured to automatically handle environment variables for testing.

    ```bash
    npm run test
    ```

3.  A successful run will show both test suites passing.

-----

### Future Enhancements

This project can be expanded with additional features to make it more robust and user-friendly.

  * **User Authentication:** Implement a **JWT-based admin login** to allow authorized users to add, edit, or delete quiz questions.
  * **Multiple Quizzes:** Extend the database and API to support multiple quizzes on different topics.
  * **Real-time Leaderboard:** Implement a real-time leaderboard using **WebSockets** to display the highest scores.
  * **Question Categories:** Allow questions to be categorized, so users can select a specific topic to be quizzed on.
