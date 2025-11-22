
import React, { PropsWithChildren } from 'react';
import { Home, Tent } from 'lucide-react';

interface CampFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const CampFrame: React.FC<CampFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-[#2A3B45]">
      
      {/* Yuru Camp / Outdoorsy Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/skulls.png")' }}></div> {/* Using a noise texture effectively */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>

      {/* Abstract Landscape Blobs */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#81B29A] opacity-20 rounded-t-[50%] blur-3xl transform translate-y-10"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#F2CC8F] rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#E07A5F] rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float animation-delay-2000"></div>

      {/* The Tent/Canvas Container */}
      <div className="w-full max-w-4xl bg-[#FFFCF5] rounded-[2rem] border-8 border-[#A5A58D] shadow-[0_10px_40px_rgba(42,59,69,0.1)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Header - Canvas Flap Style */}
        <div className="bg-[#6B705C] p-5 flex justify-between items-center border-b-4 border-[#585C4A] relative z-30 text-[#FFE8D6]">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-[#FFE8D6]/20 text-[#FFE8D6] rounded-full hover:bg-[#FFE8D6] hover:text-[#6B705C] transition-colors shadow-sm"
                    title="返回大厅"
                 >
                    <Home size={18} />
                 </button>
            </div>
            <div className="flex items-center gap-2">
                <Tent size={20} />
                <h1 className="font-bold text-lg sm:text-xl tracking-wider">{title}</h1>
            </div>
            
            <div>
                {totalStages > 5 ? (
                    <div className="bg-[#FFE8D6]/20 px-3 py-1 rounded-full font-mono text-xs font-bold">
                        Step {progress + 1}/{totalStages}
                    </div>
                ) : (
                    <div className="flex gap-2">
                        {Array.from({ length: totalStages }).map((_, i) => (
                            <div key={i} className={`h-2 w-2 rounded-full transition-all duration-500 ${i <= progress ? 'bg-[#E07A5F] scale-125' : 'bg-[#A5A58D]'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Progress Rope */}
        <div className="w-full h-1.5 bg-[#DDBEA9] relative z-30">
            <div 
                className="h-full bg-[#E07A5F] transition-all duration-700 ease-out" 
                style={{ width: `${progressPercentage}%`, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)' }}
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

export default CampFrame;
