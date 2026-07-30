import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const RippleCursor = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const isBookingPage = location.pathname === '/booking';

  // 1. Hook MUST run unconditionally at the top level
  useEffect(() => {
    // If we are on the booking page, just do nothing and exit the effect safely
    if (isBookingPage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let ripples = [];
    let lastDrop = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const addRipple = (e) => {
      const now = Date.now();
      if (now - lastDrop > 50) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          maxRadius: Math.random() * 10 + 20,
        });
        lastDrop = now;
      }
    };

    window.addEventListener("mousemove", addRipple);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = ripples.length - 1; i >= 0; i--) {
        let r = ripples[i];
        r.life -= 0.02; 
        
        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const currentRadius = r.maxRadius * (1 - Math.pow(r.life, 3)); 
        const alpha = r.life * 0.5; 

        // Main outer ripple
        ctx.beginPath();
        ctx.arc(r.x, r.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(143, 153, 132, ${alpha})`; 
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner echo
        if (currentRadius > 8) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, currentRadius - 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(180, 185, 170, ${alpha * 0.4})`; 
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", addRipple);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBookingPage]); // 2. Add the dependency so the effect updates on route changes

  // 3. Conditional return MUST happen AFTER the hooks
  if (isBookingPage) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-multiply"
    />
  );
};

export default RippleCursor;