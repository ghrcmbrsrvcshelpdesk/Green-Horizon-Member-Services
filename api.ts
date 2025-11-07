import { GoogleGenAI } from '@google/genai';
import { ParticipantRecord } from './types';

/**
 * ===================================================================================
 * SERVER-SIDE LOGIC
 * ===================================================================================
 * This file represents your secure backend. In a real-world deployment on a platform
 * like Vercel or Netlify, this logic would live in serverless functions (e.g., in an `/api` directory).
 *
 * It is the ONLY place where the API key should be used.
 * The functions are prefixed with an underscore (_) to indicate they are "backend" implementations.
 * ===================================================================================
 */

// This is your secure, server-side instance of the AI client.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

/**
 * Summarizes the details of a service change request using Gemini.
 * @param details - The detailed text from the change request.
 * @returns A concise summary of the request.
 */
export const _summarizeRequestDetails = async (details: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Summarize the following service change request in one sentence: "${details}"`,
        config: {
            systemInstruction: "You are an administrative assistant. Your task is to provide brief, neutral summaries of user requests."
        }
    });
    return response.text;
  } catch (error) {
    console.error('Error summarizing request:', error);
    return 'Could not generate summary.';
  }
};

/**
 * Provides a recommendation on participant eligibility based on their record.
 * @param record - The participant's record.
 * @returns A string with an eligibility recommendation ('Eligible', 'Ineligible', 'Review').
 */
export const _checkEligibility = async (record: ParticipantRecord): Promise<string> => {
  const prompt = `
    Analyze the following participant record and determine their eligibility status.
    - Program: ${record.programName}
    - Eligibility Score: ${record.eligibilityScore}
    - Services Used: ${record.servicesUsed.length}
    - Enrollment Date: ${record.enrollmentDate}
    - Expiration Date: ${record.expirationDate}

    Criteria for eligibility:
    - Score must be 75 or higher.
    - Must be within their program dates.

    Based on this, is the participant eligible? Respond with only "Eligible", "Ineligible", or "Requires Manual Review".
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error('Error checking eligibility:', error);
    return 'Error determining eligibility.';
  }
};

/**
 * Generates financial advice for a participant based on their question.
 * @param question - The participant's financial question.
 * @returns A helpful financial tip from Gemini.
 */
export const _getFinancialAdvice = async (question: string): Promise<string> => {
    const prompt = `A program participant is asking for financial advice.
    Their question is: "${question}"
    Provide a concise, helpful, and general financial tip in response. Do not give personalized investment advice.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are a helpful financial wellness coach for a community program. Your advice should be encouraging and easy to understand."
            }
        });
        return response.text;
    } catch (error) {
        console.error('Error getting financial advice:', error);
        return "Sorry, I couldn't generate advice at this time. Please try again later.";
    }
}
