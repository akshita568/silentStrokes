import { useState, useEffect } from "react";

/**
 * Subscribe to a CSS media query and re-render when it changes.
 * SSR-safe and falls back gracefully when matchMedia is unavailable.
 */
export const useMediaQuery = (queryString) => {
  const getMatch = () => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(queryString).matches;
  };

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(queryString);
    const handler = (e) => setMatches(e.matches);

    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [queryString]);

  return matches;
};

/**
 * True below Tailwind's `lg` breakpoint (1024px) — the width at which the
 * desktop layouts in this project stop having room to breathe. Used to swap
 * in touch-friendly layouts without touching the desktop code paths.
 */
export const useIsMobile = (maxWidthPx = 1023) =>
  useMediaQuery(`(max-width: ${maxWidthPx}px)`);

/** True on devices whose primary input is touch (no real hover / fine pointer). */
export const useIsTouch = () =>
  useMediaQuery("(hover: none) and (pointer: coarse)");

export default useMediaQuery;
