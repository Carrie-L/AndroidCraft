
import React from 'react';

interface XiaoQiProps {
  emotion?: 'happy' | 'confused' | 'excited' | 'smart' | 'thinking';
  message?: string;
  onClick?: () => void;
}

const XiaoQi: React.FC<XiaoQiProps> = ({ emotion = 'happy', message, onClick }) => {
  
  const getEmoji = () => {
    switch(emotion) {
      case 'confused': return '😿';
      case 'excited': return '😻';
      case 'smart': return '😼';
      case 'thinking': return '😽';
      default: return '😺';
    }
  };

  return (
    <div className="flex items-end gap-4 animate-bounce-slow relative z-10 pointer-events-none sm:pointer-events-auto">
      <div className="relative group cursor-pointer" onClick={onClick}>
        {/* Scholar Theme: Brown/Gold/Cream */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFF8E1] border-4 border-[#8D6E63] flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 ${emotion === 'excited' ? 'animate-pulse' : ''}`}>
            <span className="text-4xl sm:text-5xl select-none">{getEmoji()}</span>
        </div>
        
        {/* Mortarboard / Glasses */}
        <div className="absolute -top-4 -right-1 text-2xl transform rotate-6 filter drop-shadow-md animate-wiggle">
            🎓
        </div>

        <div className="absolute -bottom-2 w-full text-center">
            <span className="bg-[#5D4037] text-[#FFECB3] text-xs font-bold px-3 py-0.5 rounded-full border border-[#4E342E] shadow-md">
                奇教授
            </span>
        </div>
      </div>
      
      {message && (
        <div className="bg-white/95 backdrop-blur-md border-2 border-[#D7CCC8] p-4 rounded-2xl rounded-bl-none shadow-[0_8px_30px_rgba(93,64,55,0.15)] max-w-[200px] sm:max-w-xs relative -top-8 animate-fade-in text-left">
          <p className="text-[#5D4037] text-sm sm:text-base font-medium leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default XiaoQi;