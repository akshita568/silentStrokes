import { useState, useRef } from "react";
import Container from "../../components/container/Container";

const StudioProcess = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    // Only drag if the primary mouse button is pressed (or if on touch)
    if (e.buttons !== 1 && e.pointerType === "mouse") return;

    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((e.clientX - rect.left) / rect.width) * 100;
    
    // Clamp between 0 and 100
    pos = Math.max(0, Math.min(100, pos));
    setSliderPos(pos);
  };

  return (
    <section className="py-24 bg-base-white border-b border-sand">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="flex-1 w-full">
            <h2 className="text-xs font-bold uppercase tracking-widest text-olive mb-2">Behind the Canvas</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-text-main mb-6">
              The <span className="italic font-light text-dove">Process</span>
            </h3>
            <p className="text-sm text-dove leading-relaxed mb-6">
              Every final piece begins as a chaotic collection of lines and ideas. 
              Drag the slider to peel back the layers and see how a rough sketch transforms into a finished commission. Honestly, it still amazes me how those messy little lines eventually become something so beautiful.
            </p>
          </div>

          <div className="flex-1 w-full">
            {/* The Custom Interactive Slider */}
            <div 
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerMove}
              className="relative w-full touch-none select-none overflow-hidden border border-sand shadow-lg cursor-ew-resize bg-sand/10"
            >
              {/* NOTE: Use two images of the SAME dimensions here for the best effect */}
              
              {/* Bottom Image (The Sketch/Underpainting) */}
              <img 
                src="/artworks/unfinished.jpeg" 
                alt="The Sketch" 
                className="w-full h-auto object-contain select-none pointer-events-none filter grayscale-[30%]"
                draggable="false"
              />

              {/* Top Image (The Final Artwork) mapped to slider position */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              >
                <img 
                  src="/artworks/sadgirl.png" 
                  alt="The Final Piece" 
                  className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  draggable="false"
                />
              </div>

              {/* The Draggable Line */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-base-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10"
                style={{ left: `${sliderPos}%` }}
              >
                {/* The Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-base-white rounded-full shadow-md flex items-center justify-center border border-sand">
                  <div className="flex gap-1">
                    <div className="w-[2px] h-3 bg-olive/50 rounded-full"></div>
                    <div className="w-[2px] h-3 bg-olive/50 rounded-full"></div>
                  </div>
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