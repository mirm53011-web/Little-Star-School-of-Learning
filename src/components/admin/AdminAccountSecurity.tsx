import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  KeyRound,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HorizontalProgressBar, ActionButtonProgress } from '../common/HorizontalProgressBar';

export const AdminAccountSecurity: React.FC = () => {
  const { user, changePassword, changeEmail, authError, clearAuthError } = useAuth();

  // Email form state
  const [emailCurrentPassword, setEmailCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showEmailPass, setShowEmailPass] = useState(false);

  // Password form state
  const [passCurrentPassword, setPassCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);
  const [showPassOld, setShowPassOld] = useState(false);
  const [showPassNew, setShowPassNew] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setEmailSuccess(null);
    setEmailError(null);

    if (!emailCurrentPassword) {
      setEmailError('Please enter your current password to authenticate this change.');
      return;
    }

    if (!newEmail.trim() || !newEmail.includes('@')) {
      setEmailError('Please enter a valid new email address.');
      return;
    }

    if (newEmail.trim().toLowerCase() === user?.email?.toLowerCase()) {
      setEmailError('The new email address must be different from your current email.');
      return;
    }

    setEmailLoading(true);
    try {
      await changeEmail(emailCurrentPassword, newEmail.trim());
      setEmailSuccess(`Admin email successfully updated to ${newEmail.trim()}.`);
      // Wipe password inputs immediately
      setEmailCurrentPassword('');
      setNewEmail('');
    } catch (err: any) {
      setEmailError(err?.message || 'Failed to update admin email. Please verify your current password.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setPassSuccess(null);
    setPassError(null);

    if (!passCurrentPassword) {
      setPassError('Please enter your current password.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPassError('New password must be at least 6 characters in length.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New Password and Confirm New Password do not match.');
      return;
    }

    if (passCurrentPassword === newPassword) {
      setPassError('Your new password must be different from your current password.');
      return;
    }

    setPassLoading(true);
    try {
      await changePassword(passCurrentPassword, newPassword);
      setPassSuccess('Admin password successfully updated. Please use your new password next time you sign in.');
      // Wipe all password fields from memory immediately
      setPassCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPassError(err?.message || 'Failed to update password. Please verify your current password.');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md flex-shrink-0">
            <ShieldCheck className="w-6 h-6 fill-slate-950 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Account & Security
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage your master administrator credentials with secure Firebase Authentication re-authentication.
            </p>
          </div>
        </div>

        {/* Current Admin Email Badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Current Admin Email
            </span>
            <span className="block text-xs sm:text-sm font-bold text-slate-800 break-all font-mono">
              {user?.email || 'munnamir304@gmail.com'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Change Admin Email */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Change Admin Email</h3>
                <p className="text-xs text-slate-500">Requires current password re-authentication</p>
              </div>
            </div>

            {emailSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{emailSuccess}</span>
              </div>
            )}

            {emailError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{emailError}</span>
              </div>
            )}

            <form id="change-admin-email-form" onSubmit={handleChangeEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Current Admin Email
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.email || 'munnamir304@gmail.com'}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-600 font-mono font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="new-admin-email-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  New Admin Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="new-admin-email-input"
                    type="email"
                    required
                    placeholder="newadmin@littlestar.edu"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email-current-password-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Current Password (To Confirm Identity) *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="email-current-password-input"
                    type={showEmailPass ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    value={emailCurrentPassword}
                    onChange={(e) => setEmailCurrentPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmailPass(!showEmailPass)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle current password visibility"
                  >
                    {showEmailPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {emailLoading && (
                <div className="pt-1">
                  <HorizontalProgressBar variant="slate" height="xs" label="Updating email with Firebase Auth..." showStarGlow={false} />
                </div>
              )}

              <div className="pt-2">
                <button
                  id="submit-change-email-btn"
                  type="submit"
                  disabled={emailLoading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer shadow"
                >
                  {emailLoading ? (
                    <span className="text-amber-400 font-bold">Re-authenticating & Updating Email...</span>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>Update Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
            <strong>Security Notice:</strong> Changing your admin email will require you to log in with the new email address for future sessions.
          </div>
        </div>

        {/* Card 2: Change Admin Password */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Change Admin Password</h3>
                <p className="text-xs text-slate-500">Requires current password verification & confirmation</p>
              </div>
            </div>

            {passSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            {passError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <form id="change-admin-password-form" onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="pass-current-password-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Current Password *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="pass-current-password-input"
                    type={showPassOld ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="Enter existing password"
                    value={passCurrentPassword}
                    onChange={(e) => setPassCurrentPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassOld(!showPassOld)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle current password visibility"
                  >
                    {showPassOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="new-password-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="new-password-input"
                    type={showPassNew ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassNew(!showPassNew)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle new password visibility"
                  >
                    {showPassNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="confirm-password-input"
                    type={showPassConfirm ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassConfirm(!showPassConfirm)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showPassConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passLoading && (
                <div className="pt-1">
                  <HorizontalProgressBar variant="amber" height="xs" label="Updating master password in Firebase Auth..." showStarGlow={false} />
                </div>
              )}

              <div className="pt-2">
                <button
                  id="submit-change-password-btn"
                  type="submit"
                  disabled={passLoading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer shadow"
                >
                  {passLoading ? (
                    <ActionButtonProgress label="Updating Password..." />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-slate-950" />
                      <span>Update Administrator Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
            <strong>Security Rule:</strong> Passwords are never stored in plain text, source code, local storage, or Firestore. Firebase Authentication securely encrypts all credentials.
          </div>
        </div>
      </div>
    </div>
  );
};
