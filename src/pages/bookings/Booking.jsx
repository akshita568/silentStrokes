import { useState } from "react";
import toast from "react-hot-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useAuth from "../../hooks/useAuth";
import { db } from "../../utils/firebase.config";
import Container from "../../components/container/Container";
import InteractiveCanvas from "./InteractiveCanvas";

// 👇 ADD YOUR EXAMPLE ARTWORKS HERE
const commissionExamples = [
  { 
    id: 1, 
    title: "Classic Portrait", 
    medium: "Acrylic on A5 Canvas", 
    img: "/artworks/comission3.png" 
  },
  { 
    id: 4, 
    title: "Creative Concept", 
    medium: "Acrylic on A4 Canvas", 
    img: "/artworks/dentist.png" 
  },
  { 
    id: 2, 
    title: "Beloved Pet", 
    medium: "Acrylic on A5 Canvas", 
    img: "/artworks/comission1.png" 
  },
  { 
    id: 1, 
    title: "Classic Portrait", 
    medium: "Acrylic on A5 Canvas", 
    img: "/artworks/comission2.png" 
  },
  { 
    id: 1, 
    title: "Classic Portrait", 
    medium: "Acrylic on A5 Canvas", 
    img: "/artworks/potrait.jpeg" 
  },
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
      
      // Clear form
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
    <div className="bg-base-white min-h-screen pb-16 font-sans text-text-main">
      
      {/* 1. Hero Section with the Canvas - PADDING REDUCED */}
      <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Typography & Intro */}
            <div className="lg:col-span-5 relative z-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-text-main leading-[1.1] mb-6">
                Your Vision. <br />
                <span className="font-serif italic font-medium text-olive">My Canvas.</span>
              </h1>
              <p className="text-base md:text-lg text-dove font-light leading-relaxed mb-4">
                Thank you so much for your interest in my artwork! 🤍 <br/><br/>
                Whether it is a standard face portrait or a custom concept, I would love to collaborate with you to create something beautiful for your space.
              </p>
            </div>

            {/* The Cute Interactive Canvas Component */}
            <div className="lg:col-span-7 relative w-full mt-4 lg:mt-0">
              <InteractiveCanvas />
            </div>

          </div>
        </Container>
      </section>

      <Container>
        {/* REDUCED vertical padding and gap between columns */}
        <div className="py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* 2. The Process & Pricing Description */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-olive mb-3">How It Works</h2>
            <h3 className="text-3xl font-light text-text-main mb-6">
              Let's create something <span className="font-semibold">magical. ✨</span>
            </h3>
            
            <div className="space-y-6 mb-10">
              <div className="border-l-2 border-sand pl-6 relative before:absolute before:-left-[7px] before:top-1.5 before:w-3 before:h-3 before:bg-sand before:rounded-full">
                <h4 className="text-base font-semibold text-text-main mb-1">1. Consultation & Quote</h4>
                <p className="text-sm text-dove leading-relaxed">Let me know what you'd like painted! We will discuss the size, medium, and complexity to finalize the cost.</p>
              </div>
              <div className="border-l-2 border-sand pl-6 relative before:absolute before:-left-[7px] before:top-1.5 before:w-3 before:h-3 before:bg-sand before:rounded-full">
                <h4 className="text-base font-semibold text-text-main mb-1">2. Advance Payment</h4>
                <p className="text-sm text-dove leading-relaxed">To officially confirm your commission and secure your spot, I require a 50% non-refundable advance payment.</p>
              </div>
              <div className="border-l-2 border-transparent pl-6 relative before:absolute before:-left-[7px] before:top-1.5 before:w-3 before:h-3 before:bg-olive before:rounded-full">
                <h4 className="text-base font-semibold text-text-main mb-1">3. Review & Dispatch</h4>
                <p className="text-sm text-dove leading-relaxed">Once the painting is completed, I will share detailed photos with you. The remaining balance is paid, and the artwork is carefully shipped to your door!</p>
              </div>
            </div>

            {/* Pricing Info block */}
            <div className="bg-sand/10 p-6 md:p-8 border border-sand shadow-sm rounded-sm">
              <h4 className="text-sm font-bold uppercase tracking-widest text-text-main mb-4 border-b border-sand pb-2">Investment Details</h4>
              <ul className="space-y-3 text-sm text-dove">
                <li className="flex justify-between"><span>A5 Acrylic Portrait</span> <span className="font-medium text-text-main">Starts at ₹2,000</span></li>
                <li className="flex justify-between"><span>A5 Oil Portrait</span> <span className="font-medium text-text-main">Starts at ₹2,500</span></li>
                <li className="pt-2 text-xs italic text-dove/80">* Larger canvas sizes are available at higher rates. Final cost varies by artwork complexity.</li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-sand text-xs md:text-sm text-dove leading-relaxed">
                <strong className="text-text-main font-medium">Shipping:</strong> Shipping charges are borne by the buyer. Since I'm an independent artist and don't have a partnership with any shipping company, all orders are shipped through trusted local courier services from my studio in Himachal Pradesh. Shipping costs are the standard rates you'd pay when sending a parcel to someone in another city.
              </div>
            </div>
          </div>

          {/* 3. Friendly Inquiry Form */}
          <div className="bg-base-white p-6 md:p-10 border border-sand shadow-sm rounded-sm">
            <h3 className="text-2xl font-serif text-text-main mb-2">Commission Request</h3>
            <p className="text-sm text-dove mb-6">Fill out the form below and I'll get back to you as soon as possible.</p>
            
            {/* REDUCED space-y-8 to space-y-6 */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" 
                    placeholder="Name" 
                    required
                  />
                  <label htmlFor="name" className="absolute left-0 -top-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">Your Name</label>
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" 
                    placeholder="Email" 
                    required
                  />
                  <label htmlFor="email" className="absolute left-0 -top-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">Email Address</label>
                </div>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" 
                  placeholder="Location" 
                  required
                />
                <label htmlFor="location" className="absolute left-0 -top-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">Shipping City & State</label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-dove mb-2">Medium Preference</label>
                  <select 
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-full bg-transparent border-b border-sand pb-2 focus:outline-none focus:border-olive transition-colors text-text-main text-sm"
                    required
                  >
                    <option value="">Select a medium...</option>
                    <option value="acrylic">Acrylic</option>
                    <option value="oil">Oil</option>
                    <option value="undecided">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-dove mb-2">Canvas Size</label>
                  <select 
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-transparent border-b border-sand pb-2 focus:outline-none focus:border-olive transition-colors text-text-main text-sm"
                    required
                  >
                    <option value="">Select a size...</option>
                    <option value="A5">A5 (Standard)</option>
                    <option value="A4">A4 (Medium)</option>
                    <option value="custom">Larger / Custom Size</option>
                  </select>
                </div>
              </div>
              
              <div className="relative pt-2">
                <textarea 
                  id="vision" 
                  rows="3" 
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors resize-none placeholder-transparent" 
                  placeholder="Vision"
                  required
                ></textarea>
                <label htmlFor="vision" className="absolute left-0 -top-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">What would you like painted?</label>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 md:py-4 mt-4 bg-text-main text-base-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors duration-300 rounded-sm disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Submitting..." : "Send Request ✨"}
              </button>
            </form>
          </div>
        </div>

        {/* 👇 4. NEW PAST COMMISSIONS GALLERY - GAP REDUCED 👇 */}
        <div className="mt-12 md:mt-16 border-t border-sand pt-12 md:pt-16">
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-olive mb-3 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-text-main mb-4">
              Past Commissions
            </h2>
            <p className="text-dove text-sm leading-relaxed">
              A glimpse into some of the special pieces I have created for collectors. From beloved pets to cherished memories, every painting is crafted with intention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {commissionExamples.map((item) => (
              <div key={item.id} className="group cursor-pointer flex flex-col">
                <div className="aspect-[4/5] overflow-hidden bg-sand/10 border border-sand/50 mb-4 md:mb-6 rounded-sm shadow-sm group-hover:shadow-md transition-shadow duration-500">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="text-center mt-auto">
                  <h4 className="text-text-main font-serif text-lg">{item.title}</h4>
                  <p className="text-[10px] md:text-xs text-olive uppercase tracking-widest mt-1 md:mt-2">{item.medium}</p>
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