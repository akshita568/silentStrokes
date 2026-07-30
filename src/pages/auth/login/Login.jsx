import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider"; 
import { sendPasswordResetEmail } from "firebase/auth"; // <-- NEW IMPORT
import { auth } from "../../../utils/firebase.config"; // <-- NEW IMPORT (Ensure this path matches your project)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState(""); // <-- NEW STATE FOR SUCCESS MESSAGE
  
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");
    
    try {
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      setError("Incorrect email or password.");
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setResetMessage("");
    try {
      await googleLogin();
      navigate("/"); 
    } catch (err) {
      setError("Google Sign-In failed. Please try again.");
      console.error(err);
    }
  };

  // --- NEW FORGOT PASSWORD LOGIC ---
  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");
    
    if (!email) {
      setError("Please enter your email address in the box above first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Make sure the email is registered.");
      console.error(err);
    }
  };
  // ---------------------------------

  return (
    <div className="bg-base-white min-h-screen flex items-center justify-center px-4 py-20 font-sans">
      <div className="w-full max-w-md bg-base-white p-10 border border-sand shadow-sm rounded-sm">
        <h2 className="text-3xl font-serif text-text-main mb-2 text-center">Welcome Back</h2>
        <p className="text-sm text-dove text-center mb-8">Log in to view your cart and commissions.</p>
        
        {/* Error Message */}
        {error && <div className="bg-red-50 text-red-500 text-sm p-3 mb-6 rounded-sm border border-red-100">{error}</div>}
        
        {/* Success Message for Password Reset */}
        {resetMessage && <div className="bg-green-50 text-green-600 text-sm p-3 mb-6 rounded-sm border border-green-100">{resetMessage}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input 
              type="email" 
              id="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" 
              placeholder="Email" 
            />
            <label htmlFor="email" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-olive">Email Address</label>
          </div>

          <div className="relative pt-4">
            <input 
              type="password" 
              id="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" 
              placeholder="Password" 
            />
            <label htmlFor="password" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-olive">Password</label>
          </div>

          {/* --- NEW FORGOT PASSWORD BUTTON --- */}
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-xs text-dove hover:text-olive transition-colors"
            >
              Forgot Password?
            </button>
          </div>
          {/* ---------------------------------- */}

          <button type="submit" className="w-full py-4 mt-8 bg-text-main text-base-white text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors duration-300 rounded-sm">
            Log In
          </button>
        </form>

        <div className="mt-8 mb-6 flex items-center justify-center space-x-4">
          <div className="h-px bg-sand flex-1"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-dove">Or</span>
          <div className="h-px bg-sand flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          type="button" 
          className="w-full py-4 bg-transparent border border-sand text-text-main text-xs font-bold uppercase tracking-widest hover:border-olive hover:text-olive transition-colors duration-300 rounded-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign In with Google
        </button>

        <p className="text-center text-sm text-dove mt-8">
          Don't have an account? <Link to="/register" className="text-text-main font-semibold hover:text-olive transition-colors">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;