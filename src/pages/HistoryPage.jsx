import React, { useState } from 'react';
import { FileText, Search, Filter, TrendingUp, TrendingDown, Clock, ChevronRight } from 'lucide-react';

const sampleHistory = [
    { id: 'AC-20260228-341', title: 'Q3 Market Expansion — APAC Region', date: '2026-02-28', confidence: 91, verdict: 'APPROVED', category: 'Growth' },
    { id: 'AC-20260225-182', title: 'Data Science Team Scaling — 30 Engineers', date: '2026-02-25', confidence: 88, verdict: 'APPROVED', category: 'Talent' },
    { id: 'AC-20260220-509', title: 'SaaS Pricing Model Restructure', date: '2026-02-20', confidence: 76, verdict: 'REVIEW', category: 'Revenue' },
    { id: 'AC-20260215-673', title: 'Acquire Competitor TechCo for $50M', date: '2026-02-15', confidence: 62, verdict: 'DECLINED', category: 'M&A' },
    { id: 'AC-20260210-811', title: 'Launch AI Feature Roadmap H1 2026', date: '2026-02-10', confidence: 94, verdict: 'APPROVED', category: 'Product' },
];

const verdictStyles = {
    APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    REVIEW: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    DECLINED: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function HistoryPage() {
    const [search, setSearch] = useState('');
    const filtered = sampleHistory.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-extrabold uppercase tracking-widest text-[#EAF0FF] mb-1">Decision Ledger</h1>
                <p className="text-[#9AA4C7] text-sm">Full audit trail of all evaluated strategic decisions.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Decisions', value: sampleHistory.length, icon: FileText, color: '#FF2D8F' },
                    { label: 'Approved', value: sampleHistory.filter(h => h.verdict === 'APPROVED').length, icon: TrendingUp, color: '#10B981' },
                    { label: 'Declined', value: sampleHistory.filter(h => h.verdict === 'DECLINED').length, icon: TrendingDown, color: '#EF4444' },
                ].map(s => (
                    <div key={s.label} className="bg-[#0B0F1A]/80 border rounded-xl p-4 flex items-center gap-4" style={{ borderColor: `${s.color}20` }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                            <s.icon size={18} style={{ color: s.color }} />
                        </div>
                        <div>
                            <p className="font-heading font-extrabold text-2xl text-[#EAF0FF]">{s.value}</p>
                            <p className="text-[#9AA4C7] text-xs uppercase tracking-wider">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA4C7]" />
                <input
                    type="text"
                    placeholder="Search decisions..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#0B0F1A]/80 border border-[#FF2D8F]/20 rounded-xl pl-10 pr-4 py-3 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm"
                />
            </div>

            {/* Table */}
            <div className="bg-[#0B0F1A]/80 border border-[#FF2D8F]/15 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 px-5 py-3 border-b border-[#FF2D8F]/10 text-[10px] font-extrabold text-[#5C6678] uppercase tracking-[0.2em]">
                    <span className="col-span-5">Decision Title</span>
                    <span className="col-span-2">Ledger ID</span>
                    <span className="col-span-2">Date</span>
                    <span className="col-span-1">Score</span>
                    <span className="col-span-2">Status</span>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-[#9AA4C7]">No decisions found.</div>
                )}
                {filtered.map((h, i) => (
                    <div key={h.id} className={`grid grid-cols-12 items-center px-5 py-4 hover:bg-[rgba(255,45,143,0.04)] transition-colors cursor-pointer ${i < filtered.length - 1 ? 'border-b border-[#FF2D8F]/08' : ''}`}>
                        <div className="col-span-5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[rgba(255,45,143,0.1)] flex items-center justify-center shrink-0">
                                <FileText size={14} className="text-[#FF4DA6]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#EAF0FF] truncate">{h.title}</p>
                                <p className="text-xs text-[#9AA4C7]">{h.category}</p>
                            </div>
                        </div>
                        <span className="col-span-2 text-xs font-mono text-[#7A5CFF]">{h.id}</span>
                        <span className="col-span-2 text-xs text-[#9AA4C7] flex items-center gap-1.5"><Clock size={12} />{h.date}</span>
                        <span className="col-span-1 text-sm font-bold text-[#FF4DA6]">{h.confidence}%</span>
                        <div className="col-span-2">
                            <span className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-widest ${verdictStyles[h.verdict]}`}>{h.verdict}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
