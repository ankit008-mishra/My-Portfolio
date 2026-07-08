import React, { useRef, useState } from 'react';

interface ThreeDCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxRotation?: number; // Max degrees of tilt
  scaleOnHover?: number; // Scaling coefficient
  glowColor?: string; // Hex or tailwind shadow glow
  className?: string;
  id?: string;
  key?: React.Key;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ThreeDCard({
  children,
  maxRotation = 12,
  scaleOnHover = 1.03,
  glowColor = 'rgba(59, 130, 246, 0.15)',
  className = '',
  id,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Convert to percentage rotation [-maxRotation, maxRotation]
    const rotX = -(mouseY / (height / 2)) * maxRotation;
    const rotY = (mouseX / (width / 2)) * maxRotation;

    setRotation({ x: rotX, y: rotY });

    // Relative glow positions (0 to 100%)
    const glowX = ((e.clientX - rect.left) / width) * 100;
    const glowY = ((e.clientY - rect.top) / height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  const cardStyle: React.CSSProperties = {
    transform: isHovered
      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, 1.01)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease',
    boxShadow: isHovered
      ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px ${glowColor}`
      : '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`relative rounded-2xl overflow-hidden preserve-3d cursor-pointer ${className}`}
      {...props}
    >
      {/* 3D Reflection / Shimmer Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${glowPosition.x}% ${glowPosition.y}%, rgba(255, 255, 255, 0.08), transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
