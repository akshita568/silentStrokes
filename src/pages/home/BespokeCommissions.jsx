import { Link } from "react-router-dom";
import Container from "../../components/container/Container";

const BespokeCommissions = () => {
  return (
    <section className="py-24 bg-base-white">
      <Container>
        <div className="bg-sand/10 rounded-sm p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 border border-sand relative overflow-hidden">
          
          <div className="absolute -top-24 -right-12 text-[250px] text-base-white opacity-40 font-serif italic pointer-events-none select-none">
            C
          </div>

          <div className="flex-1 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-olive mb-2">Work With Me</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-text-main mb-6 leading-tight">
              Bespoke <br/><span className="italic font-light text-dove">Commissions</span>
            </h3>
            <p className="text-sm text-dove mb-8 leading-relaxed max-w-lg">
              Whether you are looking for a highly detailed portrait or a moody landscape, I take on a limited number of custom commissions each month to ensure every piece receives the time and detail it deserves.
            </p>
            
            <ul className="space-y-5 mb-10 border-l border-olive/30 pl-6">
              <li className="text-sm text-text-main"><span className="text-olive font-serif italic mr-2 text-lg">01.</span> Discuss your vision and reference photos.</li>
              <li className="text-sm text-text-main"><span className="text-olive font-serif italic mr-2 text-lg">02.</span> Initial sketches and compositional approval.</li>
              <li className="text-sm text-text-main"><span className="text-olive font-serif italic mr-2 text-lg">03.</span> Final creation, varnishing, and delivery.</li>
            </ul>

            <Link 
              to="/shop" 
              className="inline-block px-8 py-4 bg-text-main text-base-white text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors shadow-sm"
            >
              Request a Slot
            </Link>
          </div>

          {/* FIXED IMAGE CONTAINER: No cropping, handles any aspect ratio perfectly */}
          <div className="flex-1 w-full relative z-10 flex justify-center items-center">
            <div className="w-full max-w-md bg-sand/20 p-4 border border-sand shadow-inner rounded-sm">
              <img 
                src="/artworks/comission2.png" 
                alt="Commission Example" 
                /* h-auto and object-contain ensure the image never stretches or crops */
                className="w-full h-auto max-h-[60vh] object-contain filter grayscale-[10%]"
              />
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
};

export default BespokeCommissions;