import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowRight } from "react-icons/ai";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useAuth from "../../hooks/useAuth";
import { db } from "../../utils/firebase.config";

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
      // Directly write the inquiry to your Firebase Firestore database
      await addDoc(collection(db, "inquiries"), {
        userId: user.uid || "anonymous",
        email: email || user.email,
        subject,
        message,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      toast.success("Message sent successfully!");
      // Clear form after successful submission
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
    <div className="bg-base-white min-h-screen py-16 md:py-24 text-text-main">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
            Get in <span className="font-semibold text-text-main">Touch</span>
          </h2>
          <p className="text-dove text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you are interested in a custom commission, have a question about an available canvas, or simply want to say hello, I would love to hear from you.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Left Column: Studio Information */}
          <div className="md:w-1/3 flex flex-col gap-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-dove mb-3">
                Studio Location
              </h3>
              <p className="text-text-main leading-relaxed font-medium">
                Himachal Pradesh<br />
                India
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-dove mb-3">
                Direct Inquiries
              </h3>
              <a href="mailto:artsydaisies56@gmail.com" className="text-olive hover:text-mint transition-colors text-lg font-semibold block mb-1">
                artsydaisies56@gmail.com
              </a>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-dove mb-3">
                Response Time
              </h3>
              <p className="text-dove text-sm leading-relaxed">
                Please allow 48 hours for a response to all commission and gallery inquiries.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 relative group">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-dove mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-sand pb-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder:text-sand/70"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                
                <div className="flex-1 relative group">
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-dove mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-transparent border-b border-sand pb-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder:text-sand/70"
                    placeholder="Commission, Shipping, etc."
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-dove mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-sand pb-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder:text-sand/70 resize-none mt-2"
                  placeholder="Tell me about your vision..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 self-start bg-olive text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-olive/90 hover:shadow-md transition-all flex items-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Sending..." : "Send Inquiry"} <AiOutlineArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Contact;