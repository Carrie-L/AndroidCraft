
import React, { useState } from 'react';
import ScissorFrame from './components/ScissorFrame';
import XiaoQi from './components/XiaoQi';
import { ShapeClipStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, CheckCircle, AlertTriangle, Home, Scissors, Sparkles, Zap, Circle, Square, MousePointerClick, Image as ImageIcon, Scaling, LayoutTemplate } from 'lucide-react';

const STAGE_ORDER: ShapeClipStage[] = [
  'INTRO',
  'SQUARE_TO_CIRCLE',
  'SHAPE_GALLERY',
  'ORDER_MATTERS',
  'BORDER_PUZZLE',
  'SHAPE_MYSTERY',
  'CHALLENGE_INTRO',
  'ADVANCED_Q1_ORDER',
  'ADVANCED_Q2_TOUCH',
  'ADVANCED_Q3_RECT_CIRCLE',
  'ADVANCED_Q4_CORNERS',
  'ADVANCED_Q5_BORDER',
  'ADVANCED_Q6_PARENT',
  'ADVANCED_Q7_FILLWIDTH',
  'ADVANCED_Q8_TEXT_SIZE',
  'VICTORY'
];

interface ShapeClipGameProps {
  onExit: () => void;
}

export default function ShapeClipGame({ onExit }: ShapeClipGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Demo States
  const [isClipped, setIsClipped] = useState(false);
  const [shapeType, setShapeType] = useState<'Circle' | 'Rounded'>('Circle');
  const [modifierOrder, setModifierOrder] = useState<'PaintFirst' | 'ClipFirst'>('PaintFirst');
  const [borderOrder, setBorderOrder] = useState<'BorderFirst' | 'ClipFirst'>('BorderFirst');
  
  // Quiz State
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setQuizSelection(null);
      setQuizCorrect(false);
      // Reset demos
      setIsClipped(false);
      setModifierOrder('PaintFirst');
      setBorderOrder('BorderFirst');
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const resetGame = () => {
      setCurrentStageIndex(0);
      setIsClipped(false);
      setShapeType('Circle');
      setModifierOrder('PaintFirst');
      setBorderOrder('BorderFirst');
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="relative">
                 <div className="absolute inset-0 bg-rose-200 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                 <Scissors size={80} className="text-rose-500 relative z-10 drop-shadow-md transform -rotate-12" />
                 <div className="absolute top-0 right-0">
                     <Sparkles size={32} className="text-yellow-400 animate-spin-slow" />
                 </div>
            </div>
            
            <h2 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">小奇的魔法剪刀</h2>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              方方正正的组件太无聊了？<br/>
              今天，我们要学习如何用 <b>.clip()</b> 和 <b>Shape</b>，<br/>
              把它们剪裁成各种有趣的形状！
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 开始剪纸
            </button>
            <XiaoQi emotion="excited" message="咔嚓咔嚓！让我们来变个身！" />
          </div>
        );

      case 'SQUARE_TO_CIRCLE':
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">变身术：方变圆</h2>
                    <p className="text-slate-500">Modifier.clip() 就像一把模具，切掉多余的部分。</p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    {/* Visualizer */}
                    <div className="relative w-48 h-48 flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
                        <div className={`w-32 h-32 bg-slate-400 transition-all duration-700 ease-in-out ${isClipped ? 'rounded-full bg-rose-400' : 'rounded-none'}`}></div>
                        
                        {/* Scissors Animation */}
                        <div className={`absolute -right-8 top-0 text-slate-400 transition-all duration-700 ${isClipped ? 'opacity-0 translate-x-10' : 'opacity-100 animate-bounce'}`}>
                            <Scissors size={32} />
                        </div>
                    </div>

                    {/* Code */}
                    <div className="bg-slate-800 p-4 rounded-xl font-mono text-sm text-slate-300 shadow-md">
                        Box(modifier = Modifier<br/>
                        &nbsp;&nbsp;.size(100.dp)<br/>
                        &nbsp;&nbsp;.background(Color.Gray)<br/>
                        {isClipped && <span className="text-rose-400 font-bold animate-fade-in">&nbsp;&nbsp;.clip(CircleShape)</span>}
                        )
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button 
                            onClick={() => setIsClipped(!isClipped)}
                            className={`px-8 py-3 rounded-full text-white font-bold shadow-md transition-all flex items-center gap-2 ${isClipped ? 'bg-slate-500 hover:bg-slate-600' : 'bg-rose-500 hover:bg-rose-600'}`}
                        >
                            {isClipped ? <RefreshCw size={18}/> : <Scissors size={18}/>}
                            {isClipped ? "还原" : "剪成圆形"}
                        </button>
                        {isClipped && (
                            <div className="text-emerald-500 text-xs font-bold animate-bounce mt-2">
                                → 现在可以点击下一步啦！
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion={isClipped ? "happy" : "happy"} message={isClipped ? "哇！就像变魔术一样！" : "快按下按钮试试看！"} />
                </div>
            </div>
        );

      case 'SHAPE_GALLERY':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">剪刀的图样</h2>
                    <p className="text-slate-500">除了圆形，我们还有很多选择。</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Circle */}
                    <div 
                        onClick={() => setShapeType('Circle')}
                        className={`p-6 rounded-2xl border-4 transition-all cursor-pointer flex flex-col items-center gap-4 ${shapeType === 'Circle' ? 'border-rose-400 bg-rose-50' : 'border-slate-200 hover:border-rose-200'}`}
                    >
                        <div className="w-24 h-24 bg-rose-400 rounded-full shadow-md"></div>
                        <div className="text-center">
                            <div className="font-bold text-slate-800">CircleShape</div>
                            <div className="text-xs text-slate-500">正圆 (取短边为直径)</div>
                        </div>
                    </div>

                    {/* Rounded */}
                    <div 
                        onClick={() => setShapeType('Rounded')}
                        className={`p-6 rounded-2xl border-4 transition-all cursor-pointer flex flex-col items-center gap-4 ${shapeType === 'Rounded' ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-blue-200'}`}
                    >
                        <div className="w-32 h-24 bg-blue-400 rounded-2xl shadow-md"></div>
                        <div className="text-center">
                            <div className="font-bold text-slate-800">RoundedCornerShape</div>
                            <div className="text-xs text-slate-500">圆角矩形 (可指定半径)</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 max-w-lg mx-auto text-sm text-slate-600 text-center">
                    {shapeType === 'Circle' 
                        ? "适合：头像、圆形按钮、状态指示灯。" 
                        : "适合：卡片、对话气泡、大部分现代 UI 组件。"}
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="smart" message="RoundedCornerShape 还可以单独控制四个角的圆度哦！" />
                </div>
            </div>
        );

      case 'ORDER_MATTERS':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">核心法则：先上色，还是先剪裁？</h2>
                    <p className="text-slate-500">Modifier 的顺序决定了一切。这就像画画和剪纸的顺序。</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    
                    <div className="flex flex-col gap-4 w-64">
                        <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm text-slate-300 shadow-inner">
                            {modifierOrder === 'PaintFirst' ? (
                                <>
                                    <div className="text-green-400">1. .background(Red)</div>
                                    <div className="text-slate-500">// 先把整张纸涂红</div>
                                    <div className="text-rose-400">2. .clip(Circle)</div>
                                    <div className="text-slate-500">// 再剪？晚了！</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-rose-400">1. .clip(Circle)</div>
                                    <div className="text-slate-500">// 先把纸剪圆</div>
                                    <div className="text-green-400">2. .background(Red)</div>
                                    <div className="text-slate-500">// 再在圆里填色</div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => setModifierOrder('PaintFirst')} className={`flex-1 py-2 rounded text-xs font-bold ${modifierOrder === 'PaintFirst' ? 'bg-slate-700 text-white' : 'bg-slate-200'}`}>先上色</button>
                            <button onClick={() => setModifierOrder('ClipFirst')} className={`flex-1 py-2 rounded text-xs font-bold ${modifierOrder === 'ClipFirst' ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}>先剪裁</button>
                        </div>
                    </div>

                    {/* Visualizer */}
                    <div className="relative w-48 h-48 flex items-center justify-center bg-white border-2 border-slate-200 rounded-xl shadow-sm">
                        {modifierOrder === 'PaintFirst' ? (
                            <div className="w-32 h-32 bg-red-500">
                                {/* The clip happens "after" visually, meaning it doesn't affect the background already drawn on the full rect */}
                                <div className="absolute -bottom-6 w-full text-center text-xs text-red-500 font-bold">
                                    结果：红色正方形
                                </div>
                            </div>
                        ) : (
                            <div className="w-32 h-32 bg-red-500 rounded-full">
                                <div className="absolute -bottom-6 w-full text-center text-xs text-green-600 font-bold">
                                    结果：红色圆形
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi 
                        emotion={modifierOrder === 'ClipFirst' ? "excited" : "confused"} 
                        message={modifierOrder === 'ClipFirst' ? "这就对了！先定形状，再填颜色。" : "哎呀，颜料已经涂满了整张方形画布，后面再剪裁也改变不了已经画上去的红色方块了（实际上是背景层没有被剪裁）。"} 
                    />
                </div>
            </div>
        );

      case 'BORDER_PUZZLE':
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">谜题一：不听话的边框</h2>
                    <p className="text-slate-500">
                        小奇想剪一个圆形的头像，并给它加上红色的边框。<br/>
                        但不知为何，边框还是方的！
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl font-mono text-sm text-slate-300 shadow-lg relative">
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-red-500 flex items-center justify-center">
                        {/* Target result hint */}
                        <span className="text-xs text-slate-400">目标</span>
                    </div>
                    
                    <div>Modifier</div>
                    <div>&nbsp;&nbsp;.size(100.dp)</div>
                    <div className="text-yellow-400">&nbsp;&nbsp;.border(2.dp, Red)</div>
                    <div className="text-rose-400">&nbsp;&nbsp;.clip(CircleShape)</div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { id: 'A', label: 'A. clip 不支持 Image 组件', correct: false },
                        { id: 'B', label: 'B. clip 应该放在 border 之前', correct: true },
                        { id: 'C', label: 'C. Image 组件有自己的 shape 参数', correct: false }
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                            {quizCorrect 
                                ? "真相大白！border 也是一种绘制操作。如果先画边框（此时还是方的），再剪裁图片，边框就会被切掉或者留在外面。"
                                : "再想想'绘制顺序'。先画了方边框，再剪圆了图片，方边框还在那儿呢！"}
                        </p>
                    </div>
                )}
            </div>
        );

      case 'SHAPE_MYSTERY':
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">谜题二：神秘的形状</h2>
                    <p className="text-slate-500">
                        如果对一个宽 200dp、高 100dp 的长方形使用 `clip(CircleShape)`，<br/>
                        会得到什么？
                    </p>
                </div>

                <div className="flex justify-center my-4">
                    <div className="w-48 h-24 bg-slate-200 border-2 border-dashed border-slate-400 flex items-center justify-center text-xs text-slate-500">
                        200 x 100
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { id: 'A', label: 'A. 一个直径 100dp 的正圆', correct: true },
                        { id: 'B', label: 'B. 一个椭圆', correct: false },
                        { id: 'C', label: 'C. 一个胶囊形状', correct: false }
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                            {quizCorrect 
                                ? "没错！CircleShape 不会拉伸！它会取组件最短的那条边作为直径，切出一个正圆。"
                                : "不对哦。CircleShape 永远是正圆。如果是胶囊，需要用 RoundedCornerShape(percent = 50)。"}
                        </p>
                    </div>
                )}
            </div>
        );

      case 'CHALLENGE_INTRO':
        return (
              <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-12">
                  <div className="relative group cursor-pointer" onClick={nextStage}>
                      <div className="absolute inset-0 bg-rose-300 rounded-full blur-3xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity"></div>
                      <div className="w-40 h-40 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center border-4 border-white shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                          <Zap size={64} className="text-rose-600 group-hover:hidden transition-all" />
                          <Sparkles size={80} className="text-yellow-400 hidden group-hover:block animate-spin-slow drop-shadow-md" />
                      </div>
                  </div>

                  <div className="space-y-4 max-w-md">
                      <h2 className="text-3xl font-bold text-slate-800">进阶试炼</h2>
                      <p className="text-slate-600 text-lg">
                          你已经学会了剪纸的基本功。<br/>
                          现在，有几个关于原理和布局理论的难题，<br/>
                          只有真正的大师才能解答。
                      </p>
                  </div>

                  <button 
                    onClick={nextStage}
                    className="px-10 py-4 bg-rose-500 text-white rounded-full text-xl font-bold shadow-xl hover:bg-rose-600 hover:scale-105 transition-all flex items-center gap-3"
                  >
                      <Zap size={24} /> 接受挑战
                  </button>
              </div>
          );

      // --- ADVANCED QUESTIONS ---

      case 'ADVANCED_Q1_ORDER':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 1/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">顺序的魔力</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        开发者对一个正方形组件应用了 <code className="bg-slate-100 px-1 rounded font-mono text-slate-700">.background(Color.Green).clip(CircleShape)</code>。
                        最终可见的结果是什么？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 编译错误，clip 必须在 background 之前。', correct: false },
                         { id: 'B', label: 'B. 一个绿色的正方形，但触摸区域是圆形的。', correct: false },
                         { id: 'C', label: 'C. 一个绿色的圆形。', correct: false },
                         { id: 'D', label: 'D. 一个绿色的正方形。', correct: true }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "Modifier 的顺序很灵活，不会报错。" },
                             { id: 'B', feedback: "触摸区域确实受 Clip 影响，但视觉上背景是在 Clip 之前绘制的。" },
                             { id: 'C', feedback: "背景是在裁剪之前绘制的，所以它填充了整个正方形区域。" },
                             { id: 'D', feedback: "回答正确！background 修饰符首先填充整个矩形区域；随后的 clip 修饰符只影响之后的绘制操作，而后面已经没有绘制操作了。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q2_TOUCH':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 2/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">不仅仅是视觉</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        除了改变视觉外观，`.clip(Shape)` 修饰符还改变了组件的什么关键属性？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 它的层级 (Elevation) 和阴影。', correct: false },
                         { id: 'B', label: 'B. 内容的颜色。', correct: false },
                         { id: 'C', label: 'C. 它的布局测量 (Measurement) 和定位。', correct: false },
                         { id: 'D', label: 'D. 用于用户交互的触摸区域 (Touch Area)。', correct: true }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "阴影需要 .shadow() 或 .graphicsLayer()。" },
                             { id: 'B', feedback: "clip 不改变颜色。" },
                             { id: 'C', feedback: "clip 不改变组件所占据的矩形布局空间大小，只是‘切掉’了显示和交互部分。" },
                             { id: 'D', feedback: "回答正确！Clip 是一个‘破坏性’操作，它会切掉指定形状之外的所有视觉内容和触摸响应区域。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q3_RECT_CIRCLE':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 3/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">矩形的命运</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        如果你对一个 <b>200.dp 宽、100.dp 高</b>的矩形组件应用 `.clip(CircleShape)`，
                        剪裁后的形状是什么？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 一个直径 200.dp 的圆，被高度截断。', correct: false },
                         { id: 'B', label: 'B. 一个胶囊形状 (两端半圆的矩形)。', correct: false },
                         { id: 'C', label: 'C. 一个 200x100 的椭圆。', correct: false },
                         { id: 'D', label: 'D. 一个直径 100.dp 的正圆。', correct: true }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "CircleShape 不会尝试填满长边。" },
                             { id: 'B', feedback: "胶囊形状通常使用 RoundedCornerShape(percent = 50) 来实现，而不是 CircleShape。" },
                             { id: 'C', feedback: "CircleShape 是正圆，不会拉伸成椭圆。" },
                             { id: 'D', feedback: "回答正确！当应用于矩形时，CircleShape 会使用两个维度中较短的那个（这里是 100.dp）作为直径，切出一个居中的正圆。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q4_CORNERS':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 4/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">定制气泡</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        要创建一个“消息气泡”形状，要求<b>左上、右上、左下是圆角</b>，
                        但<b>右下角是直角</b>。应该使用哪个修饰符？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. Modifier.clip(RoundedCornerShape(12.dp))', correct: false },
                         { id: 'B', label: 'B. Modifier.clip(RectangleShape)', correct: false },
                         { id: 'C', label: 'C. Modifier.clip(CircleShape)', correct: false },
                         { id: 'D', label: 'D. Modifier.clip(RoundedCornerShape(topStart=12.dp, topEnd=12.dp, bottomStart=12.dp, bottomEnd=0.dp))', correct: true }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "这会让四个角都是圆的。" },
                             { id: 'B', feedback: "这是直角矩形。" },
                             { id: 'C', feedback: "这是圆形。" },
                             { id: 'D', feedback: "回答正确！RoundedCornerShape 允许单独指定每个角的半径。将右下角 (bottomEnd) 设置为 0.dp 即可实现直角效果。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q5_BORDER':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 5/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">完美的边框</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        要正确显示一个<b>既被裁剪成圆形，又沿着圆形边缘有 2.dp 红色边框</b>的图片，
                        正确的修饰符顺序是什么？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. .border(2.dp, Red, shape = CircleShape)', correct: false },
                         { id: 'B', label: 'B. .clip(CircleShape) 和 .border(...) 顺序无所谓。', correct: false },
                         { id: 'C', label: 'C. .border(2.dp, Red).clip(CircleShape)', correct: false },
                         { id: 'D', label: 'D. .clip(CircleShape).border(2.dp, Red)', correct: true }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "虽然 border 可以指定 shape，但如果不配合 clip，图片本身可能还是方形的。" },
                             { id: 'B', feedback: "顺序至关重要！Modifier 是按顺序执行的。" },
                             { id: 'C', feedback: "如果先画边框，它是方的。然后再剪裁图片，边框可能会被切掉。" },
                             { id: 'D', feedback: "回答正确！首先定义裁剪形状。随后的 .border() 修饰符会沿着刚刚由 .clip() 设定的形状路径来绘制边框。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q6_PARENT':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 6/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">父子谈判</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        在 Compose 布局的“父子谈判”模型中，父组件 (Parent) 的核心职责是什么？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 强制子组件使用与父组件完全相同的尺寸。', correct: false },
                         { id: 'B', label: 'B. 精确决定子组件的最终尺寸 (Size)。', correct: false },
                         { id: 'C', label: 'C. 向子组件传递一个尺寸约束范围 (Constraints)。', correct: true },
                         { id: 'D', label: 'D. 将子组件放置在屏幕的绝对坐标 (0, 0) 位置。', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "不是强制相同，而是给定一个范围。" },
                             { id: 'B', feedback: "父组件提供的是一个范围，而最终尺寸是由子组件在该范围内选择的。" },
                             { id: 'C', feedback: "回答正确！父组件通过定义最小和最大尺寸来设定规则 (Constraints)，子组件在此规则内决定自己的大小。" },
                             { id: 'D', feedback: "放置位置是布局阶段的事，这里问的是尺寸协商。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q7_FILLWIDTH':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 7/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">fillMaxWidth 的原理</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        `Modifier.fillMaxWidth()` 的底层原理是什么？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 它直接忽略父组件的约束，并查询屏幕的尺寸。', correct: false },
                         { id: 'B', label: 'B. 它修改从父组件传来的约束，将最小宽度设置为等于最大宽度。', correct: true },
                         { id: 'C', label: 'C. 它将子组件的 minWidth 设置为 0。', correct: false },
                         { id: 'D', label: 'D. 它将子组件的尺寸设置为一个非常大的值，让父组件去裁剪。', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "子组件永远不能忽略父组件的约束。" },
                             { id: 'B', feedback: "回答正确！通过让 minWidth 等于 maxWidth，子组件没有其他选择，只能选择这个唯一的宽度，从而达到“撑满”的效果。" },
                             { id: 'C', feedback: "那是 wrapContent 的行为。" },
                             { id: 'D', feedback: "这会导致不可预知的行为。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q8_TEXT_SIZE':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 8/8</div>
                    <h2 className="text-2xl font-bold text-slate-800">Text 的尺寸</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        在 Compose 中，如果一个 `Text` 组件没有添加任何尺寸相关的 Modifier (如 .size, .fillMaxWidth 等)，
                        它的尺寸将如何确定？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 尺寸将为 0dp x 0dp，导致其不可见。', correct: false },
                         { id: 'B', label: 'B. 根据其内容（文字的多少）来决定大小，即“包裹内容”。', correct: true },
                         { id: 'C', label: 'C. 强制拉伸以填满父容器的所有可用空间。', correct: false },
                         { id: 'D', label: 'D. 采用一个系统预设的最小点击目标尺寸，例如 48dp x 48dp。', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-rose-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        {quizCorrect ? <CheckCircle size={20} className="shrink-0 mt-0.5"/> : <AlertTriangle size={20} className="shrink-0 mt-0.5"/>}
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "怎么会呢？文字还是有大小的。" },
                             { id: 'B', feedback: "回答正确！这是 Compose 组件的默认行为，尺寸会根据其内在内容 (Intrinsic Size) 自适应，只要不超过父级的约束。" },
                             { id: 'C', feedback: "那是 Column 或 Row 的某些配置，不是 Text 的默认行为。" },
                             { id: 'D', feedback: "这是 IconButton 等交互组件的规范，不是 Text 的。" }
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
                    <Scaling className="w-32 h-32 text-rose-400 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 animate-spin-slow">
                        <Sparkles className="text-yellow-200 w-12 h-12 fill-current" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-slate-800">剪纸艺术家！</h2>
                <p className="text-xl text-slate-600 max-w-lg">
                    你已经精通了 <b>Shape</b> 和 <b>Clip</b> 的艺术。<br/>
                    无论是圆形头像、圆角卡片，还是复杂的遮罩逻辑，<br/>
                    你都能信手拈来！
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-white border-2 border-rose-200 text-rose-600 rounded-full font-bold hover:bg-rose-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 再剪一次
                    </button>
                     <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="你的作品太棒了！简直是艺术品！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <ScissorFrame 
        title="1.2.4 形状裁剪" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && currentStage !== 'CHALLENGE_INTRO' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-slate-400 hover:text-rose-600 font-medium px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一步
                </button>

                {/* Logic Gates */}
                {currentStage === 'SQUARE_TO_CIRCLE' && !isClipped ? (
                     <span className="text-rose-400 font-bold text-sm animate-pulse">请先剪裁形状...</span>
                ) : (currentStage.includes('Q') || currentStage === 'BORDER_PUZZLE' || currentStage === 'SHAPE_MYSTERY') && !quizCorrect ? (
                     <span className="text-rose-400 font-bold text-sm">答对挑战后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-rose-600 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一步 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </ScissorFrame>
  );
}
