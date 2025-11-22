
export type ShapeClipStage = 
  | 'INTRO'
  | 'SQUARE_TO_CIRCLE'   // clip(CircleShape) demo
  | 'SHAPE_GALLERY'      // Showcase shapes
  | 'ORDER_MATTERS'      // clip vs background order
  | 'BORDER_PUZZLE'      // Mystery 1: Border vs Clip
  | 'SHAPE_MYSTERY'      // Mystery 2: Rect + CircleShape
  | 'CHALLENGE_INTRO'    // Intro to quiz
  | 'ADVANCED_Q1_ORDER'  // Background vs Clip logic
  | 'ADVANCED_Q2_TOUCH'  // Touch area impact
  | 'ADVANCED_Q3_RECT_CIRCLE' // Rect dimensions logic
  | 'ADVANCED_Q4_CORNERS'// RoundedCorner details
  | 'ADVANCED_Q5_BORDER' // Border drawing order
  | 'ADVANCED_Q6_PARENT' // Constraints theory
  | 'ADVANCED_Q7_FILLWIDTH' // fillMaxWidth theory
  | 'ADVANCED_Q8_TEXT_SIZE' // Text size theory
  | 'VICTORY';