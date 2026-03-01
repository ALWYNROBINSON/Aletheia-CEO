import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Users, Shield, Settings, LogOut,
    ChevronLeft, ChevronRight, Menu, Bell, Brain, Home
} from 'lucide-react';
import CyberneticGridShader from '../components/ui/cybernetic-grid-shader';
import EvaluationPage from './EvaluationPage';
import HistoryPage from './HistoryPage';
import StakeholdersPage from './StakeholdersPage';
import EthicsPage from './EthicsPage';
import SettingsPage from './SettingsPage';

const navItems = [
    { id: 'evaluation', label: 'New Evaluation', icon: Brain, section: 'MAIN' },
    { id: 'history', label: 'Decision Ledger', icon: FileText, section: 'MAIN' },
    { id: 'stakeholders', label: 'Stakeholders', icon: Users, section: 'MAIN' },
    { id: 'ethics', label: 'Ethics & Gov.', icon: Shield, section: 'GOVERNANCE' },
    { id: 'settings', label: 'System Settings', icon: Settings, section: 'GOVERNANCE' },
];

export default function DashboardPage() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('evaluation');
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('aletheia_auth');
        if (!stored) { navigate('/login'); return; }
        setAuth(JSON.parse(stored));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('aletheia_auth');
        navigate('/login');
    };

    const renderPage = () => {
        switch (activeTab) {
            case 'evaluation': return <EvaluationPage />;
            case 'history': return <HistoryPage />;
            case 'stakeholders': return <StakeholdersPage />;
            case 'ethics': return <EthicsPage />;
            case 'settings': return <SettingsPage auth={auth} />;
            default: return <EvaluationPage />;
        }
    };

    const groupedNav = navItems.reduce((acc, item) => {
        if (!acc[item.section]) acc[item.section] = [];
        acc[item.section].push(item);
        return acc;
    }, {});

    return (
        <div className="flex h-screen overflow-hidden bg-[#05060A]">
            {/* Animated WebGL background */}
            <CyberneticGridShader />
            {/* Overlay orbs */}
            <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,45,143,0.15),transparent_70%)] rounded-full blur-[60px] pointer-events-none z-[1]" />
            <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(122,92,255,0.1),transparent_70%)] rounded-full blur-[60px] pointer-events-none z-[1]" />

            {/* ─── Sidebar ─── */}
            <aside className={`
                relative z-30 flex flex-col h-full bg-[#0B0F1A]/90 backdrop-blur-xl border-r border-[#FF2D8F]/15
                shadow-[4px_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out shrink-0
                ${collapsed ? 'w-[72px]' : 'w-[260px]'}
            `}>
                {/* Logo row */}
                <div className={`flex items-center h-[70px] px-4 border-b border-[#FF2D8F]/15 ${collapsed ? 'justify-center' : 'gap-3'}`}>
                    <img src="/logo.png" alt="Aletheia" className="w-9 h-9 object-contain shrink-0 drop-shadow-[0_0_8px_rgba(255,45,143,0.7)]" />
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <span
                                className="font-heading text-base font-extrabold tracking-widest uppercase whitespace-nowrap"
                                style={{ color: '#EAF0FF' }}
                            >
                                ALETHEIA{' '}
                                <span style={{ color: '#FF2D8F', textShadow: '0 0 10px #FF2D8F' }}>CEO</span>
                            </span>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                    {Object.entries(groupedNav).map(([section, items]) => (
                        <div key={section} className="mb-4">
                            {!collapsed && (
                                <p className="text-[10px] font-extrabold text-[#5C6678] uppercase tracking-[0.25em] px-3 mb-2">{section}</p>
                            )}
                            {items.map(item => {
                                const active = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        title={collapsed ? item.label : undefined}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`
                                            w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                                            ${active
                                                ? 'bg-[rgba(255,45,143,0.15)] text-[#FF4DA6] shadow-[inset_0_0_15px_rgba(255,45,143,0.15)]'
                                                : 'text-[#9AA4C7] hover:bg-[rgba(255,45,143,0.07)] hover:text-[#EAF0FF]'
                                            }
                                            ${collapsed ? 'justify-center' : ''}
                                        `}
                                    >
                                        <item.icon size={18} className={active ? 'drop-shadow-[0_0_5px_#FF4DA6] shrink-0' : 'shrink-0'} />
                                        {!collapsed && <span className="truncate">{item.label}</span>}
                                        {active && !collapsed && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF4DA6] shadow-[0_0_6px_#FF4DA6]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className={`border-t border-[#FF2D8F]/15 p-3 space-y-1`}>
                    <button
                        title={collapsed ? 'Home' : undefined}
                        onClick={() => navigate('/home')}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#9AA4C7] hover:text-[#EAF0FF] hover:bg-[rgba(255,45,143,0.07)] text-sm font-semibold transition-all ${collapsed ? 'justify-center' : ''}`}
                    >
                        <Home size={18} className="shrink-0" />
                        {!collapsed && 'Home'}
                    </button>
                    <button
                        title={collapsed ? 'Logout' : undefined}
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#9AA4C7] hover:text-red-400 hover:bg-red-500/10 text-sm font-semibold transition-all ${collapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut size={18} className="shrink-0" />
                        {!collapsed && 'Sign Out'}
                    </button>

                    {/* Avatar row - only when not collapsed */}
                    {!collapsed && auth && (
                        <div className="flex items-center gap-3 p-3 mt-2 bg-[rgba(255,45,143,0.05)] rounded-xl border border-[#FF2D8F]/15">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#7A5CFF] flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                                {auth.name?.[0]?.toUpperCase() || 'E'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-[#EAF0FF] truncate capitalize">{auth.name}</p>
                                <p className="text-[10px] text-[#7A5CFF] font-semibold tracking-wider">EXECUTIVE</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3.5 top-[85px] z-50 w-7 h-7 bg-[#0B0F1A] border border-[#FF2D8F]/30 rounded-full flex items-center justify-center text-[#FF4DA6] hover:bg-[rgba(255,45,143,0.15)] hover:shadow-[0_0_10px_rgba(255,45,143,0.4)] transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </aside>

            {/* ─── Main Content ─── */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Topbar */}
                <header className="h-[70px] shrink-0 flex items-center px-6 bg-[#05060A]/70 backdrop-blur-xl border-b border-[#FF2D8F]/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div>
                        <h2
                            className="font-heading text-base font-bold uppercase tracking-widest"
                            style={{ color: '#EAF0FF' }}
                        >
                            {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
                        </h2>
                        <p
                            className="text-[10px] tracking-wider uppercase"
                            style={{ color: '#9AA4C7' }}
                        >Aletheia Executive System</p>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <button className="relative text-[#9AA4C7] hover:text-[#FF4DA6] transition-colors p-2 rounded-lg hover:bg-[rgba(255,45,143,0.08)]">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF2D8F] shadow-[0_0_6px_#FF2D8F]" />
                        </button>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('settings')}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#7A5CFF] flex items-center justify-center text-white text-xs font-extrabold">
                                {auth?.name?.[0]?.toUpperCase() || 'E'}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs font-bold text-[#EAF0FF] capitalize">{auth?.name || 'Executive'}</p>
                                <p className="text-[10px] text-[#7A5CFF] tracking-wider">EXECUTIVE TIER</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}
