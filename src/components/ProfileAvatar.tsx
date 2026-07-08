import React from 'react';
import { User } from 'lucide-react';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean; // Kept for prop compatibility
}

export default function ProfileAvatar({ size = 'lg', interactive = true }: ProfileAvatarProps) {
  // Using GitHub profile image directly
  const avatarUrl = 'https://github.com/ankit008-mishra.png';

  // Sizing styles
  let containerSize = 'w-24 h-24';
  let iconSize = 'w-10 h-10';
  if (size === 'sm') {
    containerSize = 'w-12 h-12';
    iconSize = 'w-5 h-5';
  } else if (size === 'md') {
    containerSize = 'w-16 h-16';
    iconSize = 'w-7 h-7';
  } else if (size === 'lg') {
    containerSize = 'w-32 h-32 md:w-36 md:h-36';
    iconSize = 'w-14 h-14';
  }

  return (
    <div className="relative group select-none">
      {/* Glow Rings background */}
      <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 opacity-60 blur-md group-hover:opacity-100 transition duration-500 animate-pulse-glow`} />
      
      {/* Orbital particle path */}
      <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-spin" style={{ animationDuration: '12s' }} />
      <div className="absolute -inset-1 rounded-full border border-dashed border-violet-500/20 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />

      {/* Main Avatar Circle */}
      <div
        className={`${containerSize} relative rounded-full overflow-hidden bg-slate-950 border-2 border-blue-400/80 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95`}
      >
        <img
          src={avatarUrl}
          alt="Ankit Mishra Profile"
          className="w-full h-full object-cover rounded-full z-20"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* High-Tech Stylized Default Tech Avatar Fallback */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 text-blue-400 z-10">
          {/* Grid structure overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
          
          <User className={`${iconSize} text-blue-400/80 group-hover:text-blue-300 transition-colors z-10 relative`} />
          
          <span className="text-[10px] font-mono tracking-widest text-blue-500/60 mt-1 font-bold z-10 select-none uppercase">
            AM_OS
          </span>
        </div>
      </div>
    </div>
  );
}
