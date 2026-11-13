import { useRef, useState, useEffect } from "react";
import { FiRefreshCcw, FiEdit3 } from "react-icons/fi";

const InteractiveCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  
  const colors = [
    "#2D2D2D",
    "#7B8E61",
    "#F0A868",
    "#C86D51",
    "#38523A",
    "#E29547",
    "#A68A68"
  ];
  const [activeColor, setActiveColor] = useState(colors[0]);

  const colorRef = useRef(activeColor);
  useEffect(() => {
    colorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const updateCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (container) {
        const context = canvas.getContext("2d");
        const prevWidth = canvas.width;
        const prevHeight = canvas.height;
        let imgData = null;
        if (prevWidth > 0 && prevHeight > 0) {
          try {
            imgData = context.getImageData(0, 0, prevWidth, prevHeight);
          } catch (e) {
            void e;
          }
        }

        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = 4;

        if (imgData) {
          context.putImageData(imgData, 0, 0);
        }
      }
    };

    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e) => {
    if (!hasDrawn) setHasDrawn(true);
    
    const context = canvasRef.current.getContext("2d");
    const { x, y } = getCoordinates(e);
    
    context.strokeStyle = colorRef.current; 
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault(); 
    
    const context = canvasRef.current.getContext("2d");
    const { x, y } = getCoordinates(e);
    
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full p-5 sm:p-6 bg-theme-olive rounded-3xl border-[3px] border-theme-dark shadow-solid overflow-hidden">
        <div className="relative w-full h-80 sm:h-96 md:h-[28rem] min-h-[340px] md:min-h-[400px] bg-[#FAF7F2] rounded-2xl border-2 border-theme-dark overflow-hidden cursor-crosshair shadow-inner">
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, #2D2D2D 1px, transparent 1px), linear-gradient(to bottom, #2D2D2D 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 transition-opacity duration-300 p-4 text-center ${hasDrawn ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-theme-dark text-theme-cream px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 mb-2 shadow-[2px_2px_0px_#2D2D2D] border border-theme-dark">
              <FiEdit3 size={14} /> Sketch your concept here!
            </div>
            <span className="text-theme-dark/80 font-bold text-xs sm:text-sm max-w-xs uppercase tracking-wide">
              Doodle a flower, pet silhouette, or color palette for your artwork
            </span>
          </div>
          
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 w-full h-full z-10 touch-none"
          />
          
          <button 
            onClick={clearCanvas} 
            className="absolute top-3 right-3 z-20 p-2 bg-theme-cream rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D] text-theme-dark hover:bg-theme-orange transition-all cursor-pointer"
            title="Reset sketchbook"
          >
            <FiRefreshCcw size={15} />
          </button>
        </div>

        <div className="mt-3.5 relative z-20 flex flex-wrap items-center justify-center gap-2.5 bg-theme-cream px-4 py-2 rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
          <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark mr-1">
            PIGMENTS:
          </span>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className={`w-6 h-6 rounded-full transition-transform cursor-pointer border-2 border-theme-dark ${
                activeColor === color 
                  ? 'scale-125 shadow-[1px_1px_0px_#2D2D2D] ring-2 ring-offset-1 ring-theme-dark' 
                  : 'hover:scale-110 opacity-90 hover:opacity-100'
              }`}
              style={{ backgroundColor: color }}
              title={`Color: ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveCanvas;