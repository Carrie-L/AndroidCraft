
import React, { PropsWithChildren } from 'react';
import { Home, BoxSelect } from 'lucide-react';

interface TidyFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const TidyFrame: React.FC<TidyFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-700">
      
      {/* Tidy Room / Playroom Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-30 pointer-events-none text-emerald-100"></div>
      
      {/* Soft Environmental Blobs - Mint & Wood */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

      {/* Main Container: A neat shelf or box */}
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-[2.5rem] border-8 border-emerald-50 shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header */}
        <div className="bg-emerald-50/50 p-5 flex justify-between items-center border-b-2 border-emerald-100 relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-white text-emerald-500 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors shadow-sm border border-emerald-100"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
                <BoxSelect size={20} className="text-emerald-500" />
                <h1 className="font-bold text-lg sm:text-xl tracking-wide">{title}</h1>
            </div>
            
            <div>
                 <div className="bg-white text-emerald-600 px-3 py-1 rounded-full font-mono text-xs font-bold border border-emerald-100 shadow-sm">
                    Step {progress + 1} / {totalStages}
                </div>
            </div>
        </div>

        {/* Progress Bar - Measuring Tape Style */}
        <div className="w-full h-2 bg-emerald-50 relative z-30">
            <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-700 ease-out shadow-sm" 
                style={{ width: `${progressPercentage}%`, backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 5px)' }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto relative bg-transparent">
             {children}
        </div>

      </div>
    </div>
  );
};

export default TidyFrame;