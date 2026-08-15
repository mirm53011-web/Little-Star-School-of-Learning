import React, { useState } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  Shield,
  Star,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  HelpCircle,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToWebsite }) => {
  const { login, registerInitialAdmin, sendResetEmail, authError, clearAuthError } = useAuth();

  const [email, setEmail] = useState('munnamir304@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalMessage(null);

    if (!email.trim() || !password) {
      setLocalMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      if (isFirstTimeSetup) {
        await registerInitialAdmin(email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
    } catch (err: any) {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalMessage(null);

    if (!email.trim()) {
      setLocalMessage('Please enter your administrator email to receive a password reset link.');
      return;
    }

    setLoading(true);
    try {
      await sendResetEmail(email.trim());
      setResetSuccess(true);
    } catch (err) {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-xl shadow-amber-500/20 mx-auto">
            <Star className="w-9 h-9 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Little Star CMS
            </h1>
            <p className="text-xs sm:text-sm text-amber-400 font-semibold uppercase tracking-wider">
              School Administrative Portal • Batpora
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Authorized school staff authentication via Firebase
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          {(authError || localMessage) && (
            <div className="bg-red-950/60 border border-red-500/50 text-red-300 p-3.5 rounded-xl text-xs flex items-start space-x-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>{authError || localMessage}</span>
            </div>
          )}

          {resetSuccess ? (
            <div className="bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 p-6 rounded-2xl text-center space-y-3 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white text-base">Password Reset Link Sent</h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                If an administrator account exists for <strong>{email}</strong>, you will receive password reset instructions in your inbox shortly.
              </p>
              <button
                onClick={() => {
                  setIsResetMode(false);
                  setResetSuccess(false);
                }}
                className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
              >
                Return to Login
              </button>
            </div>
          ) : isResetMode ? (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="text-left space-y-1">
                <h3 className="text-base font-bold text-white">Reset Admin Password</h3>
                <p className="text-xs text-slate-400">
                  Enter your registered administrator email address.
                </p>
              </div>

              <div>
                <label htmlFor="admin-reset-email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    id="admin-reset-email"
                    type="email"
                    required
                    placeholder="admin@littlestar.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                id="send-password-reset-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <span>Send Reset Email</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetMode(false)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>{isFirstTimeSetup ? 'Initial Master Admin Registration' : 'Administrator Sign In'}</span>
                </h3>
              </div>

              <div>
                <label htmlFor="admin-login-email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    id="admin-login-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@littlestar.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="admin-login-password" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  {!isFirstTimeSetup && (
                    <button
                      type="button"
                      onClick={() => setIsResetMode(true)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    id="admin-login-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                id="admin-login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>{isFirstTimeSetup ? 'Create Master Admin' : 'Access Admin Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    setIsFirstTimeSetup(!isFirstTimeSetup);
                    clearAuthError();
                    setLocalMessage(null);
                  }}
                  className="text-xs text-slate-400 hover:text-amber-300 transition-colors"
                >
                  {isFirstTimeSetup
                    ? 'Already have an administrator account? Sign In'
                    : 'First time setup? Create master administrator account'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Return to Public Website */}
        <div className="text-center">
          <button
            id="back-to-public-website-btn"
            onClick={onBackToWebsite}
            className="text-xs text-slate-400 hover:text-white transition-colors underline"
          >
            ← Return to Little Star Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
