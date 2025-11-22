import React, { PropsWithChildren } from 'react';
import { Home } from 'lucide-react';

interface CinemaFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const CinemaFrame: React.FC<CinemaFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-800">
      
      {/* Studio Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-cyan-100/50 to-transparent blur-3xl"></div>

      {/* The Projector Screen Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Studio Header */}
        <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-slate-200">
            <div className="flex items-center gap-2 text-cyan-600">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
                    title="返回大厅"
                 >
                    <Home size={20} />
                 </button>
            </div>
            <h1 className="text-slate-800 font-bold text-lg sm:text-xl">{title}</h1>
            
            <div>
                {totalStages > 5 ? (
                     <div className="px-3 py-1 bg-slate-200 rounded-full text-slate-600 font-bold text-xs">
                        Page {progress + 1} / {totalStages}
                    </div>
                ) : (
                    <div className="flex gap-1.5">
                        {Array.from({ length: totalStages }).map((_, i) => (
                            <div key={i} className={`h-1.5 w-6 rounded-full transition-all ${i <= progress ? 'bg-cyan-500' : 'bg-slate-200'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto relative bg-slate-50/30">
            {children}
        </div>

      </div>
    </div>
  );
};

export default CinemaFrame;