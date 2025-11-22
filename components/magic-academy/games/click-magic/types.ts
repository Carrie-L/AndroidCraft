
export type ClickMagicStage = 
  | 'INTRO'
  | 'SPELL_THEORY'      // Concept of clickable (Touch, Logic, Visual)
  | 'MODIFIER_ORDER_LAB' // Padding vs Size interaction
  | 'RIPPLE_SHAPE_LAB'   // Clip vs Clickable order
  | 'CONSTRUCTION_LAB'   // Building a list item
  | 'ADVANCED_INTRO'     // Transition to hard questions
  | 'ADVANCED_Q1_PADDING'// Padding clickable logic
  | 'ADVANCED_Q2_TARGET' // Increase touch target
  | 'VICTORY';
