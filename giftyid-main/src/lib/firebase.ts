import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''
};

// Initialize Firebase only if we have the required config
let app: ReturnType<typeof initializeApp> | null;
let auth: ReturnType<typeof getAuth> | null;

try {
  // Only initialize if we have at least the API key
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    // Connect to emulator in development (if needed)
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      // Uncomment the line below if you want to use Firebase Auth emulator
      // connectAuthEmulator(auth, 'http://localhost:9099');
    }
  } else {
    console.warn('Firebase configuration incomplete, Firebase features will be disabled');
    auth = null;
    app = null;
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  auth = null;
  app = null;
}

export { auth };
export default app; 