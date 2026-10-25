'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAppState } from '@/lib/store';

export default function SignInPage() {
  const router = useRouter();
  const { updateState } = useAppState();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      updateState((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          name: 'Govardhan',
          email: 'govardhan@example.com',
          baselineCompleted: true
        }
      }));
      router.push('/app');
    }, 400);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      updateState((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          name: provider === 'Google' ? 'Google Learner' : 'Microsoft Learner',
          email: `learner@${provider.toLowerCase()}.com`
        }
      }));
      router.push('/baseline');
    }, 400);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      updateState((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          name: email.split('@')[0],
          email
        }
      }));
      router.push('/baseline');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-md w-full mx-auto">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <Logo size="lg" />
          </div>
          <span className="text-[11px] font-semibold text-[#475569] uppercase tracking-[0.14em] block">
            LEARN BEFORE YOU INVEST
          </span>
          <h1 className="text-3xl font-semibold text-[#0A1629] mt-2 tracking-[-0.025em]">
            Welcome to TO DIRECT
          </h1>
          <p className="text-sm font-normal text-[#475569] mt-1">
            Access your 7-topic curriculum and ₹10,000 portfolio sandbox
          </p>
        </div>

        {/* Floating Pure White Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-card space-y-6">
          {/* Quick Demo Login Pill (Recommended) */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563FF] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Instant Demo Access
              </span>
              <span className="text-[10px] bg-blue-200 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                Pre-loaded Data
              </span>
            </div>
            <p className="text-xs font-normal text-[#475569] leading-relaxed">
              Explore the full app as an active student with starting mastery and ₹10,000 portfolio holdings.
            </p>
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              type="button"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#2563FF] hover:bg-[#1748D8] text-white text-xs font-semibold transition-all shadow-xs"
            >
              Enter as Demo Learner (Govardhan) &rarr;
            </button>
          </div>

          {/* Social Auth Pills (Google & Microsoft matching Image 2) */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-full bg-[#0A1629] hover:bg-[#1E293B] text-white text-sm font-medium transition-all shadow-xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Microsoft')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-full bg-[#0A1629] hover:bg-[#1E293B] text-white text-sm font-medium transition-all shadow-xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span>Sign up with Microsoft</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-semibold tracking-wider">
              Or email magic link
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Email Magic Link Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Work or University Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A1629]/20 focus:border-[#0A1629] text-sm"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-[#0A1629] text-sm font-medium transition-all"
            >
              Send Free Magic Link &rarr;
            </button>
          </form>

          {/* Security note */}
          <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 font-normal">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>DPDP Act compliant • No passwords needed</span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs font-medium text-slate-500 hover:text-[#0A1629] transition-colors">
            &larr; Back to TO DIRECT homepage
          </Link>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 font-normal">
        &copy; {new Date().getFullYear()} TO DIRECT. Learn before you invest.
      </div>
    </div>
  );
}
