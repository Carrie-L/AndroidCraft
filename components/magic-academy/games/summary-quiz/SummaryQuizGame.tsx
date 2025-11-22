
import React, { useState } from 'react';
import ExamFrame from './components/ExamFrame';
import XiaoQi from './components/XiaoQi';
import { QuizStage } from './types';
import { ArrowRight, Play, RefreshCw, CheckCircle, AlertTriangle, Home, Star, Award, BookOpen } from 'lucide-react';

interface SummaryQuizGameProps {
  onExit: () => void;
}

// Question Data Structure
interface Question {
    id: number;
    question: string;
    code?: string;
    options: { id: string, text: string, isCorrect: boolean, feedback: string }[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "假设父容器的最大宽度为 300dp，其子组件设置了 `Modifier.fillMaxWidth(0.5f)`，那么这个子组件的宽度是多少？",
        options: [
            { id: 'A', text: '300dp', isCorrect: false, feedback: "不对，这是 fillMaxWidth(1.0f) 的结果。" },
            { id: 'B', text: '取决于屏幕宽度的一半', isCorrect: false, feedback: "不太对。这是一个常见的误解，fillMaxWidth 是相对于其直接父容器的约束，而不是整个屏幕。" },
            { id: 'C', text: '等于其内容的宽度', isCorrect: false, feedback: "fillMaxWidth 会强制改变宽度，不再是 wrapContent。" },
            { id: 'D', text: '150dp', isCorrect: true, feedback: "正确答案！子组件获取父容器允许的最大宽度 (300dp)，并乘以比例因子 0.5f，即 300 * 0.5 = 150dp。" },
        ]
    },
    {
        id: 2,
        question: "根据 Compose 的布局原则，如果一个子组件通过 `Modifier.width(400.dp)` 请求了比父容器（宽度仅为 250dp）更大的宽度，最终会发生什么？",
        options: [
            { id: 'A', text: '应用程序会因为布局约束冲突而崩溃。', isCorrect: false, feedback: "Compose 布局系统非常健壮，通常不会因为这种约束冲突而崩溃。" },
            { id: 'B', text: '子组件会保持 400dp 的宽度，并超出父容器的边界。', isCorrect: false, feedback: "不太对。在标准的 Compose 布局模型中，子组件不能超出父组件施加的约束边界。" },
            { id: 'C', text: '子组件的宽度将被强制约束（Coerced）为 250dp。', isCorrect: true, feedback: "正确答案！父容器的约束是硬性规定。即使子组件要求更大的尺寸，它也只能在父容器给定的最大尺寸内布局。" },
            { id: 'D', text: '父容器会自动扩大到 400dp 以容纳子组件。', isCorrect: false, feedback: "父容器的尺寸通常由其自身的父级决定，不会被子级随意撑大（除非父级本身是 wrapContent 且有空间）。" },
        ]
    },
    {
        id: 3,
        question: "在 Compose 布局的“父子谈判”模型中，父组件 (Parent) 的核心职责是什么？",
        options: [
            { id: 'A', text: '强制子组件使用与父组件完全相同的尺寸。', isCorrect: false, feedback: "那是 fillMaxSize 的行为，不是默认职责。" },
            { id: 'B', text: '精确决定子组件的最终尺寸 (Size)。', isCorrect: false, feedback: "不太对。父组件提供的是一个范围，而最终尺寸是由子组件在该范围内选择的，除非子组件的选择超出了范围。" },
            { id: 'C', text: '向子组件传递一个尺寸约束范围 (Constraints)。', isCorrect: true, feedback: "正确答案！父组件通过定义最小和最大尺寸来设定规则，子组件在此规则内决定自己的大小，这正是约束传递的核心。" },
            { id: 'D', text: '将子组件放置在屏幕的绝对坐标 (0, 0) 位置。', isCorrect: false, feedback: "这是布局阶段的放置（Placement），而且通常不是 (0,0)。" },
        ]
    },
    {
        id: 4,
        question: "一个父容器 `Box` 的尺寸是 `120.dp` 宽，`200.dp` 高。如果它的子组件使用了 `Modifier.size(150.dp)`，那么该子组件最终的实际尺寸会是多少？",
        options: [
            { id: 'A', text: '宽度 120dp，高度 150dp。', isCorrect: true, feedback: "回答正确！子组件想要的宽度 (150dp) 超出了父组件的最大宽度约束 (120dp)，因此宽度被强制约束为 120dp。高度 (150dp) 在父组件的最大高度约束 (200dp) 之内，所以被采纳。" },
            { id: 'B', text: '宽度 120dp，高度 200dp。', isCorrect: false, feedback: "高度并没有超出限制，不需要被强制为 200dp。" },
            { id: 'C', text: '程序会因为约束冲突而崩溃。', isCorrect: false, feedback: "Compose 会自动解决约束冲突。" },
            { id: 'D', text: '宽度 150dp，高度 150dp。', isCorrect: false, feedback: "宽度超出了 120dp 的限制。" },
        ]
    },
    {
        id: 5,
        question: "在 Compose 中，如果一个 `Text` 组件没有添加任何尺寸相关的 `Modifier` (如 `.size`, `.fillMaxWidth` 等)，它的尺寸将如何确定？",
        options: [
            { id: 'A', text: '尺寸将为 0dp x 0dp，导致其不可见。', isCorrect: false, feedback: "Text 有内容时不会是 0。" },
            { id: 'B', text: '根据其内容（文字的多少）来决定大小，即“包裹内容”。', isCorrect: true, feedback: "回答正确！这是 Compose 组件的默认行为，尺寸会根据其内在内容自适应，只要不超过父级的约束。" },
            { id: 'C', text: '强制拉伸以填满父容器的所有可用空间。', isCorrect: false, feedback: "这是 fillMaxSize 的行为。" },
            { id: 'D', text: '采用一个系统预设的最小点击目标尺寸，例如 48dp x 48dp。', isCorrect: false, feedback: "Text 默认没有最小点击尺寸。" },
        ]
    },
    {
        id: 6,
        question: "根据源码中关于链式调用的建议，以下哪种 `Modifier` 写法最符合直觉且是推荐的实践？",
        options: [
            { id: 'A', text: 'Modifier.size(100.dp).padding(8.dp)', isCorrect: true, feedback: "回答正确！先用 `size` 明确定义组件的核心尺寸，然后再用 `padding` 在其外部添加间距，这种顺序更符合从内到外的思维模型。" },
            { id: 'B', text: 'Modifier.background(Color.Red).size(100.dp)', isCorrect: false, feedback: "虽然合法，但通常 background 放在 size 后面更能明确背景覆盖的区域。" },
            { id: 'C', text: 'Modifier 的顺序对最终尺寸没有影响。', isCorrect: false, feedback: "顺序影响极大。" },
            { id: 'D', text: 'Modifier.padding(8.dp).size(100.dp)', isCorrect: false, feedback: "这会导致 padding 加在 size 内部（如果理解为影响 Constraints），或者视觉上看起来是包含了 padding 的总尺寸为 100dp。" },
        ]
    },
    {
        id: 7,
        question: "`Modifier.fillMaxWidth()` 的底层原理是什么？",
        options: [
            { id: 'A', text: '它直接忽略父组件的约束，并查询屏幕的尺寸。', isCorrect: false, feedback: "不太对。子组件永远不能忽略父组件的约束，`fillMaxSize` 填充的是父组件给予的空间，而非整个屏幕。" },
            { id: 'B', text: '它修改从父组件传来的约束，将最小宽度设置为等于最大宽度。', isCorrect: true, feedback: "正确答案！通过让 `minWidth` 等于 `maxWidth`，子组件没有其他选择，只能选择这个唯一的宽度，从而达到“撑满”的效果。" },
            { id: 'C', text: '它将子组件的 `minWidth` 设置为 0。', isCorrect: false, feedback: "那是 wrapContent 的行为。" },
            { id: 'D', text: '它将子组件的尺寸设置为一个非常大的值，让父组件去裁剪。', isCorrect: false, feedback: "这不符合 Compose 的原理。" },
        ]
    },
    {
        id: 8,
        question: "在 Jetpack Compose 中，如果想为一个组件实现类似传统视图系统中`margin`（外边距）的效果，最核心的操作是什么？",
        options: [
            { id: 'A', text: '将`padding`修饰符放在`background`或`border`等绘制修饰符之前。', isCorrect: true, feedback: "That's right! 根据洋葱模型，先通过`padding`在外部增加一个透明的“皮”，后续的绘制操作（如`background`）就会在这个缩小的区域内进行，从而在视觉上形成了外边距。" },
            { id: 'B', text: '将`padding`修饰符放在`background`或`border`等绘制修饰符之后。', isCorrect: false, feedback: "那会变成内边距（Internal Padding）。" },
            { id: 'C', text: '在组件外部包裹一个`Spacer`组件来创造间距。', isCorrect: false, feedback: "Spacer 是一种方法，但 Modifier.padding 更直接对应 margin 概念。" },
            { id: 'D', text: '使用一个名为`margin`的专用修饰符。', isCorrect: false, feedback: "Compose 没有 margin 修饰符。" },
        ]
    },
    {
        id: 9,
        question: "思考以下代码片段会产生什么样的视觉效果？",
        code: "Modifier\n.background(Color.Gray)\n.padding(10.dp)\n.background(Color.Yellow)",
        options: [
            { id: 'A', text: '只有一个黄色的方块，灰色背景被完全覆盖。', isCorrect: false, feedback: "padding 会缩小后续的绘制区域。" },
            { id: 'B', text: '一个灰色的方块，其外围有一个10dp宽的黄色边框。', isCorrect: false, feedback: "顺序反了。" },
            { id: 'C', text: '一个黄色的方块，其外围有一个10dp宽的灰色边框。', isCorrect: true, feedback: "Right answer! 首先整个区域被涂成灰色，然后`padding`向内收缩了10dp，最后在剩下的核心区域涂上黄色，这使得外部的灰色部分看起来像一个边框。" },
            { id: 'D', text: '一个灰色的方块，其内部有一个黄色的内边距。', isCorrect: false, feedback: "Not quite。这个描述不准确，`padding`本身是透明的，是后续的`background`填充了`padding`之后的区域，形成了黄色的核心。" },
        ]
    },
    {
        id: 10,
        question: "如果一个修饰符链是 `Modifier.background(Color.Blue).clip(CircleShape)`，那么最终在屏幕上会显示什么？",
        options: [
            { id: 'A', text: '一个被切掉四角的蓝色矩形。', isCorrect: false, feedback: "Clip 放在 Background 后面了。" },
            { id: 'B', text: '什么都不会显示，因为代码顺序错误会导致绘制失败。', isCorrect: false, feedback: "不会报错，只是效果可能不符合预期。" },
            { id: 'C', text: '一个蓝色的圆形。', isCorrect: false, feedback: "Not quite。这是一个常见的顺序错误。`clip`修饰符只会影响它**之后**的绘制操作，而`background`已经在这之前完成了绘制。" },
            { id: 'D', text: '一个蓝色的矩形。', isCorrect: true, feedback: "Right answer! 代码首先在一个矩形区域内绘制了蓝色背景，随后`clip`指令虽然执行了，但它后面没有其他绘制操作，所以之前绘制的矩形得以保留。" },
        ]
    },
    {
        id: 11,
        question: "为了让一个组件同时拥有圆形裁剪和圆形边框，修饰符的**顺序**至关重要。以下哪种顺序能确保边框是沿着裁剪后的圆形边缘绘制的？",
        options: [
            { id: 'A', text: '必须在`border()`修饰符内部传入`CircleShape`参数，`clip()`是不必要的。', isCorrect: false, feedback: "Border 只能画框，不能裁剪内容。" },
            { id: 'B', text: '先使用`border()`，再使用`clip(CircleShape)`。', isCorrect: false, feedback: "那样边框会被裁剪掉一半，或者还是方的。" },
            { id: 'C', text: '`border()`和`clip()`的顺序不重要，因为它们都作用于整个组件。', isCorrect: false, feedback: "顺序非常重要。" },
            { id: 'D', text: '先使用`clip(CircleShape)`，再使用`border()`。', isCorrect: true, feedback: "That's right! 首先使用`clip`定义了一个圆形的绘制和触摸区域，后续的`border`指令就会沿着这个新的圆形边界进行绘制。" },
        ]
    },
    {
        id: 12,
        question: "当对一个尺寸为 `width = 100.dp`, `height = 50.dp` 的矩形组件应用 `Modifier.clip(CircleShape)` 时，会得到什么形状？",
        options: [
            { id: 'A', text: '一个胶囊形状（两端为半圆）。', isCorrect: false, feedback: "胶囊需要 RoundedCornerShape(percent=50)。" },
            { id: 'B', text: '一个以较短边（50dp）为直径的正圆形。', isCorrect: true, feedback: "That's right! 根据源材料的精确解释，`CircleShape`在应用于矩形时，会取最短边的长度作为直径来创建一个正圆形。" },
            { id: 'C', text: '一个以较长边（100dp）为直径的正圆形，部分内容会被裁切掉。', isCorrect: false, feedback: "CircleShape 不会超出边界。" },
            { id: 'D', text: '一个横向的椭圆形，宽度为100dp，高度为50dp。', isCorrect: false, feedback: "CircleShape 始终是正圆。" },
        ]
    },
    {
        id: 13,
        question: "Compose 中修饰符的顺序之所以如此重要，其最根本的原理是什么？",
        options: [
            { id: 'A', text: '后面的修饰符总是有更高的“图层”优先级，会覆盖前面的效果。', isCorrect: false, feedback: "不是简单的覆盖。" },
            { id: 'B', text: '这是为了与传统的 Android XML 布局保持行为一致。', isCorrect: false, feedback: "Compose 的机制与 XML 完全不同。" },
            { id: 'C', text: '为了提升编译和运行时的性能，顺序执行是最简单的优化策略。', isCorrect: false, feedback: "不是性能优化，而是设计哲学。" },
            { id: 'D', text: '每个修饰符都会修改传递给下一个修饰符的约束（constraints）和绘图环境。', isCorrect: true, feedback: "That's right! 这准确地描述了“洋葱模型”的核心。每个修饰符都是一个处理层，它接收来自前一个修饰符的输出，处理后，再将结果传递给下一个。" },
        ]
    },
];

export default function SummaryQuizGame({ onExit }: SummaryQuizGameProps) {
  const [stage, setStage] = useState<QuizStage>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Quiz State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
      if (selectedOption) return; // Prevent changing answer
      setSelectedOption(optionId);
      const correct = currentQuestion.options.find(o => o.id === optionId)?.isCorrect || false;
      setIsCorrect(correct);
      if (correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(false);
      } else {
          setStage('VICTORY');
      }
  };

  const resetGame = () => {
      setStage('INTRO');
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsCorrect(false);
      setScore(0);
  };

  const renderContent = () => {
    switch (stage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="relative">
                 <div className="absolute inset-0 bg-yellow-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                 <BookOpen size={80} className="text-[#5D4037] relative z-10 drop-shadow-md" />
                 <div className="absolute -top-2 -right-2">
                     <Star size={40} className="text-yellow-500 fill-yellow-400 animate-spin-slow" />
                 </div>
            </div>
            
            <h2 className="text-4xl font-bold text-[#5D4037] mb-4 font-serif tracking-tight">魔法综合测验</h2>
            <p className="text-xl text-[#8D6E63] max-w-lg leading-relaxed">
              年轻的魔法师，你已经学习了关于尺寸、约束、布局和修饰符的众多奥秘。<br/>
              现在，是时候检验你的魔法根基了。<br/>
              <b>{QUESTIONS.length} 道难题</b>，你能全部答对吗？
            </p>
            <button 
                onClick={() => setStage('QUIZ')}
                className="px-10 py-4 bg-[#5D4037] hover:bg-[#4E342E] text-[#FFECB3] rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 border-2 border-[#8D6E63]"
            >
                <Play size={24} fill="currentColor" /> 开始考试
            </button>
            <XiaoQi emotion="smart" message="不要紧张，仔细回想之前的每一次探险！" />
          </div>
        );

      case 'QUIZ':
        return (
            <div className="space-y-6 max-w-3xl mx-auto">
                {/* Question Card */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border-2 border-[#EADBC8] relative">
                    <div className="absolute -top-4 -left-4 bg-[#5D4037] text-[#FFECB3] px-4 py-1 rounded-lg font-bold text-sm shadow-md">
                        Question {currentQuestion.id}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#5D4037] mt-2 leading-relaxed">
                        {currentQuestion.question}
                    </h3>
                    
                    {currentQuestion.code && (
                        <div className="mt-4 bg-[#F5F5F5] p-4 rounded-xl border-l-4 border-[#8D6E63] font-mono text-sm text-[#424242] whitespace-pre-wrap">
                            {currentQuestion.code}
                        </div>
                    )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((opt) => {
                        const isSelected = selectedOption === opt.id;
                        const isReveal = selectedOption !== null;
                        
                        let styleClass = "bg-white border-[#D7CCC8] hover:bg-[#F7EFE5] text-[#5D4037]";
                        if (isReveal) {
                            if (opt.isCorrect) styleClass = "bg-green-100 border-green-400 text-green-800"; // Show correct always
                            else if (isSelected && !opt.isCorrect) styleClass = "bg-red-100 border-red-400 text-red-800"; // Show wrong selection
                            else styleClass = "bg-white border-[#E0E0E0] text-gray-400 opacity-60"; // Dim others
                        }

                        return (
                            <button
                                key={opt.id}
                                onClick={() => handleOptionSelect(opt.id)}
                                disabled={isReveal}
                                className={`p-4 rounded-xl border-2 text-left transition-all font-medium text-sm sm:text-base ${styleClass}`}
                            >
                                <div className="flex gap-3">
                                    <span className={`font-bold ${isReveal && opt.isCorrect ? 'text-green-700' : ''}`}>{opt.id}.</span>
                                    <span>{opt.text}</span>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Feedback */}
                {selectedOption && (
                    <div className={`p-5 rounded-2xl flex gap-4 items-start animate-fade-in border-2 shadow-sm ${isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                        <div className="shrink-0 mt-1">
                            {isCorrect ? <CheckCircle size={24} className="text-green-600" /> : <AlertTriangle size={24} className="text-red-600" />}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">{isCorrect ? "回答正确！" : "再接再厉！"}</h4>
                            <p className="text-sm leading-relaxed opacity-90">
                                {currentQuestion.options.find(o => o.id === selectedOption)?.feedback}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex justify-center pt-4">
                    {selectedOption && (
                        <button 
                            onClick={nextQuestion}
                            className="px-8 py-3 bg-[#5D4037] text-[#FFECB3] rounded-full font-bold shadow-lg hover:bg-[#4E342E] hover:scale-105 transition-all flex items-center gap-2"
                        >
                            {currentQuestionIndex < QUESTIONS.length - 1 ? "下一题" : "查看成绩"} <ArrowRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        );

      case 'VICTORY':
        const percentage = Math.round((score / QUESTIONS.length) * 100);
        let feedback = "";
        if (percentage === 100) feedback = "完美！你是当之无愧的魔法大师！";
        else if (percentage >= 80) feedback = "优秀！你的基础非常扎实。";
        else if (percentage >= 60) feedback = "合格！但还有一些细节需要注意哦。";
        else feedback = "还需要努力！建议回顾一下之前的课程。";

        return (
             <div className="flex flex-col items-center text-center space-y-8 animate-scale-in py-10">
                <div className="relative">
                    <Award className="w-40 h-40 text-[#FFB300] drop-shadow-xl" />
                    <div className="absolute -top-4 -right-4 animate-bounce">
                        <Star className="text-[#FFECB3] fill-[#FFC107] w-16 h-16" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-[#5D4037] font-serif">考试结束</h2>
                    <div className="text-6xl font-black text-[#FFB300] tracking-tighter drop-shadow-sm">
                        {score} <span className="text-2xl text-[#8D6E63] font-medium">/ {QUESTIONS.length}</span>
                    </div>
                </div>

                <div className="bg-[#FFF8E1] border-2 border-[#FFECB3] p-6 rounded-2xl max-w-md">
                    <p className="text-lg text-[#5D4037] font-medium leading-relaxed">
                        {feedback}
                    </p>
                </div>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-white border-2 border-[#8D6E63] text-[#5D4037] rounded-full font-bold hover:bg-[#EFEBE9] flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 再考一次
                    </button>
                     <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-[#5D4037] text-[#FFECB3] rounded-full font-bold hover:bg-[#4E342E] shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion={percentage >= 80 ? "excited" : "happy"} message={percentage >= 80 ? "为你骄傲！" : "温故而知新，加油！"} />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <ExamFrame 
        title="1.4.2 魔法综合测验" 
        progress={stage === 'QUIZ' ? currentQuestionIndex + 1 : (stage === 'VICTORY' ? QUESTIONS.length : 0)} 
        totalStages={QUESTIONS.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>
    </ExamFrame>
  );
}