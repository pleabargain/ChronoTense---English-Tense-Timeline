export enum CefrLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export enum TimeFrame {
  PAST = 'Past',
  PRESENT = 'Present',
  FUTURE = 'Future'
}

export enum TenseId {
  SIMPLE_PAST = 'simple_past',
  PAST_CONTINUOUS = 'past_continuous',
  PAST_PERFECT = 'past_perfect',
  PAST_PERFECT_CONTINUOUS = 'past_perfect_continuous',
  
  SIMPLE_PRESENT = 'simple_present',
  PRESENT_CONTINUOUS = 'present_continuous',
  PRESENT_PERFECT = 'present_perfect',
  PRESENT_PERFECT_CONTINUOUS = 'present_perfect_continuous',
  
  SIMPLE_FUTURE = 'simple_future',
  FUTURE_CONTINUOUS = 'future_continuous',
  FUTURE_PERFECT = 'future_perfect',
  FUTURE_PERFECT_CONTINUOUS = 'future_perfect_continuous'
}

export interface TenseContent {
  title: string;
  explanation: string;
  example: string;
  useCase: string;
}

export interface TenseDefinition {
  id: TenseId;
  timeFrame: TimeFrame;
  defaultTitle: string;
}

export interface LevelDescription {
  summary: string;
  skills: {
    speaking: string;
    listening: string;
    reading: string;
    writing: string;
  };
}
