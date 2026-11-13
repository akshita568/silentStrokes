import { Link } from "react-router-dom";

import Container from "../../container/Container";
import { Daisy, LeafSprig, Squiggle } from "../../decorative/BotanicalMotifs";
import ScallopDivider from "../../decorative/ScallopDivider";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative bg-theme-dark text-theme-cream mt-10 sm:mt-12">
      <div className="absolute -top-[20px] left-0 w-full pointer-events-none z-10">
        <ScallopDivider position="top" color="#2D2D2D" radius={20} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-4 right-8 opacity-15 hidden sm:block">
          <Daisy className="w-20 h-20" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#F9F6F0" />
        </div>
        <div className="absolute top-6 left-8 opacity-10 hidden md:block">
          <LeafSprig className="w-16 h-24" color="#7B8E61" strokeColor="#F9F6F0" />
        </div>
      </div>

      <Container>
        <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-3 py-8 md:py-10">
          <div className="space-y-3 text-center sm:text-left">
            <Link className="inline-flex items-center gap-2" to="/" onClick={scrollToTop}>
              <span className="text-2xl font-black uppercase text-theme-cream tracking-tight">
                <span className="font-serif italic font-normal lowercase">silent</span>STROKES
                <span className="text-sm ml-1 text-theme-orange">✿</span>
              </span>
            </Link>
            
            <div className="my-1.5">
              <Squiggle className="w-16 h-2 mx-auto sm:mx-0" color="#F0A868" />
            </div>

            <p className="max-w-xs text-xs text-theme-cream/80 leading-relaxed mx-auto sm:mx-0 font-medium">
              Hand-painted contemporary art, custom oil portraits, and botanical pieces crafted with quiet devotion in Himachal Pradesh.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:pl-10">
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-theme-orange border-b-2 border-theme-cream/20 pb-1 mb-3">
                STUDIO LINKS
              </p>
              <ul className="space-y-2 text-xs font-black uppercase tracking-wider">
                <li onClick={scrollToTop}>
                  <Link to="/portfolio" className="hover:text-theme-orange transition-colors">Gallery & 3D Exhibition</Link>
                </li>
                <li onClick={scrollToTop}>
                  <Link to="/booking" className="hover:text-theme-orange transition-colors">Custom Commissions</Link>
                </li>
                <li onClick={scrollToTop}>
                  <Link to="/shop" className="hover:text-theme-orange transition-colors">Shop Canvas Tiers</Link>
                </li>
                <li onClick={scrollToTop}>
                  <Link to="/about" className="hover:text-theme-orange transition-colors">About the Artist</Link>
                </li>
              </ul>
            </div>
            
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-theme-orange border-b-2 border-theme-cream/20 pb-1 mb-3">
                DIRECT INQUIRY
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="mailto:artsydaisies56@gmail.com" className="font-black text-theme-cream hover:text-theme-orange underline">
                    artsydaisies56@gmail.com
                  </a>
                </li>
                <li className="text-theme-cream/80 text-[11px] leading-relaxed font-medium">
                  Himachal Pradesh, India <br />
                  <span>Pan-India Courier Dispatch</span>
                </li>
              </ul>

              <div className="mt-4">
                <button
                  onClick={scrollToTop}
                  className="px-4 py-1.5 rounded-full bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#F9F6F0] hover:translate-x-0.5 hover:translate-y-0.5 transition-all border border-theme-dark cursor-pointer"
                >
                  ↑ Top
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-theme-cream/20 py-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-theme-cream/70 font-black uppercase tracking-widest gap-2">
          <span>silentStrokes • Handcrafted for mindful spaces</span>
          <span>© {new Date().getFullYear()} All rights reserved</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

