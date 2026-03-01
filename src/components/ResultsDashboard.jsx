import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import DOMPurify from 'dompurify';

export default function ResultsDashboard({ data, onReset, ledgerId, confScore }) {
    const [activeTab, setActiveTab] = useState('ledger');

    const renderHtmlContent = (htmlString) => {
        // Sanitize HTML received from API
        const cleanHtml = DOMPurify.sanitize(htmlString, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'h3', 'ul', 'li', 'br', 'div'],
            ALLOWED_ATTR: ['class']
        });
        return { __html: cleanHtml || "Error generating content." };
    };

    return (
        <div className="max-w-5xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-500">
            {/* Header / Stats */}
            <div className="glass-panel p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-[rgba(255,45,143,0.15)] bg-[#0B0F1A]/90">
                <div>
                    <h1 className="text-3xl font-heading text-[#EAF0FF] font-bold mb-2 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(234,240,255,0.2)]">Evaluation Complete</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm mt-3">
                        <span className="flex items-center gap-2 bg-[rgba(122,92,255,0.1)] text-[#7A5CFF] px-4 py-1.5 rounded-full font-mono border border-[#7A5CFF]/30 shadow-[inset_0_0_10px_rgba(122,92,255,0.1)] drop-shadow-[0_0_5px_#7A5CFF]">
                            <ShieldCheck size={16} />
                            {ledgerId}
                        </span>
                        <span className="text-[#9AA4C7] font-medium tracking-wide">
                            Confidence Level: <span className="text-[#FF2D8F] font-bold drop-shadow-[0_0_5px_#FF2D8F] ml-1 text-base">{confScore}%</span>
                        </span>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#FF2D8F]/40 text-[#FF4DA6] hover:bg-[rgba(255,45,143,0.15)] font-bold transition-all bg-[rgba(255,45,143,0.05)] text-sm shrink-0 uppercase tracking-widest hover:shadow-[0_0_15px_rgba(255,77,166,0.2)] hover:text-[#EAF0FF]"
                >
                    <RotateCcw size={18} />
                    New Evaluation
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 flex overflow-x-auto gap-3 pb-2 custom-scrollbar">
                {[
                    { id: 'ledger', label: 'Decision Ledger', icon: FileText },
                    { id: 'board', label: 'Board Summary', icon: CheckCircle2 },
                    { id: 'internal', label: 'Internal Strategy', icon: ShieldCheck },
                    { id: 'public', label: 'Public Transparency', icon: AlertTriangle }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold transition-all whitespace-nowrap border uppercase tracking-widest text-sm",
                            activeTab === tab.id
                                ? "bg-[rgba(255,45,143,0.15)] border-[#FF4DA6]/60 text-[#EAF0FF] shadow-[inset_0_0_20px_rgba(255,45,143,0.2)] drop-shadow-[0_0_10px_rgba(255,45,143,0.3)]"
                                : "bg-[#05060A]/80 border-[#FF2D8F]/20 text-[#9AA4C7] hover:bg-[rgba(255,45,143,0.1)] hover:text-[#FF4DA6] hover:border-[#FF2D8F]/40 hover:shadow-[0_0_15px_rgba(255,45,143,0.1)]"
                        )}
                    >
                        <tab.icon size={18} className={activeTab === tab.id ? "drop-shadow-[0_0_5px_#FF4DA6]" : ""} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="glass-panel p-8 min-h-[500px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-[rgba(255,45,143,0.15)] bg-[#0B0F1A]/90">
                {activeTab === 'ledger' && (
                    <div className="prose prose-invert max-w-none text-[#EAF0FF] format-content marker:text-[#FF2D8F]" dangerouslySetInnerHTML={renderHtmlContent(data?.ledgerHtml)} />
                )}
                {activeTab === 'board' && (
                    <div className="prose prose-invert max-w-none text-[#EAF0FF] format-content marker:text-[#7A5CFF]" dangerouslySetInnerHTML={renderHtmlContent(data?.boardHtml)} />
                )}
                {activeTab === 'internal' && (
                    <div className="prose prose-invert max-w-none text-[#EAF0FF] format-content marker:text-[#FF2D8F]" dangerouslySetInnerHTML={renderHtmlContent(data?.internalHtml)} />
                )}
                {activeTab === 'public' && (
                    <div className="prose prose-invert max-w-none text-[#EAF0FF] format-content marker:text-[#FF2D8F]" dangerouslySetInnerHTML={renderHtmlContent(data?.publicHtml)} />
                )}
            </div>

            {/* Global style overrides specifically for injected HTML to mimic cyberpunk styling */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .format-content .highlight-box {
                    background: rgba(122, 92, 255, 0.1);
                    border: 1px solid rgba(122, 92, 255, 0.4);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    box-shadow: inset 0 0 20px rgba(122, 92, 255, 0.05), 0 4px 20px rgba(0,0,0,0.3);
                }
                .format-content .highlight-box h3 {
                    color: var(--color-accent);
                    margin-top: 0;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    text-shadow: 0 0 10px rgba(122, 92, 255, 0.5);
                }
                .format-content .doc-section {
                    margin-bottom: 2rem;
                }
                .format-content .doc-section h3 {
                    color: var(--color-action);
                    border-bottom: 1px solid rgba(255, 45, 143, 0.3);
                    padding-bottom: 0.75rem;
                    margin-bottom: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    text-shadow: 0 0 8px rgba(255, 45, 143, 0.5);
                }
                .format-content .doc-content {
                    background: rgba(5, 6, 10, 0.8);
                    border-radius: 12px;
                    padding: 1.5rem;
                    border-left: 4px solid var(--color-action);
                    box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
                }
                .format-content strong {
                    color: var(--color-action-hover);
                    text-shadow: 0 0 5px rgba(255, 77, 166, 0.3);
                }
            `}} />
        </div>
    );
}
