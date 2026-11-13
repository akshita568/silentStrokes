import { Link } from "react-router-dom";

import HeroSlider from "./heroSlider/HeroSlider"; 
import StudioProcess from "./StudioProcess"; 
import BespokeCommissions from "./BespokeCommissions"; 
import Container from "../../components/container/Container";
import { Daisy, Squiggle } from "../../components/decorative/BotanicalMotifs";

const studioFavorites = [
  {
    category: "Acrylic on A4 Canvas",
    price: "₹2,000",
    image: "/artworks/comission2.png",
    link: "/portfolio"
  },
  {
    category: "Oil on A4 Canvas",
    price: "₹2,500",
    image: "/artworks/field.png",
    link: "/portfolio"
  },
  {
    category: "Study on Canvas Cloth",
    price: "₹1,800",
    image: "/artworks/cow.png",
    link: "/portfolio"
  },
  {
    category: "Mix Media on Canvas",
    price: "₹2,500",
    image: "/artworks/forest.png",
    link: "/portfolio"
  }
];

const Home = () => {
  return (
    <div className="bg-theme-cream min-h-screen text-theme-dark overflow-x-hidden">
      <HeroSlider />

      <section className="relative z-10 py-8 md:py-10">
        <Container>
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-end mb-5 gap-3 px-2">
            <div className="absolute -top-7 -right-2 pointer-events-none -z-10 opacity-75 hidden sm:block">
              <Daisy className="w-14 h-14" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#2D2D2D" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-theme-orange border border-theme-dark" />
                <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark">
                  CURRENT COLLECTION • FRESH ON THE RACK
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-dark leading-none uppercase tracking-tight">
                FROM THE STUDIO
              </h2>
              <div className="mt-2">
                <Squiggle className="w-20 h-2.5" color="#2D2D2D" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-theme-dark/80 font-medium max-w-sm sm:text-right leading-relaxed">
              Original hand-painted studies made in my home atelier, varnished and ready to ship pan-India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {studioFavorites.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FAF7F2] rounded-3xl border-2 border-theme-dark p-5 shadow-solid flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <div>
                  <div className="relative w-full h-auto border-2 border-theme-dark/30 bg-[#ECE8DF] p-2 shadow-inner mb-3 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.category}
                      className="w-full h-auto object-contain block rounded-none filter contrast-[1.02] group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-theme-orange text-theme-dark font-black text-xs rounded-full border border-theme-dark shadow-sm">
                      {item.price}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t-2 border-theme-dark/15 flex items-center justify-between px-1">
                  <span className="text-[10px] font-black text-theme-dark/70 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Link
                    to={item.link}
                    className="px-4 py-1.5 bg-theme-dark text-theme-cream rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-theme-orange hover:text-theme-dark transition-all border border-theme-dark shadow-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-7">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#FAF7F2] border-2 border-theme-dark text-theme-dark hover:bg-theme-dark hover:text-theme-cream text-xs font-black uppercase tracking-widest shadow-soft transition-all"
            >
              <span>Explore All Archive Works</span>
              <span>→</span>
            </Link>
          </div>
        </Container>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5 my-6">
        <StudioProcess />
        <BespokeCommissions />

        <section className="relative py-8 md:py-10 px-6 sm:px-8 md:px-12 bg-theme-orange text-theme-dark rounded-3xl border-[3px] border-theme-dark shadow-solid text-center">
          <div className="absolute -top-6 right-8 pointer-events-none -z-10 opacity-80 hidden sm:block">
            <Daisy className="w-16 h-16" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#2D2D2D" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-theme-dark text-theme-cream px-3 py-0.5 rounded-full inline-block border border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
              LIMITED SLOTS EACH MONTH
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-theme-dark leading-tight uppercase tracking-tight">
              Color Makes Every Room <br />
              <span>Feel Alive & Calm</span>
            </h2>
            <p className="text-xs text-theme-dark/90 font-medium leading-relaxed">
              Original acrylic and oil paintings crafted to bring warmth, texture, and quiet grounding into your home sanctuary.
            </p>
            <div className="pt-1.5 flex flex-wrap justify-center items-center gap-3">
              <Link
                to="/shop"
                className="px-5 py-2.5 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-olive hover:text-theme-dark transition-all border-2 border-theme-dark"
              >
                Browse Shop Tiers
              </Link>
              <Link
                to="/booking"
                className="px-5 py-2.5 bg-theme-cream text-theme-dark text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-dark hover:text-theme-cream transition-all border-[3px] border-theme-dark"
              >
                Book Custom Slot
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

