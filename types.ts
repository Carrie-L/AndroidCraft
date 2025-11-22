export enum ViewState {
  LANDING = 'LANDING',
  ROADMAP_HOME = 'ROADMAP_HOME',   // The grid list of 8 Chapters
  MODULE_DETAIL = 'MODULE_DETAIL', // The timeline view of Sections within a Chapter
  LESSON_DETAIL = 'LESSON_DETAIL', // The content view
  MAGIC_ACADEMY = 'MAGIC_ACADEMY',  // 起司猫的 UI 魔法学院
  GUILD_HALL = 'GUILD_HALL'  // 星辰委托公会
}

export enum Difficulty {
  BEGINNER = '入门',
  INTERMEDIATE = '进阶',
  ADVANCED = '精通',
  EXPERT = '专家',
  MASTER = '大师'
}

export interface TopicCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  isComingSoon?: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  order: number;
  // 可选：如果提供，则从 Vite public/ 根目录下按 URL 动态加载 markdown，而不是使用内联 content
  contentUrl?: string;
  quiz?: Quiz;
  challenge?: Challenge;
}

export interface Section {
  id: string;
  title: string;
  description: string; // 核心能力
  lessons: Lesson[];
}

export interface Module {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  iconName: string;
  sections: Section[]; // Changed from lessons to sections
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
}