import React, { useState, useEffect } from 'react';
import CinemaFrame from './components/CinemaFrame';
import XiaoQi from './components/XiaoQi';
import { DataDrivenStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, Film, Projector, CheckCircle, XCircle, Zap, Home } from 'lucide-react';

const STAGE_ORDER: DataDrivenStage[] = [
  'INTRO',
  'PROJECTOR_THEORY',
  'TEMPLATE_LAB',
  'IDEMPOTENCE',
  'VICTORY'
];

interface DataDrivenGameProps {
  onExit: () => void;
}

export default function DataDrivenGame({ onExit }: DataDrivenGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Projector State
  const [projectorState, setProjectorState] = useState<string>("Android");
  const [projectorOn, setProjectorOn] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user used the input

  // Template Lab State
  const [templateCode, setTemplateCode] = useState('Text(text = "Hello, Alice")');
  const [templateSolved, setTemplateSolved] = useState(false);
  const [templateError, setTemplateError] = useState<string | null>(null);

  // Idempotence State
  const [idempInput, setIdempInput] = useState<string>("");
  const [idempHistory, setIdempHistory] = useState<{input: string, output: string}[]>([]);
  
  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setTemplateError(null);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };
  
  const resetGame = () => {
      setCurrentStageIndex(0);
      setProjectorState("Android");
      setHasInteracted(false);
      setTemplateCode('Text(text = "Hello, Alice")');
      setTemplateSolved(false);
      setTemplateError(null);
      setIdempInput("");
      setIdempHistory([]);
  }

  // Template Lab Check
  const checkTemplateCode = () => {
      // Simple regex check for $name usage
      if (templateCode.includes('$name') || templateCode.includes('${name}')) {
          if (templateCode.includes('Hello')) {
             setTemplateSolved(true);
             setTemplateError(null);
          } else {
             setTemplateError("哎呀，好像把 'Hello' 弄丢了？");
          }
      } else {
          setTemplateError("请使用 '$name' 模板语法来引用变量哦！");
      }
  };

  // Idempotence Run
  const runIdempotence = (val: string) => {
      const newEntry = { input: val, output: `Hello, ${val}` };
      setIdempHistory(prev => [...prev, newEntry].slice(-3)); // keep last 3
      setIdempInput("");
  };

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mb-4 animate-pulse">
                <Projector size={48} />
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">小奇的放映室</h2>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              告别痛苦的“刷墙匠”工作。<br/>
              在 Compose 的世界里，我们是优雅的<b>UI 放映师</b>。<br/>
              只要换一张“底片”，画面就会自动改变！
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-cyan-500 text-white rounded-full text-xl font-bold shadow-lg hover:bg-cyan-600 hover:scale-105 transition-all flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 进入放映室
            </button>
            <XiaoQi emotion="excited" message="准备好见证‘数据驱动’的魔法了吗？" />
          </div>
        );

      case 'PROJECTOR_THEORY':
        return (
            <div className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-slate-800">UI = f(State)</h2>
                    <p className="text-slate-500">改变底片(State)，画面(UI)自动更新</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    
                    {/* The State (Film) */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-4 w-full md:w-1/3 relative">
                        <div className="absolute -top-3 -left-3 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow-sm">
                            State (数据)
                        </div>
                        <label className="text-sm font-bold text-slate-400 uppercase">Current Film</label>
                        <input 
                            type="text" 
                            value={projectorState}
                            onChange={(e) => {
                                setProjectorState(e.target.value);
                                setHasInteracted(true);
                            }}
                            className="w-full text-2xl font-mono border-b-2 border-cyan-300 focus:border-cyan-600 outline-none py-2 bg-transparent"
                            placeholder="Type a name..."
                        />
                        <p className="text-xs text-slate-400">试着在这里输入不同的名字</p>
                    </div>

                    {/* The Function (Projector) */}
                    <div className="flex flex-col items-center justify-center text-cyan-500">
                         <div className="w-32 h-24 bg-slate-800 rounded-xl flex items-center justify-center relative shadow-xl">
                             <span className="text-4xl font-serif italic text-white font-bold">f</span>
                             <div className={`absolute -right-2 w-4 h-4 bg-cyan-400 rounded-full blur-sm ${projectorOn ? 'animate-pulse' : 'opacity-0'}`}></div>
                             {/* Beams */}
                             {projectorOn && (
                                 <div className="absolute top-1/2 left-full w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-transparent -translate-y-1/2 clip-path-trapezoid pointer-events-none"></div>
                             )}
                         </div>
                         <span className="mt-2 text-sm font-mono font-bold">Composable 函数</span>
                    </div>

                    {/* The UI (Screen) */}
                    <div className="bg-black p-1 rounded-xl shadow-2xl w-full md:w-1/3">
                        <div className="bg-white h-48 rounded-lg flex items-center justify-center relative overflow-hidden border-4 border-slate-800">
                            {projectorOn ? (
                                <span className="text-3xl font-bold text-slate-800 animate-fade-in">
                                    Hello, {projectorState}
                                </span>
                            ) : (
                                <span className="text-slate-300 italic">No Signal</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi 
                        emotion={hasInteracted ? "smart" : "happy"} 
                        message={hasInteracted ? "看！我根本没去碰右边的‘屏幕’，我只是改了左边的‘数据’。" : "试试修改左边的文本框，看看屏幕会发生什么？"} 
                    />
                </div>
            </div>
        );

      case 'TEMPLATE_LAB':
        return (
            <div className="space-y-6 max-w-3xl mx-auto">
                 <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">修复硬编码 (Hardcoding)</h2>
                    <p className="text-slate-500">这张底片写死了 "Alice"，我们用 String Template 把它变成动态的！</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Code Editor */}
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-auto text-xs text-slate-400 font-mono">Greeting.kt</span>
                        </div>
                        <div className="p-6 font-mono text-sm leading-relaxed">
                            <div className="text-purple-400">@Composable</div>
                            <div className="text-slate-300">fun <span className="text-yellow-300">Greeting</span>(name: String) {'{'}</div>
                            <div className="pl-4 flex items-center flex-wrap gap-2">
                                <span className="text-cyan-300">Text</span>(text = 
                                <input 
                                    type="text" 
                                    value={templateCode}
                                    onChange={(e) => {
                                        setTemplateCode(e.target.value);
                                        setTemplateSolved(false);
                                    }}
                                    className={`bg-slate-800 border-b border-slate-600 text-green-300 px-1 outline-none min-w-[180px] ${templateSolved ? 'border-green-500' : ''}`}
                                />
                                )
                            </div>
                            <div className="text-slate-300">{'}'}</div>
                        </div>
                    </div>
                    
                    {/* Task Info */}
                    <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                            <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                <Zap size={18} /> 任务目标
                            </h4>
                            <p className="text-sm text-yellow-900">
                                将代码中的 <code className="bg-white px-1 rounded">"Hello, Alice"</code> 
                                修改为使用参数 <code className="bg-white px-1 rounded">name</code> 的动态字符串。
                            </p>
                            <p className="text-sm text-yellow-900 mt-2 font-bold">
                                提示：使用 <code className="bg-white px-1 rounded">$name</code>
                            </p>
                        </div>

                        {templateError && (
                             <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-red-700 text-sm flex items-center gap-2 animate-shake">
                                <XCircle size={16} /> {templateError}
                            </div>
                        )}

                        {templateSolved && (
                             <div className="bg-green-50 border border-green-200 p-3 rounded-xl text-green-700 text-sm flex items-center gap-2 animate-bounce">
                                <CheckCircle size={16} /> 修复成功！代码现在是动态的了。
                            </div>
                        )}

                        <button 
                            onClick={checkTemplateCode}
                            disabled={templateSolved}
                            className={`w-full py-3 rounded-xl font-bold shadow-sm transition-all ${
                                templateSolved 
                                ? 'bg-green-500 text-white cursor-default' 
                                : 'bg-slate-800 text-white hover:bg-slate-700'
                            }`}
                        >
                            {templateSolved ? "已修复" : "运行代码"}
                        </button>
                    </div>
                </div>
                 <XiaoQi emotion={templateSolved ? "happy" : "confused"} message={templateSolved ? "干得漂亮！现在无论传入谁的名字，都能正确显示了。" : "记得 Kotlin 的字符串模板是用 $ 符号哦！"} />
            </div>
        );

      case 'IDEMPOTENCE':
         return (
            <div className="space-y-6">
                 <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">神圣约定：幂等性 (Idempotence)</h2>
                    <p className="text-slate-500">输入一样，输出必须永远一样。函数要像数学公式一样诚实。</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                    {/* Machine Visualization */}
                    <div className="flex items-center gap-4">
                         <input 
                            type="text" 
                            placeholder="输入名字..."
                            value={idempInput}
                            onChange={(e) => setIdempInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && idempInput && runIdempotence(idempInput)}
                            className="bg-white border-2 border-slate-300 rounded-lg px-4 py-2 w-32 text-center focus:border-cyan-500 outline-none"
                        />
                        <ArrowRight className="text-slate-400" />
                        <div className="w-24 h-24 bg-cyan-500 rounded-xl flex flex-col items-center justify-center text-white shadow-lg relative group cursor-pointer"
                             onClick={() => idempInput && runIdempotence(idempInput)}
                        >
                            <span className="font-serif italic text-2xl font-bold">f(x)</span>
                            <span className="text-xs mt-1 opacity-80">点击执行</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"></div>
                        </div>
                         <ArrowRight className="text-slate-400" />
                         <div className="w-40 h-16 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-100 text-slate-500">
                             Output
                         </div>
                    </div>

                    {/* History Log */}
                    <div className="w-full max-w-md space-y-2 mt-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">执行记录</h4>
                        {idempHistory.length === 0 && <div className="text-center text-slate-400 text-sm italic py-4">暂无记录</div>}
                        {idempHistory.map((entry, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100 shadow-sm animate-slide-up">
                                <div className="flex items-center gap-2">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">In</span>
                                    <span className="font-mono text-sm">"{entry.input}"</span>
                                </div>
                                <ArrowRight size={14} className="text-slate-300" />
                                <div className="flex items-center gap-2">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Out</span>
                                    <span className="font-bold text-slate-700 text-sm">"{entry.output}"</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                     <XiaoQi emotion="smart" message="试着连续输入两次相同的名字。如果是‘诚实’的函数，结果应该完全一样，不会多出奇怪的东西！" />
                </div>
            </div>
        );

      case 'VICTORY':
        return (
             <div className="flex flex-col items-center text-center space-y-8 animate-scale-in py-10">
                <div className="relative">
                    <Film className="w-32 h-32 text-cyan-500 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 animate-bounce">
                        <CheckCircle className="text-green-400 w-12 h-12 fill-white" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-slate-800">UI 放映师执照到手！</h2>
                <p className="text-xl text-slate-600 max-w-lg">
                    你已经掌握了 <span className="font-bold text-cyan-600">数据驱动</span> 的核心！<br/>
                    不再是那个手忙脚乱的“UI小保姆”，而是一名掌控全局的魔法师。
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame} 
                        className="px-8 py-3 bg-white border-2 border-cyan-200 text-cyan-600 rounded-full font-bold hover:bg-cyan-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 重看一遍
                    </button>
                    <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-cyan-500 text-white rounded-full font-bold hover:bg-cyan-600 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="下一站，我们将学习如何让这些静态的画面‘动’起来！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <CinemaFrame 
        title="Compose 放映室" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一页
                </button>

                {/* Gates */}
                {currentStage === 'TEMPLATE_LAB' && !templateSolved ? (
                     <span className="text-slate-400 text-sm">修复代码后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-cyan-600 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一页 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </CinemaFrame>
  );
}