import React, { PropsWithChildren } from 'react';
import { Home } from 'lucide-react';

interface BookFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const BookFrame: React.FC<BookFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Decor specific to Book Theme */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-[3rem] border-[12px] border-amber-100 shadow-2xl overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Book Spine / Header */}
        <div className="bg-amber-50 p-4 flex justify-between items-center border-b-4 border-amber-100">
            <div className="flex items-center">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
                    title="返回大厅"
                 >
                    <Home size={20} />
                 </button>
            </div>
            <h1 className="text-amber-800 font-bold text-lg sm:text-xl tracking-widest uppercase opacity-80">{title}</h1>
            
            <div className="flex items-center">
                {totalStages > 5 ? (
                     <div className="text-amber-600 font-mono text-sm font-bold">Page {progress + 1} / {totalStages}</div>
                ) : (
                    <div className="flex gap-1.5">
                        {Array.from({ length: totalStages }).map((_, i) => (
                            <div key={i} className={`h-2 w-6 rounded-full transition-all ${i <= progress ? 'bg-amber-400' : 'bg-amber-200'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

        {/* Progress Bar (Amber Theme) - Bottom indicator line */}
        <div className="w-full h-2 bg-amber-50/50">
            <div 
                className="h-full bg-gradient-to-r from-orange-300 to-amber-400 transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto relative z-10">
            {children}
        </div>

      </div>
    </div>
  );
};

export default BookFrame;