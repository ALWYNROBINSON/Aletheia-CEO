import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Brain, Shield } from 'lucide-react';
import CyberneticGridShader from '../components/ui/cybernetic-grid-shader';

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        // Simulate auth (replace with real auth)
        setTimeout(() => {
            if (formData.email && formData.password) {
                localStorage.setItem('aletheia_auth', JSON.stringify({ email: formData.email, name: formData.email.split('@')[0] }));
                navigate('/home');
            } else {
                setError('Please enter your credentials.');
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#05060A] flex items-center justify-center relative overflow-hidden px-4">
            {/* Animated cybernetic grid background */}
            <CyberneticGridShader />
            {/* Overlay orbs on top of shader */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,45,143,0.2),transparent_70%)] rounded-full blur-[60px] pointer-events-none z-[1]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(122,92,255,0.15),transparent_70%)] rounded-full blur-[60px] pointer-events-none z-[1]" />

            <div className="w-full max-w-md z-[2] relative">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-5">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-[rgba(255,45,143,0.1)] border border-[#FF2D8F]/30 shadow-[0_0_40px_rgba(255,45,143,0.3)] animate-pulse" />
                            <img src="/logo.png" alt="Aletheia" className="w-20 h-20 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,45,143,0.8)]" />
                        </div>
                    </div>
                    <h1 className="font-heading text-4xl font-extrabold tracking-widest text-[#EAF0FF] uppercase">
                        ALETHEIA <span className="text-[#FF2D8F] drop-shadow-[0_0_10px_#FF2D8F]">CEO</span>
                    </h1>
                    <p className="text-[#9AA4C7] mt-2 text-sm tracking-wider">Transparent AI Executive Leadership System</p>
                </div>

                {/* Card */}
                <div className="bg-[#0B0F1A]/90 border border-[#FF2D8F]/20 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_0_30px_rgba(255,45,143,0.03)] backdrop-blur-xl">
                    <h2 className="font-heading text-xl font-bold text-[#EAF0FF] mb-1 uppercase tracking-widest">Executive Access</h2>
                    <p className="text-[#9AA4C7] text-sm mb-8">Sign in to your command interface</p>

                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                            <Shield size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="executive@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#9AA4C7] uppercase tracking-[0.2em]">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                                    className="w-full bg-[#05060A]/80 border border-[#FF2D8F]/20 rounded-xl px-4 py-3.5 pr-12 text-[#EAF0FF] placeholder-[#7A89A6] focus:outline-none focus:border-[#FF4DA6] focus:ring-4 focus:ring-[rgba(255,77,166,0.15)] transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9AA4C7] hover:text-[#FF4DA6] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-[#9AA4C7] cursor-pointer">
                                <input type="checkbox" className="accent-[#FF2D8F]" />
                                Remember me
                            </label>
                            <button type="button" className="text-[#FF4DA6] hover:text-[#FF2D8F] transition-colors font-medium">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#FF2D8F] to-[#7A5CFF] text-white py-4 rounded-xl font-heading font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(255,45,143,0.4)] hover:shadow-[0_6px_30px_rgba(255,45,143,0.7)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            {loading ? (
                                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <><LogIn size={18} /> Access System</>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-[#7A89A6] text-xs mt-8">
                        Don't have access?{' '}
                        <button onClick={() => navigate('/signup')} className="text-[#FF4DA6] hover:underline font-medium">
                            Request Board Access
                        </button>
                    </p>
                </div>

                <p className="text-center text-[#5C6678] text-xs mt-6">
                    🔒 256-bit encrypted · SOC 2 compliant · Executive tier
                </p>
            </div>
        </div>
    );
}
