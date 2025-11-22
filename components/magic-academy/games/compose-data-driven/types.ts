
export type DataDrivenStage = 
  | 'INTRO'
  | 'PROJECTOR_THEORY' // UI = f(State) interactive projector
  | 'TEMPLATE_LAB'     // String template coding task
  | 'IDEMPOTENCE'      // Idempotence visualization
  | 'VICTORY';
