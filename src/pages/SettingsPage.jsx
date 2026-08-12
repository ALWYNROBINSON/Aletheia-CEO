import React, { useState } from 'react';
import { Settings, Bell, Palette, Save, User } from 'lucide-react';

export default function SettingsPage({ auth }) {
    const [notifs, setNotifs] = useState({ evaluations: true, board: false, ethics: true });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-extrabold uppercase tracking-widest text-[#EAF0FF] mb-1">System Settings</h1>
                <p className="text-[#9AA4C7] text-sm">Configure model parameters, notifications, and account preferences.</p>
            </div>

            {/* Profile Card */}
            <div className="bg-[#0B0F1A]/80 border border-[#FF2D8F]/15 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5 text-[#FF4DA6]">
                    <User size={18} />
                    <h2 className="font-heading text-sm font-bold uppercase tracking-widest">Profile</h2>
                </div>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#7A5CFF] flex items-center justify-center text-white text-2xl font-extrabold shrink-0">
                        {auth?.name?.[0]?.toUpperCase() || 'E'}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Display Name</label>
                            <input defaultValue={auth?.name || 'Executive'} className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-2.5 text-[#EAF0FF] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm capitalize" />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Email</label>
                            <input defaultValue={auth?.email || ''} className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-2.5 text-[#EAF0FF] focus:outline-none focus:border-[#FF4DA6] transition-all text-sm" />
                        </div>
                    </div>
                </div>
            </div>


            {/* Notifications */}
            <div className="bg-[#0B0F1A]/80 border border-[#FF2D8F]/15 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5 text-[#FF4DA6]">
                    <Bell size={18} />
                    <h2 className="font-heading text-sm font-bold uppercase tracking-widest">Notifications</h2>
                </div>
                <div className="space-y-4">
                    {[
                        { key: 'evaluations', label: 'Evaluation Completions', desc: 'Notify when AI analysis finishes' },
                        { key: 'board', label: 'Board Reports', desc: 'Weekly summary to board members' },
                        { key: 'ethics', label: 'Ethics Alerts', desc: 'Immediate flag for compliance violations' },
                    ].map(n => (
                        <div key={n.key} className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-[#EAF0FF]">{n.label}</p>
                                <p className="text-xs text-[#9AA4C7]">{n.desc}</p>
                            </div>
                            <button onClick={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))}
                                className={`w-11 h-6 rounded-full transition-all relative ${notifs[n.key] ? 'bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF]' : 'bg-[rgba(255,45,143,0.1)] border border-[#FF2D8F]/20'}`}>
                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifs[n.key] ? 'right-0.5' : 'left-0.5'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
                <button onClick={handleSave}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-widest transition-all ${saved ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white shadow-[0_4px_15px_rgba(255,45,143,0.4)] hover:brightness-110'}`}>
                    <Save size={16} />{saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
