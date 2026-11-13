import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowRight } from "react-icons/ai";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import useAuth from "../../hooks/useAuth";
import { db } from "../../utils/firebase.config";
import { Squiggle } from "../../components/decorative/BotanicalMotifs";

const Contact = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to send a message.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "inquiries"), {
        userId: user.uid || "anonymous",
        email: email || user.email,
        subject,
        message,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      toast.success("Message sent successfully!");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error writing inquiry to Firestore:", error);
      toast.error("Failed to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-theme-cream min-h-screen pt-6 pb-12 text-theme-dark relative overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5">
            <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
              ATELIER CONTACT • INQUIRIES
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-dark uppercase tracking-tight">
            GET IN TOUCH
          </h1>

          <div className="flex justify-center my-1.5">
            <Squiggle className="w-20 h-2" color="#2D2D2D" />
          </div>

          <p className="text-xs sm:text-sm text-theme-dark/85 max-w-md mx-auto leading-relaxed font-medium">
            Whether you are interested in a custom commission, have a question about an available canvas, or simply want to say hello.
          </p>
        </div>

        <div className="relative bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border-[3px] border-theme-dark shadow-solid flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col gap-6 border-b md:border-b-0 md:border-r-2 border-theme-dark/20 pb-6 md:pb-0 md:pr-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark block mb-0.5">
                STUDIO LOCATION
              </span>
              <p className="text-theme-dark font-black text-base uppercase">
                Himachal Pradesh, India
              </p>
              <p className="text-[11px] text-theme-dark/80 mt-0.5 font-medium">
                Archival packaging with tracked courier dispatch.
              </p>
            </div>
            
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark block mb-0.5">
                DIRECT EMAIL
              </span>
              <a href="mailto:artsydaisies56@gmail.com" className="text-theme-dark hover:underline text-sm font-black block">
                artsydaisies56@gmail.com
              </a>
            </div>

            <div className="p-3.5 rounded-2xl bg-theme-cream border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark block mb-0.5">
                RESPONSE TIME
              </span>
              <p className="text-theme-dark/80 text-[11px] leading-relaxed font-medium">
                I reply to all commission inquiries within 24 to 48 hours.
              </p>
            </div>
          </div>

          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-1">
                  <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-wider text-theme-dark">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                
                <div className="flex-1 space-y-1">
                  <label htmlFor="subject" className="block text-[10px] font-black uppercase tracking-wider text-theme-dark">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium"
                    placeholder="e.g. Portrait Inquiry"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-wider text-theme-dark">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive resize-none font-medium"
                  placeholder="Share details about your custom idea, favorite paintings, or general inquiries..."
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-theme-dark text-theme-cream hover:bg-theme-orange hover:text-theme-dark px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-solid transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95 border-2 border-theme-dark"
                >
                  <span>{loading ? "Sending..." : "Send Inquiry"}</span>
                  <AiOutlineArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

