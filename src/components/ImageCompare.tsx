import React, { useState, useRef, useEffect } from "react";
import { Pause } from "lucide-react";

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeClassName?: string;
  afterClassName?: string;
  isEditor?: boolean;
}

export default function ImageCompare({ beforeImage, afterImage, beforeClassName = "", afterClassName = "", isEditor = false }: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    const percent = (x / width) * 100;
    setSliderPosition(percent);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // Retain pointer capture so we can continue dragging outside the handle
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 1) { // Left mouse button is down
      handleMove(e.clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full rounded-[20px] overflow-hidden select-none bg-dark-card shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-dark-border ${isEditor ? 'aspect-auto' : 'aspect-[4/3] sm:aspect-video'}`}
      onPointerMove={handlePointerMove}
    >
      {/* Before Image (Background) */}
      <img 
        src={beforeImage} 
        alt="Antes" 
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none ${beforeClassName}`}
      />
      
      {/* After Image (Clipped overlay) */}
      <img 
        src={afterImage} 
        alt="Depois" 
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none ${afterClassName}`}
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />
      
      {/* Right border for clipped image overlay to simulate slider line */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none border-r-[2px] border-white"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Labels */}
      <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/60 text-white text-[10px] font-bold tracking-[1px] rounded-[4px] pointer-events-none z-10">
        ANTES
      </div>
      <div className="absolute top-5 right-5 px-3 py-1.5 bg-black/60 text-white text-[10px] font-bold tracking-[1px] rounded-[4px] pointer-events-none z-10">
        DEPOIS
      </div>

      {/* Vertical divider line */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white hidden pointer-events-none z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
      </div>
      {/* Handle */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full flex flex-col justify-center items-center gap-[4px] shadow-[0_0_20px_rgba(0,0,0,0.4)] cursor-ew-resize pointer-events-auto hover:scale-105 transition-transform touch-none z-30"
        style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
        onPointerDown={handlePointerDown}
      >
        <div className="flex gap-[4px] pointer-events-none h-[14px]">
          <div className="w-[4px] h-full bg-black rounded-[2px]"></div>
          <div className="w-[4px] h-full bg-black rounded-[2px]"></div>
        </div>
      </div>

      {/* Fallback invisible range input for accessibility and unified touch/mouse handling */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
      />
    </div>
  );
}
