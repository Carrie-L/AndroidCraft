
export type QuestRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

export interface Quest {
  id: string;
  rank: QuestRank;
  title: string; // Fantasy title
  subTitle: string; // Real Codelab title
  description: string;
  xp: number;
  codelabUrl: string;
  requirements: string[];
  
  // New fields for time limit system
  countdown: number; // Duration in hours
  isTaked: boolean;
  isFinished: boolean;
  startTime?: number;
  endTime?: number;
  finishTime?: number;
  status?: 'available' | 'active' | 'completed' | 'failed'; // Derived status
}

export interface ActiveQuestState {
  questId: string;
  startTime: number;
  endTime: number;
}

export interface CompletedQuestState {
  questId: string;
  finishTime: number;
}

export interface UserProgress {
  level: number;
  currentXp: number;
  activeQuests: ActiveQuestState[]; 
  completedQuests: CompletedQuestState[];
  failedQuests: string[]; // IDs of failed quests
}
