'use client';

import { useEffect, useRef } from 'react';

// Fondo de degradados que se desplazan a distinta velocidad que el scroll
// (efecto parallax) — sin dependencias externas, solo transform + rAF.
export function ParallaxOrbs() {
  const flame = useRef<HTMLDivElement>(null);
  const ice = useRef<HTMLDivElement>(null);
  const embers = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      const y = window.scrollY;
      if (flame.current) flame.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      if (ice.current) ice.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
      if (embers.current) embers.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        ref={flame}
        className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full bg-[#FF6B00]/25 blur-[130px]"
      />
      <div
        ref={ice}
        className="absolute top-64 -right-32 w-[550px] h-[550px] rounded-full bg-[#2FA8FF]/15 blur-[120px]"
      />
      <div
        ref={embers}
        className="absolute top-[420px] left-0 w-[400px] h-[400px] rounded-full bg-[#FF3D71]/10 blur-[100px]"
      />
    </div>
  );
}
