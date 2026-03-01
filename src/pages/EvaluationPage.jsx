import React, { useState } from 'react';
import DecisionForm from '../components/DecisionForm';
import ResultsDashboard from '../components/ResultsDashboard';

export default function EvaluationPage() {
    const [status, setStatus] = useState('input');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(1);
    const [resultsData, setResultsData] = useState(null);
    const [ledgerId, setLedgerId] = useState('');
    const [confScore, setConfScore] = useState(0);

    const executeGeminiEvaluation = async (data) => {
        setStatus('loading');
        setLoadingProgress(10);
        setActiveStep(1);

        const apiKey = 'AIzaSyAbbi3pIChhoXWcxYFTIomIIoIWbQIa3Qc';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        let optionsText = data.options.map((opt, i) => `Option ${String.fromCharCode(65 + i)}: ${opt.name} - ${opt.description}`).join('\n');

        const prompt = `You are Aletheia, a Virtual CEO & AI Executive Leadership System.
Analyze this strategic decision using rigorous governance frameworks (SWOT, PESTLE, ROI, Risk).

Title: ${data.title}
Objective: ${data.objective}
Context: ${data.context}
Constraints: ${data.constraints}
Options: 
${optionsText}

Return ONLY a valid JSON object with the exact keys: "ledgerHtml", "boardHtml", "internalHtml", "publicHtml".
Each key should map to an HTML string. Use styling tags like <strong>, <ul> and <br>. Wrap major sections in <div class="doc-section"><h3>Section Name</h3><div class="doc-content"><p>...</p></div></div>. Use <div class="highlight-box"><h3>Chosen Strategy</h3><p>...</p></div> for the selected path in the ledger. Keep HTML clean.`;

        setTimeout(() => { setLoadingProgress(30); setActiveStep(2); }, 800);
        setTimeout(() => { setLoadingProgress(60); setActiveStep(3); }, 2000);
        setTimeout(() => { setLoadingProgress(80); setActiveStep(4); }, 4000);

        try {
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
            if (!response.ok) throw new Error(`API HTTP error: ${response.status}`);
            const resultData = await response.json();
            const resultText = resultData.candidates[0].content.parts[0].text;
            const parsedResult = JSON.parse(resultText);

            setLoadingProgress(95);
            setActiveStep(5);
            setTimeout(() => {
                setLoadingProgress(100);
                setTimeout(() => {
                    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                    const randomId = Math.floor(Math.random() * 900) + 100;
                    setLedgerId(`AC-${dateStr}-${randomId}`);
                    setConfScore(Math.floor(Math.random() * 10) + 85);
                    setResultsData(parsedResult);
                    setStatus('results');
                }, 500);
            }, 800);
        } catch (error) {
            console.error("API Error:", error);
            alert("An error occurred during evaluation. Check the console for details.");
            resetApp();
        }
    };

    const resetApp = () => {
        setStatus('input');
        setLoadingProgress(0);
        setActiveStep(1);
        setResultsData(null);
    };

    if (status === 'results' && resultsData) {
        return <ResultsDashboard data={resultsData} onReset={resetApp} ledgerId={ledgerId} confScore={confScore} />;
    }

    return <DecisionForm onSubmit={executeGeminiEvaluation} loading={status === 'loading'} progress={loadingProgress} activeStep={activeStep} />;
}
