
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
        {/* Natsume Style: Sage Green Border, Cream Background */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFFEFA] border-4 border-[#8BAF88] flex items-center justify-center shadow-md transition-transform transform hover:scale-110 ${emotion === 'excited' ? 'animate-pulse' : ''}`}>
            <span className="text-4xl sm:text-5xl select-none opacity-90">{getEmoji()}</span>
        </div>
        <div className="absolute -bottom-2 w-full text-center">
            <span className="bg-[#E8F3E8] text-[#5C7A58] text-xs font-bold px-3 py-0.5 rounded-full border border-[#8BAF88] shadow-sm">小奇</span>
        </div>
      </div>
      
      {message && (
        <div className="bg-white/90 backdrop-blur-sm border border-[#D0E0D0] p-4 rounded-2xl rounded-bl-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-w-[200px] sm:max-w-xs relative -top-8 animate-fade-in">
          <p className="text-[#5D4037] text-sm sm:text-base font-medium leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default XiaoQi;
