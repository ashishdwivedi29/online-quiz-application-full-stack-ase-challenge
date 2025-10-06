import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/quiz`);
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz questions.');
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const selectAnswer = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const navigateToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const navigateToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/quiz/submit`, { userAnswers });
      setScoreData(response.data);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to submit quiz.');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsSubmitted(false);
    setScoreData(null);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        userAnswers,
        isSubmitted,
        scoreData,
        loading,
        error,
        selectAnswer,
        navigateToNext,
        navigateToPrevious,
        submitQuiz,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => React.useContext(QuizContext);