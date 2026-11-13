export const Daisy = ({ className = "w-10 h-10", petalColor = "#F9F6F0", centerColor = "#F0A868", strokeColor = "#2D2D2D" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="translate(50, 50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-30"
          rx="12"
          ry="20"
          fill={petalColor}
          stroke={strokeColor}
          strokeWidth="3"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="14" fill={centerColor} stroke={strokeColor} strokeWidth="3" />
    </g>
  </svg>
);

export const FlavoStar = ({ className = "w-10 h-10", color = "#F0A868", strokeColor = "#2D2D2D" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="translate(50, 50)">
      {[0, 45, 90, 135].map((angle, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="0"
          rx="9"
          ry="44"
          fill={color}
          stroke={strokeColor}
          strokeWidth="2.5"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="8" fill={color} stroke={strokeColor} strokeWidth="2" />
    </g>
  </svg>
);

export const FlowerDoodle = ({ className = "w-8 h-8", color = "#7B8E61", centerColor = "#F0A868", strokeColor = "#2D2D2D" }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="translate(40, 40)">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <circle
          key={i}
          cx="0"
          cy="-20"
          r="14"
          fill={color}
          stroke={strokeColor}
          strokeWidth="2.5"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="10" fill={centerColor} stroke={strokeColor} strokeWidth="2" />
    </g>
  </svg>
);

export const Tulip = ({ className = "w-14 h-24", flowerColor = "#F0A868", stemColor = "#7B8E61", strokeColor = "#2D2D2D" }) => (
  <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M40 70 Q35 105 45 135"
      stroke={strokeColor}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M38 110 C20 105 15 85 24 75 C30 90 35 100 38 110 Z"
      fill={stemColor}
      stroke={strokeColor}
      strokeWidth="2.5"
    />
    <path
      d="M42 98 C58 92 64 74 56 64 C50 78 45 88 42 98 Z"
      fill={stemColor}
      stroke={strokeColor}
      strokeWidth="2.5"
    />
    <g transform="translate(18, 12)">
      <path
        d="M22 15 C22 15 22 2 30 2 C38 2 38 15 38 15 C38 35 22 45 22 45 C22 45 6 35 6 15 C6 2 14 2 22 15 Z"
        fill={flowerColor}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      <path
        d="M5 24 C5 8 18 10 22 28 C22 45 12 50 12 50 C12 50 5 40 5 24 Z"
        fill={flowerColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
      <path
        d="M39 24 C39 8 26 10 22 28 C22 45 32 50 32 50 C32 50 39 40 39 24 Z"
        fill={flowerColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
    </g>
  </svg>
);

export const LeafSprig = ({ className = "w-16 h-24", color = "#7B8E61", strokeColor = "#2D2D2D" }) => (
  <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M25 130 C35 95 55 50 85 20"
      stroke={strokeColor}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path d="M42 100 C30 95 24 80 32 72 C42 75 44 90 42 100 Z" fill={color} stroke={strokeColor} strokeWidth="2" />
    <path d="M52 82 C64 80 72 66 65 56 C55 60 52 74 52 82 Z" fill={color} stroke={strokeColor} strokeWidth="2" />
    <path d="M63 58 C52 52 48 38 56 30 C65 34 66 48 63 58 Z" fill={color} stroke={strokeColor} strokeWidth="2" />
    <path d="M74 40 C85 36 90 22 82 14 C73 18 72 32 74 40 Z" fill={color} stroke={strokeColor} strokeWidth="2" />
  </svg>
);

export const Squiggle = ({ className = "w-20 h-3", color = "#2D2D2D" }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M5 10 Q20 2 35 10 T65 10 T95 10 T115 10"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const WashiTape = ({ className = "w-24 h-6", color = "#F0A868", rotate = "-2deg" }) => (
  <div
    className={`relative border-[3px] border-theme-dark shadow-solid select-none pointer-events-none ${className}`}
    style={{
      backgroundColor: color,
      transform: `rotate(${rotate})`,
    }}
  />
);

export const CheckerboardDivider = ({ 
  color1 = "#2D2D2D", 
  color2 = "#F9F6F0", 
  height = 18,
  className = "" 
}) => (
  <div 
    className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
    style={{ height: `${height}px` }}
    aria-hidden="true"
  >
    <svg className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="checkerboard" width="24" height="18" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="12" height="9" fill={color1} />
          <rect x="12" y="0" width="12" height="9" fill={color2} />
          <rect x="0" y="9" width="12" height="9" fill={color2} />
          <rect x="12" y="9" width="12" height="9" fill={color1} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill="url(#checkerboard)" />
    </svg>
  </div>
);

export const TickerTape = ({ 
  text = "ORIGINAL OIL & ACRYLIC ARTWORKS • CRAFTED IN HIMACHAL • PAN-INDIA SAFE DELIVERY • COMMISSIONS OPEN",
  bgColor = "bg-theme-orange",
  textColor = "text-theme-dark",
  className = ""
}) => (
  <div className={`w-full overflow-hidden whitespace-nowrap py-2 border-y-[3px] border-theme-dark font-sans font-black text-xs uppercase tracking-widest ${bgColor} ${textColor} ${className}`}>
    <div className="inline-flex gap-8 items-center">
      <span>{text}</span>
      <span>★</span>
      <span>{text}</span>
      <span>★</span>
      <span>{text}</span>
    </div>
  </div>
);
