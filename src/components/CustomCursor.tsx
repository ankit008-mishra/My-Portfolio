import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    let animationFrameId: number;
    let targetX = -1000;
    let targetY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const render = () => {
      // Use requestAnimationFrame for high-performance, stutter-free tracking
      setPosition({ x: targetX, y: targetY });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: '120px', // Size decreased to look like a small drop/orb of light
        height: '120px',
        // Opacity set to 20% (0.20)
        background: 'radial-gradient(circle closest-side, rgba(168, 85, 247, 0.20), transparent)',
        // Center the gradient exactly on the cursor tip
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        willChange: 'transform',
      }}
    />
  );
}
