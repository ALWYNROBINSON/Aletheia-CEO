import React, { useState } from 'react';
import { Target, FileText, Activity, AlertCircle, Plus, Trash2, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DecisionForm({ onSubmit, loading, progress, activeStep, cooldown = 0 }) {
    const [options, setOptions] = useState([
        { id: 1, name: '', description: '' },
        { id: 2, name: '', description: '' }
    ]);

    const addOption = () => {
        if (options.length >= 4) return;
        setOptions([...options, { id: Date.now(), name: '', description: '' }]);
    };

    const removeOption = (id) => {
        if (options.length <= 2) return;
        setOptions(options.filter(o => o.id !== id));
    };

    const handleOptionChange = (id, field, value) => {
        setOptions(options.map(o => o.id === id ? { ...o, [field]: value } : o));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const decisionData = {
            title: formData.get('title'),
            objective: formData.get('objective'),
            context: formData.get('context'),
            constraints: formData.get('constraints'),
            options: options.map(o => ({ name: o.name, description: o.description }))
        };

        onSubmit(decisionData);
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] text-center px-4">
                <div className="relative w-48 h-48 mb-8 flex justify-center items-center">
                    <div className="absolute inset-0 border-2 border-[#FF2D8F]/40 rounded-[24%] animate-[rotate_6s_linear_infinite]" />
                    <div className="absolute w-4/5 h-4/5 border-2 border-[#7A5CFF]/50 rounded-[24%] animate-[rotate_4s_linear_infinite_reverse]" />
                    <div className="absolute w-3/5 h-3/5 border-2 border-[#FF4DA6]/20 rounded-[24%] animate-[rotate_8s_linear_infinite]" />
                    <img src="/logo.png" alt="Aletheia Analyzing" className="w-[4.5rem] h-auto z-10 drop-shadow-[0_0_20px_#FF2D8F] animate-[pulseLogo_3s_infinite_alternate]" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-heading mb-8 tracking-widest bg-gradient-to-r from-[#FF4DA6] to-[#7A5CFF] bg-clip-text text-transparent uppercase drop-shadow-[0_0_10px_rgba(255,77,166,0.5)]">
                    Aletheia Engine Analyzing...
                </h2>

                <div className="w-full max-w-2xl h-1.5 bg-[rgba(234,240,255,0.05)] rounded-full mb-12 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                    <div
                        className="h-full bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] rounded-full shadow-[0_0_15px_rgba(255,45,143,0.8)] transition-all duration-500 ease-out relative overflow-hidden"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                <div className="flex justify-between w-full max-w-2xl text-sm font-semibold text-[#7A89A6]">
                    {[
                        { num: 1, label: 'Initializing AI' },
                        { num: 2, label: 'Running Frameworks' },
                        { num: 3, label: 'Calculating ROI' },
                        { num: 4, label: 'Governance Check' },
                        { num: 5, label: 'Drafting Ledger' }
                    ].map(step => (
                        <div key={step.num} className={cn(
                            "flex flex-col items-center gap-2 transition-colors duration-300",
                            activeStep === step.num ? "text-[#FF4DA6] drop-shadow-[0_0_8px_#FF4DA6]" : "",
                            activeStep > step.num ? "text-[#7A5CFF]" : ""
                        )}>
                            <div className="flex items-center justify-center w-6 h-6">
                                {activeStep === step.num && <Loader className="animate-spin" size={20} />}
                                {activeStep > step.num && <span className="text-[#7A5CFF] drop-shadow-[0_0_5px_#7A5CFF]">✓</span>}
                                {activeStep < step.num && <span className="w-2 h-2 rounded-full bg-current opacity-30" />}
                            </div>
                            <span className="hidden sm:block tracking-wide">{step.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12 pb-12">
            <header className="mb-10">
                <h1 className="text-4xl lg:text-5xl font-heading text-[#EAF0FF] mb-2 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(234,240,255,0.2)]">System Evaluation Portal</h1>
                <p className="text-lg text-[#9AA4C7]">Input strategic parameters for board-level analysis.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Core Parameters */}
                <div className="space-y-8">
                    <section className="glass-panel p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[rgba(255,45,143,0.15)] bg-[#0B0F1A]/90 hover:border-[#FF2D8F]/30 hover:shadow-[0_0_20px_rgba(255,45,143,0.1)] transition-all duration-300">
                        <div className="flex items-center gap-2 text-xl text-[#FF2D8F] mb-6 font-heading font-semibold uppercase tracking-widest drop-shadow-[0_0_8px_#FF2D8F]">
                            <Target size={24} />
                            <h2>Core Parameters</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Decision Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="e.g., Scaling Data Science Team"
                                    className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] focus:bg-[#05060A] transition-all font-body shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="objective" className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Strategic Objective</label>
                                <textarea
                                    id="objective"
                                    name="objective"
                                    required
                                    rows="2"
                                    placeholder="What is the primary goal of this decision?"
                                    className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] focus:bg-[#05060A] transition-all resize-y font-body shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    <section className="glass-panel p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[rgba(122,92,255,0.15)] bg-[#0B0F1A]/90 hover:border-[#7A5CFF]/30 hover:shadow-[0_0_20px_rgba(122,92,255,0.1)] transition-all duration-300">
                        <div className="flex items-center gap-2 text-xl text-[#7A5CFF] mb-6 font-heading font-semibold uppercase tracking-widest drop-shadow-[0_0_8px_#7A5CFF]">
                            <FileText size={24} />
                            <h2>Business Context</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="context" className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Current State & Metrics</label>
                                <textarea
                                    id="context"
                                    name="context"
                                    required
                                    rows="4"
                                    placeholder="Relevant data points, runway, current capabilities..."
                                    className="w-full bg-[#05060A]/80 border border-[#7A5CFF]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] focus:outline-none focus:border-[#7A5CFF]/70 focus:ring-4 focus:ring-[rgba(122,92,255,0.15)] focus:bg-[#05060A] transition-all resize-y font-body shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="constraints" className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Constraints / Risks</label>
                                <textarea
                                    id="constraints"
                                    name="constraints"
                                    required
                                    rows="2"
                                    placeholder="Budget limits, timeline, regulatory concerns..."
                                    className="w-full bg-[#05060A]/80 border border-[#7A5CFF]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] focus:outline-none focus:border-[#7A5CFF]/70 focus:ring-4 focus:ring-[rgba(122,92,255,0.15)] focus:bg-[#05060A] transition-all resize-y font-body shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                                ></textarea>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Strategic Options */}
                <div className="space-y-6">
                    <section className="glass-panel p-6 h-full flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[rgba(255,45,143,0.15)] bg-[#0B0F1A]/90">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-xl text-[#FF2D8F] font-heading font-semibold uppercase tracking-widest drop-shadow-[0_0_8px_#FF2D8F]">
                                <Activity size={24} />
                                <h2>Strategic Options</h2>
                            </div>
                            <span className="text-xs bg-[rgba(255,45,143,0.1)] text-[#FF4DA6] px-4 py-1.5 rounded-full border border-[#FF2D8F]/30 uppercase tracking-widest font-bold">Min 2, Max 4</span>
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {options.map((option, index) => (
                                <div key={option.id} className="bg-[#05060A]/70 border border-[#FF2D8F]/20 rounded-xl p-6 relative transition-all focus-within:border-[#FF4DA6] focus-within:bg-[#05060A]/90 hover:shadow-[0_0_15px_rgba(255,45,143,0.15)] focus-within:shadow-[0_0_15px_rgba(255,77,166,0.2)]">
                                    <div className="flex justify-between items-center mb-4 border-b border-[#FF2D8F]/20 pb-3">
                                        <h3 className="font-heading font-semibold text-lg text-[#EAF0FF] uppercase tracking-wider">Option {String.fromCharCode(65 + index)}</h3>
                                        {options.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeOption(option.id)}
                                                className="text-[#7A89A6] hover:text-[#EF4444] transition-colors"
                                                title="Remove Option"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            required
                                            value={option.name}
                                            onChange={(e) => handleOptionChange(option.id, 'name', e.target.value)}
                                            placeholder="Action Name (e.g., Build In-House)"
                                            className="w-full bg-[#05060A]/90 border border-[#FF2D8F]/20 rounded-lg px-4 py-3 text-[#EAF0FF] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all font-body text-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                                        />
                                        <textarea
                                            rows="2"
                                            required
                                            value={option.description}
                                            onChange={(e) => handleOptionChange(option.id, 'description', e.target.value)}
                                            placeholder="Details, cost, expected outcome..."
                                            className="w-full bg-[#05060A]/90 border border-[#FF2D8F]/20 rounded-lg px-4 py-3 text-[#EAF0FF] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all resize-none font-body text-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                                        ></textarea>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {options.length < 4 && (
                            <button
                                type="button"
                                onClick={addOption}
                                className="mt-4 w-full bg-[rgba(255,45,143,0.05)] text-[#FF4DA6] border border-[#FF2D8F]/40 hover:bg-[rgba(255,45,143,0.15)] hover:border-[#FF4DA6] hover:shadow-[0_0_15px_rgba(255,77,166,0.2)] rounded-xl py-3.5 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-dashed"
                            >
                                <Plus size={18} />
                                Add Alternative Scenario
                            </button>
                        )}
                    </section>
                </div>
            </div>

            <div className="pt-8 border-t border-[rgba(255,45,143,0.3)] flex flex-col md:flex-row items-center justify-between gap-6 drop-shadow-[0_-5px_10px_rgba(255,45,143,0.05)]">
                <div className="flex items-center gap-3 text-[#FF4DA6] text-sm bg-[rgba(255,45,143,0.1)] px-5 py-3 rounded-lg border border-[rgba(255,45,143,0.2)] shadow-[inset_0_0_10px_rgba(255,45,143,0.1)]">
                    <AlertCircle size={20} className="drop-shadow-[0_0_5px_#FF4DA6]" />
                    <span>Executing this evaluation utilizes live Gemini Foundation Models. Audit logs will be generated.</span>
                </div>
                {cooldown > 0 ? (
                    <div className="w-full md:w-auto flex flex-col items-center gap-2">
                        <button
                            type="button"
                            disabled
                            className="w-full md:w-auto bg-[rgba(255,45,143,0.1)] text-[#7A89A6] border border-[#FF2D8F]/20 px-10 py-4 rounded-xl font-heading font-bold flex items-center justify-center gap-3 uppercase tracking-widest cursor-not-allowed"
                        >
                            <Cpu size={20} />
                            Cooldown — {String(Math.floor(cooldown / 60)).padStart(2,'0')}:{String(cooldown % 60).padStart(2,'0')}
                        </button>
                        <div className="w-full md:w-64 h-1 bg-[rgba(255,45,143,0.1)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] rounded-full transition-all duration-1000"
                                style={{ width: `${((60 - cooldown) / 60) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-[#7A89A6] tracking-widest">API rate limit protection — ready soon</p>
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] hover:brightness-125 hover:shadow-[0_0_25px_rgba(255,77,166,0.8)] text-[#EAF0FF] px-10 py-4 rounded-xl font-heading font-bold flex items-center justify-center gap-3 shadow-[0_4px_15px_rgba(255,45,143,0.5)] transition-all uppercase tracking-widest border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <Cpu size={20} />
                        Initialize Strategic Analysis
                    </button>
                )}
            </div>
        </form>
    );
}

// Inline Loader component for loading state
function Loader({ size = 24, ...props }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}
