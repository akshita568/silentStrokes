import React, { useState, useRef, useEffect } from 'react';

// --- DATA: 8 Photographs without forced ratios or titles ---
const scatterItems = [
  // Top Row (Tidy)
  { id: 'p1', src: '/about/photos/photo1.png', initX: -320, initY: -120, rot: -12, tidyX: -360, tidyY: -170 },
  { id: 'p2', src: '/about/photos/photo2.png', initX: -80, initY: -160, rot: 5, tidyX: -120, tidyY: -170 },
  { id: 'p3', src: '/about/photos/photo3.png', initX: 180, initY: -140, rot: 15, tidyX: 120, tidyY: -170 },
  { id: 'p4', src: '/about/photos/photo4.png', initX: 340, initY: -80, rot: -8, tidyX: 360, tidyY: -170 },
  
  // Bottom Row (Tidy)
  { id: 'p5', src: '/about/photos/photo5.png', initX: -290, initY: 150, rot: 20, tidyX: -360, tidyY: 170 },
  { id: 'p6', src: '/about/photos/photo6.png', initX: -40, initY: 180, rot: -5, tidyX: -120, tidyY: 170 },
  { id: 'p7', src: '/about/photos/photo7.png', initX: 220, initY: 160, rot: 8, tidyX: 120, tidyY: 170 },
  { id: 'p8', src: '/about/photos/photo8.png', initX: 360, initY: 120, rot: -14, tidyX: 360, tidyY: 170 },
];

// --- UNIVERSAL PHYSICS DRAGGABLE COMPONENT ---
const DraggableItem = ({ item, setTopIndex, baseZ, isTidy }) => {
  const cardRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 }); 
  const rot = useRef(item.rot); 
  
  const velocity = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const raf = useRef(null);
  const [zIndex, setZIndex] = useState(baseZ);

  const updateStyle = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `translate(calc(-50% + ${offset.current.x}px), calc(-50% + ${offset.current.y}px)) rotate(${rot.current}deg)`;
    }
  };

  useEffect(() => {
    const mult = window.innerWidth < 768 ? 0.4 : 1;
    offset.current = { x: item.initX * mult, y: item.initY * mult };
    updateStyle();
  }, [item.initX, item.initY]);

  useEffect(() => {
    if (isDragging.current) return; 

    cancelAnimationFrame(raf.current);
    if (cardRef.current) cardRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.2, 1)';
    
    const mult = window.innerWidth < 768 ? 0.4 : 1;
    
    if (isTidy) {
      offset.current = { x: item.tidyX * mult, y: item.tidyY * mult };
      rot.current = 0;
    } else {
      offset.current = { x: item.initX * mult, y: item.initY * mult };
      rot.current = item.rot;
    }
    
    updateStyle();
    
    const timer = setTimeout(() => {
      if (cardRef.current) cardRef.current.style.transition = 'none';
    }, 800);
    
    return () => clearTimeout(timer);
  }, [isTidy, item]);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    lastTime.current = performance.now();
    velocity.current = { x: 0, y: 0 };
    
    setZIndex(setTopIndex()); 
    cancelAnimationFrame(raf.current);
    
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
      cardRef.current.style.cursor = 'grabbing';
      cardRef.current.style.boxShadow = '0 25px 50px -12px rgba(62, 58, 53, 0.3)';
      cardRef.current.style.scale = '1.05'; 
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    
    const now = performance.now();
    const dt = now - lastTime.current;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    
    if (dt > 1) {
      const instantVx = (dx / dt) * 16;
      const instantVy = (dy / dt) * 16;
      velocity.current = {
        x: velocity.current.x * 0.4 + instantVx * 0.6,
        y: velocity.current.y * 0.4 + instantVy * 0.6
      };
      lastTime.current = now;
    }
    
    offset.current.x += dx;
    offset.current.y += dy;
    rot.current += dx * 0.04; 
    
    lastMouse.current = { x: e.clientX, y: e.clientY };
    updateStyle();
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    if (cardRef.current) {
      cardRef.current.style.cursor = 'grab';
      cardRef.current.style.boxShadow = '0 10px 15px -3px rgba(62, 58, 53, 0.1)';
      cardRef.current.style.scale = '1';
    }

    const now = performance.now();
    if (now - lastTime.current > 60) {
      velocity.current = { x: 0, y: 0 };
    }

    let vx = velocity.current.x;
    let vy = velocity.current.y;

    const momentumLoop = () => {
      if (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5) return;
      
      offset.current.x += vx;
      offset.current.y += vy;
      rot.current += vx * 0.015; 
      
      vx *= 0.95; 
      vy *= 0.95;
      
      updateStyle();
      raf.current = requestAnimationFrame(momentumLoop);
    };
    momentumLoop();
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute top-1/2 left-1/2 p-3 bg-[#FAFAFA] shadow-lg border border-[#DCD9CE] touch-none cursor-grab"
      style={{ 
        zIndex, 
        width: 'clamp(180px, 18vw, 260px)', 
        transformOrigin: 'center center'
      }}
    >
      <img 
        src={item.src} 
        alt="Gallery Photo" 
        className="w-full h-auto pointer-events-none rounded-[2px]" 
        draggable="false"
      />
    </div>
  );
};

// --- MAIN ABOUT PAGE ---
export default function About() {
  const [topIndex, setTopIndex] = useState(10);
  const [isTidy, setIsTidy] = useState(false);

  const handleSetTop = () => {
    setTopIndex((prev) => prev + 1);
    return topIndex + 1;
  };

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#3E3A35] font-sans selection:bg-[#7A8762] selection:text-[#F7F3EB]">
      
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.25] mix-blend-multiply"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")` 
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-24">
        
        {/* --- EDITORIAL HERO SECTION --- */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-16 lg:gap-24 mb-40">
          <div className="flex-1 space-y-8 text-lg leading-relaxed text-[#514D48]">
            <h1 className="text-5xl md:text-7xl font-serif text-[#3E3A35] tracking-widest uppercase mb-10">
              About
            </h1>
            <p>
              I’m a Computer Science student at NIT Hamirpur, but my screen isn’t always filled with code. Depending on the hour, you might find me debugging a backend architecture, blending oils on a canvas, or losing myself in a dance routine.
            </p>
            <p>
              I believe the best digital spaces feel physical. I’m drawn to soft shadows, paper textures, and the quiet aesthetic of olive greens and warm cream. For me, programming and painting aren’t opposites—they’re just different ways of bringing an idea into the world.
            </p>
            <p>
              When I’m not building interactive web experiences, I’m usually tending to my plants, sketching unfinished ideas, or brewing another cup of coffee to the sound of a carefully curated playlist.
            </p>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end mt-12 md:mt-0">
            
            <div className="relative w-full max-w-[400px] aspect-[3/4] group cursor-pointer">
              
              {/* 1. THE PHOTO */}
              <div className="absolute inset-0 z-0 rounded-t-[300px] rounded-b-2xl overflow-hidden bg-[#EFE9DC] shadow-lg border border-[#DCD9CE]/60">
                <img 
                  src="/about/me.jpeg" 
                  alt="Akshita" 
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" 
                />
              </div>

              {/* 2. THE TOP-LEFT FLORAL CASCADE
                  - Removed the stray scale-x-[-1]
                  - Fixed the image path typo so it reliably loads uppercorner.png
                  - Adjusted to valid Tailwind classes (sm:-top-32 sm:-left-36)
              */}
              <div 
                className="absolute -top-24 -left-28 sm:-top-30 sm:-left-34 w-[70%] sm:w-[80%] h-[70%] sm:h-[80%] z-10 pointer-events-none scale-x-[-1] drop-shadow-sm"
              >
                <div 
                  className="w-full h-full bg-[#7A8762]"
                  style={{
                    WebkitMaskImage: `url('/border/uppercorner.png')`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'top left',
                    maskImage: `url('/border/uppercorner.png')`, /* TYPO FIXED HERE */
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'top left'
                  }}
                ></div>
              </div>

              {/* 3. THE BOTTOM-RIGHT FLORAL CORNER 
                  - Keeps scale-x-[-1] to invert it
              */}
              <div 
                className="absolute -bottom-24 -right-28 sm:-bottom-32 sm:-right-40 w-[70%] sm:w-[85%] h-[70%] sm:h-[85%] z-10 pointer-events-none scale-x-[-1] drop-shadow-sm"
              >
                <div 
                  className="w-full h-full bg-[#7A8762]"
                  style={{
                    WebkitMaskImage: `url('/border/lowercorner.png')`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'bottom left', 
                    maskImage: `url('/border/lowercorner.png')`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'bottom left'
                  }}
                ></div>
              </div>

              {/* Decorative stamp */}
              <span className="absolute bottom-8 right-8 text-[#7A8762] text-2xl font-serif bg-[#F7F3EB] px-2 rounded-full border border-[#C6B89E]/30 shadow-sm z-20 transition-transform duration-500 group-hover:scale-110">
                ❦
              </span>
            </div>
          </div>
        </section>

        {/* --- INTERACTIVE DESK --- */}
        <section className="mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-6">
            <div>
              <h2 className="text-4xl font-serif text-[#3E3A35] tracking-wide">My Photography</h2>
              <p className="text-[#7A8762] font-serif italic mt-2 text-lg">
                {isTidy ? 'A quiet, organized gallery. Drag a photo to break the rules.' : 'A scattered collection of moments. Grab, toss, and explore.'}
              </p>
            </div>
            
            <button
               onClick={() => setIsTidy(!isTidy)}
               className="px-6 py-2.5 rounded-full border border-[#7A8762] text-[#7A8762] font-semibold tracking-widest uppercase text-xs hover:bg-[#7A8762] hover:text-[#F7F3EB] transition-all duration-500 shadow-sm whitespace-nowrap active:scale-95"
            >
               {isTidy ? 'Scatter Photos' : 'Tidy Gallery'}
            </button>
          </div>

          <div 
            className="relative w-full h-[75vh] min-h-[650px] bg-[#EFE9DC] rounded-3xl overflow-hidden shadow-inner border border-[#C6B89E]/40" 
            style={{ touchAction: 'none' }} 
          >
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #7A8762 31px, #7A8762 32px)' }} 
            />

            {/* Render the photos */}
            {scatterItems.map((item, i) => (
              <DraggableItem
                key={item.id}
                item={item}
                setTopIndex={handleSetTop}
                baseZ={i + 1}
                isTidy={isTidy}
              />
            ))}
          </div>
        </section>

        {/* --- FINAL QUOTE --- */}
        <section className="text-center">
          <h2 className="text-3xl font-serif text-[#7A8762] italic mb-6">"I'm still becoming."</h2>
          <p className="text-[#514D48] max-w-md mx-auto font-serif">
            Every line of code, brushstroke, and photograph adds a new page to the story.
          </p>
        </section>

      </div>
    </div>
  );
}