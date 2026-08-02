import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/container/Container';
import { CartContext } from '../../context/CartProvider';

const commissionTiers = [
  {
    id: "tier-1",
    title: "Custom Oil/Acrylic Portrait",
    timeline: "1–2 weeks turnaround",
    price: "From ₹2000",
    description: "A hand painted portrait created from your favorite photographs, capturing the personality, emotions, and little details that make every subject unique.",
    image: "/artworks/comission3.png"
  },
  {
    id: "tier-2",
    title: "Landscape Scenery Painting",
    timeline: "2–3 weeks turnaround",
    price: "From ₹2500",
    description: "Whether it's a peaceful forest, a mountain view, or a place close to your heart, I'll try my best to transform your favorite scenery into a timeless painting.",
    image: "/artworks/forest.png"
  },
  {
    id: "tier-3",
    title: "Custom Oil/Acrylic Artwork",
    timeline: "Timeline depends on the complexity of your idea.",
    price: "From ₹2000",
    description: "Have something unique in mind? From creative concepts to meaningful moments, I'll work with you to turn your vision into a one of a kind painting.",
    image: "/artworks/dentist.png"
  }
];

export default function Shop() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-base-white text-text-main font-sans pb-32 pt-24">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-olive mb-3 block">
            Custom Commissions
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-text-main mb-6">
            Bring Your Vision to Life
          </h1>
          <p className="text-dove text-sm md:text-base leading-relaxed">
            Every commission is created with care and tailored to your story. Browse the options below and find the one that feels right for your idea.
            <br />(the prices mentioned here are for A5 canvas size, larger sizes are also available).
          </p>
        </div>

        {/* Commission Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commissionTiers.map((tier) => (
            <div 
              key={tier.id}
              className="bg-sand/10 p-6 rounded-sm border border-sand shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-base-white mb-6 border border-sand/50">
                  <img 
                    src={tier.image} 
                    alt={tier.title} 
                    className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif text-text-main">{tier.title}</h3>
                  <span className="text-sm font-semibold text-olive">{tier.price}</span>
                </div>
                
                <p className="text-xs text-olive uppercase tracking-widest mb-4">{tier.timeline}</p>
                
                <p className="text-sm text-dove leading-relaxed mb-8">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => addToCart(tier)}
                  className="w-full py-3 bg-text-main text-base-white text-[10px] font-bold uppercase tracking-widest text-center hover:bg-olive transition-colors rounded-sm shadow-sm cursor-pointer"
                >
                  + Add to Inquiry Vault
                </button>
                <Link 
                  to="/contact" 
                  className="block w-full py-2.5 border border-text-main text-text-main text-[10px] font-bold uppercase tracking-widest text-center hover:bg-text-main hover:text-base-white transition-colors rounded-sm"
                >
                  Inquire Directly
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 pt-16 border-t border-sand/50 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-serif text-text-main mb-4">
            Looking for something entirely unique?
          </h3>
          <p className="text-dove text-sm md:text-base leading-relaxed mb-8">
            Couldn't find what you want and want to reach out to me with your custom request? Let's collaborate to create exactly what you're envisioning.
          </p>
          <Link 
            to="/booking" 
            className="inline-block px-8 py-3 bg-olive text-base-white text-[10px] font-bold uppercase tracking-widest hover:bg-text-main transition-colors duration-300 rounded-sm shadow-sm"
          >
            Submit Custom Request
          </Link>
        </div>

      </Container>
    </div>
  );
}