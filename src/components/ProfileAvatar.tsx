import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, Sparkles, Upload } from 'lucide-react';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export default function ProfileAvatar({ size = 'lg', interactive = true }: ProfileAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved custom photo from localStorage on mount
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('ankit_portfolio_dp');
      if (savedPhoto) {
        setAvatarUrl(savedPhoto);
      }
    } catch (e) {
      console.warn('Failed to read from localStorage', e);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Selected file must be a valid image matrix.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAvatarUrl(result);
      try {
        localStorage.setItem('ankit_portfolio_dp', result);
      } catch (err) {
        console.warn('Failed to save to localStorage (file may be too large)', err);
        alert('Image saved to session, but was too large to persist permanently in standard browser cache.');
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (interactive) {
      fileInputRef.current?.click();
    }
  };

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
        onClick={triggerFileInput}
        className={`${containerSize} relative rounded-full overflow-hidden bg-slate-950 border-2 border-blue-400/80 flex items-center justify-center cursor-pointer shadow-2xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Ankit Mishra Profile"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High-Tech Stylized Default Tech Avatar */
          <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950 to-slate-900 text-blue-400">
            {/* Grid structure overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
            
            <User className={`${iconSize} text-blue-400/80 group-hover:text-blue-300 transition-colors z-10 relative`} />
            
            <span className="text-[10px] font-mono tracking-widest text-blue-500/60 mt-1 font-bold z-10 select-none uppercase">
              AM_OS
            </span>
          </div>
        )}

        {/* Hover Upload Overlay */}
        {interactive && (
          <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-slate-200 z-20">
            <Camera className="w-6 h-6 text-blue-400 animate-bounce" />
            <span className="text-[9px] font-mono text-slate-300 mt-1 font-bold uppercase tracking-wider">
              {avatarUrl ? 'Update DP' : 'Upload DP'}
            </span>
          </div>
        )}
      </div>

      {/* Quick Action badge */}
      {interactive && (
        <button
          onClick={triggerFileInput}
          className="absolute bottom-1 right-1 p-2 rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-400/30 text-white shadow-lg transition-transform hover:scale-110 active:scale-90 cursor-pointer z-30"
          title="Upload customized portrait"
        >
          <Upload className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Hidden file input matrix */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
