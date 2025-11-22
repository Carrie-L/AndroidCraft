
import React, { useState } from 'react';
import CampFrame from './components/CampFrame';
import XiaoQi from './components/XiaoQi';
import { RowStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, AlignHorizontalSpaceAround, CheckCircle, Heart, Fish, Trees, Mountain, Smile, Home, Sparkles } from 'lucide-react';

const STAGE_ORDER: RowStage[] = [
  'INTRO',
  'CHAOS_QUEUE',
  'ROW_SPELL',
  'BASELINE_ALIGN',
  'OVERFLOW_LIMIT',
  'CODE_QUIZ',
  'VISUAL_QUIZ',
  'VICTORY'
];

interface RowAdventureGameProps {
  onExit: () => void;
}

export default function RowAdventureGame({ onExit }: RowAdventureGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Game States
  const [isRowApplied, setIsRowApplied] = useState(false);
  const [isBaselineAligned, setIsBaselineAligned] = useState(false);
  const [catCount, setCatCount] = useState(1); // For overflow demo
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      // Reset local states
      setQuizSelection(null);
      setQuizCorrect(false);
      // Preserve some states if moving forward makes sense, otherwise reset
      if (currentStage === 'CHAOS_QUEUE') setIsRowApplied(false); 
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const resetGame = () => {
      setCurrentStageIndex(0);
      setIsRowApplied(false);
      setIsBaselineAligned(false);
      setCatCount(1);
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  // Render Content
  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="relative">
                 <div className="absolute inset-0 bg-[#E07A5F] rounded-full blur-2xl opacity-30 animate-pulse"></div>
                 <Fish size={80} className="text-[#E07A5F] relative z-10 drop-shadow-md" />
            </div>
            
            <h2 className="text-4xl font-bold text-[#264653] mb-2">排队领小鱼干！</h2>
            <div className="flex gap-2 text-[#2A9D8F] justify-center mb-4">
                <Trees size={20} />
                <span className="font-bold tracking-widest text-sm uppercase">Jetpack Compose 露营课</span>
                <Trees size={20} />
            </div>

            <p className="text-lg text-[#6B705C] max-w-lg leading-relaxed bg-[#FFFBF0] p-6 rounded-2xl border-2 border-[#DDBEA9] shadow-sm">
               欢迎来到魔法露营地！<br/>
               今天，小奇要带你学习一个超级有用的咒语 <b>Row</b>，<br/>
               让所有东西都整整齐齐地横向排好队。
            </p>

            <button 
                onClick={nextStage}
                className="px-8 py-3 bg-[#E07A5F] text-white rounded-full text-lg font-bold shadow-md hover:bg-[#D06A4F] hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-1"
            >
                <Play size={20} fill="currentColor" /> 开始排队
            </button>
            <XiaoQi emotion="excited" message="准备好了吗？跟我一起学习怎么用 `Row` 咒语吧！喵~" />
          </div>
        );

      case 'CHAOS_QUEUE':
        return (
           <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#264653]">哎呀，东西都乱成一团了！</h2>
                    <p className="text-[#6B705C]">如果我们不告诉它们怎么站队，它们就像这样挤在一起。</p>
                </div>

                <div className="flex justify-center py-8">
                    <div className="w-64 h-48 bg-white border-4 border-[#DDBEA9] rounded-2xl relative shadow-inner flex items-center justify-center overflow-hidden">
                         {/* Overlapping Chaos */}
                         <div className="absolute transition-all duration-500 transform scale-110 opacity-90">
                             <Heart fill="#E63946" className="text-[#E63946] w-16 h-16 drop-shadow-md" />
                         </div>
                         <div className="absolute transition-all duration-500 transform translate-x-2 translate-y-2 font-bold text-4xl text-[#264653] opacity-90 drop-shadow-sm">
                             1024
                         </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="confused" message="这可不行！点赞按钮需要一个爱心和数字手拉手站成一排才对呀。" />
                </div>
            </div>
        );

      case 'ROW_SPELL':
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#264653]">发现新咒语：Row !</h2>
                    <p className="text-[#6B705C]">Row 的使命非常简单：让子元素沿水平方向（从左到右）依次排队。</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                     
                     {/* Code Block */}
                     <div className="flex flex-col gap-4 w-full max-w-xs">
                         <div className="bg-[#264653] p-5 rounded-xl font-mono text-sm text-[#E9C46A] shadow-lg border-b-4 border-[#1D3540]">
                             {isRowApplied ? (
                                 <>
                                    <span className="text-[#F4A261]">Row</span> {'{'} <br/>
                                    <span className="pl-4 text-white">Icon(Heart)</span><br/>
                                    <span className="pl-4 text-white">Text("1024")</span><br/>
                                    {'}'}
                                 </>
                             ) : (
                                 <>
                                     <span className="text-gray-500">// 缺少容器...</span><br/>
                                     <span className="text-white">Icon(Heart)</span><br/>
                                     <span className="text-white">Text("1024")</span>
                                 </>
                             )}
                         </div>
                         
                         <button 
                             onClick={() => setIsRowApplied(!isRowApplied)}
                             className={`py-3 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${isRowApplied ? 'bg-[#E07A5F] text-white' : 'bg-white border-2 border-[#264653] text-[#264653] hover:bg-[#F0F7F0]'}`}
                         >
                             {isRowApplied ? <RefreshCw size={18}/> : <AlignHorizontalSpaceAround size={18}/>}
                             {isRowApplied ? "重置" : "念出咒语 Row"}
                         </button>
                     </div>

                     {/* Visual Result */}
                     <div className="w-64 h-48 bg-white border-4 border-[#DDBEA9] rounded-2xl relative shadow-inner flex items-center justify-center transition-all duration-500">
                         {isRowApplied ? (
                             <div className="flex flex-row items-center gap-2 animate-slide-up">
                                 <Heart fill="#E63946" className="text-[#E63946] w-10 h-10" />
                                 <span className="font-bold text-3xl text-[#264653]">1024</span>
                             </div>
                         ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute">
                                    <Heart fill="#E63946" className="text-[#E63946] w-16 h-16 opacity-80" />
                                </div>
                                <div className="absolute translate-x-2 translate-y-2 font-bold text-4xl text-[#264653] opacity-80">
                                    1024
                                </div>
                            </div>
                         )}
                     </div>
                </div>
                 
                 <div className="flex justify-center mt-4">
                    <XiaoQi emotion={isRowApplied ? "excited" : "happy"} message={isRowApplied ? "成功了！你看，它们自动排在了右边。秩序井然！" : "试试点击按钮，看看 Row 怎么施法！"} />
                </div>
            </div>
        );

      case 'BASELINE_ALIGN':
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#264653]">贴心小魔法：文字的“基线对齐”</h2>
                    <p className="text-[#6B705C]">当字号大小不一时，简单的“顶部对齐”会很难看。<br/>Row 默认会让文字的“脚脚”（基线）踩在同一条线上。</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Bad Alignment */}
                    <div className={`bg-white p-6 rounded-2xl border-4 border-red-200 flex flex-col items-center gap-4 transition-opacity duration-500 ${isBaselineAligned ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                        <div className="text-red-400 font-bold text-sm uppercase tracking-wider">Alignment.Top (Bad)</div>
                        <div className="flex flex-row items-start bg-[#F8F9FA] p-4 rounded-xl w-full justify-center h-32 overflow-hidden relative">
                            {/* Ruler Line for top */}
                            <div className="absolute top-[1rem] left-0 w-full h-[1px] bg-red-300 border-t border-dashed border-red-400 z-0"></div>
                            
                            <span className="text-6xl font-bold text-[#264653] leading-none z-10">你好</span>
                            <span className="text-2xl text-[#6B705C] leading-none z-10">世界</span>
                        </div>
                        <div className="text-red-500 font-bold text-6xl">✕</div>
                    </div>

                    {/* Good Alignment */}
                    <div className={`bg-white p-6 rounded-2xl border-4 transition-all duration-500 flex flex-col items-center gap-4 ${isBaselineAligned ? 'border-green-400 scale-105 shadow-xl' : 'border-[#E9C46A]'}`}>
                         <div className="text-green-600 font-bold text-sm uppercase tracking-wider">ByBaseline (Good)</div>
                         <div className="flex flex-row items-baseline bg-[#F8F9FA] p-4 rounded-xl w-full justify-center h-32 overflow-hidden relative">
                            {/* Ruler Line for baseline */}
                            <div className="absolute bottom-[28px] left-0 w-full h-[2px] bg-blue-400 z-0 flex items-center justify-end pr-3">
                                <div className="bg-blue-100 px-1.5 py-0.5 rounded shadow-sm -translate-y-1/2 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                    <span className="text-[10px] font-bold text-blue-600 leading-none">基线 (Baseline)</span>
                                </div>
                            </div>

                            <span className="text-6xl font-bold text-[#264653] z-10 leading-none">你好</span>
                            <span className="text-2xl text-[#6B705C] z-10 leading-none">世界</span>
                        </div>
                         <button 
                             onClick={() => setIsBaselineAligned(!isBaselineAligned)}
                             className={`mt-2 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 ${isBaselineAligned ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                         >
                             {isBaselineAligned ? <CheckCircle size={16}/> : <AlignHorizontalSpaceAround size={16}/>}
                             {isBaselineAligned ? "已对齐" : "开启基线对齐"}
                         </button>
                    </div>

                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="smart" message="基线就是写英文字母时的那条红线。对齐它，阅读体验才流畅！" />
                </div>
            </div>
        );

      case 'OVERFLOW_LIMIT':
        const isOverflowing = catCount > 6;
        return (
             <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#264653]">哎呀，队伍太长，溢出啦！</h2>
                    <p className="text-[#6B705C]">Row 只负责排列，<b>不具备滚动功能</b>。超出屏幕宽度的猫咪会掉出去！</p>
                </div>
                
                <div className="relative w-full overflow-hidden bg-white border-4 border-[#264653] rounded-2xl h-40 flex items-center px-4 shadow-inner max-w-2xl mx-auto">
                     {/* The Clipping Boundary Indicator */}
                     <div className="absolute right-0 top-0 h-full w-4 bg-red-500/20 border-l-2 border-red-500 border-dashed flex items-center justify-center z-20">
                        <span className="text-[10px] text-red-600 font-bold -rotate-90 whitespace-nowrap">SCREEN EDGE</span>
                     </div>

                     <div className="flex flex-row gap-2 items-center">
                         {Array.from({ length: catCount }).map((_, i) => (
                             <div key={i} className="flex flex-col items-center min-w-[60px] animate-pop-in">
                                 <div className="w-12 h-12 rounded-full bg-[#FFB5A7] border-2 border-[#F28482] flex items-center justify-center text-xl shadow-sm">
                                     🐱
                                 </div>
                                 <span className="text-xs font-mono text-gray-500 mt-1">Cat {i+1}</span>
                             </div>
                         ))}
                     </div>
                </div>

                <div className="flex justify-center gap-4">
                     <button 
                        onClick={() => setCatCount(prev => prev + 1)}
                        className="px-6 py-3 bg-[#2A9D8F] text-white rounded-full font-bold shadow hover:bg-[#21867A] flex items-center gap-2"
                     >
                         + 再来一只猫
                     </button>
                     <button 
                        onClick={() => setCatCount(1)}
                        className="px-6 py-3 bg-[#E9C46A] text-[#264653] rounded-full font-bold shadow hover:bg-[#D4B05B]"
                     >
                         重置队伍
                     </button>
                </div>

                {isOverflowing && (
                    <div className="w-full max-w-2xl mx-auto space-y-4">
                         <div className="flex justify-center animate-bounce">
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold border border-red-200 shadow-sm">
                                ⚠️ 警告：后面的猫咪看不见了！它们被裁剪（Clipped）了。
                            </div>
                        </div>

                        {/* Solution Card */}
                        <div className="bg-[#FFFBF0] p-6 rounded-2xl border-2 border-[#E07A5F] shadow-sm animate-fade-in text-left">
                            <h3 className="font-bold text-[#E07A5F] flex items-center gap-2 mb-4">
                                <Sparkles size={20} /> 魔法师的锦囊：如何解决？
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-[#DDBEA9] hover:shadow-md transition-shadow">
                                    <div className="font-bold text-[#264653] mb-2 flex items-center gap-2">
                                        <span className="bg-[#2A9D8F] text-white text-xs px-2 py-0.5 rounded-full">方案 A</span>
                                        简单滚动
                                    </div>
                                    <code className="block bg-gray-100 p-2 rounded text-xs font-mono text-gray-600 mb-2">Modifier.horizontalScroll()</code>
                                    <p className="text-xs text-[#6B705C] leading-relaxed">给 Row 加上“滚动光环”，适合内容不多的情况。</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-[#DDBEA9] hover:shadow-md transition-shadow">
                                    <div className="font-bold text-[#264653] mb-2 flex items-center gap-2">
                                        <span className="bg-[#E07A5F] text-white text-xs px-2 py-0.5 rounded-full">方案 B</span>
                                        无限列表
                                    </div>
                                    <code className="block bg-gray-100 p-2 rounded text-xs font-mono text-gray-600 mb-2">LazyRow</code>
                                    <p className="text-xs text-[#6B705C] leading-relaxed">更智能、性能更好，适合海量数据（如几千只猫咪）的队伍。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center">
                     <XiaoQi emotion={isOverflowing ? "confused" : "happy"} message={isOverflowing ? "糟糕！后面的小伙伴掉到屏幕外面去了！" : "继续加猫咪，看看会发生什么？"} />
                </div>
            </div>
        );

      case 'CODE_QUIZ':
        return (
             <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#264653]">考验一：代码填空</h2>
                    <p className="text-[#6B705C]">
                        你想做一个“点赞按钮”，左边是心形图标，右边是数字。<br/>
                        应该用什么容器包裹它们？
                    </p>
                </div>

                <div className="bg-[#264653] p-6 rounded-2xl text-[#E9C46A] font-mono text-sm shadow-lg border-b-4 border-[#1D3540] relative">
                    <div className="absolute -top-3 -left-3 bg-[#E07A5F] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">Quiz</div>
                    <div className="flex items-center gap-2">
                        <span className="bg-white/10 px-2 py-1 rounded min-w-[80px] text-center border border-dashed border-white/50 text-white font-bold">
                             {quizSelection ? quizSelection : "?????"}
                        </span>
                        <span>{'{'}</span>
                    </div>
                    <div className="pl-8 text-white">Icon(...)</div>
                    <div className="pl-8 text-white">Text("1024")</div>
                    <div>{'}'}</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {['Column', 'Row', 'Box'].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => {
                                setQuizSelection(opt);
                                setQuizCorrect(opt === 'Row');
                            }}
                            className={`py-4 rounded-xl font-bold border-2 transition-all ${
                                quizSelection === opt 
                                ? (opt === 'Row' ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]' : 'bg-red-100 text-red-700 border-red-300')
                                : 'bg-white border-[#DDBEA9] text-[#6B705C] hover:bg-[#F0F7F0]'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-start animate-fade-in ${quizCorrect ? 'bg-[#D8EAD3] text-[#2A5D34]' : 'bg-red-50 text-red-800'}`}>
                        {quizCorrect ? <CheckCircle size={20} /> : <Mountain size={20} />}
                        <p className="mt-0.5 font-bold">
                            {quizCorrect 
                                ? "正确！图标和文字是左右水平排列的，所以当然要用负责水平排列的 `Row` 啦！" 
                                : "不对哦。想想看，Column 是垂直的，Box 是堆叠的。我们要的是左右排列。"}
                        </p>
                    </div>
                )}
             </div>
        );

      case 'VISUAL_QUIZ':
        return (
             <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#264653]">考验二：视觉预测</h2>
                    <p className="text-[#6B705C]">
                        如果在 `Row` 里放了三个 Text，分别是 "A", "B", "C"。<br/>
                        它们会怎么显示？
                    </p>
                </div>

                 <div className="bg-[#FFFBF0] p-4 rounded-xl border-2 border-[#E9C46A] font-mono text-sm text-[#264653]">
                    Row {'{'} Text("A"); Text("B"); Text("C") {'}'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { id: 'A', label: '垂直排列', content: <div className="flex flex-col gap-1 font-bold text-[#264653]"><span>A</span><span>B</span><span>C</span></div>, correct: false },
                        { id: 'B', label: '水平排列', content: <div className="flex flex-row gap-4 font-bold text-[#264653]"><span>A</span><span>B</span><span>C</span></div>, correct: true },
                        { id: 'C', label: '重叠', content: <div className="relative w-8 h-8 font-bold text-[#264653]"><span className="absolute left-0 top-0">A</span><span className="absolute left-1 top-1 opacity-70">B</span><span className="absolute left-2 top-2 opacity-50">C</span></div>, correct: false },
                    ].map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`aspect-square rounded-2xl border-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'border-[#2A9D8F] bg-[#E9F5F3]' : 'border-red-300 bg-red-50')
                                : 'border-[#DDBEA9] bg-white hover:bg-[#FAF9F6]'
                            }`}
                        >
                            <div className="bg-[#F4A261]/20 p-4 rounded-lg">
                                {opt.content}
                            </div>
                            <span className="text-xs font-bold text-[#6B705C]">{opt.label}</span>
                        </button>
                    ))}
                </div>

                 {quizSelection && (
                    <div className={`p-4 rounded-xl flex gap-3 items-center justify-center animate-fade-in ${quizCorrect ? 'bg-[#D8EAD3] text-[#2A5D34]' : 'bg-red-50 text-red-800'}`}>
                         <XiaoQi emotion={quizCorrect ? "smart" : "confused"} message={quizCorrect ? "完全正确！Row 的核心工作就是把孩子们从左到右一个一个放好。" : "再想想 Row 的定义：水平方向（Horizontal）排列哦。"} />
                    </div>
                )}
             </div>
        );

      case 'VICTORY':
        return (
             <div className="flex flex-col items-center text-center space-y-8 animate-scale-in py-10">
                <div className="relative">
                     <div className="absolute inset-0 bg-[#F2CC8F] rounded-full blur-xl opacity-50"></div>
                     <AlignHorizontalSpaceAround size={100} className="text-[#E07A5F] relative z-10" />
                     <div className="absolute -top-2 -right-2 animate-bounce">
                        <Smile size={40} className="text-[#2A9D8F] fill-[#D8EAD3]" />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-[#264653]">Row 魔法掌控！</h2>
                <div className="flex items-center gap-2 bg-[#FFFBF0] px-4 py-2 rounded-full border border-[#DDBEA9] shadow-sm">
                     <Fish size={18} className="text-[#E07A5F]" />
                     <Fish size={18} className="text-[#E07A5F]" />
                     <Fish size={18} className="text-[#E07A5F]" />
                     <span className="text-[#6B705C] font-bold text-sm">小鱼干已领到</span>
                </div>

                <p className="text-xl text-[#6B705C] max-w-lg">
                    恭喜你，大法师！<br/>
                    你已经学会了用 <b>Row</b> 让万物并肩站立。<br/>
                    未来的 Compose 冒险之旅，还有更多神奇的咒语等着你！
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame} 
                        className="px-8 py-3 bg-white border-2 border-[#E07A5F] text-[#E07A5F] rounded-full font-bold hover:bg-[#FFF5F2] flex items-center gap-2"
                    >
                        <RefreshCw size={18} /> 再露营一次
                    </button>
                    <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-[#2A9D8F] text-white rounded-full font-bold hover:bg-[#21867A] shadow-sm flex items-center gap-2"
                    >
                        <Home size={18} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="下次我们也许可以学学怎么让 Row 滚动起来？喵~" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <CampFrame 
        title="1.2.2 Row 露营" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Navigation Footer */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t-2 border-[#DDBEA9]/30">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-[#6B705C] hover:text-[#264653] font-bold px-4 py-2 rounded-lg hover:bg-[#F4F1EA] transition-colors"
                >
                    <ArrowLeft size={20} /> 上一步
                </button>

                {/* Logic Gates for Progression */}
                {currentStage === 'ROW_SPELL' && !isRowApplied ? (
                     <span className="text-[#E07A5F] opacity-80 font-bold text-sm animate-pulse">请先念出咒语...</span>
                ) : currentStage === 'CODE_QUIZ' && !quizCorrect ? (
                     <span className="text-[#E07A5F] opacity-80 font-bold text-sm">答对后继续...</span>
                ) : currentStage === 'VISUAL_QUIZ' && !quizCorrect ? (
                     <span className="text-[#E07A5F] opacity-80 font-bold text-sm">答对后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-[#264653] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-[#1D3540] hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一步 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </CampFrame>
  );
}
