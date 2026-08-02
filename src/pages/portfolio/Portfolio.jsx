import React, { useState, useRef } from 'react';

const artworks = [
  { id: 1, img: "/artworks/comission2.png" }, 
  { id: 2, img: "/artworks/field.png" },  
  { id: 3, img: "/artworks/cow.png" }, 
  { id: 4, img: "/artworks/comission1.png" },
  { id: 5, img: "/artworks/scenery.png" },
  { id: 6, img: "/artworks/sadgirl.png" },
  { id: 7, img: "/artworks/dog.png" },
  { id: 8, img: "/artworks/dentist.png" },
  { id: 9, img: "/artworks/skull.png" },
  { id: 10, img: "/artworks/artbookpage.png" },
  { id: 11, img: "/artworks/camel.png" },
  { id: 12, img: "/artworks/comission3.png" },
  { id: 13, img: "/artworks/artpage3.png"},
  { id: 14, img: "/artworks/girlwithsheep.png" },
  { id: 15, img: "/artworks/artpage2.png" },
  { id: 15, img: "/artworks/forest.png" },

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
  
  // Room dimensions calculated to handle forced massive scaling
  const radius = 3200; 
  const angleSpacing = 15; 
  const rowOffsetPx = 450; 

  const getArtAngle = (index) => {
    const isTopRow = index % 2 === 0;
    const rowIndex = Math.floor(index / 2); 
    const rowOffset = isTopRow ? 0 : (angleSpacing / 2);
    const totalItemsInRow = Math.ceil(artworks.length / 2);
    const centerOffset = (totalItemsInRow * angleSpacing) / 2;
    return (rowIndex * angleSpacing) + rowOffset - centerOffset;
  };

  const handlePointerDown = (e) => {
    if (isFocused) return;
    isDragging.current = true;
    lastX.current = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    if (roomRef.current) roomRef.current.style.transition = 'none';
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
    if (roomRef.current) roomRef.current.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.2, 1)';
  };

  const handleWheel = (e) => {
    if (isFocused) return;
    setPanAngle(prev => prev - e.deltaY * 0.05 - e.deltaX * 0.05);
  };

  let targetRotY = panAngle + (mouse.x * 3); 
  let targetRotX = mouse.y * 3;
  
  // Pushing the camera physically closer to the walls by default
  let targetZ = 1200; 
  let targetY = 0; 

  if (isFocused) {
    const isTopRow = focusedIndex % 2 === 0;
    targetRotY = panAngle; 
    targetRotX = 0;        
    
    // Zoom drops you right in front of the massive canvas
    targetZ = 2600; 
    targetY = isTopRow ? rowOffsetPx : -rowOffsetPx; 
  }

  return (
    <div 
      className="relative w-full h-[85vh] min-h-[700px] overflow-hidden box-border bg-[#F5F3EB] text-[#2B3024] font-sans selection:bg-[#7A8B5F] cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{ 
        touchAction: 'none',
        clipPath: 'inset(0)', 
        contain: 'paint layout'
      }} 
    >
      
      {/* Texture Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 w-full h-full z-50 opacity-[0.35] mix-blend-multiply"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")` 
        }}
      />

      <div className={`absolute top-0 left-0 w-full p-8 z-40 flex justify-between items-start transition-opacity duration-700 pointer-events-none ${isFocused ? 'opacity-0' : 'opacity-100'}`}>
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#2B3024]">My Collection</h1>
          <p className="text-[#7A8B5F] font-medium tracking-widest uppercase text-sm mt-1">Interactive Exhibition</p>
        </div>
        <div className="text-right text-[#B4B4A8] text-xs md:text-sm tracking-widest max-w-[200px] leading-relaxed hidden sm:block">
          DRAG BACKGROUND TO PAN. <br/>CLICK ARTWORK TO VIEW.
        </div>
      </div>

      <button
        onClick={(e) => {
            e.stopPropagation();
            setFocusedIndex(null);
        }}
        className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-40 px-10 py-4 bg-[#2B3024] text-[#F5F3EB] rounded-full tracking-widest text-sm uppercase shadow-2xl transition-all duration-700 hover:bg-[#7A8B5F] hover:scale-105 pointer-events-auto ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        Step Back
      </button>

      <div className="w-full h-full pointer-events-none" style={{ perspective: '1100px' }}>
        <div 
          ref={roomRef}
          className="relative w-full h-full will-change-transform pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(0px, ${targetY}px, ${targetZ}px) rotateX(${targetRotX}deg) rotateY(${targetRotY}deg)`,
            transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.2, 1)' 
          }}
        >
          {artworks.map((art, i) => {
            const angle = getArtAngle(i);
            const isTopRow = i % 2 === 0;
            const randomTilt = ((i % 4) - 1.5); 
            
            return (
              <div 
                key={art.id}
                className={`absolute top-1/2 left-1/2 group pointer-events-none transition-opacity duration-1000 ${isFocused && focusedIndex !== i ? 'opacity-20' : 'opacity-100'}`}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${-radius}px) translateY(${isTopRow ? -rowOffsetPx : rowOffsetPx}px) rotateZ(${randomTilt}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className={`bg-[#FAFAFA] p-3 md:p-5 shadow-[0_40px_80px_rgba(43,48,36,0.15)] transition-transform duration-700 pointer-events-auto cursor-pointer ${!isFocused && 'hover:-translate-y-4 hover:scale-[1.04]'}`}
                  
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
                  <img 
                    src={art.img} 
                    alt={art.title || "Artwork"} 
                    className="w-auto h-[350px] md:h-[450px] lg:h-[600px] max-w-[85vw] shadow-inner pointer-events-none"
                    draggable="false" 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;