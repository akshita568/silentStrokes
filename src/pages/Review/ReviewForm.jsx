import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../utils/firebase.config.js'; 

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 👇 This uses your existing 'db' but drops the data into a brand new 'reviews' folder
      await addDoc(collection(db, 'reviews'), {
        name: formData.name,
        relation: formData.relation,
        message: formData.message,
        createdAt: serverTimestamp() 
      });

      setStatus('success');
      setFormData({ name: '', relation: '', message: '' }); 
      
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error("Error adding review: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#3E3A35] font-sans selection:bg-[#7A8762] selection:text-[#F7F3EB] pt-24 sm:pt-32 pb-24 flex justify-center items-center">
      
      {/* Background Texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.25] mix-blend-multiply"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")` 
        }}
      />

      <div className="w-full max-w-2xl px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif tracking-widest uppercase mb-4 text-[#3E3A35]">
            Leave a Note
          </h1>
          <p className="text-[#7A8762] font-serif italic text-lg">
            A private space to share your thoughts, feedback, or just a kind word.
          </p>
        </div>

        {/* The Paper Form */}
        <div className="relative bg-[#FAFAFA] p-8 md:p-12 shadow-sm border border-[#DCD9CE]/60 rounded-sm">
          
          {/* Decorative Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EFE9DC] border border-[#DCD9CE] shadow-sm rotate-2 z-20"></div>

          {status === 'success' ? (
            <div className="text-center py-16 animate-pulse">
              <div className="text-4xl text-[#7A8762] mb-4">❦</div>
              <h2 className="text-2xl font-serif text-[#3E3A35]">Thank you.</h2>
              <p className="text-[#514D48] mt-2">Your note has been securely delivered.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#7A8762] font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#DCD9CE] py-2 px-1 focus:outline-none focus:border-[#7A8762] transition-colors text-[#514D48] placeholder-[#C6B89E]"
                    placeholder="Jane Doe"
                  />
                </div>

                {/* Relationship Field */}
                <div className="space-y-2">
                  <label htmlFor="relation" className="text-xs uppercase tracking-widest text-[#7A8762] font-semibold">
                    Context / Role
                  </label>
                  <input
                    type="text"
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#DCD9CE] py-2 px-1 focus:outline-none focus:border-[#7A8762] transition-colors text-[#514D48] placeholder-[#C6B89E]"
                    placeholder="Client, Colleague, Friend..."
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2 pt-4">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#7A8762] font-semibold">
                  Your Note
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#DCD9CE] py-2 px-1 focus:outline-none focus:border-[#7A8762] transition-colors text-[#514D48] resize-none placeholder-[#C6B89E]"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <p className="text-red-500/80 text-sm italic font-serif">Something went wrong. Please try again.</p>
              )}

              {/* Submit Button */}
              <div className="pt-8 text-center md:text-right">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-8 py-3 rounded-full border border-[#7A8762] text-[#7A8762] font-semibold tracking-widest uppercase text-xs hover:bg-[#7A8762] hover:text-[#F7F3EB] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Note'}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}