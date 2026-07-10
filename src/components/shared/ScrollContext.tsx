'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type SmoothScrollContextType = {
  lenis: Lenis | null;
};

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
});

export const useSmoothScroller = () => useContext(SmoothScrollContext);

interface ScrollContextProps {
  children: ReactNode;
}

export default function ScrollContext({ children }: ScrollContextProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.1, // smoothing strength
    });

    // Animation loop
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    setLenis(lenisInstance);

    // Cleanup
    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return <SmoothScrollContext.Provider value={{ lenis }}>{children}</SmoothScrollContext.Provider>;
}
