
import React, { useState } from 'react';
import TidyFrame from './components/TidyFrame';
import XiaoQi from './components/XiaoQi';
import { AlignmentStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, CheckCircle, AlertTriangle, Home, Sparkles, Trophy, ArrowUpFromLine, LayoutTemplate, Star, ArrowDown, ArrowUp, MoveVertical, MousePointer2, Zap } from 'lucide-react';

const STAGE_ORDER: AlignmentStage[] = [
  'INTRO',
  'AXIS_CONCEPT',
  'CONTAINER_RULE',
  'INDIVIDUAL_RULE',
  'GOLDEN_RULE',
  'ADVANCED_INTRO',
  'ADVANCED_Q1',
  'ADVANCED_Q2',
  'ADVANCED_Q3',
  'ADVANCED_Q4',
  'ADVANCED_Q5',
  'VICTORY'
];

interface AlignmentAdventureGameProps {
  onExit: () => void;
}

export default function AlignmentAdventureGame({ onExit }: AlignmentAdventureGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Axis Concept State
  const [layoutMode, setLayoutMode] = useState<'Row' | 'Column'>('Row');

  // Rule State
  const [containerAlign, setContainerAlign] = useState<'Top' | 'Center' | 'Bottom'>('Top');
  const [itemAlign, setItemAlign] = useState<'Top' | 'Center' | 'Bottom'>('Top');
  
  // Quiz State
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setQuizSelection(null);
      setQuizCorrect(false);
      // Reset demo states
      setContainerAlign('Top');
      setItemAlign('Top');
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };
  
  const resetGame = () => {
      setCurrentStageIndex(0);
      setLayoutMode('Row');
      setContainerAlign('Top');
      setItemAlign('Top');
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  // Helper for colorful blocks
  const ToyBlock = ({ color, label, active = false, style = {} }: { color: string, label: string, active?: boolean, style?: React.CSSProperties }) => (
      <div 
        className={`w-16 h-16 rounded-xl border-4 flex items-center justify-center text-white font-bold shadow-sm transition-all duration-500 ${active ? 'ring-4 ring-offset-2 ring-emerald-400 transform scale-110 z-10' : ''}`}
        style={{ backgroundColor: color, borderColor: 'rgba(0,0,0,0.1)', ...style }}
      >
          {label}
          {active && <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">Me</div>}
      </div>
  );

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-4 animate-bounce-slow shadow-lg border-4 border-emerald-200">
                <ArrowUpFromLine size={64} className="text-emerald-500" />
            </div>
            <h2 className="text-4xl font-bold text-emerald-800 mb-4 tracking-tight">交叉轴对齐 (Cross-Axis)</h2>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              欢迎来到布局整理课！<br/>
              我们已经学会了“排队”（主轴 Arrangement），<br/>
              现在要学习如何让队伍里的每个成员“<b>坐端正</b>”（交叉轴 Alignment）。
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-emerald-500 text-white rounded-full text-xl font-bold shadow-lg hover:bg-emerald-600 hover:scale-105 transition-all flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 开始整理
            </button>
            <XiaoQi emotion="excited" message="无论是 Row 还是 Column，只要搞定交叉轴，界面就瞬间整洁了！" />
          </div>
        );

      case 'AXIS_CONCEPT':
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">“交叉轴”到底在哪边？</h2>
                    <p className="text-slate-500">记住：交叉轴永远和主轴（队伍行进方向）垂直。</p>
                </div>

                <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border-2 border-emerald-50">
                    <div className="flex gap-4 bg-slate-100 p-1 rounded-xl">
                        <button onClick={() => setLayoutMode('Row')} className={`px-6 py-2 rounded-lg font-bold transition-all ${layoutMode === 'Row' ? 'bg-white text-emerald-600 shadow' : 'text-slate-400'}`}>Row (横向)</button>
                        <button onClick={() => setLayoutMode('Column')} className={`px-6 py-2 rounded-lg font-bold transition-all ${layoutMode === 'Column' ? 'bg-white text-emerald-600 shadow' : 'text-slate-400'}`}>Column (纵向)</button>
                    </div>

                    <div className="relative w-64 h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                        {/* Main Axis Arrow */}
                        <div className={`absolute flex items-center justify-center transition-all duration-500 ${layoutMode === 'Row' ? 'w-full h-2 top-1/2 -translate-y-1/2' : 'h-full w-2 left-1/2 -translate-x-1/2'}`}>
                            <div className={`w-full h-full bg-slate-200 rounded-full flex items-center justify-center`}>
                                <span className="text-slate-400 font-bold text-xs bg-slate-50 px-1">Main Axis</span>
                            </div>
                        </div>

                        {/* Cross Axis Arrow - Highlighted */}
                        <div className={`absolute flex items-center justify-center transition-all duration-500 z-10 ${layoutMode === 'Row' ? 'h-full w-1 left-1/2 -translate-x-1/2' : 'w-full h-1 top-1/2 -translate-y-1/2'}`}>
                             <div className={`w-full h-full bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.6)]`}></div>
                             {/* Arrow heads */}
                             <div className={`absolute w-3 h-3 border-t-4 border-l-4 border-emerald-400 ${layoutMode === 'Row' ? '-top-1 rotate-45' : '-left-1 -rotate-45'}`}></div>
                             <div className={`absolute w-3 h-3 border-b-4 border-r-4 border-emerald-400 ${layoutMode === 'Row' ? '-bottom-1 rotate-45' : '-right-1 -rotate-45'}`}></div>
                             
                             <div className={`absolute bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap ${layoutMode === 'Row' ? 'top-1/4 -right-24' : '-top-8 left-1/4'}`}>
                                 Cross Axis ({layoutMode === 'Row' ? 'Vertical' : 'Horizontal'})
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="smart" message={layoutMode === 'Row' ? "Row 是横着排的，所以它的交叉轴是竖直方向 (Y轴)！" : "Column 是竖着排的，所以它的交叉轴是水平方向 (X轴)！"} />
                </div>
            </div>
        );

      case 'CONTAINER_RULE':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">工具一：给整个“玩具箱”定规矩</h2>
                    <p className="text-slate-500">我们可以在容器上设置一个默认的对齐方式，让大家都遵守。</p>
                </div>

                <div className="flex flex-col items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-50">
                    <div className="bg-slate-800 p-3 rounded-lg font-mono text-sm text-slate-300 w-full max-w-md text-center">
                        Row(<span className="text-emerald-400">verticalAlignment</span> = Alignment.{containerAlign})
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2">
                        {['Top', 'Center', 'Bottom'].map((align) => (
                            <button
                                key={align}
                                onClick={() => setContainerAlign(align as any)}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${containerAlign === align ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            >
                                {align}
                            </button>
                        ))}
                    </div>

                    {/* Visualizer */}
                    <div className="w-full h-48 bg-slate-100 rounded-2xl border-4 border-slate-200 flex flex-row gap-4 px-4 transition-all duration-500"
                         style={{ alignItems: containerAlign === 'Top' ? 'flex-start' : containerAlign === 'Center' ? 'center' : 'flex-end' }}
                    >
                        <ToyBlock color="#FCA5A5" label="A" />
                        <ToyBlock color="#93C5FD" label="B" />
                        <ToyBlock color="#FDE047" label="C" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="happy" message="这就是整体对齐！所有孩子都会听从容器的号令。" />
                </div>
            </div>
        );

      case 'INDIVIDUAL_RULE':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">工具二：给“特别的”玩具一个指令</h2>
                    <p className="text-slate-500">如果有个玩具有个性，可以使用 <code className="bg-emerald-100 px-1 rounded text-emerald-700 font-mono">Modifier.align</code> 给它开小灶。</p>
                </div>

                <div className="flex flex-col items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-50">
                    <div className="bg-slate-800 p-3 rounded-lg font-mono text-sm text-slate-300 w-full max-w-md text-center">
                        // 蓝色方块的代码<br/>
                        Box(modifier = Modifier.<span className="text-yellow-400">align</span>(Alignment.{itemAlign}))
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2">
                        {['Top', 'Center', 'Bottom'].map((align) => (
                            <button
                                key={align}
                                onClick={() => setItemAlign(align as any)}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${itemAlign === align ? 'bg-yellow-400 text-yellow-900 shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            >
                                {align}
                            </button>
                        ))}
                    </div>

                    {/* Visualizer - Main align is Center, Item align varies */}
                    <div className="w-full h-48 bg-slate-100 rounded-2xl border-4 border-slate-200 flex flex-row gap-4 px-4 items-center relative">
                        {/* Reference Line for Center */}
                        <div className="absolute w-full h-[1px] bg-slate-300 top-1/2 -translate-y-1/2 z-0"></div>
                        
                        <ToyBlock color="#FCA5A5" label="A" />
                        
                        {/* The Rebel Block */}
                        <div className="h-full flex" style={{ alignItems: itemAlign === 'Top' ? 'flex-start' : itemAlign === 'Center' ? 'center' : 'flex-end' }}>
                             <ToyBlock color="#93C5FD" label="B" active={true} />
                        </div>
                        
                        <ToyBlock color="#FDE047" label="C" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="excited" message="看！虽然容器说要‘垂直居中’，但蓝色方块还是可以自己跑到上面或下面去！" />
                </div>
            </div>
        );

      case 'GOLDEN_RULE':
        return (
            <div className="space-y-8 animate-scale-in">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">记住这条黄金法则！</h2>
                </div>

                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-3xl shadow-lg border-4 border-white max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
                    <div className="flex items-center gap-4 text-amber-800 text-xl sm:text-2xl font-bold">
                        <span>子元素的 Modifier</span>
                        <ArrowRight size={32} className="text-amber-600" />
                        <span>父容器的默认设置</span>
                    </div>
                    
                    <div className="text-6xl font-black text-amber-500 opacity-20 absolute pointer-events-none">PRIORITY</div>

                    <div className="bg-white/60 p-6 rounded-xl text-amber-900 leading-relaxed font-medium text-lg">
                        “我的地盘我做主！”<br/>
                        个体的 <b>align</b> 指令优先级总是 <b>大于</b> 整体的 <b>Alignment</b> 设置。
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="smart" message="这就像虽然全班都要穿校服，但老师允许你戴一顶特别的帽子！" />
                </div>
            </div>
        );

      case 'ADVANCED_INTRO':
          return (
              <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-12">
                  <div className="relative group cursor-pointer" onClick={nextStage}>
                      <div className="absolute inset-0 bg-emerald-300 rounded-full blur-3xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity"></div>
                      <div className="w-40 h-40 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center border-4 border-white shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                          <Sparkles size={80} className="text-yellow-400 animate-spin-slow drop-shadow-md" />
                      </div>
                  </div>

                  <div className="space-y-4 max-w-md">
                      <h2 className="text-3xl font-bold text-slate-800">进阶试炼：概念辨析</h2>
                      <p className="text-slate-600 text-lg">
                          你已经学会了如何操作。<br/>
                          现在，让我们通过几个刁钻的问题，<br/>
                          彻底理清 <b>Alignment</b> 和 <b>Arrangement</b> 的关系。
                      </p>
                  </div>

                  <button 
                    onClick={nextStage}
                    className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                  >
                      <Zap size={24} /> 挑战开始
                  </button>
              </div>
          );

      // --- QUIZZES ---

      case 'ADVANCED_Q1':
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 1/5</div>
                    <h2 className="text-2xl font-bold text-slate-800">Row 的垂直对齐</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        在 `Row` 布局中，你希望将一行<b>高低不同</b>的元素在<b>垂直方向上底部对齐</b>。
                        你应该设置哪个属性？
                    </p>
                </div>

                {/* Visual Hint */}
                <div className="flex justify-center h-32 items-end gap-2 bg-slate-100 rounded-lg border-b-4 border-emerald-400 p-4">
                    <div className="w-8 h-16 bg-slate-300 rounded-t"></div>
                    <div className="w-8 h-24 bg-slate-300 rounded-t"></div>
                    <div className="w-8 h-12 bg-slate-300 rounded-t"></div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. horizontalArrangement', correct: false },
                         { id: 'B', label: 'B. verticalAlignment', correct: true },
                         { id: 'C', label: 'C. verticalArrangement', correct: false },
                         { id: 'D', label: 'D. horizontalAlignment', correct: false }
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
                             { id: 'A', feedback: "horizontalArrangement 控制的是水平方向（主轴）的分布，比如靠左、居中、散开。" },
                             { id: 'B', feedback: "回答正确！Row 是横着排的，垂直方向是它的交叉轴。Alignment 属性专门负责控制交叉轴上的对齐。" },
                             { id: 'C', feedback: "Row 没有 verticalArrangement 属性。垂直方向对它是交叉轴，用 Alignment。" },
                             { id: 'D', feedback: "Row 的水平方向是主轴，不叫 Alignment。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
        );

      case 'ADVANCED_Q2':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 2/5</div>
                    <h2 className="text-2xl font-bold text-slate-800">Arrangement vs Alignment</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        理解命名逻辑至关重要。以下哪个描述最准确地解释了两者之间的区别？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. Arrangement 是 Row 专用，Alignment 是 Column 专用。', correct: false },
                         { id: 'B', label: 'B. Arrangement 控制主轴分布，Alignment 控制交叉轴位置。', correct: true },
                         { id: 'C', label: 'C. Arrangement 用于设置边距，Alignment 用于设置内边距。', correct: false },
                         { id: 'D', label: 'D. Arrangement 用于水平方向，Alignment 用于垂直方向。', correct: false }
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
                             { id: 'A', feedback: "不对，Row 和 Column 都有这两个属性。" },
                             { id: 'B', feedback: "回答正确！这准确概括了核心区别：Arrangement 关心“之间”（主轴分布），Alignment 关心“整体在哪”（交叉轴位置）。" },
                             { id: 'C', feedback: "边距和内边距是 Padding 的事。" },
                             { id: 'D', feedback: "这取决于容器是 Row 还是 Column。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q3':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 3/5</div>
                    <h2 className="text-2xl font-bold text-slate-800">代码侦探</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        如果你看到代码中使用了 <code className="bg-slate-100 px-1 rounded font-mono text-slate-700">verticalArrangement</code> 属性来让元素之间均匀隔开，
                        那么这段代码最可能是在配置哪个容器？
                    </p>
                </div>

                 <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 任何容器都可以', correct: false },
                         { id: 'B', label: 'B. Box', correct: false },
                         { id: 'C', label: 'C. Row', correct: false },
                         { id: 'D', label: 'D. Column', correct: true }
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
                             { id: 'A', feedback: "每个容器的属性名是特定的。" },
                             { id: 'B', feedback: "Box 没有 Arrangement 属性。" },
                             { id: 'C', feedback: "不太对。Row 的主轴是水平方向，所以它用的是 horizontalArrangement。" },
                             { id: 'D', feedback: "正确答案！Arrangement 作用于主轴。Column 的主轴是垂直方向，因此使用 verticalArrangement。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q4':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 4/5</div>
                    <h2 className="text-2xl font-bold text-slate-800">为什么要这么麻烦？</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        Flexbox（Row/Column的底层逻辑）引入“主轴”和“交叉轴”这一相对坐标系，其根本目的是什么？
                    </p>
                </div>

                 <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 为了让 Row 和 Column 能够复用同一套对齐与排列逻辑。', correct: true },
                         { id: 'B', label: 'B. 为了让布局在水平和垂直方向上看起来完全一样。', correct: false },
                         { id: 'C', label: 'C. 为了完全取代传统的 X/Y 绝对坐标系。', correct: false },
                         { id: 'D', label: 'D. 为了简化对单个元素的精确像素级定位。', correct: false }
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
                             { id: 'A', feedback: "回答正确！通过抽象出“主轴”和“交叉轴”，无论是横向排列还是纵向排列，都可以使用同一套概念（如“居中”、“两端对齐”）来控制，大大提高了逻辑复用性。" },
                             { id: 'B', feedback: "Row 和 Column 本来就是方向不同的，目的不是为了让它们看起来一样。" },
                             { id: 'C', feedback: "Box 仍然使用类似 X/Y 的逻辑，并没有完全被取代。" },
                             { id: 'D', feedback: "精确像素定位是 Box + Offset 的事，Flexbox 更多是处理相对关系。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q5':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 5/5</div>
                    <h2 className="text-2xl font-bold text-slate-800">Column 的右对齐</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        在一个 <code className="bg-slate-100 px-1 rounded font-mono text-slate-700">Column</code> 内部，
                        设置 <code className="bg-slate-100 px-1 rounded font-mono text-slate-700">horizontalAlignment = Alignment.End</code> 会产生什么效果？
                    </p>
                </div>

                 <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. Column 容器本身会在父容器中靠右对齐。', correct: false },
                         { id: 'B', label: 'B. 所有子元素都会在垂直方向上底部对齐。', correct: false },
                         { id: 'C', label: 'C. 所有子元素都会在水平方向上靠右对齐。', correct: true },
                         { id: 'D', label: 'D. 子元素之间会在水平方向上产生间距。', correct: false }
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
                             { id: 'A', feedback: "不对，这只会影响 Column 内部的孩子，不会影响 Column 自己。" },
                             { id: 'B', feedback: "垂直方向是 Column 的主轴，不归 Alignment 管。" },
                             { id: 'C', feedback: "回答正确！对于 Column，水平方向是其交叉轴。horizontalAlignment 负责控制子元素在交叉轴上的位置，End 在水平方向上通常对应右侧。" },
                             { id: 'D', feedback: "间距是 Arrangement 的工作。" }
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
                        <Star className="text-yellow-200 w-12 h-12 fill-current" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-emerald-800">布局收纳大师！</h2>
                <p className="text-xl text-slate-600 max-w-lg">
                    你已经彻底掌握了 <b>交叉轴对齐</b> 的秘密！<br/>
                    现在的你，能让界面像阅兵式一样整齐划一，<br/>
                    也能让特立独行的元素自由定位。
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-white border-2 border-emerald-200 text-emerald-600 rounded-full font-bold hover:bg-emerald-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 再整理一次
                    </button>
                     <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="太棒了！我觉得你可以去挑战更复杂的界面了！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <TidyFrame 
        title="1.3.3 对齐探险" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && currentStage !== 'ADVANCED_INTRO' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-emerald-100">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一步
                </button>

                {/* Logic Gates */}
                {currentStage.includes('Q') && !quizCorrect ? (
                     <span className="text-emerald-500 font-bold text-sm">答对挑战后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一步 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </TidyFrame>
  );
}
