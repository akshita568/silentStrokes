import { useState, useRef } from "react";

import Container from "../../components/container/Container";
import { Daisy, Squiggle } from "../../components/decorative/BotanicalMotifs";

const StudioProcess = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    if (e.buttons !== 1 && e.pointerType === "mouse") return;

    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((e.clientX - rect.left) / rect.width) * 100;
    
    pos = Math.max(0, Math.min(100, pos));
    setSliderPos(pos);
  };

  return (
    <section className="relative py-8 md:py-9 px-6 sm:px-8 md:px-10 bg-theme-cream text-theme-dark rounded-3xl border-[3px] border-theme-dark shadow-solid">
      <div className="absolute -top-6 -right-5 pointer-events-none -z-10 opacity-80 hidden sm:block">
        <Daisy className="w-16 h-16 md:w-20 md:h-20" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#2D2D2D" />
      </div>

      <Container>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 w-full space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
                BEHIND THE CANVAS • PROCESS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-theme-dark leading-tight uppercase tracking-tight">
              THE CREATIVE <span className="text-theme-dark">PROCESS</span>
            </h2>

            <div className="my-1.5">
              <Squiggle className="w-16 h-2.5" color="#2D2D2D" />
            </div>

            <p className="text-xs sm:text-sm text-theme-dark/90 leading-relaxed font-medium max-w-lg">
              Every commission begins as raw pencil gestures and compositional blocking. Drag the slider below to peel back the varnish and see how preliminary sketch lines transform into a finished oil & acrylic artwork.
            </p>

            <div className="inline-flex items-center gap-2 bg-theme-olive/20 px-3.5 py-1.5 rounded-full border-2 border-theme-dark text-xs font-black text-theme-dark uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-theme-orange border border-theme-dark animate-pulse" />
              <span>Drag slider left / right to inspect layers</span>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-md p-6 sm:p-7 bg-[#FAF7F2] rounded-3xl border-[3px] border-theme-dark shadow-solid">
              <div 
                ref={containerRef}
                onPointerMove={handlePointerMove}
                onPointerDown={handlePointerMove}
                className="relative w-full aspect-[4/5] sm:aspect-square touch-none select-none overflow-hidden rounded-none border-2 border-theme-dark shadow-inner cursor-ew-resize bg-[#E2D9CC]"
              >
                <img 
                  src="/artworks/unfinished.jpeg" 
                  alt="The Sketch" 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                />

                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                  <img 
                    src="/artworks/sadgirl.png" 
                    alt="The Final Piece" 
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    draggable="false"
                  />
                </div>

                <div 
                  className="absolute top-0 bottom-0 w-[3px] bg-theme-dark shadow-[0_0_8px_rgba(0,0,0,0.5)] z-10"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-theme-orange rounded-full shadow-[2px_2px_0px_#2D2D2D] flex items-center justify-center border-2 border-theme-dark hover:scale-110 active:scale-95 transition-transform">
                    <div className="flex gap-1">
                      <div className="w-[2px] h-3 bg-theme-dark rounded-full" />
                      <div className="w-[2px] h-3 bg-theme-dark rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-theme-dark text-theme-cream text-[9px] uppercase font-black tracking-widest rounded-full border border-theme-dark pointer-events-none">
                  Final Oil
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-theme-dark text-theme-cream text-[9px] uppercase font-black tracking-widest rounded-full border border-theme-dark pointer-events-none">
                  Raw Sketch
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StudioProcess;

