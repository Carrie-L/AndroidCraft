
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const verifySubmission = async (questTitle: string, repoLink: string): Promise<string> => {
  try {
    const prompt = `
      You are the Grand Magister of a Fantasy Adventurer's Guild for Wizards (Coders).
      A student has submitted a project for the quest titled "${questTitle}".
      Their submission link is: "${repoLink}".
      
      Your task:
      1. Ignore the fact that you cannot access the internet to verify the link. Assume the link is valid.
      2. Write a SHORT, whimsical, fantasy-themed proclamation (max 50 words) approving their submission.
      3. Use terms like "Magic Purity", "Code Weaving", "Structure Spells".
      4. Conclude that the quest is COMPLETE.
      5. Do NOT ask for more code. Just approve it with flavor text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || " The magical energies swirl... The submission is accepted!";
  } catch (error) {
    console.error("Magister is sleeping:", error);
    return "The Grand Magister nods silently. Your deed is recorded in the archives. (Offline Mode: Success)";
  }
};
