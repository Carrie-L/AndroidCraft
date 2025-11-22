
import React, { useState, useEffect } from 'react';
import ShelfFrame from './components/ShelfFrame';
import XiaoQi from './components/XiaoQi';
import { ColumnStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, Layers, Box, CheckCircle, Home, Ruler, BookOpen } from 'lucide-react';

const STAGE_ORDER: ColumnStage[] = [
  'INTRO',
  'STACKING_CHAOS',
  'COLUMN_RESCUE',
  'MECHANICS',
  'NESTING_QUIZ',
  'VICTORY'
];

interface ColumnAdventureGameProps {
  onExit: () => void;
}

export default function ColumnAdventureGame({ onExit }: ColumnAdventureGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Rescue State
  const [isRescued, setIsRescued] = useState(false);

  // Mechanics State
  const [mechanicStep, setMechanicStep] = useState<'IDLE' | 'MEASURE' | 'PLACE'>('IDLE');

  // Quiz State
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setIsRescued(false);
      setMechanicStep('IDLE');
      setQuizSelection(null);
      setQuizCorrect(false);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const resetGame = () => {
      setCurrentStageIndex(0);
      setIsRescued(false);
      setMechanicStep('IDLE');
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  const runMechanics = () => {
      if (mechanicStep !== 'IDLE') return;
      setMechanicStep('MEASURE');
      setTimeout(() => setMechanicStep('PLACE'), 2000);
      setTimeout(() => setMechanicStep('IDLE'), 4000);
  };

  // Pastel Watercolor Palette
  const itemClasses = {
      apple:  "bg-[#FFD1D1]/80 text-[#8B4545] border border-[#FFB3B3] shadow-sm px-4 py-2 rounded-xl font-medium text-lg backdrop-blur-sm",
      banana: "bg-[#FFF4C1]/80 text-[#8B7E45] border border-[#FFE88A] shadow-sm px-4 py-2 rounded-xl font-medium text-lg backdrop-blur-sm",
      pear:   "bg-[#D8EAD3]/80 text-[#5C7A58] border border-[#C5E0BD] shadow-sm px-4 py-2 rounded-xl font-medium text-lg backdrop-blur-sm"
  };

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            {/* Decorative Book Icon */}
            <div className="relative">
                <div className="absolute inset-0 bg-[#D8EAD3] rounded-full blur-xl opacity-50 animate-pulse"></div>
                <BookOpen size={80} className="text-[#8BAF88] relative z-10" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-4xl font-bold text-[#5C7A58] mb-4 tracking-wide">Column 的垂直排列术</h2>
            <p className="text-xl text-[#8D7B68] max-w-lg leading-relaxed font-light">
               欢迎来到布局工坊。<br/>
               今天，我们要在风中寻找一个名为 <b>Column</b> 的容器，<br/>
               它能让万物归位，井井有条。
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-3 bg-[#8BAF88] text-white rounded-full text-lg font-bold shadow-md hover:bg-[#7A9F77] hover:shadow-lg transition-all flex items-center gap-2"
            >
                <Play size={20} fill="currentColor" /> 开始整理
            </button>
            <XiaoQi emotion="excited" message="有很多乱糟糟的方块需要整理，我们去帮帮它们吧。" />
          </div>
        );

      case 'STACKING_CHAOS':
        return (
            <div className="space-y-8">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#5C7A58]">等等，它们怎么叠在一起了？</h2>
                    <p className="text-[#8D7B68]">Compose 的默认魔法是“堆叠”。如果没有容器，它们就会挤在原点。</p>
                </div>

                <div className="flex justify-center py-8">
                    <div className="w-64 h-96 bg-[#FDFCF5] border border-[#D7C4BB] rounded-[2rem] relative shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
                         <span className="absolute top-4 left-4 text-xs font-mono text-[#A89F91] bg-[#F0EEE6] px-2 py-0.5 rounded-full">(0,0)</span>
                         
                         {/* Stacked Items */}
                         <div className="absolute top-8 left-8 transform translate-x-0 translate-y-0 z-30">
                             <div className={itemClasses.apple}>
                                 苹果
                             </div>
                         </div>
                         <div className="absolute top-8 left-8 transform translate-x-2 translate-y-2 z-20">
                             <div className={itemClasses.banana}>
                                 香蕉
                             </div>
                         </div>
                          <div className="absolute top-8 left-8 transform translate-x-4 translate-y-4 z-10">
                             <div className={itemClasses.pear}>
                                 梨子
                             </div>
                         </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="confused" message="字都黏在一起了... 我们需要给它们找一个家。" />
                </div>
            </div>
        );

      case 'COLUMN_RESCUE':
        return (
             <div className="space-y-6">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#5C7A58]">英雄登场：Column</h2>
                    <p className="text-[#8D7B68]">Column 就像一个温柔的置物架，把物品一件件安放好。</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    
                    <div className="flex flex-col gap-4">
                        <div className="bg-[#F5F5F0] p-6 rounded-2xl font-mono text-sm text-[#5D4037] shadow-inner border border-[#E0E0D0]">
                            {isRescued ? (
                                <>
                                    <div className="animate-fade-in"><span className="text-[#8BAF88] font-bold">Column</span> {'{'}</div>
                                    <div className="pl-4 transition-all">Text("苹果")</div>
                                    <div className="pl-4 transition-all">Text("香蕉")</div>
                                    <div className="pl-4 transition-all">Text("梨子")</div>
                                    <div className="animate-fade-in">{'}'}</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-[#A89F91] opacity-70 italic mb-2">// 缺少容器...</div>
                                    <div>Text("苹果")</div>
                                    <div>Text("香蕉")</div>
                                    <div>Text("梨子")</div>
                                    <div className="h-4"></div>
                                </>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsRescued(!isRescued)}
                            className={`px-6 py-3 rounded-full font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${isRescued ? 'bg-[#E0E0D0] text-[#8D7B68]' : 'bg-[#8BAF88] text-white hover:bg-[#7A9F77]'}`}
                        >
                            {isRescued ? <RefreshCw size={18}/> : <Layers size={18}/>}
                            {isRescued ? "撤销魔法" : "施展 Column 魔法"}
                        </button>
                    </div>

                    {/* Phone Preview */}
                     <div className="w-64 h-96 bg-[#FDFCF5] border border-[#D7C4BB] rounded-[2rem] relative shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden p-6 transition-all duration-500">
                         {isRescued ? (
                             // Column Layout
                             <div className="flex flex-col gap-3 items-start h-full pt-4">
                                 <div className={`${itemClasses.apple} w-full animate-slide-down`} style={{animationDelay: '0ms'}}>
                                     苹果
                                 </div>
                                 <div className={`${itemClasses.banana} w-full animate-slide-down`} style={{animationDelay: '100ms'}}>
                                     香蕉
                                 </div>
                                 <div className={`${itemClasses.pear} w-full animate-slide-down`} style={{animationDelay: '200ms'}}>
                                     梨子
                                 </div>
                             </div>
                         ) : (
                             // Chaos Layout
                             <div className="relative pt-4 pl-2">
                                  <div className={`${itemClasses.apple} absolute top-0 left-0 z-30`}>
                                     苹果
                                 </div>
                                 <div className={`${itemClasses.banana} absolute top-2 left-2 z-20`}>
                                     香蕉
                                 </div>
                                 <div className={`${itemClasses.pear} absolute top-4 left-4 z-10`}>
                                     梨子
                                 </div>
                             </div>
                         )}
                    </div>
                </div>

                 <div className="flex justify-center">
                    <XiaoQi emotion={isRescued ? "happy" : "happy"} message={isRescued ? "看，它们现在多安静，多整齐。" : "试试点击按钮，唤醒 Column 的力量。"} />
                </div>
            </div>
        );
      
      case 'MECHANICS':
        return (
             <div className="space-y-6">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#5C7A58]">Column 的思考</h2>
                    <p className="text-[#8D7B68]">先“量身高”(Measure)，再“放位置”(Place)。这是它的处世哲学。</p>
                </div>

                <div className="flex flex-col items-center gap-6">
                     <div className="w-full max-w-md bg-[#F9FAF9] border-2 border-[#D8EAD3] rounded-3xl p-8 min-h-[300px] relative flex flex-col items-center shadow-sm">
                        
                        {/* Animated Kids */}
                         <div className="relative w-full flex-1 mt-6">
                            {/* Apple */}
                            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 
                                ${mechanicStep === 'IDLE' ? 'top-0 opacity-50' : ''}
                                ${mechanicStep === 'MEASURE' ? 'top-10 scale-105' : ''}
                                ${mechanicStep === 'PLACE' ? 'top-0' : ''}
                            `}>
                                <div className={itemClasses.apple + " relative"}>
                                    Text("苹果")
                                    {mechanicStep === 'MEASURE' && (
                                        <div className="absolute -right-12 top-0 h-full border-l border-[#8BAF88] flex items-center pl-2 text-xs font-mono animate-fade-in text-[#5C7A58]">
                                            <Ruler size={12} className="mr-1"/> 50
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Banana */}
                            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 
                                ${mechanicStep === 'IDLE' ? 'top-2 opacity-50' : ''}
                                ${mechanicStep === 'MEASURE' ? 'top-32 scale-105' : ''}
                                ${mechanicStep === 'PLACE' ? 'top-[60px]' : ''}
                            `}>
                                <div className={itemClasses.banana + " relative"}>
                                    Text("香蕉")
                                    {mechanicStep === 'MEASURE' && (
                                        <div className="absolute -right-12 top-0 h-full border-l border-[#8BAF88] flex items-center pl-2 text-xs font-mono animate-fade-in text-[#5C7A58]">
                                            <Ruler size={12} className="mr-1"/> 50
                                        </div>
                                    )}
                                </div>
                            </div>
                         </div>

                         {/* Status Text */}
                         <div className="mt-4 h-8 text-center font-bold text-[#5C7A58] text-sm">
                             {mechanicStep === 'MEASURE' && "第一步：询问每一个孩子的高度..."}
                             {mechanicStep === 'PLACE' && "第二步：根据记录，把它们安放好..."}
                             {mechanicStep === 'IDLE' && "静静等待..."}
                         </div>
                     </div>

                     <button 
                        onClick={runMechanics}
                        disabled={mechanicStep !== 'IDLE'}
                        className="px-6 py-3 bg-[#8BAF88] text-white rounded-full font-bold shadow-sm hover:bg-[#7A9F77] disabled:opacity-50 flex items-center gap-2"
                    >
                        <Play size={18} /> 观察过程
                    </button>
                </div>
            </div>
        );

      case 'NESTING_QUIZ':
        return (
             <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#5C7A58]">布局挑战：嵌套的 Column</h2>
                    <p className="text-[#8D7B68]">
                        Column 里面还可以有 Column，就像套娃一样。<br/>
                        猜猜看，它们会呈现出什么样子？
                    </p>
                </div>

                <div className="bg-[#F5F5F0] p-6 rounded-2xl text-[#5D4037] font-mono text-sm shadow-inner border border-[#E0E0D0]">
                    <div className="font-bold">Column {'{'}</div>
                    <div className="pl-4 text-[#8B4545]">Text("苹果")</div>
                    <div className="pl-4 text-[#8B7E45]">Text("香蕉")</div>
                    <div className="pl-4 font-bold">Column {'{'}</div>
                    <div className="pl-8 text-[#5C7A58]">Text("A级")</div>
                    <div className="pl-8 text-[#5C7A58]">Text("B级")</div>
                    <div className="pl-4 font-bold">{'}'}</div>
                    <div className="font-bold">{'}'}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { 
                            id: 'A', 
                            label: '选项 A',
                            content: ['苹果', '香蕉', 'A级', 'B级'],
                            correct: true 
                        },
                        { 
                            id: 'B', 
                            label: '选项 B',
                            content: ['苹果', '香蕉', 'A级 B级'], // A B inline
                            correct: false 
                        },
                         { 
                            id: 'C', 
                            label: '选项 C',
                            content: ['苹果香蕉A级B级'], // All stack
                            correct: false 
                        }
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`border-2 rounded-xl p-4 bg-white hover:bg-[#F9FAF9] transition-all flex flex-col items-center gap-2 ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'border-[#8BAF88] bg-[#E8F3E8]' : 'border-red-300 bg-red-50')
                                : 'border-[#E0E0D0]'
                            }`}
                        >
                            <span className="font-bold text-[#8D7B68]">{opt.label}</span>
                            {/* Mini Phone Mockup */}
                            <div className="w-20 h-32 border border-[#D7C4BB] rounded bg-[#FDFCF5] p-1 flex flex-col gap-1 overflow-hidden text-[8px] font-bold text-center">
                                {opt.id === 'A' && (
                                    <>
                                        <div className="bg-[#FFD1D1] w-full py-0.5 text-[#8B4545]">苹果</div>
                                        <div className="bg-[#FFF4C1] w-full py-0.5 text-[#8B7E45]">香蕉</div>
                                        <div className="bg-[#D8EAD3] w-full py-0.5 text-[#5C7A58]">A级</div>
                                        <div className="bg-[#D8EAD3] w-full py-0.5 text-[#5C7A58]">B级</div>
                                    </>
                                )}
                                {opt.id === 'B' && (
                                     <>
                                        <div className="bg-[#FFD1D1] w-full py-0.5">苹果</div>
                                        <div className="bg-[#FFF4C1] w-full py-0.5">香蕉</div>
                                        <div className="flex gap-1">
                                            <div className="bg-[#D8EAD3] w-1/2 py-0.5">A级</div>
                                            <div className="bg-[#D8EAD3] w-1/2 py-0.5">B级</div>
                                        </div>
                                    </>
                                )}
                                {opt.id === 'C' && (
                                     <div className="relative h-full w-full">
                                         <div className="absolute top-0 left-0 w-full bg-[#FFD1D1] text-left pl-1">苹果</div>
                                         <div className="absolute top-1 left-1 w-full bg-[#FFF4C1] text-left pl-1">香蕉</div>
                                         <div className="absolute top-2 left-2 w-full bg-[#D8EAD3] text-left pl-1">A级</div>
                                     </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                 {quizSelection && (
                        <div className={`p-4 rounded-xl flex gap-3 items-start ${quizCorrect ? 'bg-[#E8F3E8] text-[#5C7A58]' : 'bg-red-50 text-red-800'}`}>
                            {quizCorrect ? <CheckCircle size={20} /> : <Box size={20} />}
                            <p className="mt-0.5 text-sm font-medium">
                                {quizCorrect 
                                    ? "答对了！内部的 Column 也是一个整体，会放在'香蕉'下面。而它内部的 A 和 B 也会垂直排列。" 
                                    : "不对哦。Column 里面的东西永远是垂直排列的，哪怕是嵌套的 Column 也是一样。"}
                            </p>
                        </div>
                    )}
            </div>
        );

      case 'VICTORY':
         return (
            <div className="flex flex-col items-center text-center space-y-8 animate-scale-in py-10">
                <div className="w-32 h-32 bg-[#E8F3E8] rounded-full flex items-center justify-center border-4 border-[#8BAF88] shadow-md">
                     <Layers size={60} className="text-[#5C7A58]" />
                </div>
                
                <h2 className="text-4xl font-bold text-[#5C7A58]">垂直布局大师！</h2>
                <p className="text-xl text-[#8D7B68] max-w-lg">
                    恭喜你！你已经掌握了 <b>Column</b> 的心法。<br/>
                    无论是简单的列表，还是复杂的嵌套，<br/>
                    现在都难不倒你了。
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame} 
                        className="px-8 py-3 bg-white border border-[#8BAF88] text-[#5C7A58] rounded-full font-bold hover:bg-[#F0F7F0] flex items-center gap-2"
                    >
                        <RefreshCw size={18} /> 再来一次
                    </button>
                    <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-[#8BAF88] text-white rounded-full font-bold hover:bg-[#7A9F77] shadow-sm flex items-center gap-2"
                    >
                        <Home size={18} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="继续前进吧，去探索更多 Compose 的奇妙世界。" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <ShelfFrame 
        title="Column 垂直排列术" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav - Sage Green Theme */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#D0E0D0]">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-[#8D7B68] hover:text-[#5D4037] font-medium px-4 py-2 rounded-lg hover:bg-[#F0F7F0] transition-colors"
                >
                    <ArrowLeft size={18} /> 上一页
                </button>

                {/* Gates */}
                {currentStage === 'COLUMN_RESCUE' && !isRescued ? (
                     <span className="text-[#8BAF88] opacity-70 text-sm font-bold">施展魔法后继续...</span>
                ) : currentStage === 'NESTING_QUIZ' && !quizCorrect ? (
                     <span className="text-[#8BAF88] opacity-70 text-sm font-bold">答对后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-[#8BAF88] text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-[#7A9F77] hover:shadow-md transition-all transform hover:translate-x-1"
                    >
                        下一页 <ArrowRight size={18} />
                    </button>
                )}
            </div>
         )}
    </ShelfFrame>
  );
}
