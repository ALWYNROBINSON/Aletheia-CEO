import React, { useState } from 'react';
import { Users, Plus, Shield, Mail, Building, MoreVertical } from 'lucide-react';

const stakeholders = [
    { name: 'Sarah Chen', role: 'CFO', dept: 'Finance', access: 'FULL', email: 'sarah.chen@company.com', avatar: 'SC' },
    { name: 'Marcus Reed', role: 'CTO', dept: 'Technology', access: 'FULL', email: 'marcus.reed@company.com', avatar: 'MR' },
    { name: 'Dr. Priya Nair', role: 'Chief Ethics', dept: 'Governance', access: 'READ', email: 'p.nair@company.com', avatar: 'PN' },
    { name: 'Jackson Wells', role: 'Legal Counsel', dept: 'Legal', access: 'READ', email: 'j.wells@company.com', avatar: 'JW' },
    { name: 'Aiko Tanaka', role: 'Board Member', dept: 'Board', access: 'BOARD', email: 'a.tanaka@board.com', avatar: 'AT' },
];

const accessStyles = {
    FULL: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    READ: 'bg-[rgba(122,92,255,0.1)] text-[#7A5CFF] border-[#7A5CFF]/30',
    BOARD: 'bg-[rgba(255,45,143,0.1)] text-[#FF4DA6] border-[#FF2D8F]/30',
};

export default function StakeholdersPage() {
    const [showAdd, setShowAdd] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-2xl font-extrabold uppercase tracking-widest text-[#EAF0FF] mb-1">Stakeholder Configuration</h1>
                    <p className="text-[#9AA4C7] text-sm">Manage organizational access control and reporting relationships.</p>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-sm uppercase tracking-widest shadow-[0_4px_15px_rgba(255,45,143,0.4)] hover:brightness-110 transition-all"
                >
                    <Plus size={16} /> Add Stakeholder
                </button>
            </div>

            {showAdd && (
                <div className="bg-[#0B0F1A]/80 border border-[#FF2D8F]/20 rounded-2xl p-6 space-y-4">
                    <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#FF4DA6]">New Stakeholder</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Full Name" className="bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm" />
                        <input placeholder="Role / Title" className="bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm" />
                        <input placeholder="Email Address" className="bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm" />
                        <select className="bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3 text-[#EAF0FF] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm">
                            <option value="READ">Read Access</option>
                            <option value="FULL">Full Access</option>
                            <option value="BOARD">Board Access</option>
                        </select>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl border border-[#FF2D8F]/20 text-[#9AA4C7] text-sm font-semibold hover:bg-[rgba(255,45,143,0.07)] transition-all">Cancel</button>
                        <button className="px-6 py-2 bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:brightness-110 transition-all">Add</button>
                    </div>
                </div>
            )}

            <div className="bg-[#0B0F1A]/80 border border-[#FF2D8F]/15 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 px-5 py-3 border-b border-[#FF2D8F]/10 text-[10px] font-extrabold text-[#5C6678] uppercase tracking-[0.2em]">
                    <span className="col-span-4">Name / Role</span>
                    <span className="col-span-3">Department</span>
                    <span className="col-span-3">Email</span>
                    <span className="col-span-2">Access</span>
                </div>
                {stakeholders.map((s, i) => (
                    <div key={s.name} className={`grid grid-cols-12 items-center px-5 py-4 hover:bg-[rgba(255,45,143,0.04)] transition-colors ${i < stakeholders.length - 1 ? 'border-b border-[#FF2D8F]/08' : ''}`}>
                        <div className="col-span-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#7A5CFF] flex items-center justify-center text-white text-xs font-extrabold shrink-0">{s.avatar}</div>
                            <div>
                                <p className="text-sm font-semibold text-[#EAF0FF]">{s.name}</p>
                                <p className="text-xs text-[#9AA4C7]">{s.role}</p>
                            </div>
                        </div>
                        <span className="col-span-3 text-sm text-[#9AA4C7] flex items-center gap-1.5"><Building size={12} />{s.dept}</span>
                        <span className="col-span-3 text-sm text-[#9AA4C7] flex items-center gap-1.5 truncate"><Mail size={12} />{s.email}</span>
                        <div className="col-span-2">
                            <span className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-widest ${accessStyles[s.access]}`}>{s.access}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
