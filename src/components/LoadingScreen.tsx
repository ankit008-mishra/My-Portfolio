import React, { useEffect, useState } from 'react';
import { Terminal, Cpu } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Booting system...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const texts = [
      'Initializing core modules...',
      'Allocating memory sectors...',
      'Establishing secure protocols...',
      'Mounting visual interfaces...',
      'System Ready.'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Random progress jumps
      currentProgress += Math.floor(Math.random() * 12) + 3;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Start fade out sequence
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 600); // Wait for fade out animation
        }, 400);
      }
      setProgress(currentProgress);

      const textIndex = Math.min(
        Math.floor((currentProgress / 100) * texts.length),
        texts.length - 1
      );
      setLoadingText(texts[textIndex]);
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center font-mono overflow-hidden transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 animate-pulse-glow" />
      
      {/* Central Glowing Orb */}
      <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-8">
        
        <div className="relative mb-8">
          <Cpu className="w-14 h-14 text-blue-500 animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-widest mb-2 flex items-center gap-3">
          <Terminal className="w-7 h-7 text-blue-400" />
          AM_OS <span className="text-blue-500 animate-pulse">INIT</span>
        </h1>
        
        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full mt-10 overflow-hidden relative border border-slate-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Status Text & Percentage */}
        <div className="flex justify-between w-full mt-4 text-xs font-mono text-slate-400 font-medium">
          <span className="animate-pulse">{loadingText}</span>
          <span className="text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.6)]">{progress}%</span>
        </div>
        
        {/* Decorative Loading Logs */}
        <div className="mt-16 w-full text-[9px] text-slate-600 space-y-1.5 font-bold tracking-[0.2em]">
          <p className="flex justify-between"><span>SECURE TUNNEL</span> <span className="text-emerald-500/50">OK</span></p>
          <p className="flex justify-between"><span>DECRYPT ASSETS</span> <span className="text-emerald-500/50">OK</span></p>
          <p className="flex justify-between"><span>MOUNT UI COMPONENTS</span> <span className="text-blue-500/50 animate-pulse">LOADING</span></p>
        </div>

      </div>
    </div>
  );
}
