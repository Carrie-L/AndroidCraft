import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ComplexMarkdown from './components/MarkdownRenderer';
import ChatInterface from './components/ChatInterface';
import HtmlMarkdown from './components/HtmlMarkdown';
import { CURRICULUM, TOPIC_CATEGORIES } from './constants';
import { ViewState, Lesson, Difficulty, Module } from './types';
import { reviewChallengeCode } from './services/geminiService';
import { ArrowRight, CheckCircle2, PlayCircle, BookOpen, HelpCircle, Code2, Code, X, Lock, Layout, Smartphone, Layers, Loader2, RefreshCw, Box, Zap, List, Activity, Compass, Cpu, Globe, Palette, Play, Flag, Map, Star, Trophy, Target, Award } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Theme State - Forcing Light Mode for the Macaron Aesthetic
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Progress State
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('completedLessons');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  // Interaction State
  const [lessonContentType, setLessonContentType] = useState<'text' | 'comic'>('text');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Code Challenge State
  const [userCode, setUserCode] = useState('');
  const [codeReviewStatus, setCodeReviewStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [reviewFeedback, setReviewFeedback] = useState<string>('');
  const [challengePassed, setChallengePassed] = useState(false);

  // Random colors state for the timeline (inner pages)
  const [sectionThemes, setSectionThemes] = useState<any[]>([]);

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Save progress
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  // Reset interaction state
  useEffect(() => {
    if (selectedLesson) {
      setShowQuiz(false);
      setQuizSelectedOption(null);
      setQuizSubmitted(false);
      
      if (selectedLesson.challenge) {
        setUserCode(selectedLesson.challenge.starterCode.trim());
        setCodeReviewStatus('idle');
        setReviewFeedback('');
        setChallengePassed(false);
      } else {
        setChallengePassed(true);
      }
    }
  }, [selectedLesson]);

  // --- THE COLOR SYSTEM ---
  
  // 1. Defined Palette for the 8 Main Chapters (Fixed per chapter for consistency on Home)
  // Updated to be slightly more saturated/bolder as requested
  const MODULE_PALETTES = [
    { id: 'pink',   bg: 'bg-[#FF8FAB]', text: 'text-[#C9184A]', border: 'border-[#FF8FAB]', light: 'bg-[#FFF0F5]' }, // Bold Pink
    { id: 'blue',   bg: 'bg-[#4CC9F0]', text: 'text-[#0077B6]', border: 'border-[#4CC9F0]', light: 'bg-[#E0F7FA]' }, // Bold Cyan
    { id: 'yellow', bg: 'bg-[#FFD60A]', text: 'text-[#A47E1B]', border: 'border-[#FFD60A]', light: 'bg-[#FFFDE7]' }, // Bold Yellow
    { id: 'purple', bg: 'bg-[#9D4EDD]', text: 'text-[#5A189A]', border: 'border-[#9D4EDD]', light: 'bg-[#F3E5F5]' }, // Bold Purple
    { id: 'orange', bg: 'bg-[#FB8500]', text: 'text-[#A44C04]', border: 'border-[#FB8500]', light: 'bg-[#FFF3E0]' }, // Bold Orange
    { id: 'green',  bg: 'bg-[#52B788]', text: 'text-[#1B4332]', border: 'border-[#52B788]', light: 'bg-[#E8F5E9]' }, // Bold Green
    { id: 'cyan',   bg: 'bg-[#00B4D8]', text: 'text-[#0077B6]', border: 'border-[#00B4D8]', light: 'bg-[#E1F5FE]' }, // Deep Sky
    { id: 'rose',   bg: 'bg-[#F94144]', text: 'text-[#8D0801]', border: 'border-[#F94144]', light: 'bg-[#FFEBEE]' }, // Deep Red
  ];

  // 2. Extended Random Macaron Palette for Inner Sections (Randomized)
  const RANDOM_PALETTES = [
    { name: 'Candy',      bg: 'bg-[#FFC4C4]', text: 'text-[#D65A5A]', icon: 'bg-[#FF9E9E]', light: 'bg-[#FFF5F5]' },
    { name: 'Sky',        bg: 'bg-[#C4E4FF]', text: 'text-[#5A8DD6]', icon: 'bg-[#9ECAFF]', light: 'bg-[#F0F9FF]' },
    { name: 'Lemon',      bg: 'bg-[#FFF4C4]', text: 'text-[#D6B65A]', icon: 'bg-[#FFE69E]', light: 'bg-[#FFFAEB]' },
    { name: 'Lime',       bg: 'bg-[#C4FFD6]', text: 'text-[#5AD683]', icon: 'bg-[#9EFFBA]', light: 'bg-[#F0FFF4]' },
    { name: 'Lilac',      bg: 'bg-[#E4C4FF]', text: 'text-[#9E5AD6]', icon: 'bg-[#CA9EFF]', light: 'bg-[#F8F0FF]' },
    { name: 'Peach',      bg: 'bg-[#FFD6C4]', text: 'text-[#D6835A]', icon: 'bg-[#FFBA9E]', light: 'bg-[#FFF5EB]' },
    { name: 'Aqua',       bg: 'bg-[#C4FFF4]', text: 'text-[#5AD6BD]', icon: 'bg-[#9EFFF0]', light: 'bg-[#F0FFFA]' },
    { name: 'Sakura',     bg: 'bg-[#F8C8DC]', text: 'text-[#D45D88]', icon: 'bg-[#F2A2C0]', light: 'bg-[#FFF0F5]' },
    { name: 'Periwinkle', bg: 'bg-[#AECBEB]', text: 'text-[#4A7FB5]', icon: 'bg-[#8FB9E6]', light: 'bg-[#F0F6FF]' },
    { name: 'Mint',       bg: 'bg-[#B5EAD7]', text: 'text-[#57967D]', icon: 'bg-[#92E0C4]', light: 'bg-[#F0FFFA]' },
    { name: 'Butter',     bg: 'bg-[#E2F0CB]', text: 'text-[#8DA665]', icon: 'bg-[#CCE6A6]', light: 'bg-[#F9FFE0]' },
    { name: 'Apricot',    bg: 'bg-[#FFDAC1]', text: 'text-[#CC8A66]', icon: 'bg-[#FFC49E]', light: 'bg-[#FFF5EB]' },
    { name: 'Plum',       bg: 'bg-[#E0BBE4]', text: 'text-[#8A5691]', icon: 'bg-[#D29ED9]', light: 'bg-[#F9F0FC]' },
    { name: 'Berry',      bg: 'bg-[#FEC8D8]', text: 'text-[#C26882]', icon: 'bg-[#FD9EBC]', light: 'bg-[#FFF0F5]' },
    { name: 'Banana',     bg: 'bg-[#FFF2B2]', text: 'text-[#B5A048]', icon: 'bg-[#FFE885]', light: 'bg-[#FFFEF0]' },
    { name: 'Fern',       bg: 'bg-[#D6F6DD]', text: 'text-[#6CB57C]', icon: 'bg-[#AFF2BD]', light: 'bg-[#F0FFF5]' },
    { name: 'Ice',        bg: 'bg-[#D4F0F0]', text: 'text-[#669999]', icon: 'bg-[#AEE6E6]', light: 'bg-[#F0FFFF]' },
    { name: 'Sand',       bg: 'bg-[#F6EAC2]', text: 'text-[#A69357]', icon: 'bg-[#EFD994]', light: 'bg-[#FFFAEF]' },
    { name: 'Coral',      bg: 'bg-[#FFB7B2]', text: 'text-[#C25E58]', icon: 'bg-[#FF968F]', light: 'bg-[#FFF0EF]' },
    { name: 'Cloud',      bg: 'bg-[#E3F2FD]', text: 'text-[#448AFF]', icon: 'bg-[#90CAF9]', light: 'bg-[#F5F9FF]' }
  ];

  // Navigation Logic
  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentView(ViewState.ROADMAP_HOME);
  };

  const handleModuleSelect = (module: Module) => {
    // Shuffle colors when selecting a module to ensure randomness every time
    const shuffled = [...RANDOM_PALETTES].sort(() => 0.5 - Math.random());
    setSectionThemes(shuffled);
    
    setSelectedModule(module);
    setCurrentView(ViewState.MODULE_DETAIL);
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (isLessonLocked(lesson.id)) return;
    setSelectedLesson(lesson);
    setLessonContentType('text'); // Reset to text view when starting new lesson
    setCurrentView(ViewState.LESSON_DETAIL);
  };

  const handleCheckCode = async () => {
    if (!selectedLesson?.challenge || !userCode.trim()) return;

    setCodeReviewStatus('checking');
    setReviewFeedback('');

    const result = await reviewChallengeCode(userCode, selectedLesson.challenge);

    if (result.passed) {
      setCodeReviewStatus('success');
      setChallengePassed(true);
      setReviewFeedback(result.feedback || "太棒了！代码逻辑正确。");
    } else {
      setCodeReviewStatus('error');
      setChallengePassed(false);
      setReviewFeedback(result.feedback || "代码似乎有些问题，请检查提示再试一次。");
    }
  };

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      const newSet = new Set(completedLessons);
      newSet.add(selectedLesson.id);
      setCompletedLessons(newSet);
      
      // Simple next logic
      const allLessons = getAllLessons();
      const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
          const nextLesson = allLessons[currentIndex + 1];
          handleStartLesson(nextLesson);
          
          // Auto-update selected module if we crossed boundary
          if (selectedModule) {
              const nextModule = CURRICULUM.find(m => m.sections.some(s => s.lessons.some(l => l.id === nextLesson.id)));
              if (nextModule && nextModule.id !== selectedModule.id) {
                  handleModuleSelect(nextModule); // Re-shuffle colors for new module
              }
          }
      } else {
          alert("恭喜！你已经完成了所有内容。");
          setCurrentView(ViewState.ROADMAP_HOME);
      }
    }
  };

  // Helper: Get flattened list of all lessons for locking logic
  const getAllLessons = () => {
    return CURRICULUM.flatMap(mod => mod.sections.flatMap(sec => sec.lessons));
  };

  const isLessonLocked = (lessonId: string): boolean => {
    const allLessons = getAllLessons();
    const lesson = allLessons.find(l => l.id === lessonId);
    if (!lesson) return true;

    // 公测阶段：对于已经配置了 contentUrl 的 Compose 小节，直接解锁（表示内容已准备好）
    if (lesson.contentUrl) {
      return false;
    }

    // 没有内容 URL，说明内容还没准备好：锁住
    return true;
  };

  // --- Helper Functions for UI ---

  const getCategoryIcon = (name: string) => {
    switch (name) {
        case 'Layout': return <Layout size={32} />;
        case 'Code': return <Code size={32} />;
        case 'Smartphone': return <Smartphone size={32} />;
        case 'Layers': return <Layers size={32} />;
        default: return <Code size={32} />;
    }
  };

  const getModuleIcon = (name: string, size = 24) => {
    switch (name) {
      case 'Code': return <Code size={size} />;
      case 'Layout': return <Layout size={size} />;
      case 'Zap': return <Zap size={size} />;
      case 'Layers': return <Layers size={size} />;
      case 'Box': return <Box size={size} />;
      case 'Globe': return <Globe size={size} />;
      case 'List': return <List size={size} />;
      case 'Play': return <Play size={size} />;
      case 'Compass': return <Compass size={size} />;
      case 'Cpu': return <Cpu size={size} />;
      case 'Palette': return <Palette size={size} />;
      case 'Activity': return <Activity size={size} />;
      default: return <Code size={size} />;
    }
  };

  // Helper to get difficulty color/icon
  const getDifficultyBadge = (difficulty: Difficulty) => {
    let color = 'bg-green-100 text-green-700';
    if (difficulty === Difficulty.INTERMEDIATE) color = 'bg-blue-100 text-blue-700';
    if (difficulty === Difficulty.ADVANCED) color = 'bg-purple-100 text-purple-700';
    if (difficulty === Difficulty.EXPERT) color = 'bg-orange-100 text-orange-700';
    if (difficulty === Difficulty.MASTER) color = 'bg-red-100 text-red-700';

    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${color}`}>
        {difficulty}
      </span>
    );
  };

  // Display all modules
  const displayedModules = CURRICULUM;

  // 从 public 目录加载 Lesson 的 markdown 内容
  // resolvedLessonContent: 文字版（文件名包含 @）
  // resolvedLessonComicContent: 漫画版（文件名不包含 @）
  const [resolvedLessonContent, setResolvedLessonContent] = useState<string>('');
  const [resolvedLessonComicContent, setResolvedLessonComicContent] = useState<string>('');
  const lessonBasePath = useMemo(() => {
    if (!selectedLesson) return undefined;
    // 如果有 contentUrl，就用它所在目录作为 basePath，方便解析 ![[xxx.png]]
    if (selectedLesson.contentUrl) {
      const url = selectedLesson.contentUrl;
      const lastSlash = url.lastIndexOf('/');
      if (lastSlash !== -1) {
        return url.substring(0, lastSlash + 1); // 保留末尾斜杠
      }
    }
    return undefined;
  }, [selectedLesson]);

  useEffect(() => {
    if (!selectedLesson) {
      setResolvedLessonContent('');
      setResolvedLessonComicContent('');
      return;
    }

    // 默认回退为内联内容
    setResolvedLessonContent(selectedLesson.content);
    setResolvedLessonComicContent(selectedLesson.content);

    // 如果 Lesson 配置了 contentUrl，则按照约定加载文字版 / 漫画版：
    // - contentUrl 指向「无 @」的 md（漫画版）
    // - 同目录下，文件名为「<编号>@<标题>.md」的是文字版
    if (selectedLesson.contentUrl) {
      const comicUrl = selectedLesson.contentUrl; // 无 @ 的 md

      // 从 lesson 标题推导文字版文件名，例如：
      // 标题：1.1.1 @Composable 注解与函数定义
      // 得到：1.1.1@Composable 注解与函数定义.md
      let textUrl = comicUrl;
      const lastSlash = comicUrl.lastIndexOf('/');
      const dir = lastSlash !== -1 ? comicUrl.substring(0, lastSlash + 1) : '';

      const titleMatch = selectedLesson.title.match(/^(\d+\.?\d*\.?\d*)\s+(.+)$/);
      if (titleMatch) {
        const idPart = titleMatch[1];      // 例如 1.1.1
        let restPart = titleMatch[2];      // 例如 @Composable 注解与函数定义
        // 去掉前面的 @，避免生成 1.1.1@@xxx 这种路径
        restPart = restPart.replace(/^@+/, '');
        textUrl = `${dir}${idPart}@${restPart}.md`;
      }

      // 加载文字版
      fetch(textUrl)
        .then((res) => {
          if (!res.ok) throw new Error('text md not found');
          return res.text();
        })
        .then((text) => setResolvedLessonContent(text))
        .catch(() => {
          setResolvedLessonContent(selectedLesson.content);
        });

      // 加载漫画版（contentUrl 对应的 md）
      fetch(comicUrl)
        .then((res) => {
          if (!res.ok) throw new Error('comic md not found');
          return res.text();
        })
        .then((text) => setResolvedLessonComicContent(text))
        .catch(() => {
          setResolvedLessonComicContent(selectedLesson.content);
        });
    }
  }, [selectedLesson]);

  return (
    <div
      className={`app min-h-screen font-sans selection:bg-pink-200 selection:text-pink-900 flex flex-col transition-colors duration-300 bg-[#FDFDFD] dark:bg-[#050a10]`}
      data-mdtheme="magazine"
    >
      
      <Header 
        currentView={currentView} 
        onNavigate={(view) => {
            if (view === ViewState.ROADMAP_HOME) setSelectedModule(null);
            setCurrentView(view);
        }} 
        selectedModule={selectedModule}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-grow flex flex-col z-10">
        
        {/* VIEW 1: LANDING PAGE */}
        {currentView === ViewState.LANDING && (
          <div className="max-w-7xl mx-auto px-4 w-full py-20 animate-fade-in relative">
            
            <div className="text-center mb-24 relative z-10">
               <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-slate-500 font-medium text-sm">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" /> 
                  <span>打造你的 Android 技能树</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-black text-slate-800 mb-6 tracking-tight">
                Android<span className="text-[#3DDC84]">Craft</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                像玩游戏一样学习 Jetpack Compose。 <br/>
                解锁关卡，挑战代码，获得成就。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {TOPIC_CATEGORIES.map((cat, idx) => (
                <div 
                  key={cat.id}
                  onClick={() => {
                    if (cat.isComingSoon) {
                        // alert("该模块正在开发中，敬请期待！");
                    } else {
                        handleCategorySelect(cat.id);
                    }
                  }}
                  className={`group relative rounded-[2rem] p-8 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between bg-white
                    border-2 border-gray-50
                    hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
                    hover:-translate-y-2
                    ${cat.isComingSoon ? 'opacity-80 grayscale' : ''}
                  `}
                >
                   <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 opacity-40 transition-opacity ${
                       idx === 0 ? 'bg-green-200' : idx === 1 ? 'bg-purple-200' : 'bg-orange-200'
                   }`}></div>

                   <div>
                       <div
                         className={`
                           w-16 h-16 rounded-2xl flex items-center justify-center mb-8
                           group-hover:scale-110 transition-transform duration-300
                           ${
                             cat.id === 'compose'
                               ? 'bg-[#dcfce7]/80 text-[#16a34a]'
                               : 'bg-gray-50 text-slate-700'
                           }
                         `}
                       >
                         {getCategoryIcon(cat.iconName)}
                       </div>

                       <h3 className="middle-title font-extrabold text-slate-800 mb-3">{cat.title}</h3>
                       <p className="text-slate-500 text-sm leading-relaxed font-medium">{cat.description}</p>
                   </div>
                   
                   <div className="flex justify-between items-center mt-8">
                     {cat.isComingSoon ? (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-400">COMING SOON</span>
                     ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:w-full transition-all duration-300 relative overflow-hidden">
                            <ArrowRight size={20} className="absolute right-3" />
                            <span className="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold">START</span>
                        </div>
                     )}
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: ROADMAP HOME (Beautiful Grid) */}
        {currentView === ViewState.ROADMAP_HOME && (
          <div className="min-h-screen w-full bg-[#FEF9E6] py-12 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 w-full">
            
            <div className="flex flex-col items-center mb-16">
               <h2 className="text-3xl md:text-4xl font-black text-slate-800 text-center mb-3 tracking-tight border-b border-slate-900 inline-block px-2 pb-1">
                 学习路线图
               </h2>
               <p className="text-slate-500 text-center font-medium">
                 8 个核心章节 · 从入门到大师
               </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {displayedModules.map((module, idx) => {
                 const palette = MODULE_PALETTES[idx % MODULE_PALETTES.length];
                 const sectionCount = module.sections.length;
                 const lessonCount = module.sections.reduce((acc, sec) => acc + sec.lessons.length, 0);
                 const completedInModule = module.sections.flatMap(s => s.lessons).filter(l => completedLessons.has(l.id)).length;
                 
                 return (
                   <div 
                      key={module.id}
                      onClick={() => handleModuleSelect(module)}
                      className={`group relative bg-white rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl`}
                   >
                      {/* Top Right Corner Accent (Pastel) */}
                      <div className={`absolute top-0 right-0 w-32 h-32 ${palette.light} rounded-bl-[4rem] transition-all duration-500 ease-out group-hover:scale-110`}></div>

                      <div className="p-8 flex flex-col h-full relative z-10">
                          {/* Top Row: Icon Box */}
                          <div className="mb-6">
                             <div className={`w-16 h-16 rounded-2xl ${palette.light} flex items-center justify-center ${palette.text} transition-transform duration-300`}>
                                {getModuleIcon(module.iconName, 32)}
                             </div>
                          </div>

                          {/* Title & Desc */}
                          <h3 className="text-2xl font-black text-slate-800 mb-3 leading-tight">
                            {module.title.split('：')[1] || module.title}
                          </h3>
                          <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 flex-grow">
                            {module.description}
                          </p>

                          {/* Bottom: Category/Difficulty Tag */}
                          <div className="flex items-center mt-auto">
                              <div className={`flex items-center space-x-2 text-xs font-bold ${palette.text}`}>
                                  {getModuleIcon('BookOpen', 14)} 
                                  <span>{module.difficulty}</span>
                              </div>
                          </div>
                      </div>
                   </div>
                 )
               })}
            </div>
            </div>
          </div>
        )}

        {/* VIEW 3: MODULE DETAIL (Macaron Timeline) */}
        {currentView === ViewState.MODULE_DETAIL && selectedModule && (
           <div className="max-w-5xl mx-auto px-4 w-full py-12 animate-fade-in">
              {/* Header */}
              <div className="flex flex-col items-center mb-16 text-center relative">
                 <button 
                   onClick={() => setCurrentView(ViewState.ROADMAP_HOME)}
                   className="mb-8 px-8 py-3 rounded-full bg-white border border-gray-100 text-sm font-bold text-slate-500 hover:text-slate-800 hover:shadow-md transition-all flex items-center"
                 >
                   <ArrowRight size={16} className="rotate-180 mr-2"/> 返回章节列表
                 </button>
                 
                 <h2 className="text-2xl md:text-2xl border-b border-slate-900 inline-block pb-1 font-black text-slate-800 mb-4 tracking-tight">
                    {selectedModule.title.split('：')[1] || selectedModule.title}
                 </h2>
                 <div className="mt-3 flex items-center justify-center gap-3 max-w-3xl mx-auto text-sm md:text-base text-slate-500">
                    <div className="text-android/80 flex-shrink-0">
                      {getModuleIcon(selectedModule.iconName, 24)}
                    </div>
                    <p className="text-left md:text-center font-medium leading-relaxed">
                      {selectedModule.description}
                    </p>
                 </div>
              </div>

              {/* The Macaron Timeline */}
              <div className="relative pb-20">
                 
                 <div className="space-y-8 md:space-y-12 relative">
                   {selectedModule.sections.map((section, idx) => {
                      const isLeft = idx % 2 === 0;
                      // Random Color Assignment
                      const macaron = sectionThemes.length > 0 
                        ? sectionThemes[idx % sectionThemes.length] 
                        : RANDOM_PALETTES[0];
                      
                      const isSectionComplete = section.lessons.every(l => completedLessons.has(l.id));
                      
                      const sectionCard = (
                        <div className={`w-full md:w-[46%] pl-24 md:pl-0 md:px-0 ${isLeft ? 'md:pr-10' : 'md:pl-14'}`}>
                              <div className={`group relative bg-transparent overflow-visible`}>
                                 
                                 {/* Header Area - Minimal */}
                                 <div className="pb-4 pt-5 relative overflow-hidden flex items-end gap-4">
                                     <div className={`relative z-10`}>
                                         <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
                                            SECTION 0{idx + 1}
                                         </span>
                                         <h3 className="small-title font-black text-slate-800 relative z-10 leading-none">
                                            {section.title}
                                         </h3>
                                     </div>
                                     <div className={`flex-grow h-px bg-slate-200 mb-2`}></div>
                                 </div>

                                 {/* Lessons List - Styled like reference (numbered tags) */}
                                 <div className="pl-2 mt-2 space-y-3 relative z-10">
                                        {section.lessons.map((lesson, lIdx) => {
                                        const isCompleted = completedLessons.has(lesson.id);
                                        const locked = isLessonLocked(lesson.id);
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => handleStartLesson(lesson)}
                                                disabled={locked}
                                                className={`w-full flex items-center justify-between group/item transition-all duration-200 text-left`}
                                            >
                                                {/* Left Tag (Number) - Increased spacing */}
                                                <div className={`relative h-10 min-w-[3rem] flex items-center justify-center text-white font-bold text-sm shadow-sm z-20 mr-2
                                                    ${isCompleted ? 'bg-emerald-500' : locked ? 'bg-slate-300' : macaron.bg}
                                                    rounded-l-lg rounded-r-sm
                                                `}>
                                                    {isCompleted ? <CheckCircle2 size={14} /> : (lIdx + 1).toString().padStart(2, '0')}
                                                    
                                                    {/* Triangle for Ribbon effect */}
                                                    <div className={`absolute right-[-8px] top-0 h-full w-4 overflow-hidden`}>
                                                       <div className={`h-full w-2 ${isCompleted ? 'bg-emerald-600' : locked ? 'bg-slate-400' : macaron.bg} skew-x-12 origin-top-left brightness-75`}></div>
                                                    </div>
                                                </div>

                                                {/* Main Bar - Reduced Border Radius, Increased Shadow */}
                                                <div className={`flex-grow flex items-center h-16 pl-6 pr-6 rounded-xl shadow-md border border-l-0 transition-all z-10
                                                    ${isCompleted 
                                                        ? 'bg-emerald-50/50 border-emerald-100 text-emerald-900' 
                                                        : locked 
                                                            ? 'bg-slate-50 border-slate-100 text-slate-400' 
                                                            : 'bg-white border-slate-100 text-slate-700 hover:shadow-lg hover:border-slate-200 hover:-translate-x-1'
                                                    }
                                                `}>
                                                    <span className={`text-sm font-bold line-clamp-1`}>
                                                        {lesson.title}
                                                    </span>
                                                    {locked && <Lock size={12} className="ml-auto opacity-30" />}
                                                </div>
                                            </button>
                                        )
                                        })}

                                        {/* 魔法学院试炼 - 作为额外一条可点击的条目 */}
                                        <button
                                          onClick={() => alert('魔法学院试炼：敬请期待专门的试炼页面')}
                                          className="w-full flex items-center justify-between group/item transition-all duration-200 text-left"
                                        >
                                          {/* Left Tag */}
                                          <div className={`relative h-10 min-w-[3rem] flex items-center justify-center text-white font-bold text-sm shadow-sm z-20 mr-2 bg-purple-300 rounded-l-lg rounded-r-sm`}>
                                          🌾
                                            <div className="absolute right-[-8px] top-0 h-full w-4 overflow-hidden">
                                              <div className="h-full w-2 bg-purple-400 skew-x-12 origin-top-left brightness-75"></div>
                                            </div>
                                          </div>
                                          {/* Main Bar */}
                                          <div className="flex-grow flex items-center h-16 pl-6 pr-6 rounded-xl shadow-md border border-l-0 bg-white border-purple-100 text-purple-500 hover:shadow-lg hover:border-purple-200 hover:-translate-x-1">
                                            <span className="text-sm font-bold line-clamp-1">
                                              魔法学院试炼
                                            </span>
                                          </div>
                                        </button>
                                 </div>

                              </div>
                           </div>
                      );

                      return (
                        <div key={section.id} className={`relative flex flex-col md:flex-row items-center w-full group/section`}>
                           
                           {/* Dotted Line Path */}
                           {idx < selectedModule.sections.length - 1 && (
                               <div className="hidden md:block absolute top-1/2 left-1/2 w-0 h-32 border-l-2 border-dashed border-slate-200 -z-10 transform translate-y-16"></div>
                           )}

                           {/* Center Number Node */}
                           <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
                                <div className={`w-14 h-14 ${isSectionComplete ? 'bg-[#3DDC84] text-white' : `${macaron.bg} ${macaron.text}`} rounded-full flex items-center justify-center shadow-sm border-[5px] border-[#FFFAFA] transition-all duration-500 group-hover/section:scale-110`}>
                                    {isSectionComplete ? (
                                        <Award size={28} className="animate-bounce-subtle" />
                                    ) : (
                                        <span className="text-2xl font-black">{idx + 1}</span>
                                    )}
                                </div>
                           </div>

                           {/* Horizontal Connector */}
                           <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-20 ${macaron.bg} ${isLeft ? 'right-1/2 mr-8' : 'left-1/2 ml-8'} rounded-full`}></div>

                           {/* Section Card：在桌面端左右交替分布 */}
                           {isLeft ? (
                             <>
                               {sectionCard}
                               <div className="hidden md:block w-1/2"></div>
                             </>
                           ) : (
                             <>
                               <div className="hidden md:block w-1/2"></div>
                               {sectionCard}
                             </>
                           )}
                        </div>
                      );
                   })}
                   
                   {/* End */}
                   <div className="relative flex flex-col items-center justify-center mt-32">
                        <div className="px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-bold tracking-widest shadow-xl flex items-center">
                            <Flag size={16} className="mr-2 text-[#3DDC84]"/> MODULE COMPLETE
                        </div>
                   </div>
                 </div>
              </div>
           </div>
        )}

        {/* VIEW 4: LESSON DETAIL (Content) */}
        {currentView === ViewState.LESSON_DETAIL && selectedLesson && (
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] animate-fade-in overflow-hidden">
            {/* LEFT: Content Area (Expanded) */}
            <div className="w-full lg:w-3/4 h-full overflow-y-auto p-6 lg:p-12 bg-white border-r border-gray-100 scroll-smooth">
               <div className="max-w-3xl mx-auto pb-20">
                  <div className="mb-6 border-b border-gray-100 pb-5">
                    <div className="flex items-center justify-between mb-2">
                      {/* 左：LEARNING 徽章 */}
                      <div className="flex items-center text-[#3DDC84] text-xs font-bold bg-[#3DDC84]/10 px-3 py-1 rounded-full">
                        <BookOpen size={14} className="mr-2" />
                        <span>LEARNING</span>
                      </div>

                      {/* 右：Completed 状态 + 返回按钮 */}
                      <div className="flex items-center gap-3">
                        {completedLessons.has(selectedLesson.id) && (
                          <span className="flex items-center text-green-600 text-xs font-bold">
                            <CheckCircle2 size={14} className="mr-1" /> COMPLETED
                          </span>
                        )}
                        <button
                          onClick={() => setCurrentView(ViewState.MODULE_DETAIL)}
                          className="inline-flex items-center text-xs text-slate-400 hover:text-slate-700 transition-colors"
                        >
                          <ArrowRight size={14} className="rotate-180 mr-1" />
                          返回小节列表
                        </button>
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-2 mt-4 leading-tight">
                      {selectedLesson.title}
                    </h1>
                  </div>

                  {/* Content Toggle (Guide / Comic) */}
                  <div className="flex justify-center mb-8">
                      <div className="bg-sky-50 p-0.5 rounded-xl inline-flex">
                          <button
                              onClick={() => setLessonContentType('text')}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  lessonContentType === 'text'
                                      ? 'bg-white text-black shadow-sm'
                                      : 'text-slate-400 hover:text-slate-600'
                              }`}
                          >
                              文字指南
                          </button>
                          <button
                              onClick={() => setLessonContentType('comic')}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  lessonContentType === 'comic'
                                      ? 'bg-white text-black shadow-sm'
                                      : 'text-slate-400 hover:text-slate-600'
                              }`}
                          >
                              漫话
                          </button>
                      </div>
                  </div>

                  {lessonContentType === 'text' ? (
                      <div className="markdown-body prose max-w-none mb-12 font-['LXGWWenKai-Light',system-ui,sans-serif] prose-slate prose-headings:font-black prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-code:text-sky-700 prose-code:bg-sky-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-[#0f172a] prose-pre:text-sky-100 prose-pre:rounded-2xl prose-pre:p-4 prose-pre:shadow-md">
                        <HtmlMarkdown content={resolvedLessonContent} basePath={lessonBasePath} />
                      </div>
                  ) : (
                      <div className="markdown-body prose max-w-none mb-12 animate-fade-in font-['LXGWWenKai-Light',system-ui,sans-serif] prose-slate prose-headings:font-black prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-code:text-sky-700 prose-code:bg-sky-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-[#0f172a] prose-pre:text-sky-100 prose-pre:rounded-2xl prose-pre:p-4 prose-pre:shadow-md">
                        <HtmlMarkdown content={resolvedLessonComicContent} basePath={lessonBasePath} />
                      </div>
                  )}

<div class="divider"><hr></hr></div>

                  {/* INTERACTIVE SECTIONS */}
                  <div className="space-y-8 mb-12">
                    
                    {/* QUIZ */}
                    {selectedLesson.quiz && (
                      <div className="bg-white rounded-3xl border-2 border-purple-50 overflow-hidden shadow-sm">
                        <div className="bg-purple-50/70 p-6 border-b border-purple-100 flex items-center">
                          <div className="bg-purple-100 p-2 rounded-lg mr-3 text-purple-600">
                             <HelpCircle size={24} />
                          </div>
              
                          <h3 className="font-extrabold text-slate-800 text-lg">Pop Quiz</h3>
                        </div>
                        <div className="p-8">
                          <p className="text-lg font-bold text-slate-800 mb-6">{selectedLesson.quiz.question}</p>
                          <div className="space-y-3">
                            {selectedLesson.quiz.options.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => !quizSubmitted && setQuizSelectedOption(option.id)}
                                disabled={quizSubmitted}
                                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center font-medium ${
                                  quizSubmitted
                                    ? option.isCorrect 
                                      ? 'bg-green-50 border-green-200 text-green-700'
                                      : quizSelectedOption === option.id 
                                        ? 'bg-red-50 border-red-200 text-red-700'
                                        : 'bg-gray-50 border-transparent opacity-50'
                                    : quizSelectedOption === option.id
                                      ? 'bg-purple-50 border-purple-400 text-purple-500'
                                      : 'bg-white border-gray-100 hover:border-purple-200 text-slate-600'
                                }`}
                              >
                                <span>{option.text}</span>
                                {quizSubmitted && option.isCorrect && <CheckCircle2 size={20} className="text-green-500" />}
                                {quizSubmitted && !option.isCorrect && quizSelectedOption === option.id && <X size={20} className="text-red-500" />}
                              </button>
                            ))}
                          </div>
                          
                          {!quizSubmitted ? (
                            <button
                              onClick={() => setQuizSubmitted(true)}
                              disabled={!quizSelectedOption}
                              className={`mt-8 px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 flex items-center shadow-lg ${
                                !quizSelectedOption
                                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                  : 'bg-purple-400 hover:bg-purple-500 text-white shadow-purple-200'
                              }`}
                            >
                              Check Answer
                            </button>
                          ) : (
                            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-slate-600 text-sm animate-fade-in">
                              <span className="font-bold block mb-1 text-slate-800">Explanation:</span>
                              {selectedLesson.quiz.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CHALLENGE */}
                    {selectedLesson.challenge && (
                      <div className="bg-white rounded-3xl border-2 border-amber-100 overflow-hidden shadow-sm flex flex-col">
                        <div className="bg-amber-50/50 p-6 border-b border-amber-100 flex items-center justify-between">
                          <div className="flex items-center">
                             <div className="bg-amber-100 p-2 rounded-lg mr-3 text-amber-600">
                                <Code2 size={24} />
                             </div>
                             <h3 className="font-extrabold text-slate-800 text-lg">{selectedLesson.challenge.title}</h3>
                          </div>
                        </div>
                        
                        <div className="p-8">
                          <div className="text-slate-600 font-medium mb-6">
                             <ComplexMarkdown content={selectedLesson.challenge.description} />
                          </div>
                          
                          <div className="mb-6">
                             <h4 className="text-xs font-black text-slate-400 uppercase mb-3 tracking-wider">HINTS</h4>
                             <ul className="space-y-2">
                                {selectedLesson.challenge.hints.map((hint, i) => (
                                  <li key={i} className="text-sm text-slate-500 flex items-start">
                                      <span className="mr-2 text-amber-400">•</span> {hint}
                                  </li>
                                ))}
                             </ul>
                          </div>

                          {/* Code Editor Area */}
                          <div className="relative group rounded-2xl overflow-hidden border-2 border-slate-100 focus-within:border-amber-300 transition-colors">
                            <textarea
                              value={userCode}
                              onChange={(e) => setUserCode(e.target.value)}
                              spellCheck={false}
                              className="w-full h-64 bg-slate-50 text-slate-800 font-mono text-sm p-6 focus:outline-none resize-none leading-relaxed"
                              placeholder="// Write your Kotlin code here..."
                            />
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button 
                                    onClick={() => setUserCode(selectedLesson.challenge!.starterCode.trim())}
                                    className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-gray-300 transition-all"
                                    title="Reset Code"
                                >
                                    <RefreshCw size={16}/>
                                </button>
                            </div>
                          </div>

                          {/* Feedback Area */}
                          {codeReviewStatus !== 'idle' && (
                            <div className={`mt-6 p-6 rounded-2xl border-2 text-sm animate-fade-in ${
                                codeReviewStatus === 'success' 
                                    ? 'bg-green-50 border-green-100 text-green-800' 
                                    : codeReviewStatus === 'error' 
                                        ? 'bg-red-50 border-red-100 text-red-800'
                                        : 'bg-blue-50 border-blue-100 text-blue-800'
                            }`}>
                                <div className="flex items-start">
                                    {codeReviewStatus === 'checking' && <Loader2 size={20} className="animate-spin mr-3"/>}
                                    {codeReviewStatus === 'success' && <CheckCircle2 size={20} className="mr-3 text-green-600"/>}
                                    {codeReviewStatus === 'error' && <X size={20} className="mr-3 text-red-600"/>}
                                    <div>
                                        <span className="font-bold block mb-1 text-base">
                                            {codeReviewStatus === 'checking' ? 'Reviewing...' : codeReviewStatus === 'success' ? 'Challenge Passed!' : 'Review Failed'}
                                        </span>
                                        <p className="opacity-90 leading-relaxed">{reviewFeedback}</p>
                                    </div>
                                </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="mt-8 flex justify-end">
                             <button
                                onClick={handleCheckCode}
                                disabled={codeReviewStatus === 'checking' || !userCode.trim()}
                                className={`px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 flex items-center shadow-lg ${
                                    codeReviewStatus === 'checking'
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-amber-400 hover:bg-amber-500 text-white shadow-amber-200'
                                }`}
                              >
                                {codeReviewStatus === 'checking' ? 'Checking...' : 'Submit Code'}
                             </button>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>

                  {/* FOOTER NAVIGATION */}
                  <div className="flex justify-end border-t border-gray-100 pt-8">
                    {(!selectedLesson.challenge || challengePassed) ? (
                        <button 
                            onClick={handleCompleteLesson}
                            className="flex items-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-slate-200 transform hover:-translate-y-1"
                        >
                            {completedLessons.has(selectedLesson.id) ? 'Next Lesson' : 'Complete & Continue'} <ArrowRight size={20} className="ml-3" />
                        </button>
                    ) : (
                        <div className="flex items-center text-slate-400 bg-gray-50 px-6 py-3 rounded-full border border-gray-100 font-medium">
                            <Lock size={16} className="mr-3" />
                            <span className="text-sm">Solve the challenge to unlock next step</span>
                        </div>
                    )}
                  </div>
               </div>
            </div>

           {/* RIGHT: AI Tutor Area (Clean White Background) */}
            <div className="w-full lg:w-1/4 h-1/3 lg:h-full bg-white border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col">
              <div className="h-full flex flex-col">
                  <ChatInterface 
                    context={resolvedLessonContent} 
                    lessonTitle={selectedLesson.title}
                    theme="light-blue-cyberpunk"
                  />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;