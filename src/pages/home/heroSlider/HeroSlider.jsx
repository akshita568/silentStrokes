import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useMediaQuery";

// Pure curve helper — pulled out of the component so it can seed initial state.
// Adjusted curve math to keep everything safely within the container view bounds
const getWireY = (x, wireIndex) => {
  const t = x / 100;
  if (wireIndex === 0) {
    return Math.pow(1 - t, 2) * 15 + 2 * (1 - t) * t * 55 + Math.pow(t, 2) * 20;
  } else {
    return Math.pow(1 - t, 2) * 35 + 2 * (1 - t) * t * 70 + Math.pow(t, 2) * 40;
  }
};

// x positions of the five frames along the wall. Desktop keeps the original
// asymmetric spread; on narrow screens the frames are pulled inward so they
// stay reachable and never clip the viewport edges.
const DESKTOP_XS = [35, 50, 65, 80, 92];
const MOBILE_XS = [8, 27, 46, 62, 76];

const buildFrames = (xs) => [
  { id: 1, img: "/artworks/comission3.png", x: xs[0], y: getWireY(xs[0], 0), rot: -4, z: 10, isInspecting: false },
  { id: 2, img: "/artworks/skull.png", x: xs[1], y: getWireY(xs[1], 1), rot: 2, z: 11, isInspecting: false },
  { id: 3, img: "/artworks/dog.png", x: xs[2], y: getWireY(xs[2], 0), rot: -2, z: 12, isInspecting: false },
  { id: 4, img: "/artworks/river.png", x: xs[3], y: getWireY(xs[3], 1), rot: 3, z: 13, isInspecting: false },
  { id: 5, img: "/artworks/forest.png", x: xs[4], y: getWireY(xs[4], 0), rot: -3, z: 14, isInspecting: false },
];

const HeroSlider = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const [draggingId, setDraggingId] = useState(null);
  const [highestZ, setHighestZ] = useState(20);
  const [frames, setFrames] = useState(() => buildFrames(DESKTOP_XS));

  // Drag / tap discrimination for touch "double-tap to inspect".
  const movedRef = useRef(false);
  const lastTapRef = useRef({ id: null, t: 0 });

  // Re-flow the frames when crossing the layout breakpoint. Any positions the
  // visitor has dragged are intentionally reset here — a resize across the
  // breakpoint is a layout change, not a state we need to preserve.
  useEffect(() => {
    setFrames(buildFrames(isMobile ? MOBILE_XS : DESKTOP_XS));
  }, [isMobile]);

  const handlePointerDown = (e, id) => {
    e.preventDefault();
    movedRef.current = false;
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

    movedRef.current = true;
    setFrames((prev) => prev.map((f) =>
      f.id === draggingId ? { ...f, x: mouseX - 6, y: mouseY - 8 } : f
    ));
  };

  const handlePointerUp = (e) => {
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

      // Touch has no hover and an unreliable native dblclick, so recognise a
      // deliberate double-tap on the same frame as the "inspect" gesture.
      if (e && e.type === "pointerup" && e.pointerType !== "mouse" && !movedRef.current) {
        const now = Date.now();
        if (lastTapRef.current.id === draggingId && now - lastTapRef.current.t < 320) {
          handleInspect(draggingId);
          lastTapRef.current = { id: null, t: 0 };
        } else {
          lastTapRef.current = { id: draggingId, t: now };
        }
      }
    }
    setDraggingId(null);
  };

  const handleInspect = (id) => {
    setHighestZ((prev) => prev + 1);
    setFrames((prev) => prev.map((f) =>
      f.id === id
        ? { ...f, isInspecting: !f.isInspecting, z: highestZ + 1 }
        : { ...f, isInspecting: false }
    ));
  };

  const renderFrame = (frame) => {
    const isHung = Math.abs(frame.y - getWireY(frame.x, 0)) < 1 || Math.abs(frame.y - getWireY(frame.x, 1)) < 1;

    return (
      <div
        key={frame.id}
        onPointerDown={(e) => handlePointerDown(e, frame.id)}
        onDoubleClick={() => handleInspect(frame.id)}
        className={`absolute cursor-grab active:cursor-grabbing transition-transform ease-out shadow-lg bg-base-white ${
          frame.isInspecting
            ? "duration-500 shadow-2xl p-4 border border-sand"
            : "duration-0 hover:shadow-xl p-2 border border-sand/50"
        }`}
        style={{
          left: frame.isInspecting ? "50%" : `${frame.x}%`,
          top: frame.isInspecting ? "50%" : `${frame.y}%`,
          transform: frame.isInspecting
            ? `translate(-50%, -50%) scale(${isMobile ? 1.15 : 1.6}) rotate(0deg)`
            : `rotate(${frame.rot}deg)`,
          transformOrigin: isHung ? "top center" : "center center",

          // Ensure inspected items pop over the text box, but dragged items stay under
          zIndex: frame.isInspecting ? 9999 : frame.z,

          width: isMobile ? "clamp(96px, 30vw, 150px)" : "clamp(120px, 12vw, 220px)",
          aspectRatio: "4/5",

          // Only the painting itself locks touch gestures, so a drag on a frame
          // works while a swipe anywhere else on the wall still scrolls the page.
          touchAction: "none",
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
  };

  const wires = (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path d="M 0 15 Q 50 55 100 20" fill="transparent" stroke="#D1CBC1" strokeWidth="0.15" />
      <path d="M 0 35 Q 65 70 100 40" fill="transparent" stroke="#D1CBC1" strokeWidth="0.15" />
    </svg>
  );

  // --- MOBILE / TABLET: intro copy stacked above a dedicated interactive wall ---
  // The desktop version floats the copy over the artwork; on a narrow touch
  // screen that overlap makes both the text and the paintings hard to use, so
  // the same pieces are re-flowed into a readable column instead.
  if (isMobile) {
    return (
      <section
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative bg-base-white overflow-hidden border-b border-sand"
      >
        <div className="px-5 pt-24 pb-6">
          <div className="space-y-3 bg-base-white/80 backdrop-blur-md p-6 border border-sand/30 shadow-xl rounded-sm">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-olive">
              The Studio Wall
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-text-main leading-tight">
              Curate <span className="italic font-light text-dove">Your Space</span>
            </h1>
            <p className="text-dove text-sm leading-relaxed font-sans">
              An interactive space: press and drag the paintings along the wires,
              or drop them anywhere to picture them on your wall. Double-tap a
              painting to inspect it. If you&apos;d like to see more, visit the Gallery.
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

        <div ref={containerRef} className="relative w-full h-[58vh] min-h-[420px]">
          {wires}
          {frames.map(renderFrame)}
        </div>
      </section>
    );
  }

  // --- DESKTOP: unchanged floating-canvas experience ---
  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative min-h-[90vh] bg-base-white flex items-center overflow-hidden border-b border-sand"
    >
      {/* 1. THE DROOPY ASYMMETRIC WIRES */}
      {wires}

      <div className="absolute left-6 md:left-16 top-24 md:top-32 z-[999] pointer-events-none">

        <div className="space-y-4 max-w-md bg-base-white/80 backdrop-blur-md p-8 border border-sand/30 shadow-2xl rounded-sm">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-olive">
            The Studio Wall
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-text-main leading-tight">
            Curate <span className="italic font-light text-dove">Your Space</span>
          </h1>
          <p className="text-dove text-sm leading-relaxed font-sans">
            This is an interactive space where you can drag, clip, and unclip the paintings on the wires, or simply drop them anywhere in the space to see how the prints might look on your wall.Have fun exploring, and if you'd like to see more of my work, check out my Gallery!
          </p>
          <div className="pt-2">

            <Link
              to="/portfolio"
              className="pointer-events-auto inline-block px-6 py-3 bg-text-main text-base-white text-[10px] font-bold uppercase tracking-widest hover:bg-olive transition-colors duration-300 rounded-sm shadow-sm"
            >
              Enter Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* 3. DRAGGABLE HANGING PAINTINGS */}
      {frames.map(renderFrame)}
    </section>
  );
};

export default HeroSlider;
