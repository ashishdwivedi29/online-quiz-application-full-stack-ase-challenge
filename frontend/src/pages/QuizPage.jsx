import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';

const QuizPage = () => {
  const { questions, currentQuestionIndex, submitQuiz, loading, error } = useQuiz();
  const navigate = useNavigate();

  const handleQuizSubmit = async () => {
    await submitQuiz();
    navigate('/result');
  };

  if (loading) return <div className="text-center text-xl text-gray-400">Loading quiz...</div>;
  if (error) return <div className="text-center text-xl text-red-400">{error}</div>;
  if (questions.length === 0) return <div className="text-center text-xl text-yellow-400">No questions found.</div>;

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="quiz-container flex flex-col items-center"
    >
      <div className="w-full mb-4">
        <Timer minutes={2} onTimeUp={handleQuizSubmit} />
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <QuestionCard question={questions[currentQuestionIndex]} />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between w-full mt-6">
        <button
          onClick={() => navigate('/result')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          End Quiz
        </button>
        {isLastQuestion ? (
          <button
            onClick={handleQuizSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={useQuiz().navigateToNext}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default QuizPage;