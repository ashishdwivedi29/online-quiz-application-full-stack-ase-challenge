import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultPage = () => {
  const { scoreData, questions, resetQuiz } = useQuiz();
  const navigate = useNavigate();

  if (!scoreData) {
    return (
      <div className="quiz-container text-center">
        <h2 className="text-2xl font-bold mb-4">No results to show. Please take the quiz first.</h2>
        <button
          onClick={() => {
            resetQuiz();
            navigate('/');
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Go to Start
        </button>
      </div>
    );
  }

  const { score, total, breakdown } = scoreData;

  const getBackgroundColor = (isCorrect) => (isCorrect ? 'bg-green-700' : 'bg-red-700');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="quiz-container max-w-2xl"
    >
      <h2 className="text-4xl font-bold text-center mb-6 text-purple-300">Quiz Results</h2>
      <p className="text-center text-2xl mb-8">You scored <span className="text-green-400 font-bold">{score}</span> out of <span className="font-bold">{total}</span>!</p>

      <div className="space-y-4">
        {breakdown.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg shadow-md ${getBackgroundColor(item.isCorrect)}`}
          >
            <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
            <p className="text-sm">
              <span className={`font-bold ${item.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                Your Answer: {questions[index].options[item.userAnswerIndex] || 'Not Answered'}
              </span>
            </p>
            {!item.isCorrect && (
              <p className="text-sm">
                <span className="font-bold text-gray-200">
                  Correct Answer: {questions[index].options[item.correctAnswerIndex]}
                </span>
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => {
            resetQuiz();
            navigate('/');
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Take Quiz Again
        </button>
      </div>
    </motion.div>
  );
};

export default ResultPage;