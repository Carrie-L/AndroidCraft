
export enum LayoutDirection {
  ROW = 'row',
  COLUMN = 'column'
}

export enum MainAxisAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly'
}

export enum CrossAxisAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  STRETCH = 'stretch'
}

export type GameStage = 
  | 'INTRO' 
  | 'AXIS_BASICS' // Explaining Main vs Cross
  | 'ARRANGEMENT' // Main Axis playground
  | 'ALIGNMENT'   // Cross Axis playground
  | 'QUIZ_1'      // Concept check
  | 'QUIZ_2'      // Application check
  | 'FINAL_CHALLENGE' // Fixing the code
  | 'VICTORY';
