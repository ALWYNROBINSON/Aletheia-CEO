// Vercel Serverless Function: /api/gemini
// Secure proxy endpoint for Gemini requests
import evaluateHandler from './evaluate.js';

export default async function handler(req, res) {
    return evaluateHandler(req, res);
}
