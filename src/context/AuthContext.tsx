import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  registerInitialAdmin: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (currentPass: string, newPass: string) => Promise<void>;
  changeEmail: (currentPass: string, newEmail: string) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const formatErrorMessage = (code: string, fallback: string): string => {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This administrative account has been disabled.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/email-already-in-use':
        return 'An administrator account with this email already exists.';
      case 'auth/requires-recent-login':
        return 'Security timeout: Please log out and sign in again before updating account credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please wait a few minutes before trying again.';
      default:
        return fallback;
    }
  };

  const login = async (email: string, pass: string): Promise<void> => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      const msg = formatErrorMessage(err?.code, err?.message || 'Authentication failed. Please try again.');
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const registerInitialAdmin = async (email: string, pass: string): Promise<void> => {
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      const msg = formatErrorMessage(err?.code, err?.message || 'Failed to create admin account.');
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const logout = async (): Promise<void> => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Error signing out:', err);
    }
  };

  const changePassword = async (currentPass: string, newPass: string): Promise<void> => {
    setAuthError(null);
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error('No authenticated administrator found.');
    }
    try {
      // Re-authenticate first
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPass);
      await reauthenticateWithCredential(auth.currentUser, credential);
      // Update password
      await updatePassword(auth.currentUser, newPass);
    } catch (err: any) {
      const msg = formatErrorMessage(err?.code, err?.message || 'Failed to change password. Verify your current password.');
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const changeEmail = async (currentPass: string, newEmail: string): Promise<void> => {
    setAuthError(null);
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error('No authenticated administrator found.');
    }
    try {
      // Re-authenticate first
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPass);
      await reauthenticateWithCredential(auth.currentUser, credential);
      // Update email
      await updateEmail(auth.currentUser, newEmail.trim());
    } catch (err: any) {
      const msg = formatErrorMessage(err?.code, err?.message || 'Failed to update administrative email.');
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const sendResetEmail = async (email: string): Promise<void> => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      const msg = formatErrorMessage(err?.code, err?.message || 'Failed to send password reset email.');
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        registerInitialAdmin,
        logout,
        changePassword,
        changeEmail,
        sendResetEmail,
        authError,
        clearAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
