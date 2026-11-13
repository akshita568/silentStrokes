import { useState, useRef, useEffect } from "react";

import { Squiggle } from "../../components/decorative/BotanicalMotifs";

const scatterItems = [
  { id: "p1", src: "/about/photos/photo1.png", initX: -320, initY: -120, rot: -12, tidyX: -360, tidyY: -170 },
  { id: "p2", src: "/about/photos/photo2.png", initX: -80, initY: -160, rot: 5, tidyX: -120, tidyY: -170 },
  { id: "p3", src: "/about/photos/photo3.png", initX: 180, initY: -140, rot: 15, tidyX: 120, tidyY: -170 },
  { id: "p4", src: "/about/photos/photo4.png", initX: 340, initY: -80, rot: -8, tidyX: 360, tidyY: -170 },
  { id: "p5", src: "/about/photos/photo5.png", initX: -290, initY: 150, rot: 20, tidyX: -360, tidyY: 170 },
  { id: "p6", src: "/about/photos/photo6.png", initX: -40, initY: 180, rot: -5, tidyX: -120, tidyY: 170 },
  { id: "p7", src: "/about/photos/photo7.png", initX: 220, initY: 160, rot: 8, tidyX: 120, tidyY: 170 },
  { id: "p8", src: "/about/photos/photo8.png", initX: 360, initY: 120, rot: -14, tidyX: 360, tidyY: 170 }
];

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
    if (cardRef.current) cardRef.current.style.transition = "transform 0.8s cubic-bezier(0.25, 1, 0.2, 1)";
    
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
      if (cardRef.current) cardRef.current.style.transition = "none";
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
      cardRef.current.style.transition = "none";
      cardRef.current.style.cursor = "grabbing";
      cardRef.current.style.boxShadow = "6px 6px 0px #2D2D2D";
      cardRef.current.style.scale = "1.04"; 
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
    }

    lastMouse.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;

    offset.current.x += dx;
    offset.current.y += dy;
    rot.current += dx * 0.05;

    updateStyle();
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (cardRef.current) {
      cardRef.current.style.cursor = "grab";
      cardRef.current.style.boxShadow = "4px 4px 0px #2D2D2D";
      cardRef.current.style.scale = "1";
    }

    const step = () => {
      velocity.current.x *= 0.92;
      velocity.current.y *= 0.92;

      offset.current.x += velocity.current.x;
      offset.current.y += velocity.current.y;
      rot.current += velocity.current.x * 0.04;

      updateStyle();

      if (Math.abs(velocity.current.x) > 0.1 || Math.abs(velocity.current.y) > 0.1) {
        raf.current = requestAnimationFrame(step);
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute top-1/2 left-1/2 p-2 pb-4 bg-[#FAF7F2] border-[3px] border-theme-dark shadow-solid rounded-xl touch-none cursor-grab"
      style={{ 
        zIndex, 
        width: "clamp(170px, 17vw, 240px)", 
        transformOrigin: "center center"
      }}
    >
      <img 
        src={item.src} 
        alt="Gallery Photo" 
        className="w-full h-auto pointer-events-none rounded-none filter contrast-[1.02]" 
        draggable="false"
      />
    </div>
  );
};

export default function About() {
  const [topIndex, setTopIndex] = useState(10);
  const [isTidy, setIsTidy] = useState(false);

  const handleSetTop = () => {
    setTopIndex((prev) => prev + 1);
    return topIndex + 1;
  };

  return (
    <div className="min-h-screen bg-theme-cream text-theme-dark font-sans selection:bg-theme-olive selection:text-theme-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-6 sm:pt-8 pb-12 relative z-10">
        <section className="flex flex-col-reverse md:flex-row items-center gap-8 lg:gap-12 mb-10">
          <div className="flex-1 space-y-3.5 text-sm md:text-base leading-relaxed text-theme-dark/90">
            <div className="inline-flex items-center gap-1.5">
              <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
                THE ARTIST • BIOGRAPHY
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-dark uppercase tracking-tight leading-none">
              ABOUT THE <br />
              <span>ARTIST &amp; MAKER</span>
            </h1>

            <div className="my-1.5">
              <Squiggle className="w-16 h-2" color="#2D2D2D" />
            </div>

            <p className="font-black text-lg text-theme-dark uppercase tracking-wide">
              Hi, I&apos;m Akshita.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              I&apos;m the person behind this website and every piece of art you&apos;ll find here. I&apos;m currently a third year Computer Science undergraduate at NIT Hamirpur, and this website is much more than just another project to me — it&apos;s something I&apos;ve dreamed of without even realizing it.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              I&apos;ve been creating art for as long as I can remember and never once, when I was younger, did I imagine I&apos;d someday build an entire website just to showcase my work, let alone sell it. It still feels surreal to think that people would actually want to own something I&apos;ve created with my own hands.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              Whether it&apos;s with code, paint, yarn, or a camera, I simply love creating things. Thank you for stopping by. I hope you enjoy exploring this little corner of my world as much as I enjoyed building it.
            </p>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="relative w-full max-w-[340px] p-6 bg-[#FAF7F2] rounded-3xl border-[3px] border-theme-dark shadow-solid">
              <div className="w-full h-auto rounded-none overflow-hidden border-2 border-theme-dark bg-theme-cream p-1.5 shadow-inner">
                <img 
                  src="/about/me.jpeg" 
                  alt="Akshita" 
                  className="w-full h-auto object-contain block rounded-none" 
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark">
                  Akshita Sharma • Himachal Pradesh
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark block mb-0.5">
                VISUAL JOURNAL • ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-theme-dark uppercase tracking-tight">PHOTOGRAPHY DESK</h2>
              <p className="text-theme-dark/80 font-medium text-xs sm:text-sm">
                {isTidy ? "Organized album grid. Drag photos to scatter them." : "Scattered moments from the hills. Grab, toss, and explore."}
              </p>
            </div>
            
            <button
               onClick={() => setIsTidy(!isTidy)}
               className="px-5 py-2.5 rounded-full bg-theme-dark text-theme-cream font-black tracking-wider uppercase text-xs shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all whitespace-nowrap active:scale-95 cursor-pointer border-2 border-theme-dark"
            >
               {isTidy ? "Scatter Photos ~" : "Tidy Desk Grid"}
            </button>
          </div>

          <div 
            className="relative w-full h-[65vh] min-h-[550px] bg-[#E2D9CC] rounded-3xl overflow-hidden border-[3px] border-theme-dark shadow-solid" 
            style={{ touchAction: "none" }} 
          >
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none" 
              style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #2D2D2D 27px, #2D2D2D 28px)" }} 
            />

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

        <section className="text-center py-6 border-t-2 border-theme-dark/20">
          <h2 className="text-xl sm:text-2xl text-theme-dark font-black uppercase tracking-tight mb-1">&ldquo;I&apos;M STILL BECOMING.&rdquo;</h2>
          <p className="text-theme-dark/80 text-xs font-medium">
            Every line of code, brushstroke, and photograph adds a new page to the story.
          </p>
        </section>
      </div>
    </div>
  );
}

