import { useState, useContext } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth"; 

import { AuthContext } from "../../../AuthProvider/AuthProvider"; 
import { auth } from "../../../utils/firebase.config"; 
import { Squiggle } from "../../../components/decorative/BotanicalMotifs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState(""); 
  
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const { login, googleLogin } = useContext(AuthContext); 
  const navigate = useNavigate();
  const location = useLocation(); 
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");
    setIsLoggingIn(true); 
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Incorrect email or password.");
      console.error(err);
    } finally {
      setIsLoggingIn(false); 
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setResetMessage("");
    setIsGoogleLoading(true); 
    
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google Sign-In failed. Please try again.");
      console.error(err);
    } finally {
      setIsGoogleLoading(false); 
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");
    
    if (!email) {
      setError("Please enter your email address in the box above first.");
      return;
    }

    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Make sure the email is registered.");
      console.error(err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="bg-theme-cream min-h-screen flex items-center justify-center px-4 py-12 font-sans text-theme-dark relative overflow-hidden">
      <div className="w-full max-w-sm bg-[#FAF7F2] p-6 sm:p-8 border-[3px] border-theme-dark shadow-solid rounded-3xl relative z-10">
        <div className="text-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark block mb-0.5">
            STUDIO ATELIER • LOGIN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-theme-dark uppercase tracking-tight">WELCOME BACK</h2>
          <div className="flex justify-center my-1.5">
            <Squiggle className="w-14 h-2" color="#2D2D2D" />
          </div>
          <p className="text-xs text-theme-dark/80 font-medium">Log in to view your vault and commission requests.</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-700 text-xs p-2.5 mb-4 rounded-xl border-2 border-red-300 font-bold">{error}</div>}
        {resetMessage && <div className="bg-green-50 text-green-800 text-xs p-2.5 mb-4 rounded-xl border-2 border-green-300 font-bold">{resetMessage}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">Email Address</label>
            <input 
              type="email" 
              id="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium" 
              placeholder="name@example.com" 
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">Password</label>
            <input 
              type="password" 
              id="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium" 
              placeholder="••••••••" 
            />
          </div>

          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={handleForgotPassword} 
              disabled={isResetting}
              className="text-[11px] font-black text-theme-dark hover:underline cursor-pointer disabled:opacity-50 uppercase tracking-wide"
            >
              {isResetting ? "Sending Link..." : "Forgot Password?"}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isLoggingIn}
            className="w-full py-2.5 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all cursor-pointer disabled:opacity-70 border-2 border-theme-dark"
          >
            {isLoggingIn ? "Verifying..." : "Log In"}
          </button>
        </form>

        <div className="mt-5 mb-4 flex items-center justify-center space-x-2">
          <div className="h-0.5 bg-theme-dark/20 flex-1" />
          <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark/70">or</span>
          <div className="h-0.5 bg-theme-dark/20 flex-1" />
        </div>

        <button 
          onClick={handleGoogleSignIn}
          type="button" 
          disabled={isGoogleLoading}
          className="w-full py-2 bg-theme-cream border-2 border-theme-dark text-theme-dark text-xs font-black uppercase tracking-wider rounded-full shadow-[2px_2px_0px_#2D2D2D] hover:bg-theme-orange hover:text-theme-dark transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isGoogleLoading ? (
            "Connecting..."
          ) : (
            <>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign In with Google</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-theme-dark font-bold mt-5">
          New here? <Link to="/register" className="underline font-black hover:text-theme-orange">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

