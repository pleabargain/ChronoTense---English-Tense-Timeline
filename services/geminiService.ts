import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CefrLevel, TenseContent, TenseId, LevelDescription } from '../types';
import { FALLBACK_CONTENT, INITIAL_LEVEL_DESC } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

interface GenerationOptions {
  includeModals: boolean;
  includeConditionals: boolean;
}

// Cache keys need to include options now
const getCacheKey = (level: CefrLevel, options: GenerationOptions) => {
  return `${level}-${options.includeModals ? 'm' : ''}-${options.includeConditionals ? 'c' : ''}`;
};

const contentCache: Record<string, Record<TenseId, TenseContent>> = {};
const levelDescCache: Record<string, LevelDescription> = {};

export const generateTenseContentForLevel = async (level: CefrLevel, options: GenerationOptions): Promise<{ tenses: Record<TenseId, TenseContent>, levelDesc: LevelDescription }> => {
  if (!apiKey) {
    console.warn("No API Key provided, using fallback content.");
    return { tenses: FALLBACK_CONTENT, levelDesc: INITIAL_LEVEL_DESC };
  }

  const cacheKey = getCacheKey(level, options);

  if (contentCache[cacheKey] && levelDescCache[cacheKey]) {
    return { tenses: contentCache[cacheKey], levelDesc: levelDescCache[cacheKey] };
  }

  const model = "gemini-2.5-flash";
  
  let additionalInstructions = "";
  if (options.includeModals) {
    additionalInstructions += " IMPORTANT: Where grammatically natural for the tense, include modal verbs (can, could, should, might, must, would) in the EXAMPLE sentences.";
  }
  if (options.includeConditionals) {
    additionalInstructions += " IMPORTANT: Where grammatically natural for the tense, try to structure the EXAMPLE sentences as conditionals (using 'if' clauses).";
  }

  const systemInstruction = `You are an expert English language teacher specializing in the CEFR framework. 
  Your task is to generate explanations and examples for the 12 English tenses tailored specifically to a student at the ${level} level.
  
  ${additionalInstructions}

  General Guidelines:
  - For A1/A2 (Basic User): Use simple vocabulary, short sentences, and concrete everyday examples.
    * Specific Instruction for A2: For 'Present Continuous' and 'Simple Past', focus on describing ongoing actions and past events related to personal experiences and immediate surroundings.
    
  - For B1/B2 (Independent User): Use more complex sentence structures, wider vocabulary, and examples covering work, school, and travel.
    * Specific Instruction for B1: For 'Present Perfect' and 'Past Continuous', ensure the sentences can describe experiences, events, and personal opinions.
    
  - For C1/C2 (Proficient User): Use sophisticated vocabulary, nuanced explanations, and complex examples involving abstract ideas or formal contexts.
    * Specific Instruction for C1: For 'Past Perfect Continuous' and 'Simple Future', use sophisticated language and idiomatic expressions to convey ideas fluently and spontaneously.
  
  Also provide a brief summary of what the ${level} level means in terms of language proficiency (Spoken, Listening, Reading, Writing).`;

  const tenseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      explanation: { type: Type.STRING },
      example: { type: Type.STRING },
      useCase: { type: Type.STRING }
    },
    required: ["title", "explanation", "example", "useCase"]
  };

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      levelDescription: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          skills: {
            type: Type.OBJECT,
            properties: {
              speaking: { type: Type.STRING },
              listening: { type: Type.STRING },
              reading: { type: Type.STRING },
              writing: { type: Type.STRING },
            }
          }
        }
      },
      tenses: {
        type: Type.OBJECT,
        properties: {
          [TenseId.SIMPLE_PAST]: tenseSchema,
          [TenseId.PAST_CONTINUOUS]: tenseSchema,
          [TenseId.PAST_PERFECT]: tenseSchema,
          [TenseId.PAST_PERFECT_CONTINUOUS]: tenseSchema,
          [TenseId.SIMPLE_PRESENT]: tenseSchema,
          [TenseId.PRESENT_CONTINUOUS]: tenseSchema,
          [TenseId.PRESENT_PERFECT]: tenseSchema,
          [TenseId.PRESENT_PERFECT_CONTINUOUS]: tenseSchema,
          [TenseId.SIMPLE_FUTURE]: tenseSchema,
          [TenseId.FUTURE_CONTINUOUS]: tenseSchema,
          [TenseId.FUTURE_PERFECT]: tenseSchema,
          [TenseId.FUTURE_PERFECT_CONTINUOUS]: tenseSchema,
        }
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Generate content for CEFR Level ${level}.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");

    const data = JSON.parse(text);
    
    // Validate we have all keys, if not merge with fallback
    const tenses = { ...FALLBACK_CONTENT, ...data.tenses };
    const levelDesc = data.levelDescription || INITIAL_LEVEL_DESC;

    contentCache[cacheKey] = tenses;
    levelDescCache[cacheKey] = levelDesc;

    return { tenses, levelDesc };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { tenses: FALLBACK_CONTENT, levelDesc: INITIAL_LEVEL_DESC };
  }
};

export const generateSingleExample = async (
  level: CefrLevel, 
  tenseTitle: string, 
  currentExample: string,
  options: GenerationOptions
): Promise<string> => {
  if (!apiKey) return "API Key missing. Cannot generate new example.";

  const model = "gemini-2.5-flash";
  
  let constraints = "";
  if (options.includeModals) constraints += " Include a modal verb (can, could, should, etc.).";
  if (options.includeConditionals) constraints += " Structure the sentence as a conditional (if-clause).";

  const prompt = `Generate a single, short English sentence example for the '${tenseTitle}' tense at CEFR level ${level}.
  ${constraints}
  It must be different from this example: "${currentExample}".
  Return ONLY the sentence text, no quotes or explanations.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "text/plain",
      }
    });

    return response.text?.trim() || currentExample;
  } catch (error) {
    console.error("Error generating single example:", error);
    return currentExample;
  }
};