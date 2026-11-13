import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../../utils/firebase.config.js"; 
import { Squiggle } from "../../components/decorative/BotanicalMotifs";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await addDoc(collection(db, "reviews"), {
        name: formData.name,
        relation: formData.relation,
        message: formData.message,
        createdAt: serverTimestamp() 
      });

      setStatus("success");
      setFormData({ name: "", relation: "", message: "" }); 
      setTimeout(() => setStatus("idle"), 5000);
      
    } catch (error) {
      console.error("Error adding review: ", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-theme-cream text-theme-dark font-sans selection:bg-theme-olive selection:text-theme-dark pt-6 pb-12 flex justify-center items-center relative overflow-hidden">
      <div className="w-full max-w-xl px-6 relative z-10">
        <div className="text-center mb-5 space-y-1">
          <div className="inline-flex items-center gap-1.5">
            <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
              STUDIO GUESTBOOK • GUEST NOTES
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-theme-dark uppercase tracking-tight">
            LEAVE A NOTE
          </h1>

          <div className="flex justify-center my-1.5">
            <Squiggle className="w-16 h-2" color="#2D2D2D" />
          </div>

          <p className="text-theme-dark/80 font-medium text-sm">
            Share your thoughts, impressions, or just a kind word.
          </p>
        </div>

        <div className="relative bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border-[3px] border-theme-dark shadow-solid">
          {status === "success" ? (
            <div className="text-center py-12 space-y-2">
              <div className="text-3xl text-theme-dark">✿</div>
              <h2 className="text-2xl font-black text-theme-dark uppercase">THANK YOU SO MUCH.</h2>
              <p className="text-theme-dark/80 text-xs font-medium">Your note has been securely pinned to the studio wall.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium"
                    placeholder="e.g. Jane Doe"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="relation" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">
                    Context / Connection
                  </label>
                  <input
                    type="text"
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium"
                    placeholder="Collector, Friend, Visitor..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">
                  Your Note
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive resize-none font-medium"
                  placeholder="Leave a thought, a quote, or warm wishes..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-700 text-xs font-black">Something went wrong. Please try again.</p>
              )}

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-6 py-2.5 rounded-full bg-theme-dark text-theme-cream font-black tracking-wider uppercase text-xs shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all disabled:opacity-50 cursor-pointer active:scale-95 border-2 border-theme-dark"
                >
                  {status === "submitting" ? "Pinning..." : "Send Note ✨"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}