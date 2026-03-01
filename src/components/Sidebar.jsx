import React from 'react';
import { cn } from '../lib/utils';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    Shield,
    LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-[260px] p-8 pb-6 pt-8 border-r border-[#FF2D8F]/20 flex flex-col justify-between bg-[#0B0F1A]/80 h-full overflow-y-auto shadow-[4px_0_30px_rgba(255,45,143,0.05)] backdrop-blur-xl">

            <div className="space-y-8">
                <div>
                    <h3 className="text-sm font-bold text-[#9AA4C7] uppercase tracking-wider mb-4">Board Controls</h3>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setActiveTab('evaluation')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300",
                                    activeTab === 'evaluation'
                                        ? "bg-[rgba(255,45,143,0.15)] text-[#FF2D8F] shadow-[inset_0_0_12px_rgba(255,45,143,0.2)]"
                                        : "text-[#9AA4C7] hover:bg-[rgba(255,45,143,0.08)] hover:text-[#EAF0FF]"
                                )}
                            >
                                <LayoutDashboard size={18} className={activeTab === 'evaluation' ? "drop-shadow-[0_0_5px_#FF2D8F]" : ""} />
                                New Evaluation
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300",
                                    activeTab === 'history'
                                        ? "bg-[rgba(255,45,143,0.15)] text-[#FF2D8F] shadow-[inset_0_0_12px_rgba(255,45,143,0.2)]"
                                        : "text-[#9AA4C7] hover:bg-[rgba(255,45,143,0.08)] hover:text-[#EAF0FF]"
                                )}
                            >
                                <FileText size={18} className={activeTab === 'history' ? "drop-shadow-[0_0_5px_#FF2D8F]" : ""} />
                                Decision Ledger
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('stakeholders')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300",
                                    activeTab === 'stakeholders'
                                        ? "bg-[rgba(255,45,143,0.15)] text-[#FF2D8F] shadow-[inset_0_0_12px_rgba(255,45,143,0.2)]"
                                        : "text-[#9AA4C7] hover:bg-[rgba(255,45,143,0.08)] hover:text-[#EAF0FF]"
                                )}
                            >
                                <Users size={18} className={activeTab === 'stakeholders' ? "drop-shadow-[0_0_5px_#FF2D8F]" : ""} />
                                Stakeholder Config
                            </button>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-[#9AA4C7] uppercase tracking-wider mb-4">Governance</h3>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setActiveTab('ethics')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300",
                                    activeTab === 'ethics'
                                        ? "bg-[rgba(255,45,143,0.15)] text-[#FF2D8F] shadow-[inset_0_0_12px_rgba(255,45,143,0.2)]"
                                        : "text-[#9AA4C7] hover:bg-[rgba(255,45,143,0.08)] hover:text-[#EAF0FF]"
                                )}
                            >
                                <Shield size={18} className={activeTab === 'ethics' ? "drop-shadow-[0_0_5px_#FF2D8F]" : ""} />
                                Ethics Framework
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300",
                                    activeTab === 'settings'
                                        ? "bg-[rgba(255,45,143,0.15)] text-[#FF2D8F] shadow-[inset_0_0_12px_rgba(255,45,143,0.2)]"
                                        : "text-[#9AA4C7] hover:bg-[rgba(255,45,143,0.08)] hover:text-[#EAF0FF]"
                                )}
                            >
                                <Settings size={18} className={activeTab === 'settings' ? "drop-shadow-[0_0_5px_#FF2D8F]" : ""} />
                                System Parameters
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#FF2D8F]/20">
                <div className="flex items-center gap-4 p-4 bg-[#FF2D8F]/5 rounded-lg border border-[#FF2D8F]/20 shadow-[0_0_15px_rgba(255,45,143,0.05)]">
                    <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center overflow-hidden shrink-0">
                        <img src="/logo.png" alt="Aletheia Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#EAF0FF]">Executive Board</span>
                        <span className="text-xs text-[#7A5CFF] flex items-center gap-1 mt-1 font-medium tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-[#7A5CFF] shadow-[0_0_8px_#7A5CFF] animate-[pulse_2s_infinite]"></span> Authoritative
                        </span>
                    </div>
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;
