import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Organizer = () => {
  return (
    <section className="py-20 md:py-32 bg-sand/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: The Artist Photo */}
          <div className="w-full lg:w-5/12 relative">
            <div className="aspect-[4/5] w-full bg-sand/50 rounded-sm relative z-10 overflow-hidden shadow-sm">
              {/* 
                TODO: Add your own photo to the assets folder and update this src! 
                For now, using a placeholder so your app doesn't crash.
              */}
              <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" 
                alt="Akshita in the studio" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Aesthetic background accent block */}
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-olive/10 rounded-sm z-0 hidden md:block"></div>
          </div>

          {/* Right Side: The Artist Statement */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-olive mb-4">
              Behind the Canvas
            </h3>
            <h2 className="text-3xl md:text-5xl font-light text-text-main leading-tight mb-8">
              Hi, I'm Akshita.<br />
              <span className="font-semibold text-text-main">I paint what words can't say.</span>
            </h2>
            
            <div className="space-y-6 text-dove font-light leading-relaxed text-lg">
              <p>
                My art is deeply rooted in observation and feeling. I find my truest inspiration in the quiet, unfiltered moments—often spending hours painting in my studio with my dog close by my side, translating the stillness around me onto the canvas. 
              </p>
              <p>
                Whether working on expansive, emotionally charged original pieces or collaborating with clients on intimate, bespoke commissions, my goal is always to create artwork that breathes life and intention into the spaces they eventually inhabit.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-base-white bg-olive px-8 py-4 rounded-full hover:bg-mint hover:text-text-main transition-colors shadow-sm"
              >
                View Portfolio <AiOutlineArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="text-sm font-semibold uppercase tracking-widest text-text-main hover:text-olive transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-olive hover:after:w-full after:transition-all after:duration-300"
              >
                Read Full Bio
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Organizer;