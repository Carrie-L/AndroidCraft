
import React, { useState, useEffect } from 'react';
import { Quest } from '../types';
import { X, ExternalLink, Sparkles, Loader2, GitBranch, Star, Zap, Hourglass, RotateCcw, Terminal, Cpu } from 'lucide-react';
// import { verifySubmission } from '../utils/magister';

interface QuestModalProps {
  quest: Quest;
  status: 'available' | 'active' | 'completed' | 'failed';
  onClose: () => void;
  onAccept: () => void;
  onComplete: () => void;
}

const QuestModal: React.FC<QuestModalProps> = ({ quest, status, onClose, onAccept, onComplete }) => {
  const [repoLink, setRepoLink] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Live Timer
  useEffect(() => {
      if (status === 'active' && quest.endTime) {
          const updateTimer = () => {
              const now = Date.now();
              const diff = quest.endTime! - now;
              if (diff > 0) {
                  const hrs = Math.floor(diff / (1000 * 60 * 60));
                  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  const secs = Math.floor((diff % (1000 * 60)) / 1000);
                  setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
              } else {
                  setTimeLeft("Time Expired");
              }
          };
          updateTimer();
          const interval = setInterval(updateTimer, 1000);
          return () => clearInterval(interval);
      }
  }, [status, quest.endTime]);

  const handleSubmit = async () => {
    if (!repoLink) return;
    setIsVerifying(true);
    // const result = await verifySubmission(quest.title, repoLink);
    const result = quest.title;
    setIsVerifying(false);
    setVerificationResult(result);
    setTimeout(() => {
        onComplete();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/90 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container - Holographic Tablet */}
      <div className="bg-[#1E293B] w-full max-w-lg border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)] relative overflow-hidden flex flex-col max-h-[90vh] rounded-2xl">
        
        {/* Tech Decorations */}
        <div className="absolute top-0 left-0 p-4 pointer-events-none opacity-40 text-cyan-500">
            <Cpu size={40} strokeWidth={1} />
        </div>
        <div className="absolute bottom-0 right-0 p-4 pointer-events-none opacity-20 text-cyan-500 transform rotate-180">
            <Cpu size={40} strokeWidth={1} />
        </div>

        {/* Header */}
        <div className="bg-[#0F172A] p-6 flex justify-between items-start border-b border-cyan-500/20 relative z-10">
            <div className="flex flex-col gap-2 pl-2">
                <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Terminal size={12} />
                    <span>Mission Brief</span>
                </div>
                <h2 className="font-bold text-2xl sm:text-3xl tracking-tight text-white">{quest.title}</h2>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 rounded-lg p-2">
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto text-slate-300 relative scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent flex-1">
             
             <div className="space-y-8">
                 
                 {/* Stats Row */}
                 <div className="grid grid-cols-3 gap-4 pb-6 border-b border-slate-700">
                     <div className="bg-[#0F172A] border border-slate-700 px-4 py-3 rounded-xl text-center">
                         <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Rank</div>
                         <div className="font-black text-xl text-white">{quest.rank}</div>
                     </div>
                     <div className="bg-[#0F172A] border border-slate-700 px-4 py-3 rounded-xl text-center">
                         <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">XP</div>
                         <div className="font-mono font-bold text-xl text-cyan-400">{quest.xp}</div>
                     </div>
                     <div className="bg-[#0F172A] border border-slate-700 px-4 py-3 rounded-xl text-center">
                         <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{status === 'active' ? 'Time Left' : 'Limit'}</div>
                         <div className={`font-mono font-bold text-lg ${status === 'active' ? 'text-cyan-300 animate-pulse' : 'text-white'}`}>
                             {status === 'active' ? timeLeft : `${quest.countdown}h`}
                         </div>
                     </div>
                 </div>

                 {/* Description */}
                 <div className="text-center">
                     <p className="text-lg leading-relaxed text-slate-200 font-light">
                         {quest.description}
                     </p>
                     <div className="mt-6 flex justify-center">
                        <div className="px-4 py-1  text-[#ffa6d8] text-[12px] tracking-widest uppercase rounded  font-mono">
                            # Module: {quest.subTitle}
                        </div>
                     </div>
                 </div>

                 {/* Requirements List */}
                 <div className="bg-[#0F172A]/50 p-6 border border-slate-700/50 relative rounded-xl">
                     <div className="absolute -top-3 left-4 bg-[#1E293B] px-2 text-cyan-500 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20 rounded">
                         Objectives
                     </div>
                     <ul className="space-y-3 mt-1">
                         {quest.requirements.map((req, idx) => (
                             <li key={idx} className="text-sm flex items-center gap-3 text-slate-400">
                                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0 shadow-[0_0_5px_#06b6d4]"></div> 
                                 {req}
                             </li>
                         ))}
                     </ul>
                 </div>

                 {/* External Link */}
                 <div className="flex justify-center">
                     <a 
                        href={quest.codelabUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#ffa6d8] text-s font-bold hover:text-white transition-colors uppercase tracking-widest hover:underline"
                     >
                         <ExternalLink size={12} /> 
                         查阅魔法卷轴 (Codelab)
                     </a>
                 </div>

                 {/* Action Area */}
                 <div className="pt-4">
                     {status === 'available' && (
                         <div className="space-y-3">
                             <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
                                 <Hourglass size={12} /> 
                                 <span>TIMER STARTS UPON ACCEPTANCE</span>
                             </div>
                             <button 
                                onClick={onAccept}
                                className="w-full py-4 bg-[#ff9ad2] hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest rounded-xl hover:scale-[1.02] transform"
                             >
                                 <Zap size={16} fill="currentColor" /> 启动悬赏任务
                             </button>
                         </div>
                     )}

                     {status === 'active' && !verificationResult && (
                         <div className="space-y-6 animate-fade-in">
                             <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 ml-1">
                                    <GitBranch size={12}/> Repository Link
                                </label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={repoLink}
                                        onChange={(e) => setRepoLink(e.target.value)}
                                        placeholder="https://github.com/user/project"
                                        className="w-full p-4 bg-[#0F172A] border border-slate-600 focus:border-cyan-500 outline-none font-mono text-sm text-white placeholder-slate-600 transition-all rounded-xl pr-10"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                             </div>
                             <button 
                                onClick={handleSubmit}
                                disabled={!repoLink || isVerifying}
                                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-widest rounded-xl"
                             >
                                 {isVerifying ? <Loader2 className="animate-spin" /> : "提交魔法鉴定"}
                             </button>
                         </div>
                     )}

                     {status === 'completed' && (
                         <div className="text-center p-5 border border-green-500/30 bg-green-500/10 text-green-400 font-bold flex flex-col items-center gap-2 uppercase tracking-widest text-sm rounded-xl">
                             <Sparkles size={20} />
                             Mission Accomplished
                         </div>
                     )}

                     {status === 'failed' && (
                         <div className="space-y-4">
                             <div className="text-center p-5 border border-red-500/30 bg-red-500/10 text-red-400 font-bold flex flex-col items-center gap-2 uppercase tracking-widest text-sm rounded-xl">
                                 <Hourglass size={20} />
                                 Mission Failed: Time Expired
                             </div>
                             <button 
                                onClick={onAccept} 
                                className="w-full py-3 bg-transparent border border-slate-600 text-slate-400 hover:text-white hover:border-white font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-[0.1em] rounded-xl"
                             >
                                 <RotateCcw size={14} /> 重启任务
                             </button>
                         </div>
                     )}

                     {/* Result */}
                     {verificationResult && (
                         <div className="mt-6 p-6 bg-[#0F172A] border border-cyan-500/20 rounded-xl text-cyan-100 text-center font-mono text-sm leading-relaxed shadow-inner">
                             <div className="mb-2 flex justify-center text-cyan-400"><Terminal size={16}/></div>
                             <span className="opacity-80">"{verificationResult}"</span>
                         </div>
                     )}
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
