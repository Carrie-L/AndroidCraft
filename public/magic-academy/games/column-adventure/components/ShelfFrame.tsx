
import React, { PropsWithChildren } from 'react';
import { Home } from 'lucide-react';

interface ShelfFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const ShelfFrame: React.FC<ShelfFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-[#FDFCF5] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-stone-700">
      
      {/* Natsume Style Background */}
      {/* Washi Paper Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper.png")' }}></div>
      
      {/* Soft Spirit Orbs / Leaves */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#D8EAD3] rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FFF4C1] rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#FFD1D1] rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float animation-delay-4000"></div>

      {/* The "Shoji Screen" Container */}
      <div className="w-full max-w-4xl bg-[#FFFEFA] rounded-[2rem] border-4 border-[#D7C4BB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header - Gentle Sage */}
        <div className="bg-[#E8F3E8] p-5 flex justify-between items-center border-b border-[#D0E0D0] relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-white/60 text-[#6B8E6B] rounded-full hover:bg-white transition-colors shadow-sm border border-[#D0E0D0]"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            <h1 className="text-[#5C7A58] font-bold text-lg sm:text-xl tracking-widest">{title}</h1>
            
            <div>
                {totalStages > 5 ? (
                    <div className="bg-[#8BAF88] text-white px-3 py-1 rounded-full font-mono text-xs opacity-90">
                        Page {progress + 1} / {totalStages}
                    </div>
                ) : (
                    <div className="flex gap-2">
                        {Array.from({ length: totalStages }).map((_, i) => (
                            <div key={i} className={`h-2 w-2 rounded-full transition-all duration-500 ${i <= progress ? 'bg-[#8BAF88] scale-125' : 'bg-[#D8EAD3]'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Soft Progress Line */}
        <div className="w-full h-1 bg-[#F0F7F0] relative z-30">
            <div 
                className="h-full bg-[#8BAF88] opacity-60 transition-all duration-700 ease-out rounded-r-full" 
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

export default ShelfFrame;
