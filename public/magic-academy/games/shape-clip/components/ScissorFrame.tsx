
import React, { PropsWithChildren } from 'react';
import { Home, Scissors } from 'lucide-react';

interface ScissorFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const ScissorFrame: React.FC<ScissorFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-700">
      
      {/* Crafting Table Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20 pointer-events-none text-slate-300"></div>
      
      {/* Decor: Cutout Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-dashed border-rose-300 rounded-full opacity-40 animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-100 rounded-tr-[40px] opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-100 rotate-12 opacity-50 shadow-sm"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-[2rem] border-[6px] border-[#E5E7EB] shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header */}
        <div className="bg-[#F9FAFB] p-5 flex justify-between items-center border-b-2 border-dashed border-slate-200 relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-white text-slate-500 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-sm border border-slate-200"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
                <Scissors size={20} className="text-rose-500 transform -rotate-90" />
                <h1 className="font-bold text-lg sm:text-xl tracking-wide">{title}</h1>
            </div>
            
            <div>
                 <div className="bg-white text-rose-500 px-3 py-1 rounded-full font-mono text-xs font-bold border border-rose-100 shadow-sm">
                    Cut {progress + 1} / {totalStages}
                </div>
            </div>
        </div>

        {/* Progress Bar - Dashed Line */}
        <div className="w-full h-1.5 bg-slate-100 relative z-30">
            <div 
                className="h-full bg-rose-400 transition-all duration-700 ease-out" 
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

export default ScissorFrame;