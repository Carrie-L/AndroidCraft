import React, { useState } from 'react';
import IntroFrame from './components/IntroFrame';
import XiaoQi from './components/XiaoQi';
import { ComposeIntroStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, Sparkles, Wand2, Check, X, Home } from 'lucide-react';

const STAGE_ORDER: ComposeIntroStage[] = [
  'INTRO',
  'MENTAL_MODEL',
  'ANNOTATION',
  'EMISSION',
  'NAMING_RITUAL',
  'VICTORY'
];

interface ComposeIntroGameProps {
  onExit: () => void;
}

export default function ComposeIntroGame({ onExit }: ComposeIntroGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Mental Model State
  const [modelRevealed, setModelRevealed] = useState(false);

  // Annotation State
  const [codeSnippet, setCodeSnippet] = useState('fun Greeting() {\n  Text("Hello")\n}');
  const [annotationAdded, setAnnotationAdded] = useState(false);
  const [annotationError, setAnnotationError] = useState<string | null>(null);

  // Emission State
  const [emittedCount, setEmittedCount] = useState(0);

  // Naming Quiz State
  const [namingSelection, setNamingSelection] = useState<string | null>(null);
  const [namingCorrect, setNamingCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      // Reset ephemeral states
      setAnnotationError(null);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const handleAddAnnotation = () => {
      if (!annotationAdded) {
        setCodeSnippet('@Composable\n' + codeSnippet);
        setAnnotationAdded(true);
        setAnnotationError(null);
      }
  };

  const handleEmitClick = () => {
      if (emittedCount < 5) {
          setEmittedCount(prev => prev + 1);
      }
  };

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">UI 魔法世界入门</h2>
            <p className="text-xl text-purple-700 max-w-lg leading-relaxed">
              我是小奇！欢迎来到 @Composable 的世界。<br/>
              在这里，我们不再像工头一样“命令”电脑干活，<br/>
              而是像魔法师一样“描述”蓝图！
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 开启魔法之门
            </button>
            <XiaoQi emotion="excited" message="准备好你的魔法棒了吗？" />
          </div>
        );

      case 'MENTAL_MODEL':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">从“当工头”到“画蓝图”</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Old World */}
                <div className={`p-6 rounded-2xl border-2 border-gray-300 bg-gray-100 opacity-80 transition-all ${modelRevealed ? 'grayscale scale-95' : 'scale-100'}`}>
                    <h3 className="text-xl font-bold text-gray-600 mb-4 flex items-center gap-2">
                        🚧 旧世界 (Imperative)
                    </h3>
                    <div className="space-y-2 text-sm font-mono text-gray-700">
                        <p className="bg-white p-2 rounded border border-gray-200">textView.setText("Hello")</p>
                        <p className="bg-white p-2 rounded border border-gray-200">textView.setColor(Red)</p>
                        <p className="bg-white p-2 rounded border border-gray-200">layout.addView(textView)</p>
                    </div>
                    <div className="mt-4 text-gray-500 italic text-sm">
                        "像工头一样，一步步命令电脑去修改界面..."
                    </div>
                </div>

                {/* Magic World */}
                <div className={`relative p-6 rounded-2xl border-4 border-purple-300 bg-purple-50 overflow-hidden transition-all duration-1000 ${modelRevealed ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                     {!modelRevealed && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                            <button 
                                onClick={() => setModelRevealed(true)}
                                className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 animate-pulse"
                            >
                                施展魔法 ✨
                            </button>
                        </div>
                     )}
                    <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                        ✨ 魔法世界 (Declarative)
                    </h3>
                    <div className="space-y-2 text-sm font-mono text-purple-900">
                         <p className="bg-white p-2 rounded border border-purple-200 shadow-sm">
                            Text("Hello", color = Red)
                         </p>
                    </div>
                    <div className="mt-4 text-purple-600 italic text-sm">
                        "只要描述想要什么，魔法就会自动发生！"
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center pt-4">
                 <XiaoQi emotion={modelRevealed ? "smart" : "happy"} message={modelRevealed ? "这就叫‘声明式UI’，是不是简单多了？" : "点击按钮看看有什么不同！"} />
            </div>
          </div>
        );

      case 'ANNOTATION':
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-purple-800">魔法的起点：@Composable 小帽子</h2>
                <p className="text-center text-gray-600">
                    普通函数是无法创造 UI 的。只有戴上魔法帽，编译器才会给它“通行证”！
                </p>

                <div className="bg-slate-800 p-6 rounded-3xl shadow-xl relative overflow-hidden min-h-[200px] flex flex-col justify-center">
                    <div className="font-mono text-lg text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {codeSnippet}
                    </div>
                    
                    {!annotationAdded && (
                         <div className="absolute top-4 right-4 animate-bounce">
                            <div className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-200">
                                缺少魔法！
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-4">
                    {annotationError && (
                        <div className="text-red-500 font-bold animate-shake">{annotationError}</div>
                    )}
                    
                    {!annotationAdded ? (
                         <button 
                            onClick={handleAddAnnotation}
                            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-6 py-3 rounded-full font-bold shadow-md flex items-center gap-2 transition-all hover:scale-105"
                        >
                            <Sparkles size={20} /> 戴上 @Composable 帽子
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 text-green-600 font-bold bg-green-100 px-4 py-2 rounded-full animate-fade-in">
                            <Check size={20} /> 魔法生效了！
                        </div>
                    )}
                </div>
                
                 <XiaoQi emotion={annotationAdded ? "excited" : "confused"} message={annotationAdded ? "这就对了！有了帽子，它就是一个UI魔法师了。" : "这个函数看起来平平无奇，快给它加点魔法！"} />
            </div>
        );

      case 'EMISSION':
        return (
            <div className="space-y-6">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-blue-800">咒语是直接创造，不是“返回”物品</h2>
                     <XiaoQi emotion="smart" message="点击咒语，看看 UI 是怎么长出来的！" />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8">
                    
                    {/* The Spell Caster */}
                    <div className="flex flex-col items-center gap-4">
                        <button 
                            onClick={handleEmitClick}
                            disabled={emittedCount >= 5}
                            className="bg-slate-800 text-slate-200 p-4 rounded-xl font-mono text-sm shadow-lg hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative group"
                        >
                            <span className="text-purple-400">@Composable</span><br/>
                            fun Greeting() {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-yellow-300">Text</span>("Hello")<br/>
                            {'}'}
                            <div className="absolute -right-2 -top-2 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                !
                            </div>
                        </button>
                        <span className="text-sm font-bold text-gray-500">点击代码施法</span>
                    </div>

                    {/* The Flow */}
                    <div className="hidden md:flex text-purple-300">
                        <ArrowRight size={48} className={emittedCount > 0 ? "animate-pulse text-purple-500" : ""} />
                    </div>

                    {/* The UI Tree */}
                    <div className="w-64 h-64 bg-blue-50 border-2 border-dashed border-blue-200 rounded-full relative flex items-center justify-center overflow-hidden">
                        <span className="absolute bottom-4 text-blue-300 text-xs font-bold uppercase tracking-widest">UI Tree</span>
                        
                        {/* Emitted Nodes */}
                        {Array.from({ length: emittedCount }).map((_, i) => (
                            <div 
                                key={i}
                                className="absolute bg-white border-2 border-purple-400 text-purple-700 px-3 py-1 rounded-full font-bold text-sm shadow-sm animate-pop-in"
                                style={{
                                    top: `${30 + Math.random() * 40}%`,
                                    left: `${20 + Math.random() * 50}%`,
                                    transform: `rotate(${Math.random() * 20 - 10}deg)`
                                }}
                            >
                                Text
                            </div>
                        ))}
                        {emittedCount === 0 && (
                            <span className="text-gray-400 text-sm italic">空空如也...</span>
                        )}
                    </div>
                </div>
                
                <div className="text-center text-gray-600 max-w-lg mx-auto">
                    我们不是“return”一个 Text 对象，而是直接向 UI 树“发射”(Emit) 一个 Text 节点。
                    <br/><span className="text-sm text-gray-400">(这就是为什么 Composable 函数通常返回 Unit)</span>
                </div>
            </div>
        );

      case 'NAMING_RITUAL':
        return (
             <div className="space-y-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800">试炼：咒语的命名规则</h2>
                <div className="bg-white p-8 rounded-3xl shadow-md">
                    <p className="text-lg font-medium mb-6">
                        Composable 函数是一个 <b>UI 实体 (名词)</b>，而不是一个动作。
                        请选出符合魔法界命名规范的咒语：
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { id: 'A', text: 'fun userProfile()', correct: false },
                            { id: 'B', text: 'fun UserProfile()', correct: true },
                            { id: 'C', text: 'fun getUserProfile()', correct: false },
                            { id: 'D', text: 'fun ShowUserProfile()', correct: false }
                        ].map((option) => (
                            <button
                                key={option.id}
                                onClick={() => {
                                    setNamingSelection(option.id);
                                    setNamingCorrect(option.correct);
                                }}
                                className={`p-4 text-center rounded-xl border-2 font-mono font-bold transition-all ${
                                    namingSelection === option.id 
                                    ? (option.correct ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600'
                                }`}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>

                    {namingSelection && (
                        <div className={`mt-6 p-4 rounded-xl flex gap-3 items-start ${namingCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {namingCorrect ? <Check size={24} /> : <X size={24} />}
                            <p className="mt-1">
                                {namingCorrect 
                                    ? "正确！UI是‘物体’，所以用大写名词开头 (PascalCase)，就像类名一样！" 
                                    : "不对哦。小写开头通常是普通函数或变量；动词开头（如get, show）也不对，我们是在描述它‘是什么’，而不是‘做什么’。"}
                            </p>
                        </div>
                    )}
                    
                    <div className="mt-6 flex justify-center">
                         <XiaoQi emotion={namingSelection ? (namingCorrect ? 'smart' : 'confused') : 'happy'} />
                    </div>
                </div>
             </div>
        );

      case 'VICTORY':
         return (
            <div className="flex flex-col items-center text-center space-y-8 animate-scale-in py-10">
                <div className="relative">
                    <Wand2 className="w-32 h-32 text-purple-400 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 animate-spin-slow">
                        <Sparkles className="text-yellow-200 w-12 h-12 fill-current" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-purple-800">欢迎加入魔法师公会！</h2>
                <p className="text-xl text-purple-700 max-w-lg">
                    你已经明白了 Declarative UI 的核心思想。
                    现在的你，已经准备好书写属于你的 UI 魔法书了！
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={() => setCurrentStageIndex(0)} 
                        className="px-8 py-3 bg-white border-2 border-purple-200 text-purple-600 rounded-full font-bold hover:bg-purple-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 再学一次
                    </button>
                    <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="去创造奇迹吧，年轻的魔法师！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <IntroFrame 
        title="Compose 魔法入门" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-purple-100">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一页
                </button>

                {/* Gates */}
                {currentStage === 'MENTAL_MODEL' && !modelRevealed ? (
                     <span className="text-gray-400 text-sm">先施展魔法看看...</span>
                ) : currentStage === 'ANNOTATION' && !annotationAdded ? (
                     <span className="text-gray-400 text-sm">先加上帽子...</span>
                ) : currentStage === 'NAMING_RITUAL' && !namingCorrect ? (
                     <span className="text-gray-400 text-sm">答对才能毕业...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-purple-600 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一页 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </IntroFrame>
  );
}