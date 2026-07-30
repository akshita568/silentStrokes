import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const containerRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [highestZ, setHighestZ] = useState(20);

  // Adjusted curve math to keep everything safely within the container view bounds
  const getWireY = (x, wireIndex) => {
    const t = x / 100;
    if (wireIndex === 0) {
      return Math.pow(1 - t, 2) * 15 + 2 * (1 - t) * t * 55 + Math.pow(t, 2) * 20;
    } else {
      return Math.pow(1 - t, 2) * 35 + 2 * (1 - t) * t * 70 + Math.pow(t, 2) * 40;
    }
  };

  const [frames, setFrames] = useState([
    { id: 1, img: "https://images.unsplash.com/photo-1579783902614-a3f140020184?q=80&w=1000&auto=format&fit=crop", x: 15, y: getWireY(15, 0), rot: -4, z: 10, isInspecting: false },
    { id: 2, img: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=1000&auto=format&fit=crop", x: 32, y: getWireY(32, 1), rot: 2, z: 11, isInspecting: false },
    { id: 3, img: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?q=80&w=1000&auto=format&fit=crop", x: 50, y: getWireY(50, 0), rot: -2, z: 12, isInspecting: false },
    { id: 4, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop", x: 68, y: getWireY(68, 1), rot: 3, z: 13, isInspecting: false },
    { id: 5, img: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?q=80&w=1000&auto=format&fit=crop", x: 85, y: getWireY(85, 0), rot: -3, z: 14, isInspecting: false },
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
      className="relative min-h-[90vh] bg-base-white flex items-center overflow-hidden border-b border-sand touch-none"
    >
      {/* 1. THE DROOPY ASYMMETRIC WIRES */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        preserveAspectRatio="none" 
        viewBox="0 0 100 100"
      >
        {/* Top Wire */}
        <path d="M 0 15 Q 50 55 100 20" fill="transparent" stroke="#D1CBC1" strokeWidth="0.15" />
        {/* Bottom Wire (Safely contained inside bounds) */}
        <path d="M 0 35 Q 65 70 100 40" fill="transparent" stroke="#D1CBC1" strokeWidth="0.15" />
      </svg>

      {/* 2. TEXT CONTENT */}
      <div className="absolute left-6 md:left-16 top-24 md:top-32 z-50 pointer-events-none">
        <div className="space-y-4 max-w-md pointer-events-auto bg-base-white/80 backdrop-blur-md p-8 border border-sand/30 shadow-2xl rounded-sm">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-olive">
            The Studio Wall
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-text-main leading-tight">
            Curate <span className="italic font-light text-dove">Your Space</span>
          </h1>
          <p className="text-dove text-sm leading-relaxed font-sans">
            Unclip, drag, and arrange the canvases. Drop them near the wires to hang them back up, or double-click to inspect the textures closely.
          </p>
          <div className="pt-2">
            <Link 
              to="/portfolio" 
              className="inline-block px-6 py-3 bg-text-main text-base-white text-[10px] font-bold uppercase tracking-widest hover:bg-olive transition-colors duration-300 rounded-sm shadow-sm"
            >
              Enter Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* 3. DRAGGABLE HANGING PAINTINGS */}
      {frames.map((frame) => {
        const isHung = Math.abs(frame.y - getWireY(frame.x, 0)) < 1 || Math.abs(frame.y - getWireY(frame.x, 1)) < 1; 

        return (
          <div
            key={frame.id}
            onPointerDown={(e) => handlePointerDown(e, frame.id)}
            onDoubleClick={() => handleDoubleClick(frame.id)}
            className={`absolute cursor-grab active:cursor-grabbing transition-transform ease-out shadow-lg bg-base-white ${
              frame.isInspecting 
                ? "duration-500 shadow-2xl p-4 border border-sand" 
                : "duration-0 hover:shadow-xl p-2 border border-sand/50"
            }`}
            style={{
              left: frame.isInspecting ? "50%" : `${frame.x}%`,
              top: frame.isInspecting ? "50%" : `${frame.y}%`,
              transform: frame.isInspecting 
                ? "translate(-50%, -50%) scale(1.6) rotate(0deg)" 
                : `rotate(${frame.rot}deg)`,
              transformOrigin: isHung ? "top center" : "center center",
              zIndex: frame.z,
              width: "clamp(120px, 12vw, 220px)",
              aspectRatio: "4/5",
            }}
          >
            {!frame.isInspecting && (
              <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 pointer-events-none z-10 drop-shadow-md">
                <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0 C8 0, 8 8, 12 8" stroke="#88847C" strokeWidth="1.5" fill="none" />
                  <path d="M4 8 H20 V18 C20 20, 18 22, 16 22 H8 C6 22, 4 20, 4 18 Z" fill="#222222" />
                  <rect x="6" y="22" width="12" height="4" rx="1" fill="#151515" />
                  <circle cx="12" cy="15" r="1.5" fill="#C1BCB0" />
                </svg>
              </div>
            )}

            <img 
              src={frame.img} 
              alt="Draggable Artwork" 
              className="w-full h-full object-cover pointer-events-none select-none filter grayscale-[10%]"
            />
          </div>
        );
      })}
    </section>
  );
};

export default HeroSlider;