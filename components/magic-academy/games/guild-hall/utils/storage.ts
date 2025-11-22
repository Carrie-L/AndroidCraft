
import { UserProgress } from '../types';
import { QUESTS } from '../data/quests';

const STORAGE_KEY = 'guild_progress_v2'; // Version bump for schema change

const INITIAL_PROGRESS: UserProgress = {
  level: 1,
  currentXp: 0,
  activeQuests: [],
  completedQuests: [],
  failedQuests: []
};

export const getProgress = (): UserProgress => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const progress = JSON.parse(saved);
      
      // Basic schema check/migration (simple check if activeQuests is array)
      if (Array.isArray(progress.activeQuests)) {
          return progress;
      }
    } catch (e) {
      console.error("Failed to parse guild progress", e);
    }
  }
  return INITIAL_PROGRESS;
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const acceptQuest = (questId: string) => {
  const progress = getProgress();
  
  // Check if already active or completed
  const isActive = progress.activeQuests.some(q => q.questId === questId);
  const isCompleted = progress.completedQuests.some(q => q.questId === questId);
  
  // Remove from failed list if retrying
  if (progress.failedQuests.includes(questId)) {
      progress.failedQuests = progress.failedQuests.filter(id => id !== questId);
  }

  if (!isActive && !isCompleted) {
    const quest = QUESTS.find(q => q.id === questId);
    if (quest) {
        const now = Date.now();
        const durationMs = quest.countdown * 60 * 60 * 1000;
        
        progress.activeQuests.push({
            questId: questId,
            startTime: now,
            endTime: now + durationMs
        });
        saveProgress(progress);
    }
  }
  return progress;
};

export const completeQuest = (questId: string, xpGain: number) => {
  const progress = getProgress();
  const activeQuestIndex = progress.activeQuests.findIndex(q => q.questId === questId);
  
  if (activeQuestIndex !== -1) {
    // Check if failed time
    const activeQuest = progress.activeQuests[activeQuestIndex];
    const now = Date.now();
    
    if (now > activeQuest.endTime) {
        // Failed!
        progress.activeQuests.splice(activeQuestIndex, 1);
        if (!progress.failedQuests.includes(questId)) {
            progress.failedQuests.push(questId);
        }
        // No XP gain
    } else {
        // Success
        progress.activeQuests.splice(activeQuestIndex, 1);
        progress.completedQuests.push({
            questId: questId,
            finishTime: now
        });
        progress.currentXp += xpGain;
        // Simple leveling: every 500 XP is a level
        progress.level = 1 + Math.floor(progress.currentXp / 500);
    }
    
    saveProgress(progress);
  }
  return progress;
};

// Helper to check for expired quests without user action
export const checkExpiredQuests = () => {
    const progress = getProgress();
    const now = Date.now();
    let changed = false;

    const newActiveQuests = [];
    for (const aq of progress.activeQuests) {
        if (now > aq.endTime) {
            // Expired
            progress.failedQuests.push(aq.questId);
            changed = true;
        } else {
            newActiveQuests.push(aq);
        }
    }

    if (changed) {
        progress.activeQuests = newActiveQuests;
        saveProgress(progress);
    }
    return progress;
};
