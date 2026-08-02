import React from "react";

const DoodleFrame = ({ children, className = "" }) => {
  return (
    <div className={`relative p-2 md:p-4 bg-base-white ${className}`}>
      
      {/* 1. The Organic Border */}
      <div className="absolute inset-4 border-[1.5px] border-dashed border-olive/40 rounded-xl pointer-events-none"></div>
      
      {/* 2. The Lower-Left Floral Mask (Increased Size) */}
      <div 
        className="absolute -bottom-6 -left-6 w-48 h-48 md:w-56 md:h-56 bg-olive z-10 pointer-events-none"
        style={{
          WebkitMaskImage: `url('/border/lowercorner.png')`, /* Update this file name if needed */
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'bottom left',
          maskImage: `url('/border/lowercorner.png')`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'bottom left'
        }}
      ></div>

      {/* 3. The Upper-Right Floral Mask (Increased Size & Balancing the frame) */}
      <div 
        className="absolute -top-6 -right-6 w-48 h-48 md:w-56 md:h-56 bg-olive z-10 pointer-events-none"
        style={{
          WebkitMaskImage: `url('/border/uppercorner.png')`, /* Update this file name if needed */
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'top right',
          maskImage: `url('/border/uppercorner.png')`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'top right'
        }}
      ></div>

      {/* 4. The Actual Content inside the frame */}
      <div className="relative z-20 px-8 py-12 md:px-16 md:py-20">
        {children}
      </div>

    </div>
  );
};

export default DoodleFrame;