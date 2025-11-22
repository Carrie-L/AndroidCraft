import React, { PropsWithChildren } from 'react';

interface MagicBookProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
}

const MagicBook: React.FC<MagicBookProps> = ({ title, children, progress, totalStages }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-[3rem] border-8 border-amber-100 shadow-2xl overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header / Book Spine */}
        <div className="bg-amber-100 p-4 flex justify-between items-center border-b-4 border-amber-200/50">
            <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-300"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                 <div className="w-3 h-3 rounded-full bg-green-300"></div>
            </div>
            <h1 className="text-amber-800 font-bold text-lg sm:text-xl tracking-wide opacity-80 uppercase">{title}</h1>
            <div className="text-amber-600 font-mono text-sm">Page {progress + 1} / {totalStages}</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-amber-50">
            <div 
                className="h-full bg-gradient-to-r from-pink-300 to-blue-300 transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
            {children}
        </div>

      </div>
    </div>
  );
};

export default MagicBook;