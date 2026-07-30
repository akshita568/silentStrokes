import Container from "../../components/container/Container";
import { FiUploadCloud } from "react-icons/fi"; 
import InteractiveCanvas from "./InteractiveCanvas"; 

const Booking = () => {
  return (
    <div className="bg-base-white min-h-screen pb-24 font-sans text-text-main">
      
      {/* 1. Hero Section with the Canvas */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Typography & Intro */}
            <div className="lg:col-span-5 relative z-10">
              <h1 className="text-5xl md:text-7xl font-light text-text-main leading-[1.1] mb-6">
                Your Vision. <br />
                <span className="font-serif italic font-medium text-olive">My Canvas.</span>
              </h1>
              <p className="text-lg text-dove font-light leading-relaxed mb-8">
                Thank you so much for your interest in my artwork! 🤍 <br/><br/>
                Whether it is a standard face portrait or a custom concept, I would love to collaborate with you to create something beautiful for your space.
              </p>
            </div>

            {/* The Cute Interactive Canvas Component */}
            <div className="lg:col-span-7 relative w-full mt-8 lg:mt-0">
              <InteractiveCanvas />
            </div>

          </div>
        </Container>
      </section>

      <Container>
        <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* 2. The Process & Pricing Description */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-olive mb-4">How It Works</h2>
            <h3 className="text-3xl font-light text-text-main mb-8">
              Let's create something <span className="font-semibold">magical. ✨</span>
            </h3>
            
            <div className="space-y-8 mb-12">
              <div className="border-l-2 border-sand pl-6 relative before:absolute before:-left-[7px] before:top-1.5 before:w-3 before:h-3 before:bg-sand before:rounded-full">
                <h4 className="text-lg font-semibold text-text-main mb-1">1. Consultation & Quote</h4>
                <p className="text-sm text-dove leading-relaxed">Let me know what you'd like painted! We will discuss the size, medium, and complexity to finalize the cost.</p>
              </div>
              <div className="border-l-2 border-sand pl-6 relative before:absolute before:-left-[7px] before:top-1.5 before:w-3 before:h-3 before:bg-sand before:rounded-full">
                <h4 className="text-lg font-semibold text-text-main mb-1">2. Advance Payment</h4>
                <p className="text-sm text-dove leading-relaxed">To officially confirm your commission and secure your spot, I require a 50% non-refundable advance payment.</p>
              </div>
              <div className="border-l-2 border-transparent pl-6 relative before:absolute before:-left-[7px] before:top-1.5 before:w-3 before:h-3 before:bg-olive before:rounded-full">
                <h4 className="text-lg font-semibold text-text-main mb-1">3. Review & Dispatch</h4>
                <p className="text-sm text-dove leading-relaxed">Once the painting is completed, I will share detailed photos with you. The remaining balance is paid, and the artwork is carefully shipped to your door!</p>
              </div>
            </div>

            {/* Pricing Info block */}
            <div className="bg-sand/10 p-8 border border-sand shadow-sm rounded-sm">
              <h4 className="text-sm font-bold uppercase tracking-widest text-text-main mb-4 border-b border-sand pb-2">Investment Details</h4>
              <ul className="space-y-3 text-sm text-dove">
                <li className="flex justify-between"><span>A5 Acrylic Portrait</span> <span className="font-medium text-text-main">Starts at ₹1,799</span></li>
                <li className="flex justify-between"><span>A5 Oil Portrait</span> <span className="font-medium text-text-main">Starts at ₹2,299</span></li>
                <li className="pt-2 text-xs italic text-dove/80">* Larger canvas sizes are available at higher rates. Final cost varies by artwork complexity.</li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-sand text-sm text-dove">
                <strong className="text-text-main font-medium">Shipping:</strong> Charges are covered by the buyer (usually ~₹300 depending on location). All artwork securely ships from my studio in Himachal Pradesh.
              </div>
            </div>
          </div>

          {/* 3. Friendly Inquiry Form */}
          <div className="bg-base-white p-8 md:p-12 border border-sand shadow-sm rounded-sm">
            <h3 className="text-2xl font-serif text-text-main mb-2">Commission Request 🤍</h3>
            <p className="text-sm text-dove mb-8">Fill out the form below and I'll get back to you with a custom quote.</p>
            
            <form className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input type="text" id="name" className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" placeholder="Name" />
                  <label htmlFor="name" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">Your Name</label>
                </div>
                <div className="relative">
                  <input type="email" id="email" className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" placeholder="Email" />
                  <label htmlFor="email" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">Email Address</label>
                </div>
              </div>

              <div className="relative">
                <input type="text" id="location" className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors placeholder-transparent" placeholder="Location" />
                <label htmlFor="location" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">Shipping City & State</label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dove mb-2">Medium Preference</label>
                  <select className="w-full bg-transparent border-b border-sand pb-2 focus:outline-none focus:border-olive transition-colors text-text-main text-sm">
                    <option value="">Select a medium...</option>
                    <option value="acrylic">Acrylic</option>
                    <option value="oil">Oil</option>
                    <option value="undecided">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-dove mb-2">Canvas Size</label>
                  <select className="w-full bg-transparent border-b border-sand pb-2 focus:outline-none focus:border-olive transition-colors text-text-main text-sm">
                    <option value="">Select a size...</option>
                    <option value="A5">A5 (Standard)</option>
                    <option value="A4">A4 (Medium)</option>
                    <option value="custom">Larger / Custom Size</option>
                  </select>
                </div>
              </div>
              
              <div className="relative pt-4">
                <textarea id="vision" rows="3" className="peer w-full bg-transparent border-b border-sand py-2 text-text-main focus:outline-none focus:border-olive transition-colors resize-none placeholder-transparent" placeholder="Vision"></textarea>
                <label htmlFor="vision" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-widest text-dove transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-dove peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-olive">What would you like painted?</label>
              </div>

              {/* File Upload UI */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-dove mb-3">Reference Image (Optional)</label>
                <label className="flex items-center justify-center w-full px-4 py-6 border border-dashed border-sand hover:border-olive hover:bg-sand/10 cursor-pointer transition-colors bg-base-white text-dove group rounded-sm">
                  <div className="flex flex-col items-center gap-2">
                    <FiUploadCloud className="group-hover:text-olive text-2xl transition-colors text-dove/70" />
                    <span className="text-sm font-medium group-hover:text-text-main transition-colors">Click to attach a reference photo</span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
              
              <button type="button" className="w-full py-4 mt-8 bg-text-main text-base-white text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors duration-300 rounded-sm">
                Send Request ✨
              </button>
            </form>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Booking;