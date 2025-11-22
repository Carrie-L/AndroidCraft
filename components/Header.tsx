import React from 'react';
import { ViewState, Module } from '../types';
import { Smartphone, Home, ChevronRight, Sun, Moon, Layers } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  selectedModule: Module | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, selectedModule, theme, toggleTheme }) => {
  
  // Helper to navigate back based on current state
  const handleBreadcrumbClick = (target: ViewState) => {
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Breadcrumbs */}
          <div className="flex items-center overflow-hidden">
             <div 
              className="flex items-center cursor-pointer group flex-shrink-0" 
              onClick={() => onNavigate(ViewState.LANDING)}
            >
              <div className="bg-android text-slate-900 p-1.5 rounded-lg mr-3 group-hover:bg-slate-800 group-hover:text-android dark:group-hover:bg-white transition-colors">
                <Smartphone size={24} strokeWidth={2.5} />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Android<span className="text-android">Craft</span></h1>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center ml-4 text-sm whitespace-nowrap overflow-x-auto scrollbar-hide mask-linear-fade">
              
              {/* Level 1: Roadmap Home */}
              {(currentView === ViewState.ROADMAP_HOME || currentView === ViewState.MODULE_DETAIL || currentView === ViewState.LESSON_DETAIL) && (
                 <>
                  <ChevronRight size={16} className="text-slate-400 mx-2 flex-shrink-0" />
                  <button 
                    onClick={() => handleBreadcrumbClick(ViewState.ROADMAP_HOME)}
                    className={`font-medium hover:text-android transition-colors ${currentView === ViewState.ROADMAP_HOME ? 'text-android' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    Compose 路线图
                  </button>
                 </>
              )}

              {/* Level 2: Module Detail */}
              {(currentView === ViewState.MODULE_DETAIL || currentView === ViewState.LESSON_DETAIL) && selectedModule && (
                 <>
                  <ChevronRight size={16} className="text-slate-400 mx-2 flex-shrink-0" />
                  <button 
                    onClick={() => handleBreadcrumbClick(ViewState.MODULE_DETAIL)}
                    className={`font-medium hover:text-android transition-colors truncate max-w-[120px] md:max-w-none ${currentView === ViewState.MODULE_DETAIL ? 'text-android' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {selectedModule.title.split('：')[0]}
                  </button>
                 </>
              )}
              
              {/* Level 3: Lesson Detail */}
              {currentView === ViewState.LESSON_DETAIL && (
                <>
                  <ChevronRight size={16} className="text-slate-400 mx-2 flex-shrink-0" />
                  <span className="text-slate-800 dark:text-white font-medium">
                     正在学习
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <nav className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => onNavigate(ViewState.LANDING)}
              className="hidden md:flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Home size={18} className="mr-2" />
              首页
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;