import express from 'express';
import db from '../db.js';

const router = express.Router();

// Helper to execute Gemini generation via Google Generative AI REST API
async function generateGeminiContent(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw Object.assign(new Error('GEMINI_API_KEY is not configured on the server.'), { status: 500 });
    }

    const primaryModel = 'gemini-2.5-flash';
    const fallbackModel = 'gemini-1.5-flash';

    const makeCall = async (model) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2,
                    response_mime_type: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            const errMessage = errJson?.error?.message || `Gemini API HTTP ${response.status}`;
            throw Object.assign(new Error(errMessage), { status: response.status });
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error('Empty response received from Gemini API.');
        }
        return text;
    };

    try {
        return await makeCall(primaryModel);
    } catch (err) {
        // Fallback if primary model fails with 404 or unsupported
        if (err.status === 404 || (err.message && err.message.includes('not found'))) {
            return await makeCall(fallbackModel);
        }
        throw err;
    }
}

// ─── POST /api/evaluate ───────────────────────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const { title, objective, context, constraints, options } = req.body;

        if (!title || !objective || !options || !Array.isArray(options) || options.length === 0) {
            return res.status(400).json({ error: 'Missing required fields: title, objective, and options are required.' });
        }

        const optionsText = options
            .map((opt, i) => `${String.fromCharCode(65 + i)}: ${opt.name} — ${opt.description}`)
            .join('\n');

        const prompt = `You are Aletheia, a Virtual CEO AI. Analyze this strategic decision concisely.

DECISION: ${title}
GOAL: ${objective}
CONTEXT: ${context || 'N/A'}
CONSTRAINTS: ${constraints || 'None'}
OPTIONS:
${optionsText}

Return a JSON object with exactly these 4 keys. Each value is a SHORT HTML string.
Use only these tags: <strong>, <ul>, <li>, <p>, <br>, <div class="doc-section">, <h3>, <div class="doc-content">, <div class="highlight-box">.
Keep each section to 3-5 bullet points. Be direct and data-driven.

Keys required:
- ledgerHtml: Include a highlight-box with the recommended option and rationale, then a doc-section with SWOT/Risk/ROI bullets
- boardHtml: doc-section with board-level summary: strategic fit, financial impact, timeline, vote recommendation
- internalHtml: doc-section with implementation steps, resource needs, risk mitigation, success metrics
- publicHtml: doc-section with a 1-2 sentence stakeholder-facing statement about the decision`;

        const rawText = await generateGeminiContent(prompt);

        let parsedResult;
        try {
            parsedResult = JSON.parse(rawText);
        } catch {
            console.error('JSON parse failed. Raw output:', rawText);
            throw new Error('Gemini returned malformed JSON output.');
        }

        // Ensure all 4 keys exist
        const fallback = '<p>Section not generated. Please try again.</p>';
        ['ledgerHtml', 'boardHtml', 'internalHtml', 'publicHtml'].forEach(k => {
            if (!parsedResult[k]) parsedResult[k] = fallback;
        });

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const ledgerId = `AC-${dateStr}-${Math.floor(Math.random() * 900) + 100}`;
        const confidenceScore = Math.floor(Math.random() * 10) + 85;

        try {
            await db.query(
                `INSERT INTO evaluations (ledger_id, title, objective, context, constraints, options, confidence_score, results_json)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [ledgerId, title, objective, context || '', constraints || '',
                 JSON.stringify(options), confidenceScore, JSON.stringify(parsedResult)]
            );
        } catch (dbErr) {
            console.warn('DB Insert skipped or failed:', dbErr.message);
        }

        res.json({ ledgerId, confScore: confidenceScore, resultsData: parsedResult });

    } catch (error) {
        console.error('Evaluation API Error:', error);
        const statusCode = error.status || error.statusCode || 500;
        const messages = {
            400: 'Invalid request payload.',
            401: 'Gemini API authentication failed. Check server GEMINI_API_KEY configuration.',
            429: 'Rate limit reached. Please wait a moment and try again.',
            503: 'Gemini service temporarily unavailable. Please try again shortly.',
        };
        res.status(statusCode).json({ error: messages[statusCode] || 'Evaluation service error.' });
    }
});

// ─── GET /api/evaluate (history) ─────────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, ledger_id, title, confidence_score, created_at, results_json FROM evaluations ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        res.json([]);
    }
});

export default router;

