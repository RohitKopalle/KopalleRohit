import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile devices.
 * Uses viewport width and touch detection.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth < breakpoint;
      const isTouchDevice = navigator.maxTouchPoints > 0;
      setIsMobile(isSmallScreen || isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
