import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

import { auth, db } from "../../../utils/firebase.config"; 
import { Squiggle } from "../../../components/decorative/BotanicalMotifs";

const Register = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [isRegistering, setIsRegistering] = useState(false); 
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsRegistering(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
        role: "customer"
      });

      navigate("/"); 
    } catch (err) {
      setError(err.message || "Failed to create an account. Please try again.");
      console.error(err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="bg-theme-cream min-h-screen flex items-center justify-center px-4 py-12 font-sans text-theme-dark relative overflow-hidden">
      <div className="w-full max-w-sm bg-[#FAF7F2] p-6 sm:p-8 border-[3px] border-theme-dark shadow-solid rounded-3xl relative z-10">
        <div className="text-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark block mb-0.5">
            NEW COLLECTOR • REGISTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-theme-dark uppercase tracking-tight">JOIN STUDIO</h2>
          <div className="flex justify-center my-1.5">
            <Squiggle className="w-14 h-2" color="#2D2D2D" />
          </div>
          <p className="text-xs text-theme-dark/80 font-medium">Save artwork briefs and commission slots.</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-700 text-xs p-2.5 mb-4 rounded-xl border-2 border-red-300 font-bold">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-3.5">
          <div className="space-y-1">
            <label htmlFor="name" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">Full Name</label>
            <input 
              type="text" 
              id="name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium" 
              placeholder="e.g. Jane Doe" 
            />
          </div>

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
            <label htmlFor="password" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">Password (Min 6 characters)</label>
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

          <button 
            type="submit" 
            disabled={isRegistering}
            className="w-full py-2.5 mt-2 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all disabled:opacity-70 cursor-pointer border-2 border-theme-dark"
          >
            {isRegistering ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-xs text-theme-dark font-bold mt-5">
          Already registered? <Link to="/login" className="underline font-black hover:text-theme-orange">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

