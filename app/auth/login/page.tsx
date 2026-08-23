"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("guest@lakeescape.in");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile");
    }, 500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile");
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[#081218] text-white flex items-center justify-center pt-24 pb-16 px-6 relative overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-md bg-[#0d1b22] border border-white/15 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/White%20logo.png"
            alt="Lake Escape"
            className="h-10 mx-auto object-contain mb-2"
          />
          <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block">
            Guest Portal Access
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.03em]">
            Sign In to Lake Escape
          </h1>
          <p className="text-xs text-slate-400 font-normal">
            Access your confirmed reservations, vouchers, and stateroom preferences.
          </p>
        </div>

        {/* Google OAuth Option */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-sans text-xs font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-slate-200 shadow-sm"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
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
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-4 text-white/20">
          <div className="h-px w-full bg-white/10" />
          <span className="font-sans text-[10px] font-bold uppercase text-slate-500">OR</span>
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-sans text-[11px] font-bold uppercase text-slate-400 mb-1 tracking-[-0.01em]">
              Email Address
            </label>
            <div className="relative flex items-center bg-[#081218] border border-white/15 rounded-lg px-3 py-2.5">
              <Mail size={15} className="text-slate-400 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full text-xs font-semibold text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-sans text-[11px] font-bold uppercase text-slate-400 tracking-[-0.01em]">
                Password
              </label>
              <a href="#" className="font-sans text-[11px] text-slate-400 hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center bg-[#081218] border border-white/15 rounded-lg px-3 py-2.5">
              <Lock size={15} className="text-slate-400 mr-2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full text-xs font-semibold text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full shadow-md"
            >
              <span>{isLoading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>

        <div className="border-t border-white/[0.12] pt-4 text-center font-sans text-xs text-slate-400">
          <span>First time reserving with Lake Escape? </span>
          <Link href="/auth/register" className="text-white hover:underline font-bold">
            Create Profile
          </Link>
        </div>

      </div>
    </main>
  );
}
