import React, { useState, useRef, useEffect, useCallback } from 'react';
import DecisionForm from '../components/DecisionForm';
import ResultsDashboard from '../components/ResultsDashboard';

// ── How long the user must wait between evaluations (free-tier protection) ────
const COOLDOWN_SECONDS = 60;
const COOLDOWN_LS_KEY  = 'aletheia_last_eval_ts';

// ── Progress steps — UI keeps animating until API actually responds ────────────
const STEPS = [
    { step: 1, label: 'Initializing AI',    targetPct: 15, holdMs: 1200 },
    { step: 2, label: 'Running Frameworks', targetPct: 35, holdMs: 3000 },
    { step: 3, label: 'Calculating ROI',    targetPct: 55, holdMs: 4000 },
    { step: 4, label: 'Governance Check',   targetPct: 75, holdMs: 5000 },
    { step: 5, label: 'Drafting Ledger',    targetPct: 88, holdMs: 9999999 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getCooldownRemaining() {
    const last = parseInt(localStorage.getItem(COOLDOWN_LS_KEY) || '0', 10);
    const elapsed = Math.floor((Date.now() - last) / 1000);
    return Math.max(0, COOLDOWN_SECONDS - elapsed);
}

export default function EvaluationPage() {
    const [status,          setStatus]          = useState('input');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [activeStep,      setActiveStep]      = useState(1);
    const [errorMsg,        setErrorMsg]        = useState('');
    const [resultsData,     setResultsData]     = useState(null);
    const [ledgerId,        setLedgerId]        = useState('');
    const [confScore,       setConfScore]       = useState(0);
    const [cooldown,        setCooldown]        = useState(() => getCooldownRemaining());

    const tickerRef   = useRef(null);
    const cooldownRef = useRef(null);

    // ── Cooldown countdown timer ───────────────────────────────────────────────
    const startCooldown = useCallback(() => {
        localStorage.setItem(COOLDOWN_LS_KEY, Date.now().toString());
        setCooldown(COOLDOWN_SECONDS);
        cooldownRef.current = setInterval(() => {
            setCooldown(prev => {
                if (prev <= 1) { clearInterval(cooldownRef.current); return 0; }
                return prev - 1;
            });
        }, 1000);
    }, []);

    // Resume cooldown if page reloads mid-countdown
    useEffect(() => {
        const remaining = getCooldownRemaining();
        if (remaining > 0) {
            setCooldown(remaining);
            cooldownRef.current = setInterval(() => {
                setCooldown(prev => {
                    if (prev <= 1) { clearInterval(cooldownRef.current); return 0; }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            clearInterval(cooldownRef.current);
            clearInterval(tickerRef.current);
        };
    }, []);

    // ── Progress ticker ───────────────────────────────────────────────────────
    const stopTicker = () => {
        if (tickerRef.current) { clearInterval(tickerRef.current); tickerRef.current = null; }
    };

    const startProgressTicker = () => {
        let stepIndex = 0;
        let stepStartTime = Date.now();
        let currentPct = 0;

        setActiveStep(STEPS[0].step);
        setLoadingProgress(Math.round(STEPS[0].targetPct * 0.3));

        tickerRef.current = setInterval(() => {
            const elapsed = Date.now() - stepStartTime;
            const current = STEPS[stepIndex];
            const prev    = stepIndex > 0 ? STEPS[stepIndex - 1].targetPct : 0;
            const ratio   = Math.min(elapsed / current.holdMs, 1);
            const eased   = prev + (current.targetPct - prev) * (1 - Math.pow(1 - ratio, 2));

            currentPct = Math.max(currentPct, eased);
            setLoadingProgress(Math.round(currentPct));

            if (elapsed >= current.holdMs && stepIndex < STEPS.length - 1) {
                stepIndex++;
                stepStartTime = Date.now();
                setActiveStep(STEPS[stepIndex].step);
            }
        }, 80);
    };

    // ── Main evaluation handler ───────────────────────────────────────────────
    const executeGeminiEvaluation = async (data) => {
        if (cooldown > 0) return; // Guard (button should already be disabled)

        setStatus('loading');
        setErrorMsg('');
        setLoadingProgress(0);
        setActiveStep(1);
        startProgressTicker();

        try {
            const response = await fetch('/api/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.error || `Backend error: ${response.status}`);
            }

            const resultData = await response.json();

            stopTicker();
            setActiveStep(5);
            setLoadingProgress(95);
            setTimeout(() => setLoadingProgress(100), 400);
            setTimeout(() => {
                setLedgerId(resultData.ledgerId);
                setConfScore(resultData.confScore);
                setResultsData(resultData.resultsData);
                setStatus('results');
                startCooldown(); // Start cooldown AFTER successful evaluation
            }, 1000);

        } catch (error) {
            stopTicker();
            console.error('Evaluation Error:', error);
            setErrorMsg(error.message || 'An unexpected error occurred.');
            setStatus('error');
            // Start cooldown even on error (to prevent spam retries that burn quota)
            startCooldown();
        }
    };

    const resetApp = () => {
        stopTicker();
        setStatus('input');
        setLoadingProgress(0);
        setActiveStep(1);
        setResultsData(null);
        setErrorMsg('');
    };

    // ── Render ────────────────────────────────────────────────────────────────
    if (status === 'results' && resultsData) {
        return <ResultsDashboard data={resultsData} onReset={resetApp} ledgerId={ledgerId} confScore={confScore} />;
    }

    if (status === 'error') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] text-center px-4">
                <div className="text-6xl mb-6">⚠️</div>
                <h2 className="text-2xl font-heading text-[#FF4DA6] mb-4 uppercase tracking-widest">Evaluation Failed</h2>
                <p className="text-[#9AA4C7] max-w-md mb-8">{errorMsg}</p>
                {cooldown > 0 ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-sm text-[#7A89A6] uppercase tracking-widest mb-1">Next evaluation available in</div>
                        <div className="text-5xl font-mono font-bold text-[#FF4DA6] drop-shadow-[0_0_15px_rgba(255,77,166,0.6)]">
                            {String(Math.floor(cooldown / 60)).padStart(2,'0')}:{String(cooldown % 60).padStart(2,'0')}
                        </div>
                        <div className="w-48 h-1 bg-[rgba(255,45,143,0.1)] rounded-full overflow-hidden mt-2">
                            <div
                                className="h-full bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] rounded-full transition-all duration-1000"
                                style={{ width: `${((COOLDOWN_SECONDS - cooldown) / COOLDOWN_SECONDS) * 100}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={resetApp}
                        className="bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:brightness-125 transition-all shadow-[0_4px_15px_rgba(255,45,143,0.4)]"
                    >
                        Try Again
                    </button>
                )}
            </div>
        );
    }

    return (
        <DecisionForm
            onSubmit={executeGeminiEvaluation}
            loading={status === 'loading'}
            progress={loadingProgress}
            activeStep={activeStep}
            cooldown={cooldown}
        />
    );
}
