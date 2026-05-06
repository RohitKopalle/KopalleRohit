import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the 3D globe should be displayed.
 * Based purely on screen width - no touch detection.
 * Globe is shown only on large screens (desktops, large laptops, landscape tablets).
 * 
 * @param {number} breakpoint - Width threshold in pixels (default: 1024)
 * @returns {boolean} - True if globe should be shown
 */
export function useShowGlobe(breakpoint = 1024) {
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowGlobe(window.innerWidth >= breakpoint);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [breakpoint]);

  return showGlobe;
}
