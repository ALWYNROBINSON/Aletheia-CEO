import React from 'react';
import { Shield, Scale, Eye, Heart, Globe, CheckCircle } from 'lucide-react';

const frameworks = [
    { icon: Scale, name: 'Ethical Consequentialism', desc: 'All decisions evaluated against long-term societal and organizational outcomes, not just immediate ROI.', active: true },
    { icon: Heart, name: 'Stakeholder Welfare', desc: 'Impact analysis for all affected parties — employees, customers, shareholders, and community.', active: true },
    { icon: Eye, name: 'Radical Transparency', desc: 'Every decision is fully auditable and explainable. No black-box outputs from Aletheia.', active: true },
    { icon: Globe, name: 'ESG Alignment', desc: 'Environmental, Social, and Governance compliance integrated into every evaluation.', active: false },
    { icon: Shield, name: 'Legal Compliance Filter', desc: 'Automatic flag for decisions that may breach regulatory, fiduciary, or contractual obligations.', active: true },
];

export default function EthicsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-extrabold uppercase tracking-widest text-[#EAF0FF] mb-1">Ethics & Governance</h1>
                <p className="text-[#9AA4C7] text-sm">Configure Aletheia's ethical bounding principles and governance frameworks.</p>
            </div>

            {/* Ethical score card */}
            <div className="bg-gradient-to-br from-[rgba(255,45,143,0.1)] to-[rgba(122,92,255,0.08)] border border-[#FF2D8F]/20 rounded-2xl p-6 flex items-center gap-6">
                <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,45,143,0.1)" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#ethicsGrad)" strokeWidth="3"
                            strokeDasharray="85 15" strokeLinecap="round" />
                        <defs>
                            <linearGradient id="ethicsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF2D8F" />
                                <stop offset="100%" stopColor="#7A5CFF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-heading text-lg font-extrabold text-[#FF4DA6]">85</span>
                    </div>
                </div>
                <div>
                    <p className="font-heading text-xs font-bold uppercase tracking-widest text-[#9AA4C7] mb-1">Ethics Compliance Score</p>
                    <p className="font-heading text-2xl font-extrabold text-[#EAF0FF]">Highly Compliant</p>
                    <p className="text-[#9AA4C7] text-sm mt-1">4 of 5 governance frameworks are active. Your decisions are evaluated under strict ethical constraints.</p>
                </div>
            </div>

            {/* Frameworks */}
            <div className="space-y-3">
                <h2 className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-[#9AA4C7]">Active Frameworks</h2>
                {frameworks.map((f, i) => (
                    <div key={i} className={`flex items-start gap-4 p-5 rounded-xl border transition-all ${f.active ? 'bg-[#0B0F1A]/80 border-[#FF2D8F]/15' : 'bg-[#0B0F1A]/40 border-[#FF2D8F]/08 opacity-60'}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${f.active ? 'bg-[rgba(255,45,143,0.1)]' : 'bg-[rgba(255,45,143,0.05)]'}`}>
                            <f.icon size={18} className={f.active ? 'text-[#FF4DA6]' : 'text-[#7A89A6]'} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <p className="font-heading font-bold text-sm uppercase tracking-wider text-[#EAF0FF]">{f.name}</p>
                                {f.active && <CheckCircle size={14} className="text-emerald-400" />}
                            </div>
                            <p className="text-[#9AA4C7] text-sm">{f.desc}</p>
                        </div>
                        <div className="shrink-0">
                            <div className={`w-10 h-5 rounded-full transition-all ${f.active ? 'bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF]' : 'bg-[rgba(255,45,143,0.1)] border border-[#FF2D8F]/20'} relative cursor-pointer`}>
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${f.active ? 'right-0.5' : 'left-0.5'}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
