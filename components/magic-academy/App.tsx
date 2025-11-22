
import React, { useState } from 'react';
import LayoutMagicGame from './games/layout-magic/LayoutMagicGame';
import ComposeIntroGame from './games/compose-intro/ComposeIntroGame';
import DataDrivenGame from './games/compose-data-driven/DataDrivenGame';
import ColumnAdventureGame from './games/column-adventure/ColumnAdventureGame';
import RowAdventureGame from './games/row-adventure/RowAdventureGame';
import BoxAdventureGame from './games/box-adventure/BoxAdventureGame';
import ShapeClipGame from './games/shape-clip/ShapeClipGame';
import ArrangementLabGame from './games/arrangement-lab/ArrangementLabGame';
import AlignmentAdventureGame from './games/alignment-adventure/AlignmentAdventureGame';
import ClickMagicGame from './games/click-magic/ClickMagicGame';
import SummaryQuizGame from './games/summary-quiz/SummaryQuizGame';
import GuildHall from './games/guild-hall/GuildHall';
import XiaoQi from './games/layout-magic/components/XiaoQi'; 
import { GameId } from './types';
import { LayoutTemplate, Wand2, GraduationCap, Sparkles, Film, Layers, AlignHorizontalSpaceAround, SplitSquareHorizontal, Box, ArrowUpFromLine, MousePointerClick, Scissors, ScrollText, ArrowRight, Map } from 'lucide-react';
import { MAGIC_GAMES } from './gameConfig';

interface MagicAcademyProps {
  /** 从 AndroidCraft 主站返回章节时间线 */
  onBackToModule?: () => void;
  /** 初始要进入的小游戏（默认 HOME） */
  initialGame?: GameId;
}

export default function App({ onBackToModule, initialGame = 'HOME' }: MagicAcademyProps) {
  const [activeGame, setActiveGame] = useState<GameId>(initialGame);

  // 1.1.1 Intro
  if (activeGame === 'COMPOSE_INTRO') {
    return <ComposeIntroGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.1.2 Data Driven
  if (activeGame === 'DATA_DRIVEN') {
    return <DataDrivenGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.2.1 Column
  if (activeGame === 'COLUMN_ADVENTURE') {
    return <ColumnAdventureGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.2.2 Row
  if (activeGame === 'ROW_ADVENTURE') {
    return <RowAdventureGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.2.3 Box
  if (activeGame === 'BOX_ADVENTURE') {
    return <BoxAdventureGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.2.4 Shape Clip
  if (activeGame === 'SHAPE_CLIP') {
    return <ShapeClipGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.3.2 Arrangement
  if (activeGame === 'ARRANGEMENT_LAB') {
    return <ArrangementLabGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.3.3 Alignment
  if (activeGame === 'ALIGNMENT_ADVENTURE') {
    return <AlignmentAdventureGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.4.1 Click Magic
  if (activeGame === 'CLICK_MAGIC') {
    return <ClickMagicGame onExit={() => setActiveGame('HOME')} />;
  }

  // 1.4.2 Summary Quiz
  if (activeGame === 'SUMMARY_QUIZ') {
    return <SummaryQuizGame onExit={() => setActiveGame('HOME')} />;
  }

  // Guild Hall
  if (activeGame === 'GUILD_HALL') {
    return <GuildHall onExit={() => setActiveGame('HOME')} />;
  }

  // Final Challenge: Layout Magic
  if (activeGame === 'LAYOUT_MAGIC') {
    return <LayoutMagicGame onExit={() => setActiveGame('HOME')} />;
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center p-4 sm:p-8 font-sans relative">
       {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      {/* Xiao Qi Avatar - Top Left（固定在视口左上角，整体稍微上移） */}
      <div className="fixed top-20 left-6 z-40 scale-75 origin-top-left sm:scale-100">
         <XiaoQi emotion="happy" message="今天想学点什么新魔法呢？" />
      </div>

      {/* 顶部导航 + 标题区（靠近页面顶部） */}
      <div className="w-full max-w-5xl px-4 mt-10 sm:mt-14 mb-8">
        <div className="bg-amber-50/90 backdrop-blur rounded-2xl px-4 sm:px-6 py-3 flex flex-col gap-2">
          {onBackToModule && (
            <div className="flex items-center justify-center text-xs sm:text-sm text-amber-700 font-medium">
              <button
                onClick={onBackToModule}
                className="inline-flex mt-0 items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-200 text-[11px] sm:text-xs font-bold text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition-colors whitespace-nowrap"
              >
                <ArrowRight size={14} className="rotate-180" />
                返回小节列表
              </button>
            </div>
          )}
          <div className="animate-fade-in-down text-center mt-3">
            <h1 className="text-3xl sm:text-3xl font-bold text-amber-800 tracking-tight">
              起司猫的 UI 魔法学院
            </h1>
            <p className="hidden sm:block text-sm text-amber-700 py-4">
              跟随小奇猫咪，通过交互式游戏轻松掌握 Jetpack Compose 的核心奥义！
            </p>
          </div>
        </div>
        </div>

       {/* 主内容区域：紧跟在学院标题与返回按钮下面 */}
       <div className="relative z-10 text-center max-w-7xl w-full">
         <div className="mb-8 sm:mb-12 animate-fade-in-down sm:hidden text-center">
            <h1 className="text-4xl font-bold text-amber-800 mb-3 tracking-tight">
              起司猫的 UI 魔法学院
            </h1>
            <p className="text-base text-amber-700 max-w-xl mx-auto">
              跟随小奇猫咪，通过交互式游戏轻松掌握 Jetpack Compose 的核心奥义！
            </p>
         </div>

         {/* 星辰委托公会：放在学院首页、小游戏按钮上方 */}
         <div className="max-w-3xl mx-auto mb-12">
           <button
             onClick={() => setActiveGame('GUILD_HALL')}
             className="w-full group relative bg-[#0F172A] rounded-2xl p-1 shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ring-4 ring-transparent hover:ring-cyan-200/50"
           >
             <div class="relative bg-[#1E293B]/80 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl p-3 flex items-center justify-between group-hover:bg-[#1E293B]/90 transition-colors group-hover:border-cyan-400/60"><div class="flex items-center gap-3"><div class="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center border-4 border-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map text-white w-8 h-8" aria-hidden="true"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path><path d="M15 5.764v15"></path><path d="M9 3.236v15"></path></svg></div><div class="text-left"><h3 class="text-2xl font-bold text-white flex items-center gap-2">前往：星辰委托公会<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles text-yellow-300 animate-spin-slow" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg></h3>
             <p class="text-cyan-100/80 text-sm font-medium">接取实战悬赏，赚取魔力结晶，提升你的魔法师等级！</p></div></div><div class="hidden sm:block text-cyan-400 group-hover:translate-x-2 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></div></div>
           </button>
         </div>

         

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
           {MAGIC_GAMES.sort((a, b) => a.order - b.order).map((game) => (
             <button
               key={game.id}
               onClick={() => setActiveGame(game.id)}
               className={`group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full ${game.hoverBorderClass}`}
             >
               <div
                 className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0 ${game.accentBgClass}`}
               ></div>
               <div className="relative z-10 flex-1">
                 <div
                   className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:rotate-12 transition-transform ${game.iconBgClass} ${game.iconTextClass}`}
                 >
                   {game.icon}
                 </div>
                 <h3 className="text-lg font-bold text-gray-800 mb-1 transition-colors group-hover:text-inherit">
                   {game.title}
                 </h3>
                 <p className="text-gray-500 text-xs leading-relaxed mb-4">
                   {game.description}
                 </p>
               </div>
               <div
                 className={`relative z-10 flex items-center font-bold text-[10px] uppercase tracking-wider mt-auto ${game.tagTextClass}`}
               >
                 <Sparkles size={12} className="mr-1" /> {game.tag}
               </div>
             </button>
           ))}
         </div>
      </div>
    </div>
  );
}
