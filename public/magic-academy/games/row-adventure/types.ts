
export type RowStage = 
  | 'INTRO'           // Introduction to the campsite
  | 'CHAOS_QUEUE'     // Items overlapping without Row
  | 'ROW_SPELL'       // Applying Row to fix order
  | 'BASELINE_ALIGN'  // Text alignment issue and fix
  | 'OVERFLOW_LIMIT'  // Too many cats, clipping
  | 'CODE_QUIZ'       // Quiz: Which container?
  | 'VISUAL_QUIZ'     // Quiz: Predict order
  | 'VICTORY';        // Completion
