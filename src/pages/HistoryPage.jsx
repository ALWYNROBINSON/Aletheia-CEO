import React, { useState, useEffect } from 'react';
import { FileText, Search, TrendingUp, TrendingDown, Clock, X } from 'lucide-react';
import ResultsDashboard from '../components/ResultsDashboard';

const verdictStyles = {
    APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    REVIEW: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    DECLINED: 'bg-red-500/10 text-red-400 border-red-500/30',
};

// Helper to determine status from score or JSON content (since we don't store strict status yet)
const determineStatus = (score) => {
    if (score >= 85) return 'APPROVED';
    if (score >= 70) return 'REVIEW';
    return 'DECLINED';
};

export default function HistoryPage() {
    const [search, setSearch] = useState('');
    const [evaluations, setEvaluations] = useState([]);
    const [selectedEval, setSelectedEval] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        try {
            const res = await fetch('/api/evaluate');
            if (res.ok) {
                const data = await res.json();
                // Parse dates and determine status
                const formattedData = data.map(d => ({
                    ...d,
                    date: new Date(d.created_at).toLocaleDateString(),
                    verdict: determineStatus(d.confidence_score)
                }));
                setEvaluations(formattedData);
            }
        } catch (error) {
            console.error('Failed to fetch history', error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = evaluations.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));

    // If an evaluation is selected, render its details
    if (selectedEval) {
        return (
            <div className="space-y-4">
                <button 
                    onClick={() => setSelectedEval(null)}
                    className="flex items-center gap-2 text-[#9AA4C7] hover:text-[#FF4DA6] transition-colors font-bold text-sm uppercase tracking-widest"
                >
                    <X size={16} /> Back to Ledger
                </button>
                <div className="bg-[#0B0F1A]/80 border border-[#FF2D8F]/20 rounded-2xl p-6">
                    <h2 className="text-xl font-extrabold text-[#EAF0FF] mb-2">{selectedEval.title}</h2>
                    <p className="text-[#9AA4C7] text-sm mb-6 flex items-center gap-3">
                        <span className="text-[#7A5CFF] font-mono">{selectedEval.ledger_id}</span>
                        <span>•</span>
                        <span>{selectedEval.date}</span>
                    </p>
                    <ResultsDashboard 
                        data={selectedEval.results_json} 
                        ledgerId={selectedEval.ledger_id} 
                        confScore={selectedEval.confidence_score} 
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-extrabold uppercase tracking-widest text-[#EAF0FF] mb-1">Decision Ledger</h1>
                <p className="text-[#9AA4C7] text-sm">Full audit trail of all evaluated strategic decisions. Click any row to read the full report.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Decisions', value: evaluations.length, icon: FileText, color: '#FF2D8F' },
                    { label: 'Approved', value: evaluations.filter(h => h.verdict === 'APPROVED').length, icon: TrendingUp, color: '#10B981' },
                    { label: 'Declined / Review', value: evaluations.filter(h => h.verdict !== 'APPROVED').length, icon: TrendingDown, color: '#EF4444' },
                ].map(s => (
                    <div key={s.label} className="bg-[#0B0F1A]/80 border rounded-xl p-4 flex items-center gap-4" style={{ borderColor: `${s.color}20` }}>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                            <s.icon size={20} style={{ color: s.color }} />
                        </div>
                        <div>
                            <p className="font-heading font-extrabold text-3xl text-[#EAF0FF]">{s.value}</p>
                            <p className="text-[#9AA4C7] text-xs font-bold uppercase tracking-wider">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA4C7]" />
                <input
                    type="text"
                    placeholder="Search decisions by title..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#0B0F1A]/80 border border-[#FF2D8F]/20 rounded-xl pl-10 pr-4 py-3.5 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm"
                />
            </div>

            {/* Table */}
            <div className="bg-[#0B0F1A]/80 border border-[#FF2D8F]/15 rounded-2xl overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-12 px-6 py-4 border-b border-[#FF2D8F]/20 bg-[rgba(255,45,143,0.02)] text-xs font-extrabold text-[#5C6678] uppercase tracking-[0.2em]">
                        <span className="col-span-5">Decision Title</span>
                        <span className="col-span-3">Ledger ID</span>
                        <span className="col-span-2">Date</span>
                        <span className="col-span-1 text-center">Score</span>
                        <span className="col-span-1 text-center">Status</span>
                    </div>
                    {loading && (
                        <div className="text-center py-16 text-[#9AA4C7] text-sm animate-pulse">Loading ledger...</div>
                    )}
                    {!loading && filtered.length === 0 && (
                        <div className="text-center py-16 text-[#9AA4C7] text-sm">No decisions found. Complete an evaluation first.</div>
                    )}
                    {!loading && filtered.map((h, i) => (
                        <div 
                            key={h.id} 
                            onClick={() => setSelectedEval(h)}
                            className={`grid grid-cols-12 items-center px-6 py-5 hover:bg-[rgba(255,45,143,0.06)] transition-all cursor-pointer group ${i < filtered.length - 1 ? 'border-b border-[#FF2D8F]/10' : ''}`}
                        >
                            <div className="col-span-5 flex items-center gap-4 pr-4">
                                <div className="w-10 h-10 rounded-lg bg-[rgba(255,45,143,0.08)] group-hover:bg-[rgba(255,45,143,0.15)] flex items-center justify-center shrink-0 transition-colors">
                                    <FileText size={16} className="text-[#FF4DA6]" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold text-[#EAF0FF] truncate group-hover:text-[#FF4DA6] transition-colors">{h.title}</p>
                                    <p className="text-xs text-[#9AA4C7] mt-0.5">Strategic Evaluation</p>
                                </div>
                            </div>
                            <span className="col-span-3 text-sm font-mono text-[#7A5CFF]">{h.ledger_id}</span>
                            <span className="col-span-2 text-sm text-[#9AA4C7] flex items-center gap-2"><Clock size={14} />{h.date}</span>
                            <span className="col-span-1 text-sm font-extrabold text-[#EAF0FF] text-center">{h.confidence_score}%</span>
                            <div className="col-span-1 flex justify-center">
                                <span className={`text-[10px] px-3 py-1.5 rounded-full border font-bold uppercase tracking-widest ${verdictStyles[h.verdict]}`}>{h.verdict}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
