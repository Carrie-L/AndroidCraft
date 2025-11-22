
import React, { PropsWithChildren } from 'react';
import { Home, Wand2 } from 'lucide-react';

interface MagicFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const MagicFrame: React.FC<MagicFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-[#FDF4FF] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-700">
      
      {/* Magic Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none text-purple-200"></div>
      
      {/* Magic Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[30%] left-[30%] w-[30%] h-[30%] bg-pink-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-40 animate-pulse"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] border-4 border-purple-100 shadow-[0_10px_40px_rgba(147,51,234,0.15)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header */}
        <div className="bg-purple-50/50 p-5 flex justify-between items-center border-b border-purple-100 relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-white text-purple-500 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors shadow-sm border border-purple-100"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            <div className="flex items-center gap-2 text-purple-800">
                <Wand2 size={20} className="text-purple-500" />
                <h1 className="font-bold text-lg sm:text-xl tracking-wide">{title}</h1>
            </div>
            
            <div>
                 <div className="bg-white text-purple-600 px-3 py-1 rounded-full font-mono text-xs font-bold border border-purple-100 shadow-sm">
                    Spell {progress + 1} / {totalStages}
                </div>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-purple-50 relative z-30">
            <div 
                className="h-full bg-purple-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto relative">
             {children}
        </div>

      </div>
    </div>
  );
};

export default MagicFrame;
