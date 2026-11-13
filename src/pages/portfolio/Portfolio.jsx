import { useState, useRef, useEffect, useCallback } from "react";

import { Squiggle } from "../../components/decorative/BotanicalMotifs";

const artworks = [
  { id: 1, img: "/artworks/comission2.png", title: "Two Souls", medium: "Acrylic on Canvas" }, 
  { id: 2, img: "/artworks/field.png", title: "Sunlit Meadow", medium: "Oil Impression" },  
  { id: 3, img: "/artworks/cow.png", title: "Gentle Pastoral", medium: "Original Study" }, 
  { id: 4, img: "/artworks/comission1.png", title: "Beloved Companions", medium: "Commissioned Portrait" },
  { id: 5, img: "/artworks/scenery.png", title: "Whispering Waters", medium: "Landscape Study" },
  { id: 6, img: "/artworks/sadgirl.png", title: "Melancholy Hues", medium: "Expressive Portrait" },
  { id: 7, img: "/artworks/dog.png", title: "Faithful Gaze", medium: "Pet Portrait" },
  { id: 8, img: "/artworks/dentist.png", title: "Atelier Concept", medium: "Creative Study" },
  { id: 9, img: "/artworks/skull.png", title: "Anatomy of Light", medium: "Still Life" },
  { id: 10, img: "/artworks/artbookpage.png", title: "Journal Musings", medium: "Sketchbook Archive" },
  { id: 11, img: "/artworks/camel.png", title: "Golden Dunes", medium: "Warm Impression" },
  { id: 12, img: "/artworks/comission3.png", title: "Classic Portraiture", medium: "Acrylic on A5" },
  { id: 13, img: "/artworks/artpage3.png", title: "Botanical Sketches", medium: "Ink & Wash" },
  { id: 14, img: "/artworks/girlwithsheep.png", title: "Hills of Kinnaur", medium: "Folk Impression" },
  { id: 15, img: "/artworks/artpage2.png", title: "Raw Gestures", medium: "Sketch Study" },
  { id: 16, img: "/artworks/forest.png", title: "Pines of Himachal", medium: "Palette Knife Oil" },
];

const Portfolio = () => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [panAngle, setPanAngle] = useState(0); 
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  const roomRef = useRef(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  
  const artClickStartX = useRef(0);
  const artClickStartY = useRef(0);

  const isFocused = focusedIndex !== null;
  
  const radius = 3400; 
  const angleSpacing = 15; 
  const rowOffsetPx = 530; 

  const getArtAngle = useCallback((index) => {
    const isTopRow = index % 2 === 0;
    const rowIndex = Math.floor(index / 2); 
    const rowOffset = isTopRow ? 0 : (angleSpacing / 2);
    const totalItemsInRow = Math.ceil(artworks.length / 2);
    const centerOffset = (totalItemsInRow * angleSpacing) / 2;
    return (rowIndex * angleSpacing) + rowOffset - centerOffset;
  }, []);

  const handleNext = useCallback(() => {
    if (focusedIndex === null) return;
    let newIndex = focusedIndex - 1;
    if (newIndex < 0) newIndex = artworks.length - 1;
    const newAngle = getArtAngle(newIndex);
    setFocusedIndex(newIndex);
    setPanAngle(-newAngle);
  }, [focusedIndex, getArtAngle]);

  const handlePrev = useCallback(() => {
    if (focusedIndex === null) return;
    let newIndex = focusedIndex + 1;
    if (newIndex >= artworks.length) newIndex = 0;
    const newAngle = getArtAngle(newIndex);
    setFocusedIndex(newIndex);
    setPanAngle(-newAngle);
  }, [focusedIndex, getArtAngle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFocused) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setFocusedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, handleNext, handlePrev]);

  const handlePointerDown = (e) => {
    if (isFocused) return;
    isDragging.current = true;
    lastX.current = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    if (roomRef.current) roomRef.current.style.transition = "none";
  };

  const handlePointerMove = (e) => {
    const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

    setMouse({
      x: (clientX / window.innerWidth - 0.5) * 2,
      y: (clientY / window.innerHeight - 0.5) * 2
    });

    if (isDragging.current && !isFocused) {
      const deltaX = clientX - lastX.current;
      setPanAngle(prev => prev + deltaX * 0.12);
      lastX.current = clientX; 
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (roomRef.current) roomRef.current.style.transition = "transform 1.2s cubic-bezier(0.25, 1, 0.2, 1)";
  };

  const handleWheel = (e) => {
    if (isFocused) return;
    setPanAngle(prev => prev - e.deltaY * 0.05 - e.deltaX * 0.05);
  };

  let targetRotY = panAngle + (mouse.x * 3); 
  let targetRotX = mouse.y * 3;
  
  let targetZ = 1200; 
  let targetY = 0; 

  if (isFocused) {
    const isTopRow = focusedIndex % 2 === 0;
    targetRotY = panAngle; 
    targetRotX = 0;        
    targetZ = 2700; 
    targetY = isTopRow ? rowOffsetPx : -rowOffsetPx; 
  }

  return (
    <div className="w-full min-h-screen bg-theme-cream text-theme-dark font-sans selection:bg-theme-olive selection:text-theme-dark pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-6 mb-4 sm:mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5">
              <span className="px-3 py-0.5 bg-theme-orange text-theme-dark text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
                INTERACTIVE 3D EXHIBITION
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-dark uppercase tracking-tight">
              STUDIO ARCHIVES & COLLECTION
            </h1>
            <div className="pt-0.5">
              <Squiggle className="w-16 h-2" color="#2D2D2D" />
            </div>
          </div>

          <div className="text-right text-theme-dark text-[10px] tracking-wider font-black max-w-[240px] leading-relaxed hidden sm:block bg-[#FAF7F2] p-3 rounded-2xl border-2 border-theme-dark shadow-solid">
            DRAG TO ROTATE THROUGH GALLERY. <br />
            <span className="underline">CLICK TO INSPECT.</span>
          </div>
        </div>
      </div>

      <div 
        className="relative w-full h-[84vh] min-h-[700px] overflow-hidden box-border bg-[#ECE8DF] border-y-[3px] border-theme-dark cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        style={{ 
          touchAction: "none",
          clipPath: "inset(0)", 
          contain: "paint layout"
        }} 
      >
        <div 
          className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-15"
          style={{ 
            backgroundImage: `linear-gradient(to right, #2D2D2D 1px, transparent 1px), linear-gradient(to bottom, #2D2D2D 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setFocusedIndex(null);
          }}
          className={`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 px-6 py-2.5 bg-theme-dark text-theme-cream rounded-full tracking-wider text-xs font-black uppercase shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all pointer-events-auto border-2 border-theme-dark cursor-pointer ${
            isFocused ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          ← Step Back to Exhibition
        </button>

        <div className="w-full h-full pointer-events-none" style={{ perspective: "1100px" }}>
          <div 
            ref={roomRef}
            className="relative w-full h-full will-change-transform pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate3d(0px, ${targetY}px, ${targetZ}px) rotateX(${targetRotX}deg) rotateY(${targetRotY}deg)`,
              transition: "transform 1.2s cubic-bezier(0.25, 1, 0.2, 1)" 
            }}
          >
            {artworks.map((art, i) => {
              const angle = getArtAngle(i);
              const isTopRow = i % 2 === 0;
              const randomTilt = ((i % 4) - 1.5); 
              
              return (
                <div 
                  key={art.id}
                  className={`absolute top-1/2 left-1/2 group pointer-events-none transition-opacity duration-1000 ${isFocused && focusedIndex !== i ? "opacity-20" : "opacity-100"}`}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${-radius}px) translateY(${isTopRow ? -rowOffsetPx : rowOffsetPx}px) rotateZ(${randomTilt}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div 
                    className={`relative bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border-[3px] border-theme-dark shadow-solid transition-transform duration-500 pointer-events-auto cursor-pointer ${!isFocused && "hover:-translate-y-3 hover:scale-[1.03]"}`}
                    
                    onPointerDown={(e) => {
                      e.stopPropagation(); 
                      artClickStartX.current = e.clientX || (e.touches ? e.touches[0].clientX : 0);
                      artClickStartY.current = e.clientY || (e.touches ? e.touches[0].clientY : 0);
                    }}
                    
                    onPointerUp={(e) => {
                      e.stopPropagation();
                      const clientX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
                      const clientY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);
                      
                      const movedX = Math.abs(clientX - artClickStartX.current);
                      const movedY = Math.abs(clientY - artClickStartY.current);
                      if (movedX > 5 || movedY > 5) return; 
                      
                      setFocusedIndex(i);
                      setPanAngle(-angle);
                    }}
                  >
                    <div className="overflow-hidden bg-[#ECE8DF] border-2 border-theme-dark/40 p-2 shadow-inner flex items-center justify-center">
                      <img 
                        src={art.img} 
                        alt="Artwork" 
                        className="w-auto h-[380px] sm:h-[480px] md:h-[580px] lg:h-[680px] max-w-[85vw] pointer-events-none object-contain block rounded-none filter contrast-[1.02]"
                        draggable="false" 
                      />
                    </div>

                    {isFocused && focusedIndex === i && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                          className="absolute -left-4 sm:-left-6 md:-left-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-2.5 bg-[#FAF7F2] text-theme-dark rounded-full shadow-solid hover:bg-theme-orange transition-all border-2 border-theme-dark cursor-pointer pointer-events-auto flex items-center justify-center hover:scale-110 active:scale-95"
                          aria-label="Previous Artwork"
                          title="Previous (←)"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          className="absolute -right-4 sm:-right-6 md:-right-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-2.5 bg-[#FAF7F2] text-theme-dark rounded-full shadow-solid hover:bg-theme-orange transition-all border-2 border-theme-dark cursor-pointer pointer-events-auto flex items-center justify-center hover:scale-110 active:scale-95"
                          aria-label="Next Artwork"
                          title="Next (→)"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;