import { useContext } from "react";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";
import { CartContext } from "../../context/CartProvider";
import { Daisy, Squiggle } from "../../components/decorative/BotanicalMotifs";

const commissionTiers = [
  {
    id: "tier-1",
    tag: "MOST REQUESTED",
    title: "Custom Portrait",
    timeline: "1–2 weeks turnaround",
    price: "From ₹2,000",
    description: "Hand-painted from your favorite photograph. Captures personality, gentle lighting, and expressions that make someone special.",
    image: "/artworks/comission3.png"
  },
  {
    id: "tier-2",
    tag: "STUDIO ORIGINAL",
    title: "Landscape Scenery",
    timeline: "2–3 weeks turnaround",
    price: "From ₹2,500",
    description: "Forest studies, mountain trails, and serene horizons rendered in textured oil with rich palette knife impasto.",
    image: "/artworks/forest.png"
  },
  {
    id: "tier-3",
    tag: "BESPOKE VISION",
    title: "Custom Artwork",
    timeline: "Flexible turnaround based on brief",
    price: "From ₹2,000",
    description: "Have a unique creative concept? From memorable milestones to surreal ideas, I'll collaborate with you directly.",
    image: "/artworks/dentist.png"
  }
];

export default function Shop() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-theme-cream text-theme-dark font-sans pb-12 pt-6 md:pt-8 relative overflow-hidden">
      <div className="absolute top-4 right-6 pointer-events-none -z-10 opacity-75 hidden sm:block">
        <Daisy className="w-16 h-16" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#2D2D2D" />
      </div>

      <Container>
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5">
            <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
              ATELIER COMMISSIONS • TIERS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-dark uppercase tracking-tight">
            BRING YOUR VISION TO LIFE
          </h1>

          <div className="flex justify-center my-1.5">
            <Squiggle className="w-20 h-2.5" color="#2D2D2D" />
          </div>

          <p className="text-xs sm:text-sm text-theme-dark/90 leading-relaxed font-medium">
            Every commission is created with care and tailored to your story. Choose a tier below to add it to your inquiry vault.
            <br />
            <span className="text-[11px] font-black uppercase text-theme-dark">(Prices listed are for standard A5 canvas; larger sizes available upon request).</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {commissionTiers.map((tier) => (
            <div 
              key={tier.id}
              className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border-[3px] border-theme-dark shadow-solid flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <div>
                <div className="flex justify-between items-center mb-3 px-1">
                  <span className="px-3 py-0.5 bg-theme-olive text-theme-dark text-[9px] font-black uppercase tracking-widest rounded-full border border-theme-dark">
                    {tier.tag}
                  </span>
                  <span className="text-[10px] font-black text-theme-dark uppercase tracking-wider">
                    {tier.timeline}
                  </span>
                </div>

                <div className="relative w-full h-auto bg-[#ECE8DF] p-2 border-2 border-theme-dark/40 shadow-inner mb-4 flex items-center justify-center">
                  <img 
                    src={tier.image} 
                    alt={tier.title} 
                    className="w-full h-auto object-contain block rounded-none filter contrast-[1.02]"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-theme-orange text-theme-dark font-black text-xs rounded-full border border-theme-dark shadow-sm">
                    {tier.price}
                  </div>
                </div>
                
                <div className="px-1 space-y-1.5 mb-4">
                  <h3 className="text-lg font-black text-theme-dark uppercase tracking-tight">
                    {tier.title}
                  </h3>
                  {tier.price && tier.description && (
                    <p className="text-xs text-theme-dark/80 leading-relaxed font-medium">
                      {tier.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t-2 border-theme-dark/20 px-1">
                <button 
                  onClick={() => addToCart(tier)}
                  className="w-full py-2.5 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider text-center rounded-full shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all cursor-pointer border-2 border-theme-dark"
                >
                  + Add to Inquiry Vault
                </button>
                <Link 
                  to="/contact" 
                  className="block w-full py-2 border-2 border-theme-dark text-theme-dark hover:bg-theme-dark hover:text-theme-cream text-xs font-black uppercase tracking-wider text-center rounded-full transition-colors"
                >
                  Inquire Directly
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 sm:p-8 bg-theme-orange text-theme-dark rounded-3xl border-[3px] border-theme-dark shadow-solid text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest bg-theme-dark text-theme-cream px-3 py-0.5 rounded-full inline-block border border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
            SPECIAL COMMISSIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            LOOKING FOR SOMETHING ENTIRELY UNIQUE?
          </h3>
          <p className="text-xs text-theme-dark/90 leading-relaxed max-w-lg mx-auto font-medium">
            Need an oversized canvas, multi-panel installation, or specific color scheme? Let&apos;s discuss your custom request directly.
          </p>
          <div className="pt-1">
            <Link 
              to="/booking" 
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-olive hover:text-theme-dark transition-all border-2 border-theme-dark"
            >
              <span>Submit Custom Request</span>
              <span>→</span>
            </Link>
          </div>
        </div>

      </Container>
    </div>
  );
}

