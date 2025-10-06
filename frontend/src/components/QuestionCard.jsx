import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';

const QuestionCard = ({ question }) => {
  const { userAnswers, selectAnswer } = useQuiz();
  const selectedOptionIndex = userAnswers[useQuiz().currentQuestionIndex];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">{question.questionText}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => selectAnswer(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`option-button ${selectedOptionIndex === index ? 'selected' : ''}`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;