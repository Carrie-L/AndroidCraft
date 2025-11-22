
import React, { useState, useEffect } from 'react';
import { Quest, QuestRank } from '../types';
import { Check, Moon, Sun, Sparkles, Eye, Star, Zap, Hourglass, XCircle, Loader2, Code, Database, Layout, Globe, Cpu } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  status: 'available' | 'active' | 'completed' | 'failed';
  onClick: () => void;
}

// Cyber Neon Palette
const RANK_STYLES: Record<QuestRank, { color: string, icon: React.ReactNode, shadow: string }> = {
  'F': { color: '#94a3b8', icon: <Layout size={14} />, shadow: 'rgba(148, 163, 184, 0.2)' },
  'E': { color: '#cbd5e1', icon: <Layout size={14} />, shadow: 'rgba(203, 213, 225, 0.2)' },
  'D': { color: '#2dd4bf', icon: <Code size={14} />, shadow: 'rgba(45, 212, 191, 0.4)' },
  'C': { color: '#22d3ee', icon: <Code size={14} />, shadow: 'rgba(34, 211, 238, 0.4)' },
  'B': { color: '#60a5fa', icon: <Globe size={14} />, shadow: 'rgba(96, 165, 250, 0.4)' },
  'A': { color: '#818cf8', icon: <Database size={14} />, shadow: 'rgba(129, 140, 248, 0.4)' },
  'S': { color: '#c084fc', icon: <Cpu size={14} />, shadow: 'rgba(192, 132, 252, 0.5)' },
  'SS': { color: '#f472b6', icon: <Zap size={14} />, shadow: 'rgba(244, 114, 182, 0.5)' },
  'SSS': { color: '#facc15', icon: <Sparkles size={14} />, shadow: 'rgba(250, 204, 21, 0.6)' },
};

const QuestCard: React.FC<QuestCardProps> = ({ quest, status, onClick }) => {
  const { color, icon, shadow } = RANK_STYLES[quest.rank];
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
      if (status === 'active' && quest.endTime) {
          const updateTimer = () => {
              const now = Date.now();
              const diff = quest.endTime! - now;
              if (diff > 0) {
                  const hrs = Math.floor(diff / (1000 * 60 * 60));
                  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  setTimeLeft(`${hrs}h ${mins}m`);
              } else {
                  setTimeLeft("Expired");
              }
          };
          updateTimer();
          const interval = setInterval(updateTimer, 60000);
          return () => clearInterval(interval);
      }
  }, [status, quest.endTime]);

  return (
    <div 
      onClick={onClick}
      className="relative group cursor-pointer perspective-1000"
    >
      {/* Card Container - Tech rounded corners, glowing border */}
      <div 
        className={`w-full aspect-[3/4] bg-[#1E293B] relative flex flex-col border-2 transition-all duration-300 ease-out overflow-hidden rounded-3xl
        ${status === 'failed' 
            ? 'border-red-900/50 opacity-60' 
            : 'border-slate-700 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:-translate-y-2'}
        `}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] group-hover:bg-cyan-400/20 transition-all"></div>

        {/* Content Container */}
        <div className="flex-1 p-6 flex flex-col relative z-10">
            
            {/* Header Row */}
            <div className="w-full flex justify-between items-start mb-2">
                {/* Rank Badge */}
                <div 
                    className="w-10 h-10 rounded-xl border flex items-center justify-center bg-[#0F172A] shadow-lg" 
                    style={{ borderColor: color, color: color, boxShadow: `0 0 10px ${shadow}` }}
                >
                    <span className="font-black text-lg">{quest.rank}</span>
                </div>
                
                {/* XP Badge */}
                <div className="bg-[#0F172A]/80 border border-slate-700 px-2 py-1 rounded-lg flex flex-col items-end">
                    <div className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">XP</div>
                    <div className="font-mono text-sm font-bold text-cyan-300">
                        {quest.xp}
                    </div>
                </div>
            </div>

            {/* Central Art Area */}
            <div className="flex-1 flex items-center justify-center w-full my-2 relative">
                <div className="relative z-10 text-slate-600 group-hover:text-cyan-200 transition-colors duration-500 transform group-hover:scale-110">
                    {/* Dynamic Icon based on rank */}
                    {quest.rank === 'SSS' || quest.rank === 'S' ? (
                        <Sparkles size={64} strokeWidth={1} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    ) : (
                        <Code size={64} strokeWidth={1} />
                    )}
                </div>
            </div>

            {/* Title Area */}
            <div className="w-full mt-auto">
                <h3 className="font-bold text-lg text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {quest.title}
                </h3>
                <div className="flex items-center gap-2">
                    <div className="h-0.5 w-4 bg-cyan-500 rounded-full"></div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono line-clamp-1">
                        {quest.subTitle}
                    </p>
                </div>
            </div>
        </div>

        {/* Status Overlays */}
        {status === 'active' && (
            <div className="absolute top-4 right-4">
                <div className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse backdrop-blur-sm">
                    <Loader2 size={10} className="animate-spin" />
                    {timeLeft}
                </div>
            </div>
        )}
        
        {status === 'completed' && (
            <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-[2px] flex items-center justify-center z-20">
                <div className="border border-green-500/50 bg-green-900/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] transform -rotate-12">
                    <Check size={16} className="text-green-400" strokeWidth={3} />
                    <span className="text-xs font-bold text-green-300 uppercase tracking-widest">Success</span>
                </div>
            </div>
        )}

        {status === 'failed' && (
            <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-[2px] flex items-center justify-center z-20">
                <div className="border border-red-500/50 bg-red-900/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    <XCircle size={16} className="text-red-500" strokeWidth={3} />
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Failed</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuestCard;
