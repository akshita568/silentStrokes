import React from "react";

const DoodleFrame = ({ children, className = "" }) => {
  return (
    <div className={`relative p-2 md:p-4 bg-base-white ${className}`}>
      
      {/* 1. The Organic Border */}
      <div className="absolute inset-4 border-[1.5px] border-dashed border-olive/40 rounded-xl pointer-events-none"></div>
      
      {/* 2. The Lower-Left Floral Mask (Increased Size) */}
      <div
        className="absolute -bottom-4 -left-4 w-32 h-32 sm:-bottom-6 sm:-left-6 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-olive z-10 pointer-events-none"
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

      {/* 3. The Upper-Right Floral Mask (Increased Size & Balancing the frame) */}
      <div
        className="absolute -top-4 -right-4 w-32 h-32 sm:-top-6 sm:-right-6 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-olive z-10 pointer-events-none"
        style={{
          WebkitMaskImage: `url('/border/uppercorner.png')`,
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
      <div className="relative z-20 px-5 py-10 sm:px-8 sm:py-12 md:px-16 md:py-20">
        {children}
      </div>

    </div>
  );
};

export default DoodleFrame;