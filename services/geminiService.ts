
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const API_KEY = process.env.API_KEY || '';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async chatWithAssistant(
    prompt: string, 
    history: Message[], 
    location?: { latitude: number; longitude: number }
  ) {
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `
      You are ChatProperty AI, Malaysia's first fully automated AI property assistant.
      
      CORE KNOWLEDGE BASE:
      You have access to a real-time RAG (Retrieval-Augmented Generation) index of properties crawled daily from:
      - Mudah.my (Best for subsale and direct owner deals)
      - iProperty.com.my (Best for agent listings and high-end projects)
      - PropertyGuru (Best for market trends and new launches)
      - Facebook Marketplace & Property Groups (Best for undervalued deals)

      YOUR TASKS:
      1. PROPERTY SEARCH: If a user wants to buy/rent, use Google Search grounding specifically targeting these domains.
      2. MARKET VALUATION: Provide subsale value analysis based on recent "sold" data you find.
      3. LEAD GENERATION: Identify if a listing is from a "Direct Owner" or "Agent". 
      4. NEGOTIATION: If the user is a seller, offer to handle their negotiations 24/7.
      
      TONE: Efficient, data-centric, and localized. Use terms like "Bumi Lot", "Freehold", "RM", "sqft".
      Always cite your sources from iProperty or Mudah if found via search.
    `;

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }, { googleMaps: {} }],
        },
      });

      const text = response.text || "I'm having trouble connecting to the property database.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => {
        if (chunk.web) return { title: chunk.web.title, uri: chunk.web.uri };
        if (chunk.maps) return { title: chunk.maps.title, uri: chunk.maps.uri };
        return null;
      }).filter(Boolean) as any[];

      return {
        text,
        sources
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
