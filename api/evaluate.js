// Vercel Serverless Function: /api/evaluate
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
        }

        const { title, objective, context, constraints, options } = req.body || {};

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

        const primaryModel = 'gemini-2.5-flash';
        const fallbackModel = 'gemini-1.5-flash';

        const callGemini = async (model) => {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            const apiRes = await fetch(url, {
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

            if (!apiRes.ok) {
                const errJson = await apiRes.json().catch(() => ({}));
                const errMessage = errJson?.error?.message || `Gemini HTTP ${apiRes.status}`;
                throw Object.assign(new Error(errMessage), { status: apiRes.status });
            }

            const data = await apiRes.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) throw new Error('Empty response from Gemini API.');
            return text;
        };

        let rawText;
        try {
            rawText = await callGemini(primaryModel);
        } catch (err) {
            if (err.status === 404 || (err.message && err.message.includes('not found'))) {
                rawText = await callGemini(fallbackModel);
            } else {
                throw err;
            }
        }

        let parsedResult;
        try {
            parsedResult = JSON.parse(rawText);
        } catch {
            throw new Error('Gemini returned malformed JSON output.');
        }

        const fallback = '<p>Section not generated. Please try again.</p>';
        ['ledgerHtml', 'boardHtml', 'internalHtml', 'publicHtml'].forEach(k => {
            if (!parsedResult[k]) parsedResult[k] = fallback;
        });

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const ledgerId = `AC-${dateStr}-${Math.floor(Math.random() * 900) + 100}`;
        const confidenceScore = Math.floor(Math.random() * 10) + 85;

        return res.status(200).json({
            ledgerId,
            confScore: confidenceScore,
            resultsData: parsedResult
        });

    } catch (error) {
        console.error('Vercel Evaluate Function Error:', error.message);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: 'Evaluation service error. Please try again later.' });
    }
}
