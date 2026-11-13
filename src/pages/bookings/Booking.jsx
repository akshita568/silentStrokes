import { useState } from "react";
import toast from "react-hot-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import useAuth from "../../hooks/useAuth";
import { db } from "../../utils/firebase.config";
import Container from "../../components/container/Container";
import InteractiveCanvas from "./InteractiveCanvas";
import { Squiggle } from "../../components/decorative/BotanicalMotifs";

const commissionExamples = [
  { 
    id: 1, 
    title: "Classic Portrait", 
    medium: "Acrylic on A5 Canvas", 
    price: "₹2,000",
    img: "/artworks/comission3.png"
  },
  { 
    id: 4, 
    title: "Creative Concept", 
    medium: "Acrylic on A4 Canvas", 
    price: "₹2,500",
    img: "/artworks/dentist.png"
  },
  { 
    id: 2, 
    title: "Beloved Pet", 
    medium: "Acrylic on A5 Canvas", 
    price: "₹2,000",
    img: "/artworks/comission1.png"
  },
  { 
    id: 3, 
    title: "Quiet Landscape", 
    medium: "Acrylic on A5 Canvas", 
    price: "₹2,000",
    img: "/artworks/potrait.jpeg"
  }
];

const Booking = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [medium, setMedium] = useState("");
  const [size, setSize] = useState("");
  const [vision, setVision] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to submit a commission request.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "commissions"), {
        userId: user.uid,
        name: name || user.displayName || "Collector",
        email: email || user.email,
        location,
        medium,
        size,
        vision,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      toast.success("Commission request submitted successfully!");
      
      setName("");
      setEmail("");
      setLocation("");
      setMedium("");
      setSize("");
      setVision("");
    } catch (error) {
      console.error("Error submitting commission request:", error);
      toast.error("Failed to send request. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-theme-cream min-h-screen pb-12 font-sans text-theme-dark">
      <section className="relative pt-6 pb-6 lg:pt-8 lg:pb-8 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5">
                <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
                  CUSTOM ATELIER • COMMISSIONS
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-theme-dark leading-none uppercase tracking-tight">
                YOUR VISION. <br />
                <span>MY CANVAS.</span>
              </h1>

              <div className="my-1.5">
                <Squiggle className="w-16 h-2.5" color="#2D2D2D" />
              </div>

              <p className="text-xs sm:text-sm text-theme-dark/90 leading-relaxed font-medium">
                Thank you so much for your interest in my artwork! 🤍 Whether it is an expressive portrait of a loved one or a bespoke concept, I would love to collaborate with you.
              </p>

              <div className="pt-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-theme-dark border-b-2 border-theme-dark pb-0.5">
                  Try sketching your idea on the pad to the right →
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 relative w-full">
              <InteractiveCanvas />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="relative space-y-6 px-1 sm:px-2 py-1">
            <div>
              <div className="inline-flex items-center gap-1.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-theme-orange border border-theme-dark" />
                <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark">
                  HOW IT WORKS • STUDIO PROCESS
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-theme-dark uppercase tracking-tight leading-tight">
                LET&apos;S CREATE <br />
                <span>SOMETHING SPECIAL.</span>
              </h3>
              <div className="mt-2">
                <Squiggle className="w-16 h-2" color="#2D2D2D" />
              </div>
            </div>
            
            <div className="space-y-3.5">
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-[#FAF7F2] border-2 border-theme-dark shadow-sm hover:translate-x-1 transition-transform">
                <span className="w-7 h-7 rounded-full bg-theme-dark text-theme-cream font-black text-xs flex items-center justify-center shrink-0 border border-theme-dark mt-0.5">
                  01
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-theme-dark uppercase tracking-tight">Consultation & Quote</h4>
                  <p className="text-[11px] text-theme-dark/80 leading-relaxed font-medium mt-0.5">
                    Share photos, dimensions, and subject details to confirm your quote.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-2xl bg-[#FAF7F2] border-2 border-theme-dark shadow-sm hover:translate-x-1 transition-transform">
                <span className="w-7 h-7 rounded-full bg-theme-dark text-theme-cream font-black text-xs flex items-center justify-center shrink-0 border border-theme-dark mt-0.5">
                  02
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-theme-dark uppercase tracking-tight">50% Advance & Sketches</h4>
                  <p className="text-[11px] text-theme-dark/80 leading-relaxed font-medium mt-0.5">
                    Reserve your monthly slot. I share compositional sketches before painting.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-2xl bg-[#FAF7F2] border-2 border-theme-dark shadow-sm hover:translate-x-1 transition-transform">
                <span className="w-7 h-7 rounded-full bg-theme-dark text-theme-cream font-black text-xs flex items-center justify-center shrink-0 border border-theme-dark mt-0.5">
                  03
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-theme-dark uppercase tracking-tight">Varnish & Delivery</h4>
                  <p className="text-[11px] text-theme-dark/80 leading-relaxed font-medium mt-0.5">
                    Review final photos, complete remaining balance, and receive safe tracked delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border-2 border-theme-dark shadow-sm space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-theme-dark border-b-2 border-theme-dark/20 pb-1.5 flex items-center justify-between">
                <span>STANDARD INVESTMENT</span>
                <span className="text-[9px] text-theme-dark/60 font-medium">CUSTOM SIZES ON REQUEST</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-theme-dark">
                <li className="flex justify-between items-center font-black">
                  <span>A5 Acrylic Portrait</span> 
                  <span className="bg-theme-olive text-theme-dark px-2.5 py-0.5 rounded-full text-[10px] border border-theme-dark">Starts at ₹2,000</span>
                </li>
                <li className="flex justify-between items-center font-black">
                  <span>A5 Oil Portrait</span> 
                  <span className="bg-theme-orange text-theme-dark px-2.5 py-0.5 rounded-full text-[10px] border border-theme-dark">Starts at ₹2,500</span>
                </li>
              </ul>
              <div className="pt-2.5 border-t border-theme-dark/20 text-[10.5px] text-theme-dark/90 leading-relaxed font-medium">
                <strong>Shipping:</strong> Shipping is done via local courier companies. Delivery charges can vary (approx. ₹200 or more depending on location) and must be paid by the customer before the painting gets shipped.
              </div>
            </div>
          </div>

          <div className="relative bg-[#FAF7F2] p-7 sm:p-8 rounded-3xl border-[3px] border-theme-dark shadow-solid">
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark mb-0.5 block">
                COMMISSION INQUIRY
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-theme-dark uppercase tracking-tight">RESERVE YOUR SLOT</h3>
              <p className="text-[11px] text-theme-dark/80 mt-0.5 font-medium">
                Fill in your brief below and I will review and get back to you personally.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium" 
                    placeholder="e.g. Akshita" 
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">
                    Email Address
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
              </div>

              <div className="space-y-1">
                <label htmlFor="location" className="text-[10px] font-black uppercase tracking-wider text-theme-dark">
                  Shipping City & State
                </label>
                <input 
                  type="text" 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium" 
                  placeholder="e.g. Hamirpur, Himachal Pradesh" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="medium" className="text-[10px] font-black uppercase tracking-wider text-theme-dark block">
                    Medium
                  </label>
                  <select 
                    id="medium"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium cursor-pointer"
                    required
                  >
                    <option value="">Select medium...</option>
                    <option value="acrylic">Acrylic on Canvas</option>
                    <option value="oil">Oil on Canvas</option>
                    <option value="undecided">Not sure yet (let&apos;s decide)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="size" className="text-[10px] font-black uppercase tracking-wider text-theme-dark block">
                    Canvas Size
                  </label>
                  <select 
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive font-medium cursor-pointer"
                    required
                  >
                    <option value="">Select size...</option>
                    <option value="A5">A5 (Standard)</option>
                    <option value="A4">A4 (Statement)</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="vision" className="text-[10px] font-black uppercase tracking-wider text-theme-dark block">
                  Vision / Description
                </label>
                <textarea 
                  id="vision" 
                  rows="3" 
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="w-full bg-theme-cream rounded-xl px-3 py-2 text-xs text-theme-dark border-2 border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-olive resize-none font-medium" 
                  placeholder="Describe your idea or desired colors..."
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all disabled:opacity-50 cursor-pointer active:scale-95 border-2 border-theme-dark"
              >
                {loading ? "Submitting..." : "Send Commission Request ✨"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-7 border-t-2 border-theme-dark/20 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark block mb-0.5">
                ARCHIVES • PREVIOUS WORKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-theme-dark uppercase tracking-tight">
                PAST COMMISSIONS
              </h2>
            </div>
            <p className="text-xs text-theme-dark/80 max-w-xs font-medium">
              Every piece is hand-painted and protected with museum-grade varnish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {commissionExamples.map((item) => (
              <div key={item.id} className="bg-[#FAF7F2] rounded-3xl border-[3px] border-theme-dark p-6 shadow-solid flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div>
                  <div className="relative w-full h-auto bg-[#ECE8DF] p-2 border-2 border-theme-dark/40 shadow-inner mb-3 flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-auto object-contain block rounded-none filter contrast-[1.02]"
                    />
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-theme-orange text-theme-dark font-black text-[10px] rounded-full border border-theme-dark shadow-sm">
                      {item.price}
                    </div>
                  </div>
                  <h4 className="text-theme-dark font-black text-sm uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-theme-dark/70 font-bold uppercase tracking-wider">
                    {item.medium}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Booking;

