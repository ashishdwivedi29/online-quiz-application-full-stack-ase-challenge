import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StartPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="quiz-container text-center p-10"
    >
      <h1 className="text-4xl font-bold mb-4 text-purple-300">Welcome to the MERN Quiz!</h1>
      <p className="text-lg text-gray-300 mb-8">Test your knowledge with a few quick questions. Good luck!</p>
      <Link to="/quiz">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 shadow-lg"
        >
          Start Quiz
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default StartPage;