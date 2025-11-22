
import React, { useState } from 'react';
import BoxFrame from './components/BoxFrame';
import XiaoQi from './components/XiaoQi';
import { BoxStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, CheckCircle, Home, Layers, Box, User, Bell, Lock, Sparkles, Zap, LayoutTemplate, Square, AlertTriangle } from 'lucide-react';

const STAGE_ORDER: BoxStage[] = [
  'INTRO',
  'CONCEPT_LAYERS',
  'AVATAR_BUILDER',
  'DEFAULT_ALIGNMENT',
  'ADVANCED_INTRO',
  'ADVANCED_Q1_SIZE',
  'ADVANCED_Q2_ORDER',
  'ADVANCED_Q3_PURPOSE',
  'ADVANCED_Q4_DEFAULT',
  'VICTORY'
];

interface BoxAdventureGameProps {
  onExit: () => void;
}

export default function BoxAdventureGame({ onExit }: BoxAdventureGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Avatar Builder State
  const [hasAvatar, setHasAvatar] = useState(false);
  const [hasBadge, setHasBadge] = useState(false);
  const [alignment, setAlignment] = useState<'TopStart' | 'TopEnd'>('TopStart');

  // Quiz State
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setQuizSelection(null);
      setQuizCorrect(false);
      // Reset builder if re-entering
      if (currentStage === 'INTRO') {
          setHasAvatar(false);
          setHasBadge(false);
          setAlignment('TopStart');
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
      setHasAvatar(false);
      setHasBadge(false);
      setAlignment('TopStart');
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="relative">
                 <div className="absolute inset-0 bg-indigo-400 rounded-xl blur-2xl opacity-30 animate-pulse"></div>
                 <Box size={100} className="text-indigo-600 relative z-10 drop-shadow-xl" strokeWidth={1} />
                 <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">1</div>
            </div>
            
            <h2 className="text-4xl font-bold text-slate-800 mb-2">Box 的堆叠魔法</h2>
            <div className="flex gap-2 text-indigo-500 justify-center mb-4">
                <Layers size={20} />
                <span className="font-bold tracking-widest text-sm uppercase">第三维度 Z-Axis</span>
            </div>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed bg-white/50 p-6 rounded-2xl border border-white shadow-sm">
               夏目想做一个“带未读数的头像”。<br/>
               可是 Row 和 Column 只能让东西并排站，<br/>
               怎么让小红点<b>飞到</b>头像上面去呢？
            </p>

            <button 
                onClick={nextStage}
                className="px-8 py-3 bg-indigo-500 text-white rounded-full text-lg font-bold shadow-lg hover:bg-indigo-600 hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1"
            >
                <Play size={20} fill="currentColor" /> 开启探险
            </button>
            <XiaoQi emotion="excited" message="今天我们要进入 Z 轴的世界，学习如何让东西‘叠’起来！" />
          </div>
        );

      case 'CONCEPT_LAYERS':
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">欢迎来到第三维度</h2>
                    <p className="text-slate-500">屏幕是 X-Y 平面，而 Box 就是在 Z 轴（垂直屏幕向外）上安排元素的。</p>
                </div>

                <div className="flex justify-center py-8 perspective-1000">
                     <div className="relative w-64 h-64 transform-style-3d animate-hover-3d">
                         {/* Layer 1: Bottom */}
                         <div className="absolute inset-0 bg-blue-500 rounded-2xl shadow-lg opacity-90 transform translate-z-0 flex items-center justify-center text-white font-bold text-2xl border-2 border-blue-300">
                             底层
                         </div>
                         
                         {/* Layer 2: Middle */}
                         <div className="absolute inset-0 bg-green-500 rounded-2xl shadow-lg opacity-90 transform translate-z-20 scale-90 flex items-center justify-center text-white font-bold text-2xl border-2 border-green-300" style={{transform: 'translateZ(40px) scale(0.8)'}}>
                             中层
                         </div>

                         {/* Layer 3: Top */}
                         <div className="absolute inset-0 bg-red-500 rounded-2xl shadow-lg opacity-90 transform translate-z-40 scale-75 flex items-center justify-center text-white font-bold text-2xl border-2 border-red-300" style={{transform: 'translateZ(80px) scale(0.6)'}}>
                             顶层
                         </div>

                         {/* Axis Indicator */}
                         <div className="absolute -right-20 top-1/2 w-40 h-1 bg-slate-300 -rotate-45 transform-origin-left">
                            <span className="absolute right-0 -top-6 text-slate-400 font-bold rotate-45">Z 轴 (向外)</span>
                         </div>
                     </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="smart" message="想象一下 Photoshop 的图层，或者贴纸。后贴上去的会在最上面！" />
                </div>
            </div>
        );

      case 'AVATAR_BUILDER':
        return (
            <div className="space-y-6">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">实战：制作消息头像</h2>
                    <p className="text-slate-500">我们需要一个盒子，先放头像，再放红点。</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    
                    <div className="flex flex-col gap-4 w-64">
                        <div className="bg-slate-900 p-5 rounded-2xl font-mono text-sm text-slate-300 shadow-xl border border-slate-700">
                            <div><span className="text-indigo-400">Box</span> {'{'}</div>
                            
                            {/* Code Line 1: Avatar */}
                            <div 
                                onClick={() => setHasAvatar(!hasAvatar)}
                                className={`pl-4 cursor-pointer transition-all hover:bg-slate-800 rounded px-1 ${hasAvatar ? 'opacity-100' : 'opacity-30'}`}
                            >
                                <span className="text-slate-500">// 1. 底层</span><br/>
                                <span className="text-blue-300">Image</span>(Avatar)
                            </div>

                            {/* Code Line 2: Badge */}
                            <div 
                                onClick={() => setHasBadge(!hasBadge)}
                                className={`pl-4 mt-2 cursor-pointer transition-all hover:bg-slate-800 rounded px-1 ${hasBadge ? 'opacity-100' : 'opacity-30'}`}
                            >
                                <span className="text-slate-500">// 2. 顶层</span><br/>
                                <span className="text-red-300">Text</span>(Badge)
                            </div>

                            <div>{'}'}</div>
                        </div>

                        <div className="flex gap-2">
                             <button 
                                onClick={() => setHasAvatar(!hasAvatar)}
                                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${hasAvatar ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white border border-slate-200 text-slate-400'}`}
                             >
                                 {hasAvatar ? '- 移除头像' : '+ 放入头像'}
                             </button>
                             <button 
                                onClick={() => setHasBadge(!hasBadge)}
                                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${hasBadge ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-white border border-slate-200 text-slate-400'}`}
                             >
                                 {hasBadge ? '- 移除红点' : '+ 放入红点'}
                             </button>
                        </div>
                    </div>

                    {/* Preview */}
                     <div className="w-64 h-64 bg-white/50 backdrop-blur rounded-[2rem] border-2 border-white shadow-inner flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10 pointer-events-none">
                             {Array.from({length: 64}).map((_,i) => <div key={i} className="border-[0.5px] border-indigo-300"></div>)}
                         </div>

                         {/* The Actual Rendering */}
                         {hasAvatar && (
                             <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 animate-pop-in z-0">
                                 <User size={64} />
                             </div>
                         )}
                         
                         {hasBadge && (
                             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 animate-bounce-in">
                                 1
                             </div>
                         )}

                         {!hasAvatar && !hasBadge && <span className="text-slate-400 text-sm">空盒子</span>}
                    </div>
                </div>

                 <div className="flex justify-center">
                    <XiaoQi 
                        emotion={hasAvatar && hasBadge ? "confused" : "happy"} 
                        message={hasAvatar && hasBadge ? "咦？红点怎么挡在脸中间了？它应该在右上角才对！" : "请按顺序把东西放进盒子里。"} 
                    />
                </div>
            </div>
        );

      case 'DEFAULT_ALIGNMENT':
        return (
            <div className="space-y-6">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">默认行为：左上角聚会</h2>
                    <p className="text-slate-500">Box 里的孩子默认都会挤在左上角 (0,0)。我们需要 <code className="bg-indigo-100 px-1 rounded text-indigo-600 font-mono">align</code> 修饰符。</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-white/40 p-8 rounded-3xl border border-white/50">
                     
                     <div className="flex flex-col gap-4">
                        <div className="font-mono text-sm text-slate-600 bg-white p-4 rounded-xl shadow-sm">
                            Text(Badge,<br/>
                            &nbsp;&nbsp;modifier = Modifier.<span className="text-purple-600 font-bold">align</span>(<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600 font-bold">Alignment.{alignment}</span><br/>
                            &nbsp;&nbsp;)<br/>
                            )
                        </div>
                        
                        <div className="flex gap-2">
                             <button 
                                onClick={() => setAlignment('TopStart')}
                                className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${alignment === 'TopStart' ? 'bg-slate-200 text-slate-700' : 'bg-white text-slate-400'}`}
                             >
                                 TopStart (默认)
                             </button>
                             <button 
                                onClick={() => setAlignment('TopEnd')}
                                className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${alignment === 'TopEnd' ? 'bg-purple-500 text-white shadow-md' : 'bg-white text-slate-400'}`}
                             >
                                 TopEnd (目标)
                             </button>
                        </div>
                     </div>

                     {/* Preview */}
                     <div className="w-48 h-48 bg-white rounded-3xl shadow-lg relative flex items-center justify-center">
                         <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                             <User size={64} />
                         </div>
                         
                         {/* The Badge Moving */}
                         <div className={`absolute w-8 h-8 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full shadow-md transition-all duration-500 ${
                             alignment === 'TopStart' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-4 right-4'
                         }`}>
                             1
                         </div>
                     </div>
                </div>

                 <div className="flex justify-center">
                    <XiaoQi emotion={alignment === 'TopEnd' ? "excited" : "happy"} message={alignment === 'TopEnd' ? "成功了！红点飞到了右上角！" : "Box 里的元素想去哪里，全靠 align 指挥。"} />
                </div>
            </div>
        );

      case 'ADVANCED_INTRO':
        return (
              <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-12">
                  <div className="relative group cursor-pointer" onClick={nextStage}>
                      <div className="absolute inset-0 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity"></div>
                      <div className="w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-full flex items-center justify-center border-4 border-white shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                          <Lock size={64} className="text-indigo-600 group-hover:hidden transition-all" />
                          <Sparkles size={80} className="text-yellow-400 hidden group-hover:block animate-spin-slow drop-shadow-md" />
                      </div>
                  </div>

                  <div className="space-y-4 max-w-md">
                      <h2 className="text-3xl font-bold text-slate-800">Box 的进阶试炼</h2>
                      <p className="text-slate-600 text-lg">
                          你已经学会了基础的堆叠。<br/>
                          但关于 Box 的尺寸、绘制顺序和应用场景，<br/>
                          还有更深的秘密等着你去揭开。
                      </p>
                  </div>

                  <button 
                    onClick={nextStage}
                    className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                  >
                      <Zap size={24} /> 挑战高阶题目
                  </button>
              </div>
          );

      case 'ADVANCED_Q1_SIZE':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 1/4</div>
                    <h2 className="text-2xl font-bold text-slate-800">Box 的尺寸之谜</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        一个 Box 容器内有两个子元素：<br/>
                        1. 一个 <b>80x100</b> 的图片<br/>
                        2. 一个 <b>150x40</b> 的文本<br/>
                        如果 Box 本身没有被指定大小，它的最终尺寸会是多少？
                    </p>
                </div>

                {/* Visual Aid */}
                <div className="flex justify-center my-4">
                     <div className="relative bg-indigo-50 border-2 border-dashed border-indigo-300 flex p-1">
                         <div className="absolute top-0 left-0 w-[80px] h-[100px] bg-blue-200/50 border border-blue-400 flex items-center justify-center text-xs text-blue-700">80x100</div>
                         <div className="absolute top-0 left-0 w-[150px] h-[40px] bg-red-200/50 border border-red-400 flex items-center justify-center text-xs text-red-700">150x40</div>
                         {/* Ghost box for correct answer visualization */}
                         {quizSelection && (
                             <div className="w-[150px] h-[100px] border-2 border-green-500 z-20 pointer-events-none"></div>
                         )}
                         {/* Placeholder to give the container some min size for visibility if needed, but here absolute positioning implies we rely on explicit size */}
                         <div style={{width: 160, height: 110}}></div>
                     </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {[
                         { id: 'A', label: 'A. 150 x 40', correct: false },
                         { id: 'B', label: 'B. 150 x 100', correct: true },
                         { id: 'C', label: 'C. 80 x 100', correct: false },
                         { id: 'D', label: 'D. 230 x 140', correct: false }
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
                                : 'bg-white border-slate-200 hover:border-indigo-300'
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
                             { id: 'A', feedback: "不对哦。高度只有40的话，图片(100)就放不下了。Box 会尽可能包容所有孩子。" },
                             { id: 'B', feedback: "正确！Box 会自动适应子元素中最大的宽度和最大的高度，以确保能包容所有内容。宽取 150，高取 100。" },
                             { id: 'C', feedback: "不对哦。宽度只有80的话，文本(150)就溢出了。" },
                             { id: 'D', feedback: "Box 不是 Column/Row，它不会把尺寸加起来。它是堆叠的，所以只取最大值。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
        );

      case 'ADVANCED_Q2_ORDER':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 2/4</div>
                    <h2 className="text-2xl font-bold text-slate-800">堆叠的隐喻</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        在 Box 布局中，代码的编写顺序决定了元素的堆叠层次。<br/>
                        以下哪个比喻最准确地描述了这种关系？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 像排队：先写的代码排在前面，所以显示在最前面。', correct: false },
                         { id: 'B', label: 'B. 像 Photoshop 图层：列表下方的图层会显示在上方图层的上面。', correct: true },
                         { id: 'C', label: 'C. 像砖墙：所有代码块并列放置，互不影响。', correct: false },
                         { id: 'D', label: 'D. 像书本：代码写在前面的内容会先被看到。', correct: false }
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
                                : 'bg-white border-slate-200 hover:border-indigo-300'
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
                             { id: 'A', feedback: "恰恰相反。在绘制中，先写的代码会先被画在画布上（作为背景），后写的会画在它上面。" },
                             { id: 'B', feedback: "精准的比喻！代码执行顺序就是“绘制顺序”。后声明的元素（列表下方）会被绘制在顶层，覆盖先声明的元素。" },
                             { id: 'C', feedback: "Box 的特性就是重叠，而不是并列。" },
                             { id: 'D', feedback: "Z轴上没有“先看到”的概念，只有“谁盖住谁”。后写的会盖住先写的。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q3_PURPOSE':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 3/4</div>
                    <h2 className="text-2xl font-bold text-slate-800">Box 的核心使命</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        Box 布局最核心的设计目的是为了解决哪一类 UI 设计问题？
                    </p>
                </div>

                 <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 当需要将多个 UI 元素严格地水平或垂直对齐时。', correct: false },
                         { id: 'B', label: 'B. 为了在所有布局中提供最佳的渲染性能。', correct: false },
                         { id: 'C', label: 'C. 当需要在同一个空间位置上堆叠多个 UI 元素时。', correct: true },
                         { id: 'D', label: 'D. 当需要根据屏幕大小自适应地调整布局时。', correct: false }
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
                                : 'bg-white border-slate-200 hover:border-indigo-300'
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
                             { id: 'A', feedback: "这是 Row 和 Column 的强项。" },
                             { id: 'B', feedback: "虽然 Box 性能不错，但这并不是选择它的核心理由。" },
                             { id: 'C', feedback: "正确！只有 Box 提供了 Z 轴堆叠能力。背景图、角标、悬浮按钮、Loading 遮罩等重叠式设计，都是 Box 的主场。" },
                             { id: 'D', feedback: "这是 BoxWithConstraints 的任务。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q4_DEFAULT':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 4/4</div>
                    <h2 className="text-2xl font-bold text-slate-800">默认的混乱</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        根据 Box 的默认行为，如果在其中放置一个<b>圆形图标</b>和一个<b>方形背景</b>，且不使用任何对齐修饰符，会发生什么？
                    </p>
                </div>

                <div className="flex justify-center gap-4 my-4">
                     {/* Visual hint */}
                     <div className="w-16 h-16 bg-white border border-slate-300 shadow-sm rounded-lg relative">
                        <Square size={16} className="absolute top-1 left-1 text-slate-300" />
                     </div>
                </div>

                 <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. 它们会并排显示，图标在左，背景在右。', correct: false },
                         { id: 'B', label: 'B. 圆形图标和方形背景都会出现在 Box 的左上角，互相重叠。', correct: true },
                         { id: 'C', label: 'C. 圆形图标会自动显示在方形背景的正中央。', correct: false },
                         { id: 'D', label: 'D. 方形背景会作为容器，圆形图标显示在背景内部的左上角。', correct: false }
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
                                : 'bg-white border-slate-200 hover:border-indigo-300'
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
                             { id: 'A', feedback: "Box 不会并排排列，那是 Row 的工作。" },
                             { id: 'B', feedback: "正确！Box 很“懒”，如果不指定位置，它会把所有孩子都扔到坐标原点 (0,0)，也就是左上角。" },
                             { id: 'C', feedback: "Box 不会自动居中，除非你设置 contentAlignment = Alignment.Center。" },
                             { id: 'D', feedback: "在 Compose 中，所有子元素都是平等的兄弟关系，都在同一个 Box 容器内，并没有谁包含谁的说法。" }
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
                    <LayoutTemplate className="w-32 h-32 text-indigo-400 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 animate-spin-slow">
                        <Sparkles className="text-yellow-200 w-12 h-12 fill-current" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-slate-800">三维布局大师！</h2>
                <p className="text-xl text-slate-600 max-w-lg">
                    恭喜你！你已经掌握了 <b>Box</b> 的所有秘密。<br/>
                    无论是图层堆叠、角标定位，还是尺寸计算，<br/>
                    你都能游刃有余了！
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-white border-2 border-indigo-200 text-indigo-600 rounded-full font-bold hover:bg-indigo-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 再玩一次
                    </button>
                     <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-600 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="你的布局工具箱里又多了一件神器！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <BoxFrame 
        title="1.2.3 Box 探险" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && currentStage !== 'ADVANCED_INTRO' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-indigo-100/50">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一步
                </button>

                {/* Logic Gates */}
                {currentStage === 'AVATAR_BUILDER' && (!hasAvatar || !hasBadge) ? (
                     <span className="text-indigo-400 font-bold text-sm">请先完成头像制作...</span>
                ) : currentStage === 'DEFAULT_ALIGNMENT' && alignment !== 'TopEnd' ? (
                     <span className="text-indigo-400 font-bold text-sm">请把红点移到右上角...</span>
                ) : currentStage.includes('Q') && !quizCorrect ? (
                     <span className="text-indigo-400 font-bold text-sm">答对挑战后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一步 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </BoxFrame>
  );
}
