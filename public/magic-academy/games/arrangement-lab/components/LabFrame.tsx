
import React, { PropsWithChildren } from 'react';
import { Home, FlaskConical } from 'lucide-react';

interface LabFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const LabFrame: React.FC<LabFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-[#FFF0F5] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-800">
      
      {/* Macaron Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-40 pointer-events-none mix-blend-multiply text-pink-100"></div>
      
      {/* Macaron Blobs: Soft Pink & Mint Green */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* The Lab Card - Pink Theme Container */}
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-[2.5rem] border-8 border-pink-100 shadow-[0_20px_60px_-15px_rgba(255,182,193,0.4)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header - Pink Base with Green Accents */}
        <div className="bg-pink-50/80 p-5 flex justify-between items-center border-b-2 border-pink-100 relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-white text-pink-400 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors shadow-sm border border-pink-100"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            <div className="flex items-center gap-2 text-pink-700">
                <FlaskConical size={20} className="text-emerald-400" /> {/* Green Icon Accent */}
                <h1 className="font-bold text-lg sm:text-xl tracking-wide text-pink-800">{title}</h1>
            </div>
            
            <div>
                 <div className="bg-white text-emerald-500 px-3 py-1 rounded-full font-mono text-xs font-bold border border-emerald-100 shadow-sm">
                    Lab {progress + 1} / {totalStages}
                </div>
            </div>
        </div>

        {/* Progress Line - Mint Green */}
        <div className="w-full h-2 bg-pink-50 relative z-30">
            <div 
                className="h-full bg-gradient-to-r from-emerald-300 to-teal-300 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(110,231,183,0.6)] rounded-r-full" 
                style={{ width: `${progressPercentage}%` }}
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

export default LabFrame;
