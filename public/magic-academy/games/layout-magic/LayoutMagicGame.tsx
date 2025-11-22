import React, { useState, useEffect } from 'react';
import BookFrame from './components/BookFrame';
import XiaoQi from './components/XiaoQi';
import LayoutPreview from './components/LayoutPreview';
import { ControlGroup } from './components/Controls';
import { GameStage, LayoutDirection, MainAxisAlignment, CrossAxisAlignment } from './types';
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle, Play, Trophy, Star, Home } from 'lucide-react';

const STAGE_ORDER: GameStage[] = [
  'INTRO',
  'AXIS_BASICS',
  'ARRANGEMENT',
  'ALIGNMENT',
  'QUIZ_1',
  'QUIZ_2',
  'FINAL_CHALLENGE',
  'VICTORY'
];

// Helper to generate code snippet
const CodeDisplay = ({ direction, mainAxis, crossAxis }: { direction: LayoutDirection, mainAxis: MainAxisAlignment, crossAxis: CrossAxisAlignment }) => {
    
    // Mappings
    const mapMain = (val: MainAxisAlignment) => {
        switch(val) {
            case MainAxisAlignment.START: return 'Arrangement.Start';
            case MainAxisAlignment.CENTER: return 'Arrangement.Center';
            case MainAxisAlignment.END: return 'Arrangement.End';
            case MainAxisAlignment.SPACE_BETWEEN: return 'Arrangement.SpaceBetween';
            case MainAxisAlignment.SPACE_EVENLY: return 'Arrangement.SpaceEvenly';
            case MainAxisAlignment.SPACE_AROUND: return 'Arrangement.SpaceAround';
            default: return 'Arrangement.Start';
        }
    }

    const mapCross = (val: CrossAxisAlignment, dir: LayoutDirection) => {
        if (dir === LayoutDirection.ROW) {
             switch(val) {
                case CrossAxisAlignment.START: return 'Alignment.Top';
                case CrossAxisAlignment.CENTER: return 'Alignment.CenterVertically';
                case CrossAxisAlignment.END: return 'Alignment.Bottom';
                default: return 'Alignment.Top';
            }
        } else {
             switch(val) {
                case CrossAxisAlignment.START: return 'Alignment.Start';
                case CrossAxisAlignment.CENTER: return 'Alignment.CenterHorizontally';
                case CrossAxisAlignment.END: return 'Alignment.End';
                default: return 'Alignment.Start';
            }
        }
    }

    const mainProp = direction === LayoutDirection.ROW ? 'horizontalArrangement' : 'verticalArrangement';
    const crossProp = direction === LayoutDirection.ROW ? 'verticalAlignment' : 'horizontalAlignment';

    return (
        <div className="bg-slate-900 rounded-xl p-4 mt-4 shadow-inner border border-slate-700 font-mono text-sm leading-loose overflow-x-auto w-full">
             <div className="flex flex-col text-slate-300">
                <div className="whitespace-nowrap">
                    <span className="text-blue-400">{mainProp}</span> 
                    <span className="text-slate-500"> = </span>
                    <span className="text-yellow-300">{mapMain(mainAxis)}</span>,
                </div>
                <div className="whitespace-nowrap">
                    <span className="text-pink-400">{crossProp}</span> 
                    <span className="text-slate-500"> = </span>
                    <span className="text-yellow-300">{mapCross(crossAxis, direction)}</span>
                </div>
             </div>
        </div>
    )
}

// Helper Component for Legend
const AxisLegend = () => (
  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-2 select-none">
    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
      <div className="w-10 h-1.5 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-blue-500"></div>
      </div>
      <span className="text-blue-700 font-bold text-sm">蓝色主轴 (Main)</span>
    </div>
    <div className="flex items-center gap-2 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100 shadow-sm">
      <div className="w-10 h-0 border-t-4 border-pink-300 border-dashed"></div>
      <span className="text-pink-700 font-bold text-sm">粉色交叉轴 (Cross)</span>
    </div>
  </div>
);

interface LayoutMagicGameProps {
    onExit: () => void;
}

export default function LayoutMagicGame({ onExit }: LayoutMagicGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Layout State for playgrounds
  const [direction, setDirection] = useState<LayoutDirection>(LayoutDirection.ROW);
  const [mainAxis, setMainAxis] = useState<MainAxisAlignment>(MainAxisAlignment.START);
  const [crossAxis, setCrossAxis] = useState<CrossAxisAlignment>(CrossAxisAlignment.START);
  
  // Quiz State
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Challenge State
  const [challengeCode, setChallengeCode] = useState<string>('start'); // 'start' is wrong default

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      // Reset states for next stage
      setQuizSelection(null);
      setQuizFeedback(null);
      setIsCorrect(false);
      // Set defaults based on stage for better UX
      if (STAGE_ORDER[currentStageIndex + 1] === 'ALIGNMENT') {
         setDirection(LayoutDirection.ROW);
         setMainAxis(MainAxisAlignment.SPACE_EVENLY);
         setCrossAxis(CrossAxisAlignment.CENTER); // default to visually clear state
      }
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const resetGame = () => {
    setCurrentStageIndex(0);
    setDirection(LayoutDirection.ROW);
    setMainAxis(MainAxisAlignment.START);
    setCrossAxis(CrossAxisAlignment.START);
    setQuizSelection(null);
    setQuizFeedback(null);
    setIsCorrect(false);
    setChallengeCode('start');
  };

  // Reset layout when entering Axis Basics
  useEffect(() => {
    if (currentStage === 'AXIS_BASICS') {
        setDirection(LayoutDirection.ROW);
        setMainAxis(MainAxisAlignment.START);
        setCrossAxis(CrossAxisAlignment.CENTER);
    }
  }, [currentStage]);

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <h2 className="text-4xl font-bold text-amber-800 mb-4">小奇的布局魔法书</h2>
            <p className="text-xl text-amber-700 max-w-lg leading-relaxed">
              欢迎来到魔法世界！我是小奇。<br/>
              你是否经常为了“东西对不齐”而抓狂？<br/>
              不用担心，翻开这本书，掌握 <b>MainAxis (主轴)</b> 和 <b>CrossAxis (交叉轴)</b> 的秘密，你将成为布局的大魔法师！
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 开始修行
            </button>
            <XiaoQi emotion="excited" message="准备好了吗？我们出发！" />
          </div>
        );

      case 'AXIS_BASICS':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-blue-800">第一章：流动的方向</h2>
                <XiaoQi emotion="smart" message="试着切换容器的方向 (Row/Column)。注意蓝色箭头指向哪里，那里就是‘水流’的方向！" />
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <ControlGroup 
                    title="选择容器 (Container)"
                    colorTheme="blue"
                    value={direction}
                    onChange={(val) => setDirection(val)}
                    options={[
                        { label: 'Row (横向)', value: LayoutDirection.ROW },
                        { label: 'Column (纵向)', value: LayoutDirection.COLUMN }
                    ]}
                />
                
                <AxisLegend />
                
                <LayoutPreview 
                    direction={direction}
                    mainAxis={MainAxisAlignment.START} 
                    crossAxis={CrossAxisAlignment.CENTER}
                />
                
                <CodeDisplay direction={direction} mainAxis={MainAxisAlignment.START} crossAxis={CrossAxisAlignment.CENTER} />
            </div>
          </div>
        );

      case 'ARRANGEMENT':
        return (
          <div className="space-y-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-pink-800">第二章：安排的艺术 (Arrangement)</h2>
                <XiaoQi emotion="happy" message="Arrangement 专门管‘主轴’。看，蓝色箭头（边缘）指向的方向，元素是怎么分布的？" />
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:gap-8">
                    <ControlGroup 
                        title="容器方向"
                        value={direction}
                        onChange={setDirection}
                        options={[
                            { label: 'Row', value: LayoutDirection.ROW },
                            { label: 'Column', value: LayoutDirection.COLUMN }
                        ]}
                    />
                    <ControlGroup 
                        title="主轴分布 (Arrangement)"
                        colorTheme="pink"
                        value={mainAxis}
                        onChange={setMainAxis}
                        options={[
                            { label: 'Start', value: MainAxisAlignment.START },
                            { label: 'Center', value: MainAxisAlignment.CENTER },
                            { label: 'End', value: MainAxisAlignment.END },
                            { label: 'SpaceBetween', value: MainAxisAlignment.SPACE_BETWEEN },
                            { label: 'SpaceEvenly', value: MainAxisAlignment.SPACE_EVENLY },
                        ]}
                    />
                </div>

                <AxisLegend />

                <LayoutPreview 
                    direction={direction}
                    mainAxis={mainAxis}
                    crossAxis={CrossAxisAlignment.CENTER}
                />
                
                <CodeDisplay direction={direction} mainAxis={mainAxis} crossAxis={CrossAxisAlignment.CENTER} />
            </div>
          </div>
        );

      case 'ALIGNMENT':
        return (
           <div className="space-y-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-purple-800">第三章：对齐的奥义 (Alignment)</h2>
                <XiaoQi emotion="confused" message="Alignment 管‘交叉轴’。就是和蓝色主轴垂直的那个方向！" />
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:gap-8">
                    <ControlGroup 
                        title="容器方向"
                        value={direction}
                        onChange={setDirection}
                        options={[
                            { label: 'Row', value: LayoutDirection.ROW },
                            { label: 'Column', value: LayoutDirection.COLUMN }
                        ]}
                    />
                    <ControlGroup 
                        title="交叉轴对齐 (Alignment)"
                        colorTheme="amber"
                        value={crossAxis}
                        onChange={setCrossAxis}
                        options={[
                            { label: 'Start/Top', value: CrossAxisAlignment.START },
                            { label: 'Center', value: CrossAxisAlignment.CENTER },
                            { label: 'End/Bottom', value: CrossAxisAlignment.END },
                        ]}
                    />
                </div>

                <AxisLegend />

                <LayoutPreview 
                    direction={direction}
                    mainAxis={MainAxisAlignment.SPACE_BETWEEN} 
                    crossAxis={crossAxis}
                />
                
                <CodeDisplay direction={direction} mainAxis={MainAxisAlignment.SPACE_BETWEEN} crossAxis={crossAxis} />
            </div>
          </div>
        );

      case 'QUIZ_1':
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800">试炼一：概念辨析</h2>
            <div className="bg-white p-8 rounded-3xl shadow-md">
                <p className="text-lg font-medium mb-6">
                    在 <code className="bg-gray-100 px-2 py-1 rounded text-pink-600 font-mono">Column</code> (垂直布局) 中，
                    如果你想让所有的子元素 <span className="font-bold text-blue-600">水平居中</span> 显示。
                    你应该设置哪个咒语？
                </p>

                <div className="space-y-3">
                    {[
                        { id: 'A', text: 'verticalArrangement = Arrangement.Center' },
                        { id: 'B', text: 'horizontalArrangement = Arrangement.Center' },
                        { id: 'C', text: 'horizontalAlignment = Alignment.CenterHorizontally' },
                        { id: 'D', text: 'verticalAlignment = Alignment.CenterVertically' }
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => {
                                setQuizSelection(option.id);
                                if (option.id === 'C') {
                                    setQuizFeedback("✨ 正确！Column的主轴是竖的，水平方向是交叉轴，所以用 Alignment，而且是 Horizontal 的。");
                                    setIsCorrect(true);
                                } else {
                                    setQuizFeedback("❌ 再想想... Column是竖着排的。水平方向是它的主轴还是交叉轴？");
                                    setIsCorrect(false);
                                }
                            }}
                            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                                quizSelection === option.id 
                                ? (option.id === 'C' ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                        >
                            <span className="font-bold mr-2">{option.id}.</span> <span className="font-mono text-sm">{option.text}</span>
                        </button>
                    ))}
                </div>

                {quizFeedback && (
                    <div className={`mt-6 p-4 rounded-xl flex gap-3 items-start ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <XiaoQi emotion={isCorrect ? 'excited' : 'confused'} />
                        <p className="mt-1">{quizFeedback}</p>
                    </div>
                )}
            </div>
          </div>
        );

       case 'QUIZ_2':
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800">试炼二：原理应用</h2>
            <div className="bg-white p-8 rounded-3xl shadow-md">
                <p className="text-lg font-medium mb-6">
                    在 <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono">Row</code> 中，
                    如果你想让三个图标 <span className="font-bold text-purple-600">均匀分布</span> 在整个屏幕宽度上
                    （左边一个，中间一个，右边一个）。你应该调整的是主轴还是交叉轴？
                </p>

                <div className="flex gap-4 justify-center my-8">
                    <div className="border-2 border-dashed border-gray-300 p-2 rounded-lg flex gap-8 items-center w-full justify-between opacity-50 bg-gray-50">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { id: 'A', text: '主轴 (MainAxis)', correct: true },
                        { id: 'B', text: '交叉轴 (CrossAxis)', correct: false },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => {
                                setQuizSelection(option.id);
                                if (option.correct) {
                                    setQuizFeedback("🎉 太棒了！Row是横向的，你想调整横向的间距分布，当然是操作主轴！");
                                    setIsCorrect(true);
                                } else {
                                    setQuizFeedback("😅 哎呀，Row是横着走的，交叉轴是竖着的。你是想调整横向分布哦。");
                                    setIsCorrect(false);
                                }
                            }}
                            className={`p-6 text-center rounded-xl border-2 text-xl font-bold transition-all ${
                                quizSelection === option.id 
                                ? (option.correct ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                        >
                           {option.text}
                        </button>
                    ))}
                </div>

                 {quizFeedback && (
                    <div className={`mt-6 p-4 rounded-xl flex gap-3 items-start ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <XiaoQi emotion={isCorrect ? 'smart' : 'confused'} />
                        <p className="mt-1">{quizFeedback}</p>
                    </div>
                )}
            </div>
          </div>
        );

      case 'FINAL_CHALLENGE':
        const isCodeCorrect = challengeCode === 'center';
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-red-800">最终挑战：修复歪歪扭扭的布局</h2>
                    <XiaoQi emotion={isCodeCorrect ? 'excited' : 'confused'} message="看右边的手机！文字都挤在左边，太难看了。帮我把它居中！" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Code Editor Side */}
                    <div className="bg-slate-800 p-6 rounded-3xl shadow-xl font-mono text-sm sm:text-base text-slate-300 overflow-hidden relative flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-6 bg-slate-900 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mt-4 space-y-1 flex-1">
                            <p><span className="text-purple-400">@Composable</span></p>
                            <p><span className="text-blue-400">fun</span> <span className="text-yellow-300">AlignmentTest</span>() {'{'}</p>
                            <p className="pl-4"><span className="text-yellow-300">Column</span>(</p>
                            <p className="pl-8">modifier = Modifier.fillMaxWidth(),</p>
                            <p className="pl-8 text-gray-500">// 关键任务：设置交叉轴（水平方向）居中</p>
                            
                            <div className="pl-8 my-2 flex flex-wrap items-center gap-2">
                                <span className="text-cyan-300">horizontalAlignment</span> = 
                                <select 
                                    value={challengeCode}
                                    onChange={(e) => setChallengeCode(e.target.value)}
                                    className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                                >
                                    <option value="start">Alignment.Start</option>
                                    <option value="center">Alignment.CenterHorizontally</option>
                                    <option value="end">Alignment.End</option>
                                </select>
                            </div>

                            <p className="pl-4">) {'{'}</p>
                            <p className="pl-8">Text(<span className="text-green-400">"第一行：短"</span>)</p>
                            <p className="pl-8">Text(<span className="text-green-400">"第二行：稍微长一点"</span>)</p>
                            <p className="pl-8">Text(<span className="text-green-400">"第三行：超级超级长长长"</span>)</p>
                            <p className="pl-4">{'}'}</p>
                            <p>{'}'}</p>
                        </div>
                    </div>

                    {/* Preview Side */}
                    <div className="flex justify-center">
                        <div className="w-[280px] h-[500px] bg-white border-8 border-gray-200 rounded-[3rem] shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-200 rounded-b-xl z-20"></div>
                            
                            {/* The Phone Screen Content */}
                            <div className={`w-full h-full pt-12 px-4 flex flex-col gap-4 transition-all duration-500 ${
                                challengeCode === 'center' ? 'items-center' : (challengeCode === 'end' ? 'items-end' : 'items-start')
                            }`}>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm w-fit">第一行：短</div>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm w-fit">第二行：稍微长一点</div>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm w-fit">第三行：超级超级长长长</div>

                                {isCodeCorrect && (
                                    <div className="mt-10 flex flex-col items-center animate-bounce">
                                        <CheckCircle className="text-green-500 w-16 h-16" />
                                        <span className="text-green-600 font-bold mt-2">完美修复！</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
                
                <h2 className="text-4xl font-bold text-amber-800">恭喜毕业！</h2>
                <p className="text-xl text-amber-700 max-w-lg">
                    你已经掌握了 <span className="font-bold text-pink-600">Row/Column</span>、
                    <span className="font-bold text-blue-600">MainAxis/CrossAxis</span>、
                    以及 <span className="font-bold text-purple-600">Alignment/Arrangement</span> 的终极奥义！
                </p>
                <p className="text-gray-500">现在的你，已经是合格的布局魔法师了。</p>

                <div className="flex gap-4">
                    <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-white border-2 border-amber-200 text-amber-600 rounded-full font-bold hover:bg-amber-50 flex items-center gap-2"
                    >
                        <RotateCcw size={20} /> 再玩一次
                    </button>
                     <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="太棒了！以后写布局就是‘指哪打哪’，再也不用靠运气去试了！" />
            </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <BookFrame 
        title="布局魔法书" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
      {/* Main Content Wrapper */}
      <div className="min-h-[60vh] flex flex-col">
         {renderContent()}
      </div>

      {/* Navigation Footer */}
      {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && (
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-amber-100">
            <button 
                onClick={prevStage}
                className="flex items-center gap-2 text-amber-600 hover:text-amber-800 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
                <ArrowLeft size={20} /> 上一页
            </button>

            {/* Logic to disable 'Next' on quizzes until correct */}
            {currentStage.includes('QUIZ') && !isCorrect ? (
                 <span className="text-gray-400 text-sm">答对后继续...</span>
            ) : currentStage === 'FINAL_CHALLENGE' && challengeCode !== 'center' ? (
                <span className="text-gray-400 text-sm">修复代码后继续...</span>
            ) : (
                <button 
                    onClick={nextStage}
                    className="flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-amber-600 hover:shadow-lg transition-all transform hover:translate-x-1"
                >
                    下一页 <ArrowRight size={20} />
                </button>
            )}
        </div>
      )}
    </BookFrame>
  );
}