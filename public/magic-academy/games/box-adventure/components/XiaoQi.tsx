
import React from 'react';

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
        {/* Dimension Traveler Theme: Blue/Indigo with glowing effects */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/80 backdrop-blur-md border-4 border-indigo-300 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-transform transform hover:scale-110 ${emotion === 'excited' ? 'animate-pulse' : ''}`}>
            <span className="text-4xl sm:text-5xl select-none">{getEmoji()}</span>
        </div>
        
        {/* Holographic Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>

        <div className="absolute -bottom-2 w-full text-center">
            <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-0.5 rounded-full border border-indigo-400 shadow-md">
                探险家
            </span>
        </div>
      </div>
      
      {message && (
        <div className="bg-white/80 backdrop-blur-md border border-indigo-100 p-4 rounded-2xl rounded-bl-none shadow-lg max-w-[200px] sm:max-w-xs relative -top-8 animate-fade-in text-left">
          <p className="text-indigo-900 text-sm sm:text-base font-medium leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default XiaoQi;
