import { motion } from 'framer-motion';
import { CubeTransparentIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function ChatMessage({ message }) {
  const isBot = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
    >
      <div className={`flex-shrink-0 ${isBot ? 'bg-blue-100' : 'bg-gray-100'} p-2 rounded-lg`}>
        {isBot ? (
          <CubeTransparentIcon className="h-5 w-5 text-blue-600" />
        ) : (
          <UserCircleIcon className="h-5 w-5 text-gray-600" />
        )}
      </div>
      
      <div className={`flex-1 ${isBot ? 'bg-gray-100' : 'bg-blue-600'} rounded-lg px-4 py-2`}>
        <p className={`text-sm ${isBot ? 'text-gray-800' : 'text-white'}`}>
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}