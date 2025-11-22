
export type AlignmentStage = 
  | 'INTRO'
  | 'AXIS_CONCEPT'     // Visualizing Main vs Cross axis
  | 'CONTAINER_RULE'   // Container-level alignment
  | 'INDIVIDUAL_RULE'  // Individual Modifier.align
  | 'GOLDEN_RULE'      // Conflict resolution
  | 'ADVANCED_INTRO'   // Quiz transition
  | 'ADVANCED_Q1'      // Row vertical alignment
  | 'ADVANCED_Q2'      // Arrangement vs Alignment
  | 'ADVANCED_Q3'      // verticalArrangement -> Column
  | 'ADVANCED_Q4'      // Flexbox abstraction purpose
  | 'ADVANCED_Q5'      // Column horizontal alignment
  | 'VICTORY';