
export type BoxStage = 
  | 'INTRO'
  | 'CONCEPT_LAYERS'     // 3D layer visualization
  | 'AVATAR_BUILDER'     // The practical task
  | 'DEFAULT_ALIGNMENT'  // TopStart default behavior
  | 'ADVANCED_INTRO'     // New section transition
  | 'ADVANCED_Q1_SIZE'   // Box sizing logic
  | 'ADVANCED_Q2_ORDER'  // Painting order metaphor
  | 'ADVANCED_Q3_PURPOSE'// Core purpose of Box
  | 'ADVANCED_Q4_DEFAULT'// Overlapping behavior
  | 'VICTORY';
