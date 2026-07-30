import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../utils/firebase.config"; // ⚠️ Ensure this path is correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Google Login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // 2. Email/Password Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Email/Password Sign Up
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 4. Log Out
  const logout = () => {
    return signOut(auth);
  };

  // 5. THE MAGIC LISTENER: This watches Firebase constantly. 
  // If a user logs in (Google OR Email), this instantly updates your whole app!
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [auth]);

  const userInfo = {
    user,
    isLoading,
    login,
    signUp,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};