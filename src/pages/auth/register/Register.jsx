import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../utils/firebase.config"; 
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // 👇 LOADING STATE
  const [isRegistering, setIsRegistering] = useState(false); 
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsRegistering(true); // Start loading text
    
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
      setIsRegistering(false); // Stop loading text
    }
  };

  return (
    <div className="bg-base-white min-h-screen flex items-center justify-center px-4 py-20 font-sans">
      <div className="w-full max-w-md bg-base-white p-10 border border-sand shadow-sm rounded-sm">
        <h2 className="text-3xl font-serif text-text-main mb-2 text-center">Join silentStrokes</h2>
        <p className="text-sm text-dove text-center mb-8">Create an account to save your favorite pieces and manage your cart.</p>
        
        {error && <div className="bg-red-50 text-red-500 text-sm p-3 mb-6 rounded-sm border border-red-100">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <input 
              type="text" 
              id="name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" 
              placeholder="Full Name" 
            />
            <label htmlFor="name" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-olive">Full Name</label>
          </div>

          <div className="relative pt-4">
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
            <label htmlFor="password" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-olive">Password (Min 6 characters)</label>
          </div>

          <button 
            type="submit" 
            disabled={isRegistering}
            className="w-full py-4 mt-8 bg-text-main text-base-white text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors duration-300 rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isRegistering ? "Creating your account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-dove mt-8">
          Already have an account? <Link to="/login" className="text-text-main font-semibold hover:text-olive transition-colors">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;