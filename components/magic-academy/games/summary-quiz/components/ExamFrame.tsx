
import React, { PropsWithChildren } from 'react';
import { Home, ScrollText } from 'lucide-react';

interface ExamFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const ExamFrame: React.FC<ExamFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = Math.min(100, ((progress) / totalStages) * 100);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-800">
      
      {/* Parchment/Library Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] opacity-50 pointer-events-none"></div>
      
      {/* Decor: Ink Blots / Magic Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-50 animate-blob animation-delay-2000"></div>

      {/* Main Container: The Scroll/Exam Paper */}
      <div className="w-full max-w-4xl bg-[#FFFEFA] rounded-[2rem] border-[12px] border-[#EADBC8] shadow-[0_20px_60px_rgba(92,61,46,0.15)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header: Wax Seal Style */}
        <div className="bg-[#F7EFE5] p-5 flex justify-between items-center border-b-2 border-[#EADBC8] relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-white text-[#8D6E63] rounded-full hover:bg-[#EFEBE9] hover:text-[#5D4037] transition-colors shadow-sm border border-[#D7CCC8]"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            <div className="flex items-center gap-2 text-[#5D4037]">
                <ScrollText size={20} className="text-[#8D6E63]" />
                <h1 className="font-bold text-lg sm:text-xl tracking-wide font-serif">{title}</h1>
            </div>
            
            <div>
                 <div className="bg-white text-[#8D6E63] px-3 py-1 rounded-full font-mono text-xs font-bold border border-[#D7CCC8] shadow-sm">
                    Q {progress} / {totalStages}
                </div>
            </div>
        </div>

        {/* Progress Ink Line */}
        <div className="w-full h-1.5 bg-[#F7EFE5] relative z-30">
            <div 
                className="h-full bg-[#D7CCC8] transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-12 overflow-y-auto relative">
             {children}
        </div>

      </div>
    </div>
  );
};

export default ExamFrame;