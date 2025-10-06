import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
      <motion.div
        className="bg-purple-500 h-2.5 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;