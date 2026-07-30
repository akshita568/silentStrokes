import { useRef, useState, useEffect } from "react";
import { FiRefreshCcw, FiEdit3 } from "react-icons/fi";

const InteractiveCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false); // Tracks if the user has started drawing
  
  // Keep the cutesy color palette just for the drawing pens
  const colors = ["#4b5563", "#fb7185", "#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#facc15"];
  const [activeColor, setActiveColor] = useState(colors[0]);

  const colorRef = useRef(activeColor);
  useEffect(() => {
    colorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 4; 
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e) => {
    if (!hasDrawn) setHasDrawn(true); // Permanently hide the text on first touch
    
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
    setHasDrawn(false); // Bring the text back if they clear everything
  };

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* The Canvas Area - Restored to the earthy aesthetic */}
      <div className="relative w-full h-[400px] md:h-[450px] bg-base-white rounded-sm border-2 border-dashed border-sand shadow-sm overflow-hidden cursor-crosshair">
        
        {/* Playful CTA that vanishes completely once hasDrawn is true */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 transition-opacity duration-500 ${hasDrawn ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-sand/20 text-text-main px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 mb-2 shadow-sm animate-bounce">
            <FiEdit3 size={16} /> Draw on me!
          </div>
          <span className="text-dove font-serif italic text-lg tracking-wide opacity-80 text-center px-6">
            ✨ Doodle a little flower, a pet, or just say hi! ✨
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
        
        {/* Refresh Button */}
        <button 
          onClick={clearCanvas} 
          className="absolute top-4 right-4 z-20 p-2.5 bg-base-white/80 backdrop-blur-sm rounded-full shadow-sm text-dove hover:text-olive hover:bg-sand/20 transition-all"
          title="Start over"
        >
          <FiRefreshCcw size={18} />
        </button>
      </div>

      {/* The Color Palette Toolbar */}
      <div className="mt-6 flex items-center justify-center gap-3 bg-base-white px-6 py-3 rounded-full shadow-sm border border-sand">
        <span className="text-xs font-bold uppercase tracking-widest text-dove mr-2">Colors:</span>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setActiveColor(color)}
            className={`w-7 h-7 rounded-full transition-transform duration-300 ${activeColor === color ? 'scale-125 shadow-md ring-2 ring-offset-2 ring-sand' : 'hover:scale-110 opacity-80 hover:opacity-100'}`}
            style={{ backgroundColor: color }}
            title="Pick this color!"
          />
        ))}
      </div>
      
    </div>
  );
};

export default InteractiveCanvas;