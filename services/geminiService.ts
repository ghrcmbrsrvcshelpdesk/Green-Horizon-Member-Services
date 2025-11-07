import { _checkEligibility, _getFinancialAdvice, _summarizeRequestDetails } from '../api';
import { ParticipantRecord } from '../types';

/**
 * ===================================================================================
 * CLIENT-SIDE API INTERFACE
 * ===================================================================================
 * This file acts as the client-side interface for interacting with your backend.
 * The React components import and use these functions.
 *
 * In a real-world deployment, these functions would use `fetch` to send
 * requests to your secure serverless functions (the logic for which is now in `api.ts`).
 * This ensures your API key is never exposed to the browser.
 *
 * For this development environment, we directly call the "backend" functions
 * from `api.ts` to maintain functionality while demonstrating the correct structure.
 * ===================================================================================
 */

/**
 * Sends a request to the backend to summarize service change request details.
 * @param details - The detailed text from the change request.
 * @returns A concise summary of the request.
 */
export const summarizeRequestDetails = async (details: string): Promise<string> => {
  // --- REAL-WORLD CODE EXAMPLE ---
  // const response = await fetch('/api/summarize', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ details }),
  // });
  // if (!response.ok) throw new Error('Network error');
  // const { summary } = await response.json();
  // return summary;
  
  // For simulation, we call the backend logic directly:
  return await _summarizeRequestDetails(details);
};

/**
 * Sends a participant's record to the backend for an eligibility check.
 * @param record - The participant's record.
 * @returns A string with an eligibility recommendation.
 */
export const checkEligibility = async (record: ParticipantRecord): Promise<string> => {
  // --- REAL-WORLD CODE EXAMPLE ---
  // const response = await fetch('/api/eligibility', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ record }),
  // });
  // if (!response.ok) throw new Error('Network error');
  // const { status } = await response.json();
  // return status;

  // For simulation, we call the backend logic directly:
  return await _checkEligibility(record);
};

/**
 * Sends a participant's financial question to the backend to get advice.
 * @param question - The participant's financial question.
 * @returns A helpful financial tip from Gemini.
 */
export const getFinancialAdvice = async (question: string): Promise<string> => {
  // --- REAL-WORLD CODE EXAMPLE ---
  // const response = await fetch('/api/advice', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ question }),
  // });
  // if (!response.ok) throw new Error('Network error');
  // const { advice } = await response.json();
  // return advice;

  // For simulation, we call the backend logic directly:
  return await _getFinancialAdvice(question);
};
