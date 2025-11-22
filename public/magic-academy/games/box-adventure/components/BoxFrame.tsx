
import React, { PropsWithChildren } from 'react';
import { Home, Layers } from 'lucide-react';

interface BoxFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const BoxFrame: React.FC<BoxFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-700">
      
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-100"></div>
      
      {/* Floating Orbs for depth */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-float animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-pulse"></div>

      {/* The Glass Container */}
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-[0_8px_32px_rgba(31,38,135,0.1)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header */}
        <div className="bg-white/30 p-5 flex justify-between items-center border-b border-white/20 relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-white/50 text-indigo-600 rounded-full hover:bg-white hover:shadow-md transition-all"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            
            <div className="flex items-center gap-2 text-indigo-800">
                <Layers size={20} className="text-indigo-500" />
                <h1 className="font-bold text-lg sm:text-xl tracking-wide">{title}</h1>
            </div>
            
            <div>
                 <div className="bg-indigo-100/50 text-indigo-600 px-3 py-1 rounded-full font-mono text-xs font-bold border border-indigo-200/50">
                    Level {progress + 1}/{totalStages}
                </div>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-indigo-50/30 relative z-30">
            <div 
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.4)]" 
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

export default BoxFrame;
