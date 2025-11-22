
export type ArrangementStage = 
  | 'INTRO'           // Welcome
  | 'SURPLUS_SPACE'   // Math concept: Total - Content = Surplus
  | 'MOVE_MAGIC'      // Start/Center/End (Movement)
  | 'CUT_MAGIC'       // SpaceBetween/Around/Evenly (Spacing)
  | 'PITFALL'         // WrapContent vs FillMax
  | 'BOTTOM_BAR_QUIZ' // PDF Quiz 1
  | 'WRAP_QUIZ'       // PDF Quiz 2
  | 'ADVANCED_INTRO'  // NEW: Shiny prompt before advanced Qs
  | 'ADVANCED_CHALLENGE_1' // New Prompt Q1
  | 'ADVANCED_CHALLENGE_2' // New Prompt Q2
  | 'ADVANCED_CHALLENGE_3' // New Prompt Q3
  | 'VICTORY';        // Completion
