import { Link } from "react-router-dom";

import Container from "../../components/container/Container";
import { Daisy, Squiggle } from "../../components/decorative/BotanicalMotifs";

const BespokeCommissions = () => {
  return (
    <section className="relative py-8 md:py-9 px-6 sm:px-8 md:px-10 bg-theme-olive text-theme-dark rounded-3xl border-[3px] border-theme-dark shadow-solid">
      <div className="absolute -bottom-6 -right-5 pointer-events-none -z-10 opacity-85 hidden sm:block">
        <Daisy className="w-18 h-18 md:w-22 md:h-22" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#2D2D2D" />
      </div>

      <Container>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
                CUSTOM ARTWORK • SLOTS OPEN
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-theme-dark leading-tight uppercase tracking-tight">
              BESPOKE <span className="text-theme-dark">COMMISSIONS</span>
            </h2>

            <div className="my-1.5">
              <Squiggle className="w-16 h-2.5" color="#2D2D2D" />
            </div>

            <p className="text-xs sm:text-sm text-theme-dark font-medium leading-relaxed max-w-lg">
              Whether you are looking for a detailed portrait of a loved one or a quiet landscape study, I take on limited commissions each month to craft something truly meaningful.
            </p>
            
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-theme-cream border-2 border-theme-dark shadow-sm">
                <span className="w-7 h-7 rounded-full bg-theme-dark text-theme-cream font-black text-xs flex items-center justify-center shrink-0 border border-theme-dark">
                  01
                </span>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-theme-dark uppercase tracking-tight">Discuss Vision & Reference Photos</h4>
                  <p className="text-[11px] text-theme-dark/80 font-medium">We discuss your ideas, colors, references, and preferred canvas size.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-theme-cream border-2 border-theme-dark shadow-sm">
                <span className="w-7 h-7 rounded-full bg-theme-dark text-theme-cream font-black text-xs flex items-center justify-center shrink-0 border border-theme-dark">
                  02
                </span>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-theme-dark uppercase tracking-tight">Initial Sketches & Approval</h4>
                  <p className="text-[11px] text-theme-dark/80 font-medium">I share preliminary composition sketches before painting on canvas.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-theme-cream border-2 border-theme-dark shadow-sm">
                <span className="w-7 h-7 rounded-full bg-theme-dark text-theme-cream font-black text-xs flex items-center justify-center shrink-0 border border-theme-dark">
                  03
                </span>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-theme-dark uppercase tracking-tight">Final Varnish & Tracked Shipping</h4>
                  <p className="text-[11px] text-theme-dark/80 font-medium">Protective archival varnish, careful bubble packaging, and delivery.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all border-2 border-theme-dark"
              >
                <span>Request a Commission Slot</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center items-center">
            <div className="relative w-full max-w-sm p-6 sm:p-7 bg-theme-cream rounded-3xl border-[3px] border-theme-dark shadow-solid">
              <div className="relative w-full h-auto bg-[#E2D9CC] p-2 border-2 border-theme-dark shadow-inner flex items-center justify-center">
                <img 
                  src="/artworks/comission2.png" 
                  alt="Commission Example" 
                  className="w-full h-auto object-contain block rounded-none filter contrast-[1.02] hover:scale-[1.02] transition-transform duration-300"
                />
                
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-theme-orange text-theme-dark text-xs font-black uppercase tracking-wider rounded-full border-2 border-theme-dark shadow-sm">
                  ₹2,000 / A5
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] font-black uppercase tracking-widest text-theme-dark">
                  CUSTOM COMMISSION
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BespokeCommissions;

