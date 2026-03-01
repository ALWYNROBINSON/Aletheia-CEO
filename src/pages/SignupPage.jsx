import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', company: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('aletheia_auth', JSON.stringify({ email: formData.email, name: formData.name }));
            navigate('/home');
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#05060A] flex items-center justify-center relative overflow-hidden px-4">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,45,143,0.3),transparent_70%)] rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(122,92,255,0.2),transparent_70%)] rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,45,143,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,45,143,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="/logo.png" alt="Aletheia" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(255,45,143,0.8)]" />
                    </div>
                    <h1 className="font-heading text-3xl font-extrabold tracking-widest text-[#EAF0FF] uppercase">
                        ALETHEIA <span className="text-[#FF2D8F]">CEO</span>
                    </h1>
                </div>

                <div className="bg-[#0B0F1A]/90 border border-[#FF2D8F]/20 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                    <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-[#9AA4C7] hover:text-[#FF4DA6] text-sm mb-6 transition-colors">
                        <ArrowLeft size={16} /> Back to Login
                    </button>
                    <h2 className="font-heading text-xl font-bold text-[#EAF0FF] mb-1 uppercase tracking-widest">Request Board Access</h2>
                    <p className="text-[#9AA4C7] text-sm mb-6">Join the executive intelligence network</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Full Name</label>
                            <input type="text" required placeholder="John Executive" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Email Address</label>
                            <input type="email" required placeholder="executive@company.com" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Organization</label>
                            <input type="text" required placeholder="Acme Corp" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                                className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Password</label>
                            <input type="password" required placeholder="••••••••••••" value={formData.password} onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                                className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all" />
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full mt-2 bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white py-4 rounded-xl font-heading font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(255,45,143,0.4)] hover:shadow-[0_6px_30px_rgba(255,45,143,0.7)] hover:brightness-110 transition-all disabled:opacity-50">
                            {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <><UserPlus size={18} /> Create Account</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
