
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
import XiaoQi from './games/layout-magic/components/XiaoQi'; 
import { GameId } from './types';
import { LayoutTemplate, Wand2, GraduationCap, Sparkles, Film, Layers, AlignHorizontalSpaceAround, SplitSquareHorizontal, Box, ArrowUpFromLine, MousePointerClick, Scissors, ScrollText } from 'lucide-react';

export default function App() {
  const [activeGame, setActiveGame] = useState<GameId>('HOME');

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

  // Final Challenge: Layout Magic
  if (activeGame === 'LAYOUT_MAGIC') {
    return <LayoutMagicGame onExit={() => setActiveGame('HOME')} />;
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans relative">
       {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      {/* Xiao Qi Avatar - Top Left */}
      <div className="absolute top-6 left-6 z-20 scale-75 origin-top-left sm:scale-100">
         <XiaoQi emotion="happy" message="今天想学点什么新魔法呢？" />
      </div>

      <div className="relative z-10 text-center max-w-7xl w-full mt-12 sm:mt-0">
         <div className="mb-12 animate-fade-in-down">
            <h1 className="text-5xl sm:text-6xl font-bold text-amber-800 mb-4 tracking-tight">
              起司猫的 UI 魔法学院
            </h1>
            <p className="text-xl text-amber-700 max-w-xl mx-auto">
              跟随小奇猫咪，通过交互式游戏轻松掌握 Jetpack Compose 的核心奥义！
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto">
            
            {/* Game Card 1: Intro (1.1.1) */}
            <button 
                onClick={() => setActiveGame('COMPOSE_INTRO')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <Wand2 size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors">1.1.1 魔法入门</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        声明式 vs 命令式，施展 @Composable 咒语。
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-purple-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <Sparkles size={12} className="mr-1" /> 基础概念
                </div>
            </button>

            {/* Game Card 2: Data Driven (1.1.2) */}
            <button 
                onClick={() => setActiveGame('DATA_DRIVEN')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-cyan-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <Film size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-cyan-700 transition-colors">1.1.2 数据驱动</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        化身 UI 放映师，理解 UI = f(State)。
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-cyan-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <Sparkles size={12} className="mr-1" /> 核心思想
                </div>
            </button>

            {/* Game Card 3: Column Adventure (1.2.1) */}
            <button 
                onClick={() => setActiveGame('COLUMN_ADVENTURE')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-green-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">1.2.1 Column 冒险</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        垂直排列的秘密，解决堆叠危机！
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-green-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <GraduationCap size={12} className="mr-1" /> 布局基础
                </div>
            </button>

            {/* Game Card 4: Row Adventure (1.2.2) */}
             <button 
                onClick={() => setActiveGame('ROW_ADVENTURE')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <AlignHorizontalSpaceAround size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-orange-700 transition-colors">1.2.2 Row 露营</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        水平排队的魔法，领小鱼干啦！
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-orange-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <GraduationCap size={12} className="mr-1" /> 布局基础
                </div>
            </button>

             {/* Game Card 5: Box Adventure (1.2.3) */}
             <button 
                onClick={() => setActiveGame('BOX_ADVENTURE')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <Box size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-indigo-700 transition-colors">1.2.3 Box 探险</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        Z轴的堆叠艺术，制作带角标的头像！
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-indigo-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <GraduationCap size={12} className="mr-1" /> 布局基础
                </div>
            </button>

            {/* Game Card 6: Shape & Clip (1.2.4) */}
            <button 
                onClick={() => setActiveGame('SHAPE_CLIP')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-rose-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <Scissors size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-rose-700 transition-colors">1.2.4 形状裁剪</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        拿起魔法剪刀！Clip、Shape 与 Modifier 顺序的奥秘。
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-rose-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <GraduationCap size={12} className="mr-1" /> 布局基础
                </div>
            </button>

             {/* Game Card 7: Arrangement Lab (1.3.2) */}
             <button 
                onClick={() => setActiveGame('ARRANGEMENT_LAB')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-pink-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <SplitSquareHorizontal size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-pink-700 transition-colors">1.3.2 空间魔法</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        Arrangement 实验室，切分剩余空间！
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-pink-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <GraduationCap size={12} className="mr-1" /> 进阶布局
                </div>
            </button>

            {/* Game Card 8: Alignment Adventure (1.3.3) */}
             <button 
                onClick={() => setActiveGame('ALIGNMENT_ADVENTURE')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-teal-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <ArrowUpFromLine size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-teal-700 transition-colors">1.3.3 对齐探险</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        整理玩具箱，掌握 Cross-Axis 交叉轴的奥秘！
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-teal-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <GraduationCap size={12} className="mr-1" /> 进阶布局
                </div>
            </button>

            {/* Game Card 9: Click Magic (1.4.1) */}
            <button 
                onClick={() => setActiveGame('CLICK_MAGIC')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-violet-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <MousePointerClick size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-violet-700 transition-colors">1.4.1 交互魔法</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        让 UI 活起来！掌握 Clickable 顺序与水波纹。
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-violet-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <Sparkles size={12} className="mr-1" /> 交互基础
                </div>
            </button>

            {/* Game Card 10: Summary Quiz (1.4.2) - Parchment Theme */}
            <button 
                onClick={() => setActiveGame('SUMMARY_QUIZ')}
                className="group relative bg-[#f7efe5] rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-amber-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <ScrollText size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-amber-900 mb-1 group-hover:text-amber-700 transition-colors">1.4.2 魔法综合测验</h3>
                    <p className="text-amber-800/80 text-xs leading-relaxed mb-4">
                        学期末的小测验！13道题目，检验你的魔法基础。
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-amber-700 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <GraduationCap size={12} className="mr-1" /> 知识巩固
                </div>
            </button>

            {/* Game Card 11: Layout Magic Book (Final) - Standard White Theme */}
            <button 
                onClick={() => setActiveGame('LAYOUT_MAGIC')}
                className="group relative bg-white rounded-[2rem] p-6 shadow-xl border-4 border-white hover:border-amber-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4 shadow-sm group-hover:rotate-12 transition-transform">
                        <LayoutTemplate size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-amber-700 transition-colors">布局魔法书</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        实战演练，挑战复杂布局。Row, Column, Arrangement, Alignment 的终极考核！
                    </p>
                </div>
                <div className="relative z-10 flex items-center text-amber-600 font-bold text-[10px] uppercase tracking-wider mt-auto">
                    <Sparkles size={12} className="mr-1" /> 终极挑战
                </div>
            </button>

         </div>
      </div>
    </div>
  );
}
