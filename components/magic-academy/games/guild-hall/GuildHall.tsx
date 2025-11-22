
import React, { useState, useEffect } from 'react';
import { Home, Sparkles, Filter, Lock, Compass, Star, Moon, Zap, Hexagon, Grid } from 'lucide-react';
import { QUESTS } from './data/quests';
import { getProgress, acceptQuest, completeQuest, checkExpiredQuests } from './utils/storage';
import { UserProgress, Quest } from './types';
import QuestCard from './components/QuestCard';
import QuestModal from './components/QuestModal';

interface GuildHallProps {
  onExit: () => void;
}

export default function GuildHall({ onExit }: GuildHallProps) {
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [filterRank, setFilterRank] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  // Update time every minute to refresh countdowns
  useEffect(() => {
      const interval = setInterval(() => setNow(Date.now()), 60000);
      return () => clearInterval(interval);
  }, []);

  // Refetch progress when component mounts and check for expired items
  useEffect(() => {
    const p = checkExpiredQuests();
    setProgress(p);
  }, []);

  const handleAccept = (quest: Quest) => {
    const newProgress = acceptQuest(quest.id);
    setProgress(newProgress);
    const enriched = enrichQuest(quest, newProgress);
    setSelectedQuest(enriched);
  };

  const handleComplete = (quest: Quest) => {
    const newProgress = completeQuest(quest.id, quest.xp);
    setProgress(newProgress);
    const enriched = enrichQuest(quest, newProgress);
    setSelectedQuest(enriched);
  };

  // Merge static data with progress
  const enrichQuest = (quest: Quest, currentProgress: UserProgress): Quest => {
      const activeState = currentProgress.activeQuests.find(q => q.questId === quest.id);
      const completedState = currentProgress.completedQuests.find(q => q.questId === quest.id);
      const isFailed = currentProgress.failedQuests.includes(quest.id);

      let status: Quest['status'] = 'available';
      if (activeState) status = 'active';
      if (completedState) status = 'completed';
      if (isFailed) status = 'failed';

      return {
          ...quest,
          status,
          isTaked: !!activeState,
          isFinished: !!completedState,
          startTime: activeState?.startTime,
          endTime: activeState?.endTime,
          finishTime: completedState?.finishTime
      };
  };

  const enrichedQuests = QUESTS.map(q => enrichQuest(q, progress));
  const filteredQuests = enrichedQuests.filter(q => !filterRank || q.rank === filterRank);

  return (
    <div className="h-screen w-full bg-[#0F172A] relative font-sans overflow-hidden text-slate-200 selection:bg-cyan-500/30 flex flex-col">
        
        {/* Cyber Magic Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            {/* Gradient changed to end in purple #271742, confined to bottom 15% */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,#0F172A_0%,#1E293B_85%,#271742_100%)]"></div>
            
            {/* Glowing Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
        </div>

        {/* Fixed Top Section: Header + Filter */}
        <div className="flex-none z-40 bg-[#0F172A]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(6,182,212,0.1)]">
            {/* Header / HUD */}
            <header className="p-4 flex justify-between items-center mx-2">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onExit}
                        className="p-2 bg-slate-800 rounded-full hover:bg-cyan-950 hover:text-cyan-400 transition-all border border-slate-700 hover:border-cyan-500/50 text-slate-400"
                    >
                        <Home size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex items-center justify-center bg-cyan-500/10 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <Hexagon className="text-cyan-400" size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] flex items-center gap-2">
                                星辰委托公会
                            </h1>
                            <p className="text-[10px] text-cyan-200/60 uppercase tracking-[0.3em] leading-none font-bold">实战悬赏布告栏</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-[14px] text-cyan-300/70 uppercase font-bold tracking-widest">魔法师等级</span>
                        <div className="flex items-baseline gap-1">
                            <Star size={20} className="text-yellow-400 fill-yellow-400"/>
                            <span className="text-xl font-bold leading-none text-white font-mono">{progress.level}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[14px] text-cyan-300/70 uppercase font-bold tracking-widest">魔力结晶</span>
                        <div className="flex items-center gap-1.5 text-white">
                            <Sparkles size={20} className="text-cyan-400 animate-pulse" />
                            <span className="text-xl font-bold leading-none font-mono text-cyan-50">{progress.currentXp}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filter Bar - Fixed below header */}
            <div className="pb-4 px-4 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-3 min-w-max sm:justify-center">
                    {/* 返回魔法学院按钮：放在筛选条最左侧 */}
                    <button
                        onClick={onExit}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-600 text-[10px] sm:text-xs font-bold text-slate-100 hover:bg-cyan-950 hover:border-cyan-500/60 hover:text-cyan-100 transition-colors whitespace-nowrap"
                    >
                        <Home size={14} />
                        <span>返回魔法学院</span>
                    </button>

                    <div className="flex items-center gap-2 text-cyan-200/60 mr-2 sticky left-0 bg-[#0F172A]/80 backdrop-blur-sm pl-2 pr-4 rounded-r-full sm:static sm:bg-transparent sm:p-0">
                        <Filter size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">筛选</span>
                    </div>
                    
                    <button 
                        onClick={() => setFilterRank(null)}
                        className={`px-5 py-1.5 text-[10px] sm:text-xs font-bold transition-all rounded-lg border ${
                            !filterRank 
                            ? 'bg-cyan-500 text-[#0F172A] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                            : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300'
                        }`}
                    >
                        全部
                    </button>
                    
                    {['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'].map(rank => (
                        <button 
                            key={rank}
                            onClick={() => setFilterRank(rank)}
                            className={`min-w-[36px] px-3 py-1.5 text-[10px] sm:text-xs font-bold transition-all rounded-lg border relative group overflow-hidden ${
                                filterRank === rank 
                                ? 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                                : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300'
                            }`}
                        >
                            <span className="relative z-10">{rank}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Main Content - Scrollable Quest Grid */}
        <div className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-cyan-900/50 scrollbar-track-transparent">
            <main className="p-6 sm:p-10 max-w-7xl mx-auto pb-32">
                {/* Quest Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredQuests.map(quest => (
                        <QuestCard 
                            key={quest.id}
                            quest={quest}
                            status={quest.status || 'available'}
                            onClick={() => setSelectedQuest(quest)}
                        />
                    ))}
                    
                    {/* Placeholder for "Coming Soon" */}
                    <div className="opacity-40 pointer-events-none relative group border border-dashed border-slate-600 bg-slate-900/50 aspect-[3/4] flex flex-col items-center justify-center rounded-3xl">
                        <Lock size={32} className="text-slate-500 mb-3" />
                        <span className="font-mono font-bold text-slate-500 text-xs text-center tracking-widest uppercase">
                            Sector Locked
                        </span>
                    </div>
                </div>
            </main>
        </div>

        {/* Modal */}
        {selectedQuest && (
            <QuestModal 
                quest={selectedQuest}
                status={selectedQuest.status || 'available'}
                onClose={() => setSelectedQuest(null)}
                onAccept={() => handleAccept(selectedQuest)}
                onComplete={() => handleComplete(selectedQuest)}
            />
        )}

    </div>
  );
}
