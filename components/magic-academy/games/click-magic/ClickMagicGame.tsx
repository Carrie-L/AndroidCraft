
import React, { useState, useEffect } from 'react';
import MagicFrame from './components/MagicFrame';
import XiaoQi from './components/XiaoQi';
import { ClickMagicStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, CheckCircle, Home, Sparkles, MousePointerClick, Zap, AlertTriangle, Scan, Hand, Layers, Box } from 'lucide-react';

const STAGE_ORDER: ClickMagicStage[] = [
  'INTRO',
  'SPELL_THEORY',
  'MODIFIER_ORDER_LAB',
  'RIPPLE_SHAPE_LAB',
  'CONSTRUCTION_LAB',
  'ADVANCED_INTRO',
  'ADVANCED_Q1_PADDING',
  'ADVANCED_Q2_TARGET',
  'VICTORY'
];

interface ClickMagicGameProps {
  onExit: () => void;
}

// Helper for Code Block
const CodeBlock = ({ children }: { children?: React.ReactNode }) => (
  <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm text-slate-300 shadow-inner border border-slate-700 w-full max-w-xs mx-auto">
      {children}
  </div>
);

export default function ClickMagicGame({ onExit }: ClickMagicGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Lab States
  const [modifierOrder, setModifierOrder] = useState<'Correct' | 'Incorrect'>('Incorrect'); // For padding/size lab
  const [rippleOrder, setRippleOrder] = useState<'ClipFirst' | 'ClickFirst'>('ClickFirst'); // For shape lab
  const [rippleActive, setRippleActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Quiz State
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setQuizSelection(null);
      setQuizCorrect(false);
      // Reset lab states
      setModifierOrder('Incorrect');
      setRippleOrder('ClickFirst');
      setClickCount(0);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const resetGame = () => {
      setCurrentStageIndex(0);
      setModifierOrder('Incorrect');
      setRippleOrder('ClickFirst');
      setClickCount(0);
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  const triggerRipple = () => {
      setRippleActive(true);
      setClickCount(c => c + 1);
      setTimeout(() => setRippleActive(false), 400);
  };

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="relative">
                 <div className="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                 <MousePointerClick size={80} className="text-purple-600 relative z-10 drop-shadow-md" />
                 <div className="absolute -top-2 -right-2">
                     <Sparkles size={40} className="text-yellow-400 animate-bounce" />
                 </div>
            </div>
            
            <h2 className="text-4xl font-bold text-purple-800 mb-4 tracking-tight">让 UI 活起来！</h2>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              静态的画面虽然美，但只有能互动的 UI 才有灵魂。<br/>
              今天，我们要学习一个最简单却最强大的咒语：<br/>
              <code className="bg-purple-100 px-2 py-1 rounded text-purple-700 font-bold mx-1">.clickable</code>
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 开始施法
            </button>
            <XiaoQi emotion="excited" message="只需要一行代码，就能让任何东西响应你的手指！" />
          </div>
        );

      case 'SPELL_THEORY':
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">神奇的咒语：.clickable</h2>
                    <p className="text-slate-500">这个 Modifier 默默地为你做了三件事：</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-purple-50 flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <Scan size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">1. 监听触控</h3>
                        <p className="text-sm text-slate-500">捕捉手指按下和抬起的瞬间。</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-purple-50 flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                            <Zap size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">2. 执行逻辑</h3>
                        <p className="text-sm text-slate-500">当点击有效时，运行你写的代码。</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-purple-50 flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                            <div className="w-8 h-8 rounded-full border-2 border-current animate-ping"></div>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">3. 视觉反馈</h3>
                        <p className="text-sm text-slate-500">自动显示 Material Design 的水波纹效果。</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="smart" message="最酷的是，它证明了‘我听到了你的点击’！" />
                </div>
            </div>
        );

      case 'MODIFIER_ORDER_LAB':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">魔法的顺序至关重要</h2>
                    <p className="text-slate-500">Modifier 是按顺序执行的。.clickable 只能感知到它<b>之后</b>定义的区域。</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-8 rounded-3xl shadow-sm border-2 border-purple-50">
                    
                    {/* Code Controls */}
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <div className="flex gap-2 mb-2">
                            <button 
                                onClick={() => setModifierOrder('Incorrect')}
                                className={`flex-1 py-2 px-2 text-xs sm:text-sm rounded-lg font-bold transition-all ${modifierOrder === 'Incorrect' ? 'bg-red-100 text-red-600 border border-red-300' : 'bg-slate-100 text-slate-400'}`}
                            >
                                方案 A: 先 Padding
                            </button>
                            <button 
                                onClick={() => setModifierOrder('Correct')}
                                className={`flex-1 py-2 px-2 text-xs sm:text-sm rounded-lg font-bold transition-all ${modifierOrder === 'Correct' ? 'bg-green-100 text-green-600 border border-green-300' : 'bg-slate-100 text-slate-400'}`}
                            >
                                方案 B: 后 Padding
                            </button>
                        </div>

                        <CodeBlock>
                            {modifierOrder === 'Incorrect' ? (
                                <>
                                    <div>.padding(20.dp) <span className="text-slate-500">// 先加外边距</span></div>
                                    <div className="text-pink-400 font-bold">.clickable {'{ }'}</div>
                                    <div>.size(50.dp)</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-green-400 font-bold">.clickable {'{ }'}</div>
                                    <div>.padding(20.dp) <span className="text-slate-500">// 后加内边距</span></div>
                                    <div>.size(50.dp)</div>
                                </>
                            )}
                        </CodeBlock>
                    </div>

                    {/* Visualization */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-48 h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                            {/* Click Target Visualization */}
                            <div 
                                className={`absolute flex items-center justify-center transition-all duration-500 cursor-pointer
                                    ${modifierOrder === 'Incorrect' ? 'w-[50px] h-[50px]' : 'w-[90px] h-[90px]'}
                                    ${rippleActive ? 'bg-purple-200 scale-95' : 'hover:bg-purple-50'}
                                `}
                                style={{
                                    // Visualizing the touch area
                                    outline: '2px dashed rgba(168, 85, 247, 0.5)',
                                    outlineOffset: '2px'
                                }}
                                onClick={triggerRipple}
                            >
                                {rippleActive && <span className="text-[10px] text-purple-600 animate-ping">Click!</span>}
                            </div>

                            {/* The Actual Content Box */}
                            <div className="w-[50px] h-[50px] bg-blue-400 rounded-lg shadow-lg z-10 pointer-events-none flex items-center justify-center text-white text-xs">
                                Box
                            </div>

                            {/* Padding Visualization */}
                            <div className="absolute w-[90px] h-[90px] border border-blue-200 pointer-events-none flex items-start justify-start">
                                <span className="text-[8px] text-blue-300 bg-white px-1">Padding Area</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400">点击虚线框试试！</p>
                        
                        <div className={`text-sm font-bold px-4 py-2 rounded-full ${modifierOrder === 'Correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            点击区域大小: {modifierOrder === 'Correct' ? '90x90 (大!)' : '50x50 (小!)'}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi 
                        emotion={modifierOrder === 'Correct' ? "excited" : "confused"} 
                        message={modifierOrder === 'Correct' ? "太棒了！把 .clickable 放在前面，它就能‘吃’掉后面的 padding，让点击区域变大！" : "哎呀，Padding 加上了，但它是‘不可点击’的空白。很难点中哦！"} 
                    />
                </div>
            </div>
        );

      case 'RIPPLE_SHAPE_LAB':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">水波纹的形状</h2>
                    <p className="text-slate-500">如果卡片是圆角的，水波纹是方的会很丑。怎么修剪它？</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-white p-8 rounded-3xl shadow-sm border-2 border-purple-50">
                    
                    {/* Code Controls */}
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <div className="flex gap-2 mb-2">
                            <button 
                                onClick={() => setRippleOrder('ClickFirst')}
                                className={`flex-1 py-2 px-2 text-xs sm:text-sm rounded-lg font-bold transition-all ${rippleOrder === 'ClickFirst' ? 'bg-red-100 text-red-600 border border-red-300' : 'bg-slate-100 text-slate-400'}`}
                            >
                                先 Clickable
                            </button>
                            <button 
                                onClick={() => setRippleOrder('ClipFirst')}
                                className={`flex-1 py-2 px-2 text-xs sm:text-sm rounded-lg font-bold transition-all ${rippleOrder === 'ClipFirst' ? 'bg-green-100 text-green-600 border border-green-300' : 'bg-slate-100 text-slate-400'}`}
                            >
                                先 Clip
                            </button>
                        </div>

                        <CodeBlock>
                            {rippleOrder === 'ClickFirst' ? (
                                <>
                                    <div className="text-red-400 font-bold">.clickable {'{ }'}</div>
                                    <div>.clip(RoundedCorner(16.dp))</div>
                                    <div>.size(100.dp)</div>
                                    <div>.background(Pink)</div>
                                </>
                            ) : (
                                <>
                                    <div>.clip(RoundedCorner(16.dp))</div>
                                    <div className="text-green-400 font-bold">.clickable {'{ }'}</div>
                                    <div>.size(100.dp)</div>
                                    <div>.background(Pink)</div>
                                </>
                            )}
                        </CodeBlock>
                    </div>

                    {/* Visualizer */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* The Card */}
                        <div 
                            onClick={triggerRipple}
                            className="w-full h-full bg-pink-400 rounded-3xl shadow-lg cursor-pointer relative overflow-visible"
                        >
                            {/* Ripple Simulation */}
                            {rippleActive && (
                                <div className={`absolute inset-0 bg-white/30 animate-ping-slow ${rippleOrder === 'ClipFirst' ? 'rounded-3xl' : 'rounded-none scale-125'}`}></div>
                            )}
                            
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                Tap Me
                            </div>
                        </div>
                        
                        {/* Overflow Warning */}
                        {rippleOrder === 'ClickFirst' && rippleActive && (
                            <div className="absolute -bottom-8 text-xs text-red-500 font-bold animate-bounce">
                                溢出了！水波纹是方的！
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi 
                        emotion={rippleOrder === 'ClipFirst' ? "happy" : "confused"} 
                        message={rippleOrder === 'ClipFirst' ? "完美！先裁剪画布(Clip)，再施加魔法(Clickable)，水波纹就会顺着形状流动。" : "好痛！水波纹把圆角都刺破了。"} 
                    />
                </div>
            </div>
        );

      case 'CONSTRUCTION_LAB':
          // Just a summary card for best practice
          return (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">打造完美的列表项</h2>
                    <p className="text-slate-500">结合所有知识，这是 Google 推荐的黄金法则。</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-purple-100 max-w-2xl mx-auto">
                    <div className="font-mono text-sm space-y-2">
                        <div className="text-slate-400">// 完美的 Modifier 链条</div>
                        <div>Modifier</div>
                        <div className="pl-4 text-slate-600">.fillMaxWidth()</div>
                        <div className="pl-4 text-purple-600 font-bold">.clip(RoundedCornerShape(12.dp)) <span className="text-slate-400 text-xs">// 1. 先定形状</span></div>
                        <div className="pl-4 text-pink-500 font-bold">.clickable {'{ ... }'} <span className="text-slate-400 text-xs">// 2. 再加点击</span></div>
                        <div className="pl-4 text-blue-500 font-bold">.padding(16.dp) <span className="text-slate-400 text-xs">// 3. 最后加内边距 (被包含在点击区域内)</span></div>
                    </div>

                    <div className="mt-8 border-t pt-6 flex justify-center">
                        <div 
                            className="w-full bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-100 active:bg-purple-50 transition-colors relative overflow-hidden group"
                            onClick={() => setClickCount(c => c + 1)}
                        >   
                            {/* Ripple visualizer for demo */}
                            <div className="absolute inset-0 bg-purple-200 opacity-0 group-active:opacity-20 transition-opacity"></div>

                            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-600">
                                <Hand size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-slate-700">点击我试试</div>
                                <div className="text-xs text-slate-500">我有完美的触摸反馈和点击区域</div>
                            </div>
                            <div className="text-purple-500 font-bold">{clickCount > 0 ? `Clicked ${clickCount}` : ''}</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="smart" message="记住这个顺序：Clip -> Clickable -> Padding。这是通往流畅体验的秘钥！" />
                </div>
            </div>
          );

      case 'ADVANCED_INTRO':
        return (
              <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-12">
                  <div className="relative group cursor-pointer" onClick={nextStage}>
                      <div className="absolute inset-0 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity"></div>
                      <div className="w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full flex items-center justify-center border-4 border-white shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                          <Zap size={64} className="text-purple-600 group-hover:hidden transition-all" />
                          <Sparkles size={80} className="text-yellow-400 hidden group-hover:block animate-spin-slow drop-shadow-md" />
                      </div>
                  </div>

                  <div className="space-y-4 max-w-md">
                      <h2 className="text-3xl font-bold text-slate-800">进阶挑战</h2>
                      <p className="text-slate-600 text-lg">
                          原理学会了吗？<br/>
                          来解决两个真实的开发难题吧！
                      </p>
                  </div>

                  <button 
                    onClick={nextStage}
                    className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                  >
                      <Zap size={24} /> 接受挑战
                  </button>
              </div>
          );

      case 'ADVANCED_Q1_PADDING':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 1/2</div>
                    <h2 className="text-2xl font-bold text-slate-800">消失的点击区域</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        一位开发者发现，在一个组件上使用了 <code className="bg-slate-100 px-1 rounded font-mono text-slate-700">.padding(16.dp).clickable {'{ }'}.size(50.dp)</code> 后，
                        周围 16.dp 的空白区域<b>无法响应点击</b>。<br/>
                        根本原因是什么？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. .clickable 修饰符只对在它**之后**定义的修饰符所确定的区域生效。', correct: true },
                         { id: 'B', label: 'B. 无论 Padding 相对于 .clickable 的位置如何，它总是创建一个不可交互的边距。', correct: false },
                         { id: 'C', label: 'C. 需要一个单独的 .touchTarget() 修饰符才能让 Padding 区域可交互。', correct: false },
                         { id: 'D', label: 'D. .size() 修饰符优先级更高，将触摸目标限制在其尺寸内。', correct: false }
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
                                : 'bg-white border-slate-200 hover:border-purple-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        <CheckCircle size={20} className={`shrink-0 mt-0.5 ${quizCorrect ? 'block' : 'hidden'}`}/> 
                        <AlertTriangle size={20} className={`shrink-0 mt-0.5 ${quizCorrect ? 'hidden' : 'block'}`}/>
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "回答正确！修饰符链是顺序处理的；.clickable 只知道在它之后声明的 size(50.dp) 区域，而将前面的 .padding 视为外部边距。" },
                             { id: 'B', feedback: "不正确。如果 Padding 放在 .clickable **之后**，它就会变成可点击区域的一部分。" },
                             { id: 'C', feedback: "不正确。如果顺序正确，Padding 本身就可以扩大交互区域。" },
                             { id: 'D', feedback: "不正确。Size 没有特权，顺序才是关键。" }
                           ].find(o => o.id === quizSelection)?.feedback}
                        </p>
                    </div>
                )}
            </div>
         );

      case 'ADVANCED_Q2_TARGET':
         return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mb-2">进阶挑战 2/2</div>
                    <h2 className="text-2xl font-bold text-slate-800">扩大触摸目标</h2>
                    <p className="text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 mt-4">
                        如果开发者希望一个图标视觉上是 <b>30x30dp</b>，但拥有更易于点击的 <b>50x50dp</b> 触摸区域，
                        哪条 Modifier 链是正确的？
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     {[
                         { id: 'A', label: 'A. .clickable { }.padding(10.dp).size(30.dp)', correct: true },
                         { id: 'B', label: 'B. .padding(10.dp).clickable { }.size(30.dp)', correct: false },
                         { id: 'C', label: 'C. .size(50.dp).clickable { }', correct: false },
                         { id: 'D', label: 'D. .size(30.dp).clickable { }.padding(10.dp)', correct: false }
                     ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all font-bold text-sm font-mono ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : 'bg-white border-slate-200 hover:border-purple-300'
                            }`}
                         >
                             {opt.label}
                         </button>
                     ))}
                </div>
                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                        <CheckCircle size={20} className={`shrink-0 mt-0.5 ${quizCorrect ? 'block' : 'hidden'}`}/> 
                        <AlertTriangle size={20} className={`shrink-0 mt-0.5 ${quizCorrect ? 'hidden' : 'block'}`}/>
                        <p className="text-sm leading-relaxed">
                           {[
                             { id: 'A', feedback: "正确！首先应用点击监听器，然后向内添加 Padding，最后设置内容大小。因此监听器覆盖了内容 (30dp) 加上周围的 Padding (四周各 10dp)。" },
                             { id: 'B', feedback: "不正确。这会让 Padding 变成外部边距，所以点击区域只有 30dp。" },
                             { id: 'C', feedback: "不正确。这会让视觉尺寸也变成 50dp。" },
                             { id: 'D', feedback: "不正确。点击区域将是 30dp，Padding 虽然加在里面，但不会影响在它之前定义的点击监听器范围。" }
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
                    <MousePointerClick className="w-32 h-32 text-purple-400 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 animate-spin-slow">
                        <Sparkles className="text-yellow-200 w-12 h-12 fill-current" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-purple-800">交互魔法大师！</h2>
                <p className="text-xl text-slate-600 max-w-lg">
                    恭喜你！你已经掌握了 <b>Modifier.clickable</b> 的精髓。<br/>
                    无论是扩大点击区域，还是定制水波纹，<br/>
                    你的应用现在不仅好看，而且好用！
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-white border-2 border-purple-200 text-purple-600 rounded-full font-bold hover:bg-purple-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 再玩一次
                    </button>
                     <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="你的指尖充满了魔力！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <MagicFrame 
        title="1.4.1 交互魔法" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && currentStage !== 'ADVANCED_INTRO' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-purple-100">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-slate-400 hover:text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一步
                </button>

                {/* Logic Gates */}
                {currentStage.includes('LAB') && currentStage === 'MODIFIER_ORDER_LAB' && modifierOrder === 'Incorrect' ? (
                     <span className="text-purple-400 font-bold text-sm">请找到让点击区域变大的方案...</span>
                ) : currentStage.includes('Q') && !quizCorrect ? (
                     <span className="text-purple-400 font-bold text-sm">答对挑战后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-purple-600 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一步 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </MagicFrame>
  );
}
