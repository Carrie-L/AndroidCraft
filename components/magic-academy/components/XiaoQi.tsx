import React from 'react';
import { Cat } from 'lucide-react';

interface XiaoQiProps {
  emotion?: 'happy' | 'confused' | 'excited' | 'smart';
  message?: string;
  onClick?: () => void;
}

const XiaoQi: React.FC<XiaoQiProps> = ({ emotion = 'happy', message, onClick }) => {
  
  const getEmoji = () => {
    switch(emotion) {
      case 'confused': return '😿';
      case 'excited': return '😻';
      case 'smart': return '😼';
      default: return '😺';
    }
  };

  return (
    <div className="flex items-end gap-4 animate-bounce-slow relative z-10 pointer-events-none sm:pointer-events-auto">
      <div className="relative group cursor-pointer" onClick={onClick}>
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-pink-200 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 ${emotion === 'excited' ? 'animate-pulse' : ''}`}>
            <span className="text-4xl sm:text-5xl select-none">{getEmoji()}</span>
        </div>
        <div className="absolute -bottom-2 w-full text-center">
            <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full border border-pink-200">小奇</span>
        </div>
      </div>
      
      {message && (
        <div className="bg-white border-2 border-blue-100 p-4 rounded-2xl rounded-bl-none shadow-md max-w-[200px] sm:max-w-xs relative -top-8 animate-fade-in">
          <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default XiaoQi;