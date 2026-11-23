import React from 'react';

interface BorderBeamProps {
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  duration = 6,
  borderWidth = 2,
  colorFrom = '#4e9a86',
  colorTo = '#2a5c4f',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          padding: `${borderWidth}px`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
    >
      <div
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, ${colorTo} 85%, ${colorFrom} 95%, transparent 100%)`,
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
        }}
        className="animate-beam-spin absolute left-1/2 top-1/2 aspect-square w-[200%]"
      />
    </div>
  );
}