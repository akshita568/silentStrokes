import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Daisy, Squiggle, FlavoStar } from "../../../components/decorative/BotanicalMotifs";
import ScallopDivider from "../../../components/decorative/ScallopDivider";

const HeroSlider = () => {
  const containerRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [highestZ, setHighestZ] = useState(20);

  const getWireY = (x, wireIndex) => {
    const t = x / 100;
    if (wireIndex === 0) {
      return Math.pow(1 - t, 2) * 8 + 2 * (1 - t) * t * 20 + Math.pow(t, 2) * 10;
    } else {
      return Math.pow(1 - t, 2) * 26 + 2 * (1 - t) * t * 42 + Math.pow(t, 2) * 28;
    }
  };

  const [frames, setFrames] = useState([
    { 
      id: 1, 
      img: "/artworks/comission3.png", 
      x: 32, y: getWireY(32, 0), rot: -3, z: 10, isInspecting: false 
    },
    { 
      id: 2, 
      img: "/artworks/skull.png", 
      x: 45, y: getWireY(45, 1), rot: 2, z: 11, isInspecting: false 
    },
    { 
      id: 3, 
      img: "/artworks/dog.png", 
      x: 58, y: getWireY(58, 0), rot: -2, z: 12, isInspecting: false 
    },
    { 
      id: 4, 
      img: "/artworks/river.png", 
      x: 71, y: getWireY(71, 1), rot: 3, z: 13, isInspecting: false 
    },
    { 
      id: 5, 
      img: "/artworks/forest.png", 
      x: 84, y: getWireY(84, 0), rot: -2, z: 14, isInspecting: false 
    },
  ]);

  const handlePointerDown = (e, id) => {
    e.preventDefault();
    setDraggingId(id);
    setHighestZ((prev) => prev + 1);
    
    setFrames((prev) => prev.map((f) => 
      f.id === id ? { ...f, z: highestZ + 1, isInspecting: false } : f
    ));
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current || !draggingId) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setFrames((prev) => prev.map((f) => 
      f.id === draggingId ? { ...f, x: mouseX - 6, y: mouseY - 8 } : f
    ));
  };

  const handlePointerUp = () => {
    if (draggingId) {
      setFrames((prev) => prev.map((f) => {
        if (f.id === draggingId) {
          const wire0Y = getWireY(f.x, 0);
          const wire1Y = getWireY(f.x, 1);
          
          const dist0 = Math.abs(f.y - wire0Y);
          const dist1 = Math.abs(f.y - wire1Y);

          if (dist0 < 15 && dist0 <= dist1) {
            return { ...f, y: wire0Y, rot: (Math.random() * 6 - 3) };
          } else if (dist1 < 15) {
            return { ...f, y: wire1Y, rot: (Math.random() * 6 - 3) };
          }
        }
        return f;
      }));
    }
    setDraggingId(null);
  };

  const handleDoubleClick = (id) => {
    setHighestZ((prev) => prev + 1);
    setFrames((prev) => prev.map((f) =>
      f.id === id
        ? { ...f, isInspecting: !f.isInspecting, z: highestZ + 1 }
        : { ...f, isInspecting: false }
    ));
  };

  return (
    <section 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative z-30 min-h-[64vh] sm:min-h-[68vh] md:min-h-[72vh] bg-theme-olive flex items-center touch-none select-none pb-12 sm:pb-14 md:pb-16 pr-4 sm:pr-8 md:pr-12 pt-6 sm:pt-8"
    >
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-15 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, #2D2D2D 1px, transparent 1px), linear-gradient(to bottom, #2D2D2D 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        preserveAspectRatio="none" 
        viewBox="0 0 100 100"
      >
        <path d="M 0 8.3 Q 40 20.3 100 10.3" fill="transparent" stroke="rgba(45,45,45,0.3)" strokeWidth="0.3" />
        <path d="M 0 26.3 Q 65 42.3 100 28.3" fill="transparent" stroke="rgba(45,45,45,0.3)" strokeWidth="0.3" />

        <path d="M 0 8 Q 40 20 100 10" fill="transparent" stroke="#2D2D2D" strokeWidth="0.35" strokeDasharray="1.5 0.5" />
        <path d="M 0 26 Q 65 42 100 28" fill="transparent" stroke="#2D2D2D" strokeWidth="0.35" strokeDasharray="1.5 0.5" />
      </svg>

      <div className="absolute left-4 sm:left-8 md:left-12 top-6 sm:top-8 md:top-10 z-[40] pointer-events-none max-w-xs sm:max-w-sm md:max-w-[340px]">
        <div className="relative bg-theme-cream text-theme-dark p-6 sm:p-7 md:p-8 rounded-3xl border-2 border-theme-dark shadow-solid">
          <div className="absolute -top-6 -right-6 pointer-events-none -z-10 opacity-90 hidden sm:block">
            <Daisy className="w-16 h-16" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#2D2D2D" />
          </div>
          <div className="absolute -bottom-6 -left-6 pointer-events-none -z-10 opacity-75 hidden md:block">
            <FlavoStar className="w-12 h-12" color="#F0A868" strokeColor="#2D2D2D" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border border-theme-dark shadow-sm">
              STUDIO WALL • ATELIER
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-dark leading-[0.95] uppercase tracking-tight">
            DISCOVER <br />
            <span className="text-theme-dark">NEW ARTWORKS</span>
          </h1>

          <div className="my-2">
            <Squiggle className="w-16 h-2" color="#2D2D2D" />
          </div>

          <p className="text-theme-dark/90 text-xs sm:text-sm font-medium leading-relaxed pr-1 mb-2">
            Original oil and acrylic pieces crafted for joyful, colorful spaces. Drag and arrange polaroids on the live wire, or double-click to inspect!
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link 
              to="/portfolio" 
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-2 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-soft hover:bg-theme-orange hover:text-theme-dark transition-all border-2 border-theme-dark"
            >
              <span>EXPLORE ALL ART</span>
              <span>→</span>
            </Link>

            <span className="text-[11px] text-theme-dark font-black uppercase tracking-wider">
              DRAG PRINTS ~
            </span>
          </div>
        </div>
      </div>

      {frames.map((frame) => {
        const isHung = Math.abs(frame.y - getWireY(frame.x, 0)) < 1 || Math.abs(frame.y - getWireY(frame.x, 1)) < 1; 

        return (
          <div
            key={frame.id}
            onPointerDown={(e) => handlePointerDown(e, frame.id)}
            onDoubleClick={() => handleDoubleClick(frame.id)}
            className={`absolute cursor-grab active:cursor-grabbing transition-transform ease-out bg-theme-cream rounded-2xl select-none border-2 border-theme-dark ${
              frame.isInspecting 
                ? "duration-500 shadow-solid p-4 z-[9999]" 
                : "duration-0 hover:shadow-solid p-2.5 sm:p-3 shadow-soft"
            }`}
            style={{
              left: frame.isInspecting ? "50%" : `${frame.x}%`,
              top: frame.isInspecting ? "50%" : `${frame.y}%`,
              transform: frame.isInspecting 
                ? "translate(-50%, -50%) scale(1.6) rotate(0deg)" 
                : `rotate(${frame.rot}deg)`,
              transformOrigin: isHung ? "top center" : "center center",
              zIndex: frame.isInspecting ? 9999 : frame.z,
              width: "clamp(140px, 12.5vw, 205px)",
            }}
          >
            {!frame.isInspecting && (
              <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 pointer-events-none z-20 drop-shadow-sm">
                <svg width="20" height="26" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0 C7 0, 7 8, 12 8" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M4 8 H20 V18 C20 20, 18 22, 16 22 H8 C6 22, 4 20, 4 18 Z" fill="#2D2D2D" />
                  <rect x="5.5" y="21.5" width="13" height="4" rx="1" fill="#7B8E61" />
                  <circle cx="12" cy="15" r="2.5" fill="#F0A868" />
                </svg>
              </div>
            )}

            <div className="w-full h-auto bg-[#FAF7F2] border border-theme-dark/40 shadow-inner flex items-center justify-center p-1">
              <img 
                src={frame.img} 
                alt="Draggable Artwork" 
                className="w-full h-auto object-contain pointer-events-none select-none rounded-none block"
              />
            </div>
          </div>
        );
      })}

      <div className="absolute -bottom-[19px] left-0 w-full z-40 pointer-events-none">
        <ScallopDivider position="bottom" color="#7B8E61" radius={20} />
      </div>
    </section>
  );
};

export default HeroSlider;

