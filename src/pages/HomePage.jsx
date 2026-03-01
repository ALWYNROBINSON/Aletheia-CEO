import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Brain, Shield, Zap, BarChart3, Users, Settings,
    TrendingUp, CheckCircle, Globe, Lock, ChevronRight
} from 'lucide-react';
import CyberneticGridShader from '../components/ui/cybernetic-grid-shader';

const features = [
    { icon: Brain, title: 'AI-Powered Analysis', desc: 'Gemini 2.5 Flash driven strategic decision evaluation with real-time insights.' },
    { icon: Shield, title: 'Ethics & Governance', desc: 'Every decision audited against ethics frameworks and compliance standards.' },
    { icon: BarChart3, title: 'ROI Intelligence', desc: 'Quantified scenario modeling with CFO-level financial projections.' },
    { icon: Users, title: 'Stakeholder Maps', desc: 'Automatic impact analysis across all organizational stakeholders.' },
    { icon: Zap, title: 'Instant Evaluation', desc: 'Sub-30 second AI evaluation of complex multi-option strategic decisions.' },
    { icon: Globe, title: 'Public Transparency', desc: 'Auto-generate public-facing rationale for SEC/media communications.' },
];

const stats = [
    { value: '94%', label: 'Decision Accuracy' },
    { value: '10x', label: 'Faster Analysis' },
    { value: '500+', label: 'Executives' },
    { value: '99.9%', label: 'Uptime' },
];

export default function HomePage() {
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem('aletheia_auth') || 'null');
    const userName = auth?.name || 'Executive';

    return (
        <div className="min-h-screen bg-[#05060A] text-[#EAF0FF] overflow-x-hidden">
            {/* Animated WebGL background */}
            <CyberneticGridShader />
            {/* Overlay orbs */}
            <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,45,143,0.2),transparent_70%)] rounded-full blur-[60px] pointer-events-none z-[1]" />
            <div className="fixed bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(122,92,255,0.1),transparent_70%)] rounded-full blur-[70px] pointer-events-none z-[1]" />

            {/* Top Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-[#05060A]/85 backdrop-blur-xl border-b border-[#FF2D8F]/15 flex items-center px-8">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/home')}>
                    <img src="/logo.png" alt="Aletheia" className="h-9 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,45,143,0.6)]" />
                    <span className="font-heading text-xl font-extrabold tracking-widest text-[#EAF0FF] uppercase">
                        ALETHEIA <span className="text-[#FF2D8F]">CEO</span>
                    </span>
                </div>
                <div className="ml-auto flex items-center gap-6">
                    <button onClick={() => navigate('/home')} className="text-[#9AA4C7] hover:text-[#EAF0FF] text-sm font-semibold transition-colors">Home</button>
                    <button onClick={() => navigate('/dashboard')} className="text-[#9AA4C7] hover:text-[#EAF0FF] text-sm font-semibold transition-colors">Dashboard</button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-sm uppercase tracking-widest shadow-[0_4px_15px_rgba(255,45,143,0.4)] hover:brightness-110 hover:shadow-[0_6px_25px_rgba(255,45,143,0.6)] transition-all"
                    >
                        {auth ? 'Go to Dashboard' : 'Get Started'} <ChevronRight size={16} />
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative z-10 pt-[120px] pb-24 px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,45,143,0.1)] border border-[#FF2D8F]/30 text-[#FF4DA6] text-sm font-bold uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#FF4DA6] shadow-[0_0_8px_#FF4DA6] animate-pulse" />
                        AI Executive Intelligence — Live
                    </div>

                    <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-2 border-[#FF2D8F]/30 shadow-[0_0_60px_rgba(255,45,143,0.4)] animate-ping" style={{ animationDuration: '3s' }} />
                            <div className="absolute inset-2 rounded-full border border-[#7A5CFF]/20" />
                            <img src="/logo.png" alt="Aletheia" className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,45,143,0.9)]" />
                        </div>
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-wide uppercase mb-6 leading-none">
                        <span className="text-[#EAF0FF] drop-shadow-[0_0_30px_rgba(234,240,255,0.3)]">AI Executive</span>
                        <br />
                        <span className="text-transparent bg-gradient-to-r from-[#FF2D8F] via-[#FF4DA6] to-[#7A5CFF] bg-clip-text drop-shadow-[0_0_30px_rgba(255,45,143,0.5)]">Leadership System</span>
                    </h1>

                    <p className="text-[#9AA4C7] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Aletheia replaces guesswork with algorithmic clarity. Every strategic decision gets evaluated, audited, and documented — instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-3 bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white px-8 py-4 rounded-xl font-heading font-bold uppercase tracking-widest shadow-[0_8px_30px_rgba(255,45,143,0.5)] hover:shadow-[0_12px_40px_rgba(255,45,143,0.8)] hover:brightness-110 transition-all text-base"
                        >
                            <Brain size={20} /> Launch Evaluation <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold uppercase tracking-widest text-base transition-all hover:brightness-125"
                            style={{
                                border: '1.5px solid rgba(255, 45, 143, 0.6)',
                                color: '#FF4DA6',
                                background: 'rgba(255, 45, 143, 0.08)',
                                boxShadow: '0 0 15px rgba(255,45,143,0.15)',
                            }}
                        >
                            <Lock size={18} /> {auth ? `Hi, ${userName}` : 'Sign In'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="relative z-10 py-12 px-8 border-y border-[#FF2D8F]/10 bg-[#0B0F1A]/40">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(s => (
                        <div key={s.label} className="text-center">
                            <div className="font-heading text-4xl font-extrabold text-transparent bg-gradient-to-b from-[#FF4DA6] to-[#7A5CFF] bg-clip-text mb-1">{s.value}</div>
                            <div className="text-[#9AA4C7] text-xs uppercase tracking-widest font-semibold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 py-24 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#EAF0FF] mb-4">
                        Board-Grade <span className="text-[#FF2D8F]">Intelligence</span>
                    </h2>
                    <p className="text-[#9AA4C7] max-w-xl mx-auto">Every tool a modern CEO needs to make confident, auditable, ethical decisions at speed.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="bg-[#0B0F1A]/80 backdrop-blur border border-[#FF2D8F]/15 rounded-2xl p-6 hover:border-[#FF4DA6]/40 hover:shadow-[0_0_30px_rgba(255,45,143,0.1)] transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[rgba(255,45,143,0.1)] border border-[#FF2D8F]/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(255,45,143,0.3)] transition-all">
                                <f.icon size={22} className="text-[#FF4DA6]" />
                            </div>
                            <h3 className="font-heading font-bold text-[#EAF0FF] uppercase tracking-wider mb-2 text-sm">{f.title}</h3>
                            <p className="text-[#9AA4C7] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-24 px-8">
                <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[rgba(255,45,143,0.1)] to-[rgba(122,92,255,0.08)] rounded-3xl border border-[#FF2D8F]/20 p-12 shadow-[0_0_60px_rgba(255,45,143,0.08)]">
                    <img src="/logo.png" alt="Aletheia" className="w-16 h-16 mx-auto mb-6 object-contain drop-shadow-[0_0_15px_rgba(255,45,143,0.8)]" />
                    <h2 className="font-heading text-3xl font-extrabold uppercase tracking-widest text-[#EAF0FF] mb-4">
                        Ready to command with <span className="text-[#FF2D8F]">Clarity?</span>
                    </h2>
                    <p className="text-[#9AA4C7] mb-8 text-lg">Join 500+ executives making smarter decisions with Aletheia's AI governance engine.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => navigate('/dashboard')}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white px-8 py-4 rounded-xl font-heading font-bold uppercase tracking-widest shadow-[0_8px_30px_rgba(255,45,143,0.5)] hover:brightness-110 transition-all">
                            <Brain size={18} /> Start Evaluating
                        </button>
                        <button onClick={() => navigate('/signup')}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#FF2D8F]/40 text-[#FF4DA6] hover:bg-[rgba(255,45,143,0.1)] font-heading font-bold uppercase tracking-widest transition-all">
                            Request Access
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-[#FF2D8F]/10 py-8 px-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <img src="/logo.png" alt="Aletheia" className="h-6 w-auto object-contain opacity-60" />
                    <span className="font-heading text-sm font-bold uppercase tracking-widest text-[#5C6678]">Aletheia CEO</span>
                </div>
                <p className="text-[#5C6678] text-xs">© 2026 Aletheia AI. Executive Intelligence Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}
