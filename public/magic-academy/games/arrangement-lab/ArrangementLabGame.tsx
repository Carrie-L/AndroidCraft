
import React, { useState } from 'react';
import LabFrame from './components/LabFrame';
import XiaoQi from './components/XiaoQi';
import { ArrangementStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, Fish, Scissors, MoveHorizontal, CheckCircle, AlertTriangle, Home, Sparkles, Trophy, SplitSquareHorizontal, Lock, Star } from 'lucide-react';

const STAGE_ORDER: ArrangementStage[] = [
  'INTRO',
  'SURPLUS_SPACE',
  'MOVE_MAGIC',
  'CUT_MAGIC',
  'PITFALL',
  'BOTTOM_BAR_QUIZ',
  'WRAP_QUIZ',
  'ADVANCED_INTRO',
  'ADVANCED_CHALLENGE_1',
  'ADVANCED_CHALLENGE_2',
  'ADVANCED_CHALLENGE_3',
  'VICTORY'
];

interface ArrangementLabGameProps {
  onExit: () => void;
}

// Fish Component for visuals - Updated colors to be more pastel
const FishSnack = ({ label = "" }) => (
    <div className="w-14 h-10 bg-[#FFD166] rounded-full border-2 border-[#F4A261] flex items-center justify-center text-[10px] font-bold text-[#9E5912] shadow-sm relative">
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFD166] border-2 border-[#F4A261] rounded-full clip-path-triangle transform rotate-45"></div>
        <Fish size={14} className="mr-1 opacity-50"/> {label}
    </div>
);

export default function ArrangementLabGame({ onExit }: ArrangementLabGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Stage States
  const [moveMode, setMoveMode] = useState<'Start' | 'Center' | 'End'>('Start');
  const [cutMode, setCutMode] = useState<'SpaceBetween' | 'SpaceAround' | 'SpaceEvenly'>('SpaceBetween');
  const [wrapPitfall, setWrapPitfall] = useState<'wrap' | 'fill'>('wrap');
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setQuizSelection(null);
      setQuizCorrect(false);
      setWrapPitfall('wrap'); // Reset pitfall for next time
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };
  
  const resetGame = () => {
      setCurrentStageIndex(0);
      setMoveMode('Start');
      setCutMode('SpaceBetween');
      setWrapPitfall('wrap');
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  // --- Helper Components ---
  
  const ArrangementContainer = ({ children, mode, style = {} }: { children: React.ReactNode, mode: string, style?: React.CSSProperties }) => {
      let justifyClass = 'justify-start';
      if (mode === 'Start') justifyClass = 'justify-start';
      if (mode === 'Center') justifyClass = 'justify-center';
      if (mode === 'End') justifyClass = 'justify-end';
      if (mode === 'SpaceBetween') justifyClass = 'justify-between';
      if (mode === 'SpaceAround') justifyClass = 'justify-around';
      if (mode === 'SpaceEvenly') justifyClass = 'justify-evenly';

      return (
          <div className={`w-full h-24 bg-white border-4 border-slate-200 rounded-xl flex items-center px-1 relative ${justifyClass}`} style={style}>
               {/* Background Grid for visualization */}
               <div className="absolute inset-0 bg-[linear-gradient(90deg,#f0f0f0_1px,transparent_1px)] [background-size:20px_100%] z-0 pointer-events-none"></div>
               <div className="relative z-10 flex w-full h-full items-center px-0.5" style={{ justifyContent: mode === 'Start' ? 'flex-start' : mode === 'Center' ? 'center' : mode === 'End' ? 'flex-end' : mode === 'SpaceBetween' ? 'space-between' : mode === 'SpaceAround' ? 'space-around' : 'space-evenly' }}>
                   {children}
               </div>
          </div>
      )
  };

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-4 animate-bounce-slow shadow-lg border-4 border-pink-200">
                {/* Changed Icon color to Light Green (Mint) */}
                <SplitSquareHorizontal size={64} className="text-emerald-400" />
            </div>
            <h2 className="text-4xl font-bold text-pink-800 mb-4 tracking-tight">空间魔法：Arrangement</h2>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Row 和 Column 里的“剩余空间”如果不处理，就是一种浪费！<br/>
              今天，我们要学习如何用 <b>Arrangement</b> 咒语，<br/>
              把这些空白变得整齐又漂亮。
            </p>
            {/* Macaron Button: Light Green */}
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-emerald-400 text-white rounded-full text-xl font-bold shadow-[0_4px_15px_rgba(52,211,153,0.4)] hover:bg-emerald-500 hover:scale-105 transition-all flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 进入实验室
            </button>
            <XiaoQi emotion="excited" message="听说有六种空间魔法，我们一个一个来试！" />
          </div>
        );

      case 'SURPLUS_SPACE':
        return (
             <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">小奇的数学题：“剩余空间”从哪来？</h2>
                    <p className="text-slate-500">Arrangement 的任务，就是决定如何处理这些多出来的空白。</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    {/* Screen Width Visual */}
                    <div className="w-full max-w-lg relative">
                        <div className="text-center font-mono text-xs text-slate-400 mb-1">屏幕宽度: 600px (假设)</div>
                        <div className="w-full h-24 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center p-1 relative overflow-hidden">
                             {/* Items */}
                             <div className="flex gap-0.5 z-10">
                                <FishSnack label="100px" />
                                <FishSnack label="100px" />
                                <FishSnack label="100px" />
                             </div>
                             
                             {/* Surplus Indicator */}
                             <div className="flex-1 h-full bg-red-100/50 border-l-2 border-red-300 border-dashed flex items-center justify-center relative">
                                 <span className="text-red-500 font-bold text-sm animate-pulse">剩余空间: 300px</span>
                                 <ArrowRight className="absolute left-2 text-red-300" size={16} />
                             </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-md border border-pink-100">
                        <p className="text-lg font-bold text-pink-700 mb-2">算一算</p>
                        <div className="font-mono text-slate-600 bg-pink-50 p-3 rounded-lg">
                            600px (容器) - 300px (小鱼干) = <span className="text-emerald-500 font-bold">300px (剩余)</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-4">
                            这 300px 的空白，是把它扔到一边？还是切碎了塞进缝隙里？<br/>这就是 <b>Arrangement</b> 要做的事！
                        </p>
                    </div>
                </div>
                
                <div className="flex justify-center">
                     <XiaoQi emotion="smart" message="如果没有这‘剩余空间’，Arrangement 魔法可是会失效的哦！" />
                </div>
             </div>
        );

      case 'MOVE_MAGIC':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">第一类魔法：整体移动</h2>
                    <p className="text-slate-500">像搬箱子一样，把所有元素看作一个整体来移动位置。</p>
                </div>

                <div className="flex flex-col items-center gap-8 bg-white p-8 rounded-3xl shadow-sm border-2 border-pink-50">
                    
                    {/* Controls - Interactive Green */}
                    <div className="flex gap-4 bg-slate-100 p-1 rounded-xl">
                        {['Start', 'Center', 'End'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMoveMode(m as any)}
                                className={`px-6 py-2 rounded-lg font-bold transition-all ${moveMode === m ? 'bg-white shadow text-emerald-500 border border-emerald-100' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* Visualizer */}
                    <div className="w-full max-w-lg">
                        <div className={`w-full h-32 bg-blue-50 border-4 border-blue-100 rounded-2xl flex items-center px-4 relative transition-all duration-500 ${
                            moveMode === 'Start' ? 'justify-start' : moveMode === 'Center' ? 'justify-center' : 'justify-end'
                        }`}>
                            {/* The "Box" visualizing the group */}
                            <div className="flex gap-1 border-2 border-dashed border-blue-400 p-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-500">
                                <FishSnack />
                                <FishSnack />
                                <FishSnack />
                            </div>

                            {/* Arrows indicating force */}
                            {moveMode === 'Center' && (
                                <>
                                    <div className="absolute left-4 text-blue-300"><MoveHorizontal /></div>
                                    <div className="absolute right-4 text-blue-300"><MoveHorizontal /></div>
                                </>
                            )}
                        </div>
                        <div className="mt-4 text-center font-mono text-sm text-emerald-600 bg-emerald-50 py-2 rounded-lg border border-emerald-100">
                            horizontalArrangement = Arrangement.<span className="font-bold">{moveMode}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                     <XiaoQi emotion="happy" message="默认就是 Start (挤在起点)。Center 是挤在中间，End 是挤在终点。" />
                </div>
            </div>
        );

      case 'CUT_MAGIC':
         return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">第二类魔法：切分空白</h2>
                    <p className="text-slate-500">高手进阶！把空白区域切成几份，塞到元素之间。</p>
                </div>

                <div className="flex flex-col items-center gap-8 bg-white p-8 rounded-3xl shadow-sm border-2 border-pink-50">
                    
                    {/* Controls - Interactive Green */}
                    <div className="flex flex-wrap justify-center gap-2 bg-slate-100 p-1 rounded-xl">
                        {['SpaceBetween', 'SpaceAround', 'SpaceEvenly'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setCutMode(m as any)}
                                className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${cutMode === m ? 'bg-white shadow text-emerald-500 border border-emerald-100' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* Visualizer */}
                    <div className="w-full max-w-lg">
                        <div className="w-full h-32 bg-pink-50 border-4 border-pink-100 rounded-2xl flex items-center relative px-0.5">
                            {/* We manually implement flex justification to match logic visual */}
                             <div className="w-full flex h-full items-center" style={{ justifyContent: cutMode === 'SpaceBetween' ? 'space-between' : cutMode === 'SpaceAround' ? 'space-around' : 'space-evenly' }}>
                                <FishSnack />
                                <FishSnack />
                                <FishSnack />
                             </div>

                            {/* Visual Guides for Gaps - Mint Green for Guides */}
                            <div className="absolute bottom-2 w-full px-0.5 flex text-[10px] text-emerald-500 font-mono opacity-70" style={{ justifyContent: cutMode === 'SpaceBetween' ? 'space-between' : cutMode === 'SpaceAround' ? 'space-around' : 'space-evenly' }}>
                                {cutMode === 'SpaceBetween' && (
                                    <>
                                        <div className="w-14 text-center opacity-0">Fish</div>
                                        <div className="flex-1 text-center border-b border-emerald-300">1/2 空白</div>
                                        <div className="w-14 text-center opacity-0">Fish</div>
                                        <div className="flex-1 text-center border-b border-emerald-300">1/2 空白</div>
                                        <div className="w-14 text-center opacity-0">Fish</div>
                                    </>
                                )}
                                {cutMode === 'SpaceEvenly' && (
                                    <>
                                        <div className="flex-1 text-center border-b border-emerald-300">X</div>
                                        <div className="w-14 opacity-0"></div>
                                        <div className="flex-1 text-center border-b border-emerald-300">X</div>
                                        <div className="w-14 opacity-0"></div>
                                        <div className="flex-1 text-center border-b border-emerald-300">X</div>
                                        <div className="w-14 opacity-0"></div>
                                        <div className="flex-1 text-center border-b border-emerald-300">X</div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 text-center font-mono text-sm text-emerald-600 bg-emerald-50 py-2 rounded-lg border border-emerald-100">
                            horizontalArrangement = Arrangement.<span className="font-bold">{cutMode}</span>
                        </div>

                        {/* Explanation Text */}
                        <div className="mt-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl">
                            {cutMode === 'SpaceBetween' && "两端对齐：第一个和最后一个紧贴墙壁，中间平分。"}
                            {cutMode === 'SpaceAround' && "环绕均分：中间间距 = 2倍的两头间距。"}
                            {cutMode === 'SpaceEvenly' && "完全均分：所有缝隙（包括两头）完全相等。强迫症福音！"}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                     <XiaoQi emotion="smart" message="拿剪刀把空白切开！这就是 Space 系列魔法的原理。" />
                </div>
            </div>
        );
    
      case 'PITFALL':
         return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">新手坑：魔法失效了？</h2>
                    <p className="text-slate-500">你设置了 `Arrangement.End`，但小鱼干纹丝不动。为什么？</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* The Problem */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-red-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-red-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">错误写法</div>
                        
                        <div className="font-mono text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded">
                            Row(<br/>
                            &nbsp;&nbsp;modifier = Modifier.<span className="text-red-500 font-bold bg-red-50 px-1">wrapContentWidth()</span>,<br/>
                            &nbsp;&nbsp;horizontalArrangement = Arrangement.End<br/>
                            )
                        </div>

                        {/* Visual - Wrap */}
                        <div className="w-full bg-slate-100 h-24 rounded-lg flex items-center justify-center relative border-2 border-dashed border-slate-300">
                             <div className="bg-white border-2 border-red-300 p-1 flex gap-1 rounded shadow-sm">
                                <FishSnack />
                                <FishSnack />
                                <FishSnack />
                             </div>
                             <div className="absolute bottom-1 text-[10px] text-red-500 font-bold">剩余空间 = 0</div>
                        </div>
                    </div>

                    {/* The Solution */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-emerald-100 relative overflow-hidden">
                         <div className="absolute top-0 right-0 bg-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">正确写法</div>

                        <div className="font-mono text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded">
                            Row(<br/>
                            &nbsp;&nbsp;modifier = Modifier.<span className="text-emerald-600 font-bold bg-emerald-50 px-1">fillMaxWidth()</span>,<br/>
                            &nbsp;&nbsp;horizontalArrangement = Arrangement.End<br/>
                            )
                        </div>

                         {/* Visual - Fill */}
                        <div className="w-full bg-blue-50 h-24 rounded-lg flex items-center justify-end px-2 relative border-2 border-blue-200">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 text-xs font-bold">剩余空间 &gt; 0</div>
                             <div className="flex gap-1">
                                <FishSnack />
                                <FishSnack />
                                <FishSnack />
                             </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center">
                     <XiaoQi emotion="confused" message="如果容器紧紧包裹着内容（Wrap），就没有多余的地方可以分配了。记得要撑开容器（Fill）！" />
                </div>
            </div>
        );

      case 'BOTTOM_BAR_QUIZ':
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">挑战 1：底部导航栏布局</h2>
                    <p className="text-slate-500">
                        你要做一个 App 的底部栏。三个图标均匀分布，<br/>
                        但为了美观，不希望图标紧贴着屏幕边缘。你会选哪个？
                    </p>
                </div>

                <div className="w-full h-24 bg-white border-t border-slate-200 shadow-sm rounded-b-3xl rounded-t-none flex items-end pb-2 justify-center relative overflow-hidden">
                    <div className="w-full absolute top-0 h-[1px] bg-slate-100"></div>
                    {/* Improved Contrast: Darker background for the bar area */}
                    <div className="absolute bottom-0 w-full h-16 bg-slate-100 border-t border-slate-300 z-0"></div>
                    
                    <div className="flex w-full text-slate-600 px-4 relative z-10 mb-2">
                        {quizSelection === 'SpaceAround' ? (
                            <div className="w-full flex justify-around animate-fade-in">
                                <Home size={24} className="text-emerald-500" /> {/* Green Icon */}
                                <div className="w-6 h-6 rounded-full border-2 border-slate-400"></div>
                                <div className="w-6 h-6 rounded-full bg-slate-400"></div>
                            </div>
                        ) : (
                             <div className="w-full flex justify-between px-8 opacity-40">
                                <div className="w-6 h-6 bg-slate-400 rounded"></div>
                                <div className="w-6 h-6 bg-slate-400 rounded"></div>
                                <div className="w-6 h-6 bg-slate-400 rounded"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                     {[
                         { id: 'SpaceBetween', label: 'A. SpaceBetween (两端对齐)', correct: false },
                         { id: 'SpaceAround', label: 'B. SpaceAround (环绕均分)', correct: true },
                         { id: 'Center', label: 'C. Center (居中)', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-emerald-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>

                {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                            {quizCorrect 
                                ? "正解！SpaceAround 会在两头留出一半的间距，视觉上更透气，是导航栏的经典做法。"
                                : "不太好哦。SpaceBetween 会让图标贴在屏幕边缘，容易误触；Center 会挤在中间，两边太空。"}
                        </p>
                    </div>
                )}
            </div>
        );

        case 'WRAP_QUIZ':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">挑战 2：代码推断</h2>
                    <p className="text-slate-500">
                        你在 Row 中使用了 `Arrangement.End`，但元素依然在左边。<br/>
                        最可能的原因是什么？
                    </p>
                </div>

                 <div className="bg-slate-800 p-4 rounded-xl font-mono text-sm text-slate-300">
                    Row(<br/>
                    &nbsp;&nbsp;<span className="text-red-400">horizontalArrangement = Arrangement.End</span><br/>
                    ) {'{'} ... {'}'}
                </div>

                 <div className="grid grid-cols-1 gap-4">
                     {[
                         { id: 'A', label: 'A. 你的屏幕坏了', correct: false },
                         { id: 'B', label: 'B. Row 的宽度是 wrapContent，没有“剩余空间”', correct: true },
                         { id: 'C', label: 'C. Arrangement.End 只能用于 Column', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-emerald-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>

                {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "屏幕通常是不会坏的！相信你自己。" },
                             { id: 'B', feedback: "正解！如果容器紧包内容，就没有多余空间可以用来分配，Arrangement 自然就失效了。" },
                             { id: 'C', feedback: "不对哦。Row 也有 End，表示水平方向的末尾。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      // --- ADVANCED INTRO ---
      case 'ADVANCED_INTRO':
          return (
              <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-12">
                  <div className="relative group cursor-pointer" onClick={nextStage}>
                      <div className="absolute inset-0 bg-emerald-300 rounded-full blur-3xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity"></div>
                      {/* Gradient Circle: Pink to Mint */}
                      <div className="w-40 h-40 bg-gradient-to-br from-pink-100 to-emerald-200 rounded-full flex items-center justify-center border-4 border-white shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                          <Lock size={64} className="text-emerald-600 group-hover:hidden transition-all" />
                          <Sparkles size={80} className="text-yellow-400 hidden group-hover:block animate-spin-slow drop-shadow-md" />
                      </div>
                      <div className="absolute -top-4 -right-4 animate-bounce">
                          <Star className="fill-yellow-400 text-yellow-500 w-12 h-12 drop-shadow-md" />
                      </div>
                  </div>

                  <div className="space-y-4 max-w-md">
                      <h2 className="text-3xl font-bold text-slate-800">发现隐藏关卡！</h2>
                      <p className="text-slate-600 text-lg">
                          你已经掌握了基础的空间魔法。<br/>
                          现在，前方有三个<b>“大魔法师级”</b>的难题在等着你。<br/>
                          准备好接受挑战了吗？
                      </p>
                  </div>

                  <button 
                    onClick={nextStage}
                    className="px-10 py-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                  >
                      <Sparkles size={24} /> 解锁进阶试炼
                  </button>
              </div>
          );

      // --- ADVANCED CHALLENGES ---
      case 'ADVANCED_CHALLENGE_1':
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 1/3</div>
                    <h2 className="text-2xl font-bold text-slate-800">填满整条路</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        在一个占据整个屏幕宽度的 Row 中，你希望将三个图标等距分布，
                        同时<b>第一个图标紧贴左边缘，最后一个图标紧贴右边缘</b>，中间不留任何边距。
                        你应该使用哪种 Arrangement？
                    </p>
                </div>
                
                <div className="w-full h-16 bg-white border border-slate-200 rounded-lg flex items-center px-0.5 shadow-inner">
                     {quizSelection === 'SpaceBetween' ? (
                         <div className="w-full flex justify-between animate-fade-in">
                            <div className="w-8 h-8 bg-emerald-400 rounded-sm"></div>
                            <div className="w-8 h-8 bg-emerald-400 rounded-sm"></div>
                            <div className="w-8 h-8 bg-emerald-400 rounded-sm"></div>
                         </div>
                     ) : (
                         <div className="w-full flex justify-center text-slate-300 text-sm">
                             (预览区域)
                         </div>
                     )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                         { id: 'Start', label: 'A. Arrangement.Start', correct: false },
                         { id: 'SpaceBetween', label: 'B. Arrangement.SpaceBetween', correct: true },
                         { id: 'SpaceAround', label: 'C. Arrangement.SpaceAround', correct: false },
                         { id: 'Center', label: 'D. Arrangement.Center', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-emerald-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'Start', feedback: "Start 会把所有元素都挤在起点（左边），右边会留出大片空白。" },
                             { id: 'SpaceBetween', feedback: "正确！SpaceBetween 确保第一个和最后一个元素紧贴边缘，中间平分。" },
                             { id: 'SpaceAround', feedback: "SpaceAround 会在两头留出空隙，不符合“紧贴边缘”的要求。" },
                             { id: 'Center', feedback: "Center 会把所有元素挤在中间，两头都会留白。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
        );

      case 'ADVANCED_CHALLENGE_2':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 2/3</div>
                    <h2 className="text-2xl font-bold text-slate-800">SpaceAround 的秘密</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        在使用 `Arrangement.SpaceAround` 模式时，
                        <b>两个相邻元素之间的间距</b> 与 <b>第一个元素和容器起点边缘的间距</b> 之间存在什么关系？
                    </p>
                </div>

                <div className="w-full h-24 bg-white border border-slate-200 rounded-lg flex items-center relative overflow-hidden">
                     <div className="w-full flex justify-around items-center relative z-10 px-0.5">
                        <div className="w-10 h-10 bg-emerald-400 rounded-full z-10"></div>
                        <div className="w-10 h-10 bg-emerald-400 rounded-full z-10"></div>
                        <div className="w-10 h-10 bg-emerald-400 rounded-full z-10"></div>
                     </div>
                     {/* Visualization of gaps */}
                     <div className="absolute inset-0 w-full flex justify-around items-center pointer-events-none opacity-50">
                         <div className="w-12 h-4 bg-pink-200 mx-auto"></div> {/* Center gap */}
                         <div className="absolute left-0 w-6 h-4 bg-pink-200"></div> {/* Edge gap */}
                     </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 元素间距是边缘间距的两倍 (2x)', correct: true },
                         { id: 'B', label: 'B. 边缘没有间距 (0)', correct: false },
                         { id: 'C', label: 'C. 元素间距是边缘间距的一半 (0.5x)', correct: false },
                         { id: 'D', label: 'D. 两者相等 (1x)', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-emerald-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "正确！每个元素自带一圈“保护罩”。中间相遇时，两个保护罩叠加，所以间距是两倍。" },
                             { id: 'B', feedback: "边缘没有间距是 SpaceBetween 的特征。" },
                             { id: 'C', feedback: "不对哦，应该是中间比两头大。" },
                             { id: 'D', feedback: "两者相等是 SpaceEvenly 的特征。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_CHALLENGE_3':
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 3/3</div>
                    <h2 className="text-2xl font-bold text-slate-800">强迫症的终极追求</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        如果一个设计需求是在屏幕上均匀放置多个卡片，不仅卡片之间的间距完全相等，
                        而且<b>最上方卡片到屏幕顶部的距离</b>、以及<b>最下方卡片到屏幕底部的距离</b>，
                        也和卡片间的间距<b>完全相等</b>。
                        <br/><span className="text-xs text-gray-400 mt-2 block">(注：题目描述的是垂直方向，原理与水平方向通用)</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'SpaceEvenly', label: 'A. Arrangement.SpaceEvenly', correct: true },
                         { id: 'Center', label: 'B. Arrangement.Center', correct: false },
                         { id: 'SpaceBetween', label: 'C. Arrangement.SpaceBetween', correct: false },
                         { id: 'SpaceAround', label: 'D. Arrangement.SpaceAround', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-emerald-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'SpaceEvenly', feedback: "正确！SpaceEvenly 将所有可用空间分成 N+1 份（N是元素数量），确保所有间隙（包括边缘）都严格相等。" },
                             { id: 'Center', feedback: "Center 只是把元素居中，元素之间没有间距拉伸。" },
                             { id: 'SpaceBetween', feedback: "SpaceBetween 两头没有间距。" },
                             { id: 'SpaceAround', feedback: "SpaceAround 中间间距是两头的两倍，不相等。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
        );

      case 'VICTORY':
        return (
             <div className="flex flex-col items-center text-center space-y-8 animate-scale-in py-10">
                <div className="relative">
                    <Trophy className="w-32 h-32 text-yellow-400 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 animate-spin-slow">
                        <Sparkles className="text-yellow-200 w-12 h-12 fill-current" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-pink-800">空间管理大师！</h2>
                <p className="text-xl text-slate-600 max-w-lg">
                    你已经精通了 <b>Arrangement</b> 的所有奥秘！<br/>
                    从基础的移动，到高级的切分，再到代码避坑。<br/>
                    你的 UI 再也不会乱糟糟了！
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-white border-2 border-emerald-200 text-emerald-600 rounded-full font-bold hover:bg-emerald-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 复习一遍
                    </button>
                     <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-emerald-400 text-white rounded-full font-bold hover:bg-emerald-500 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="太棒了！现在的你，已经是 Compose 布局的高阶魔法师了！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <LabFrame 
        title="1.3.1 Arrangement 实验室" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && currentStage !== 'ADVANCED_INTRO' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-pink-100">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一步
                </button>

                {/* Logic Gates */}
                {currentStage.includes('QUIZ') && !quizCorrect ? (
                     <span className="text-emerald-500 font-bold text-sm">答对挑战后继续...</span>
                ) : currentStage.includes('CHALLENGE') && !quizCorrect ? (
                     <span className="text-emerald-500 font-bold text-sm">挑战成功后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-emerald-500 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一步 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </LabFrame>
  );
}
