import { useId } from "react";

const ScallopDivider = ({
  position = "bottom",
  color = "#7B8E61",
  radius = 18,
  className = "",
  style = {},
}) => {
  const patternId = useId().replace(/:/g, "_");
  const diameter = radius * 2;
  const height = radius;

  if (position === "bottom") {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
        style={{ height: `${height}px`, ...style }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={patternId}
              width={diameter}
              height={height}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M 0 0 A ${radius} ${radius} 0 0 0 ${diameter} 0 Z`}
                fill={color}
              />
            </pattern>
          </defs>
          <rect width="100%" height={height} fill={`url(#${patternId})`} />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ height: `${height}px`, ...style }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width={diameter}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M 0 ${height} A ${radius} ${radius} 0 0 1 ${diameter} ${height} Z`}
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export default ScallopDivider;
