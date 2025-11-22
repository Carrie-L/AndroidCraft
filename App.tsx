import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ComplexMarkdown from './components/MarkdownRenderer';
import ChatInterface from './components/ChatInterface';
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
  const MODULE_PALETTES = [
    { id: 'pink',   bg: 'bg-[#FFC1CC]', text: 'text-[#C25E58]', border: 'border-[#FFC1CC]', light: 'bg-[#FFF0F3]' }, // Sakura
    { id: 'blue',   bg: 'bg-[#A2E1DB]', text: 'text-[#4A7FB5]', border: 'border-[#A2E1DB]', light: 'bg-[#E6F7F6]' }, // Minty Blue
    { id: 'yellow', bg: 'bg-[#FDFD96]', text: 'text-[#B5A048]', border: 'border-[#FDFD96]', light: 'bg-[#FFFFE0]' }, // Pastel Yellow
    { id: 'purple', bg: 'bg-[#D4C4FB]', text: 'text-[#7A6BC2]', border: 'border-[#D4C4FB]', light: 'bg-[#F3EFFF]' }, // Lavender
    { id: 'orange', bg: 'bg-[#FFD8B1]', text: 'text-[#CC8A66]', border: 'border-[#FFD8B1]', light: 'bg-[#FFF5EB]' }, // Peach
    { id: 'green',  bg: 'bg-[#C7E9B0]', text: 'text-[#6CB57C]', border: 'border-[#C7E9B0]', light: 'bg-[#F1FBEB]' }, // Tea Green
    { id: 'cyan',   bg: 'bg-[#B2F7EF]', text: 'text-[#57967D]', border: 'border-[#B2F7EF]', light: 'bg-[#E8FDFA]' }, // Cyan
    { id: 'rose',   bg: 'bg-[#FAB0B0]', text: 'text-[#C26882]', border: 'border-[#FAB0B0]', light: 'bg-[#FDECEC]' }, // Light Red
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

  // 针对特定 Lesson（例如 1.1.1）从 public 目录加载外部 Markdown
  const [resolvedLessonContent, setResolvedLessonContent] = useState<string>('');
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
      return;
    }

    // 如果 Lesson 配置了 contentUrl，则优先从 public/ 下加载 markdown
    if (selectedLesson.contentUrl) {
      const url = selectedLesson.contentUrl;
      fetch(url)
        .then((res) => res.text())
        .then((text) => setResolvedLessonContent(text))
        .catch(() => {
          // 失败时退回到内联内容
          setResolvedLessonContent(selectedLesson.content);
        });
    } else {
      setResolvedLessonContent(selectedLesson.content);
    }
  }, [selectedLesson]);

  return (
    <div className={`min-h-screen font-sans selection:bg-pink-200 selection:text-pink-900 flex flex-col transition-colors duration-300 bg-[#FDFDFD] dark:bg-[#050a10]`}>
      
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
                        alert("该模块正在开发中，敬请期待！");
                    } else {
                        handleCategorySelect(cat.id);
                    }
                  }}
                  className={`group relative rounded-[2rem] p-8 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between bg-white
                    border-2 border-gray-50
                    hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
                    hover:-translate-y-2
                    ${cat.isComingSoon ? 'opacity-60 grayscale' : ''}
                  `}
                >
                   <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 opacity-40 transition-opacity ${
                       idx === 0 ? 'bg-green-200' : idx === 1 ? 'bg-purple-200' : 'bg-orange-200'
                   }`}></div>

                   <div>
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-slate-700 bg-gray-50 mb-8 group-hover:scale-110 transition-transform duration-300`}>
                         {getCategoryIcon(cat.iconName)}
                       </div>

                       <h3 className="text-2xl font-extrabold text-slate-800 mb-3">{cat.title}</h3>
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
          <div className="max-w-7xl mx-auto px-4 w-full py-12 animate-fade-in">
            
            <div className="flex flex-col items-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-slate-800 text-center mb-4 tracking-tight">
                 学习路线图
               </h2>
               <p className="text-slate-500 text-center font-medium">
                 8 个核心章节 · 从入门到大师
               </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {displayedModules.map((module, idx) => {
                 const palette = MODULE_PALETTES[idx % MODULE_PALETTES.length];
                 const sectionCount = module.sections.length;
                 const lessonCount = module.sections.reduce((acc, sec) => acc + sec.lessons.length, 0);
                 const completedInModule = module.sections.flatMap(s => s.lessons).filter(l => completedLessons.has(l.id)).length;
                 
                 return (
                   <div 
                      key={module.id}
                      onClick={() => handleModuleSelect(module)}
                      className={`group relative bg-white rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]`}
                   >
                      {/* Top Color Blob (Corner) */}
                      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full ${palette.bg} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`}></div>
                      <div className={`absolute -left-10 -bottom-10 w-32 h-32 rounded-full ${palette.bg} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}></div>

                      <div className="p-8 flex flex-col h-full relative z-10">
                          {/* Icon Box */}
                          <div className={`w-14 h-14 rounded-2xl ${palette.light} flex items-center justify-center ${palette.text} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                              {getModuleIcon(module.iconName, 26)}
                          </div>

                          {/* Title & Desc */}
                          <h3 className="text-xl font-black text-slate-800 mb-3 leading-tight">
                            {module.title.split('：')[1] || module.title}
                          </h3>
                          <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 flex-grow">
                            {module.description}
                          </p>

                          {/* Bottom Stats & Action */}
                          <div className="flex items-end justify-between mt-auto">
                              <div className="flex flex-col gap-1">
                                  <div className={`flex items-center text-xs font-bold ${palette.text}`}>
                                      {getModuleIcon(module.iconName, 12)}
                                      <span className="ml-1">{module.title.split(' ')[0]}</span>
                                  </div>
                                  <span className="text-xs font-bold text-slate-400">
                                      已学 {completedInModule} / 共 {lessonCount} 课
                                  </span>
                              </div>
                              
                              {/* Action Button (Start/Continue) */}
                              <div className={`w-10 h-10 rounded-full ${palette.light} ${palette.text} flex items-center justify-center transition-all duration-300 group-hover:w-24 overflow-hidden relative`}>
                                  <ArrowRight size={18} className="absolute transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0" />
                                  <span className="absolute whitespace-nowrap opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-xs font-extrabold uppercase tracking-wider">
                                      Start
                                  </span>
                              </div>
                          </div>
                      </div>
                   </div>
                 )
               })}
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
                 
                 <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-4 tracking-tight">
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
                        <div className="w-full md:w-1/2 pl-24 md:pl-0 md:px-0">
                              <div className={`group relative ${macaron.light} border border-white/50 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
                                 
                                 {/* Header Area (blended with body) */}
                                 <div className="p-5 border-b border-black/5 relative overflow-hidden">
                                     {/* Bubbles - White/Transparent */}
                                     <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/40 blur-xl"></div>
                                     <div className="absolute -left-8 bottom-0 w-16 h-16 rounded-full bg-white/30 blur-lg"></div>

                                     <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500/60 mb-1.5 block">
                                       SECTION 0{idx + 1}
                                     </span>
                                     <h3 className="text-xl font-black text-slate-800 relative z-10 flex items-center gap-3">
                                         <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black ${macaron.bg} text-white shadow-sm`}>
                                           {idx + 1}
                                         </span>
                                         {section.title}
                                     </h3>
                                 </div>

                                 {/* Lessons List */}
                                 <div className="p-4 space-y-2">
                                        {section.lessons.map((lesson, lIdx) => {
                                        const isCompleted = completedLessons.has(lesson.id);
                                        const locked = isLessonLocked(lesson.id);
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => handleStartLesson(lesson)}
                                                disabled={locked}
                                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-left group/item ${
                                                    locked 
                                                        ? 'opacity-40 cursor-not-allowed grayscale bg-black/5' 
                                                        : isCompleted
                                                            ? 'bg-white/80 border border-white shadow-sm' // Glassy completed
                                                            : 'bg-white/40 hover:bg-white/90 border border-transparent hover:shadow-sm' // Glassy default
                                                }`}
                                            >
                                                <div className="flex items-center gap-4 min-w-0">
                                                    <div className="shrink-0">
                                                            {isCompleted ? (
                                                                <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-white shadow-sm">
                                                                    <CheckCircle2 size={14} />
                                                                </div>
                                                            ) : locked ? (
                                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                                                                    <Lock size={12} />
                                                                </div>
                                                            ) : (
                                                                <div className={`w-6 h-6 rounded-full ${macaron.bg} flex items-center justify-center text-white font-bold text-[10px] shadow-sm group-hover/item:scale-110 transition-transform`}>
                                                                    {lIdx + 1}
                                                                </div>
                                                            )}
                                                    </div>
                                                    
                                                    <div className="flex flex-col">
                                                        <span className={`text-sm font-bold ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                        })}
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
                                <div className={`w-16 h-16 ${isSectionComplete ? 'bg-[#3DDC84] text-white' : `${macaron.bg} ${macaron.text}`} rounded-full flex items-center justify-center shadow-sm border-[6px] border-[#FDFDFD] transition-all duration-500 group-hover/section:scale-110`}>
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
            {/* ... (Same as previous, styling matches new theme naturally) ... */}
            {/* LEFT: Content Area */}
            <div className="w-full lg:w-2/3 h-full overflow-y-auto p-6 lg:p-12 bg-white border-r border-gray-100 scroll-smooth">
               <div className="max-w-3xl mx-auto pb-20">
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-[#3DDC84] mb-2 text-sm font-bold bg-[#3DDC84]/10 px-3 py-1 rounded-full w-fit">
                            <BookOpen size={14} className="mr-2" />
                            <span>LEARNING</span>
                        </div>
                        {completedLessons.has(selectedLesson.id) && (
                            <span className="flex items-center text-green-600 text-sm font-bold">
                                <CheckCircle2 size={16} className="mr-1"/> COMPLETED
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 mt-4 leading-tight">{selectedLesson.title}</h1>
                  </div>

                  <div className="prose prose-slate prose-headings:font-black prose-p:text-slate-600 prose-p:font-medium prose-li:text-slate-600 max-w-none mb-12">
                    <ComplexMarkdown content={resolvedLessonContent} basePath={lessonBasePath} />
                  </div>

                  {/* INTERACTIVE SECTIONS */}
                  <div className="space-y-8 mb-12">
                    
                    {/* QUIZ */}
                    {selectedLesson.quiz && (
                      <div className="bg-white rounded-3xl border-2 border-indigo-50 overflow-hidden shadow-sm">
                        <div className="bg-indigo-50/50 p-6 border-b border-indigo-50 flex items-center">
                          <div className="bg-indigo-100 p-2 rounded-lg mr-3 text-indigo-600">
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
                                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                      : 'bg-white border-gray-100 hover:border-indigo-200 text-slate-600'
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
                              className="mt-8 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-slate-200"
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

            {/* RIGHT: AI Tutor Area */}
            <div className="w-full lg:w-1/3 h-1/3 lg:h-full bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col">
              <ChatInterface 
              context={resolvedLessonContent} 
                lessonTitle={selectedLesson.title}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;