import { CefrLevel, TenseId, TimeFrame, TenseDefinition, TenseContent, LevelDescription } from './types';

export const TENSES: TenseDefinition[] = [
  // PAST
  { id: TenseId.PAST_PERFECT_CONTINUOUS, timeFrame: TimeFrame.PAST, defaultTitle: 'Past Perfect Continuous' },
  { id: TenseId.PAST_PERFECT, timeFrame: TimeFrame.PAST, defaultTitle: 'Past Perfect' },
  { id: TenseId.PAST_CONTINUOUS, timeFrame: TimeFrame.PAST, defaultTitle: 'Past Continuous' },
  { id: TenseId.SIMPLE_PAST, timeFrame: TimeFrame.PAST, defaultTitle: 'Simple Past' },
  
  // PRESENT
  { id: TenseId.PRESENT_PERFECT_CONTINUOUS, timeFrame: TimeFrame.PRESENT, defaultTitle: 'Present Perfect Continuous' },
  { id: TenseId.PRESENT_PERFECT, timeFrame: TimeFrame.PRESENT, defaultTitle: 'Present Perfect' },
  { id: TenseId.SIMPLE_PRESENT, timeFrame: TimeFrame.PRESENT, defaultTitle: 'Simple Present' },
  { id: TenseId.PRESENT_CONTINUOUS, timeFrame: TimeFrame.PRESENT, defaultTitle: 'Present Continuous' },
  
  // FUTURE
  { id: TenseId.SIMPLE_FUTURE, timeFrame: TimeFrame.FUTURE, defaultTitle: 'Simple Future' },
  { id: TenseId.FUTURE_CONTINUOUS, timeFrame: TimeFrame.FUTURE, defaultTitle: 'Future Continuous' },
  { id: TenseId.FUTURE_PERFECT, timeFrame: TimeFrame.FUTURE, defaultTitle: 'Future Perfect' },
  { id: TenseId.FUTURE_PERFECT_CONTINUOUS, timeFrame: TimeFrame.FUTURE, defaultTitle: 'Future Perfect Continuous' },
];

export const INITIAL_LEVEL_DESC: LevelDescription = {
  summary: "The A1 level is the Beginner level on the Common European Framework of Reference for Languages (CEFR). At this level, a person is considered a Basic User.",
  skills: {
    speaking: "Understand and use familiar everyday expressions and very basic phrases. Introduce themselves and others.",
    listening: "Recognize familiar words and very basic phrases concerning themselves and family when people speak slowly.",
    reading: "Understand familiar names, words, and very simple sentences, for example on notices.",
    writing: "Write simple sentences and phrases, such as a postcard or a very simple personal letter."
  }
};

// Fallback content to ensure the UI isn't empty if API fails or hasn't loaded
export const FALLBACK_CONTENT: Record<TenseId, TenseContent> = {
  [TenseId.SIMPLE_PAST]: {
    title: "Simple Past",
    explanation: "Used for actions that happened and finished in the past.",
    example: "I walked to school yesterday.",
    useCase: "Completed past actions."
  },
  [TenseId.PAST_CONTINUOUS]: {
    title: "Past Continuous",
    explanation: "Used for actions that were happening at a specific time in the past.",
    example: "I was reading a book when you called.",
    useCase: "Interrupted past actions or parallel actions."
  },
  [TenseId.PAST_PERFECT]: {
    title: "Past Perfect",
    explanation: "Used to show that one action happened before another action in the past.",
    example: "I had finished my homework before I went out.",
    useCase: "Sequence of past events."
  },
  [TenseId.PAST_PERFECT_CONTINUOUS]: {
    title: "Past Perfect Continuous",
    explanation: "Used to show that an action started in the past and continued up to another point in the past.",
    example: "I had been waiting for an hour when the bus finally arrived.",
    useCase: "Duration before a past event."
  },
  [TenseId.SIMPLE_PRESENT]: {
    title: "Simple Present",
    explanation: "Used for facts, habits, and general truths.",
    example: "I play tennis every Sunday.",
    useCase: "Habits and facts."
  },
  [TenseId.PRESENT_CONTINUOUS]: {
    title: "Present Continuous",
    explanation: "Used for actions happening right now.",
    example: "I am writing an email.",
    useCase: "Actions in progress."
  },
  [TenseId.PRESENT_PERFECT]: {
    title: "Present Perfect",
    explanation: "Used for past actions that have a connection to the present.",
    example: "I have visited Paris twice.",
    useCase: "Life experiences or recent changes."
  },
  [TenseId.PRESENT_PERFECT_CONTINUOUS]: {
    title: "Present Perfect Continuous",
    explanation: "Used for actions that started in the past and are still continuing.",
    example: "I have been learning English for three years.",
    useCase: "Continuing actions."
  },
  [TenseId.SIMPLE_FUTURE]: {
    title: "Simple Future",
    explanation: "Used for predictions or instant decisions.",
    example: "I will call you later.",
    useCase: "Predictions and promises."
  },
  [TenseId.FUTURE_CONTINUOUS]: {
    title: "Future Continuous",
    explanation: "Used for actions that will be in progress at a specific time in the future.",
    example: "This time tomorrow, I will be flying to London.",
    useCase: "Future actions in progress."
  },
  [TenseId.FUTURE_PERFECT]: {
    title: "Future Perfect",
    explanation: "Used for actions that will be completed before a specific time in the future.",
    example: "By next year, I will have graduated.",
    useCase: "Completed future actions."
  },
  [TenseId.FUTURE_PERFECT_CONTINUOUS]: {
    title: "Future Perfect Continuous",
    explanation: "Used to show the duration of an action up to a certain point in the future.",
    example: "By 5 PM, I will have been working for eight hours.",
    useCase: "Duration up to a future point."
  },
};
