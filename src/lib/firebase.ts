import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

export interface FirebaseConfigObject {
  apiKey: string;
  authDomain: string;
  databaseURL?: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  firestoreDatabaseId?: string;
}

export const PRODUCTION_FIREBASE_CONFIG: FirebaseConfigObject = {
  apiKey: "AIzaSyD_rbYuHXCu7B-LgwiPuPESwZZyJrYL03M",
  authDomain: "little-star-school-of-learning.firebaseapp.com",
  databaseURL: "https://little-star-school-of-learning-default-rtdb.firebaseio.com",
  projectId: "little-star-school-of-learning",
  storageBucket: "little-star-school-of-learning.firebasestorage.app",
  messagingSenderId: "100852803340",
  appId: "1:100852803340:web:695cbd0f33ad8a13e6cb29",
  firestoreDatabaseId: "(default)"
};

// Retrieve configuration using Vite environment variables with fallback
function getEffectiveFirebaseConfig(): FirebaseConfigObject {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('ls_custom_firebase_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.projectId && parsed.apiKey) {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage parse errors
    }
  }

  // Load from environment variables (VITE_FIREBASE_*) with production fallback
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || PRODUCTION_FIREBASE_CONFIG.apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || PRODUCTION_FIREBASE_CONFIG.authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || PRODUCTION_FIREBASE_CONFIG.projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || PRODUCTION_FIREBASE_CONFIG.storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || PRODUCTION_FIREBASE_CONFIG.messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || PRODUCTION_FIREBASE_CONFIG.appId,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || PRODUCTION_FIREBASE_CONFIG.firestoreDatabaseId || '(default)'
  };
}

export const activeFirebaseConfig = getEffectiveFirebaseConfig();

// Initialize the Firebase app instance
function initializeFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(activeFirebaseConfig);
}

export const app: FirebaseApp = initializeFirebaseApp();

// Initialize and export Authentication
export const auth: Auth = getAuth(app);

// Initialize and export Firestore (both as `firestore` and `db`)
export const firestore: Firestore = getFirestore(app);
export const db: Firestore = firestore;

// Initialize and export Firebase Storage
export const storage: FirebaseStorage = getStorage(app);

// Helper functions for custom admin runtime config
export function saveCustomFirebaseConfig(config: FirebaseConfigObject) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ls_custom_firebase_config', JSON.stringify(config));
    window.location.reload();
  }
}

export function resetFirebaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('ls_custom_firebase_config');
    window.location.reload();
  }
}

export default app;
