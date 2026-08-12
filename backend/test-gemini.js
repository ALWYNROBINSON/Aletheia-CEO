import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key loaded:", !!apiKey);
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

const prompt = `You are Aletheia, a Virtual CEO & AI Executive Leadership System.
Analyze this strategic decision using rigorous governance frameworks (SWOT, PESTLE, ROI, Risk).

Title: Governance Check
Objective: Test
Context: Context Test
Constraints: Constraints
Options: 
Option A: test - test

Return ONLY a valid JSON object with the exact keys: "ledgerHtml", "boardHtml", "internalHtml", "publicHtml".
Each key should map to an HTML string. Use styling tags like <strong>, <ul> and <br>. Wrap major sections in <div class="doc-section"><h3>Section Name</h3><div class="doc-content"><p>...</p></div></div>. Use <div class="highlight-box"><h3>Chosen Strategy</h3><p>...</p></div> for the selected path in the ledger. Keep HTML clean.`;

const req = async () => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
        const prompt = `Hello`;
        const res = await fetch(url, {
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
        console.log("Status:", res.status);
        if(!res.ok) {
            console.log(await res.text());
        } else {
            console.log("SUCCESS");
        }
    } catch(e) {
        console.error(e);
    }
};
req();
