
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
        {/* Builder Theme: Safety Yellow/Orange accents */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-emerald-300 flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.2)] transition-transform transform hover:scale-110 ${emotion === 'excited' ? 'animate-pulse' : ''}`}>
            <span className="text-4xl sm:text-5xl select-none">{getEmoji()}</span>
        </div>
        
        {/* Construction Hat Icon */}
        <div className="absolute -top-4 -right-2 text-2xl transform -rotate-12 filter drop-shadow-md animate-wiggle">
            👷
        </div>

        {/* Name Tag */}
        <div className="absolute -bottom-2 w-full text-center">
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-0.5 rounded-full border border-emerald-400 shadow-sm">
                整理师
            </span>
        </div>
      </div>
      
      {message && (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-emerald-100 p-4 rounded-2xl rounded-bl-none shadow-lg max-w-[200px] sm:max-w-xs relative -top-8 animate-fade-in text-left">
          <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default XiaoQi;