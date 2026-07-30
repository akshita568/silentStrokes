import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDJTOJOqPIWYR7mAU8Lmf3Jt9RsVZAPzTc",
  authDomain: "silentstrokes.firebaseapp.com",
  projectId: "silentstrokes",
  storageBucket: "silentstrokes.firebasestorage.app",
  messagingSenderId: "1044783094408",
  appId: "1:1044783094408:web:3c81e9511fb65ffb8d1d3d",
  measurementId: "G-TCZS7NY6TY"
};

// Initialize Firebase
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  app = getApp();
}
const analytics = getAnalytics(app);

export { app }; 
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);