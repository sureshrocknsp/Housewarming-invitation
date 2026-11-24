import React, { useEffect, useState } from 'react';

/**
 * FallingPetals Component
 * Renders delicate traditional South Indian marigold & rose flower petals drifting downward.
 */
export default function FallingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate static pool of lightweight animated petals
    const items = Array.from({ length: 14 }).map((_, index) => ({
      id: index,
      left: `${(index * 7.5 + Math.random() * 5).toFixed(1)}%`,
      animationDuration: `${(10 + Math.random() * 8).toFixed(1)}s`,
      animationDelay: `${(Math.random() * 10).toFixed(1)}s`,
      size: `${14 + Math.floor(Math.random() * 12)}px`,
      colorType: index % 3 === 0 ? 'rose' : index % 3 === 1 ? 'marigold-yellow' : 'marigold-orange',
      opacity: 0.65 + Math.random() * 0.25,
      rotateStart: `${Math.floor(Math.random() * 360)}deg`,
    }));
    setPetals(items);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute will-change-transform animate-petal-fall"
          style={{
            left: petal.left,
            top: '-40px',
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 30 30"
            style={{
              opacity: petal.opacity,
              transform: `rotate(${petal.rotateStart})`,
              filter: 'drop-shadow(0 2px 4px rgba(100, 30, 22, 0.15))',
            }}
          >
            {petal.colorType === 'rose' && (
              <path
                d="M15 2 C22 2 28 8 28 15 C28 22 22 28 15 28 C8 28 2 22 2 15 C2 8 8 2 15 2 Z"
                fill="url(#roseGrad)"
              />
            )}
            {petal.colorType === 'marigold-yellow' && (
              <path
                d="M15 0 C20 8 26 10 26 16 C26 23 21 28 15 28 C9 28 4 23 4 16 C4 10 10 8 15 0 Z"
                fill="url(#marigoldYellowGrad)"
              />
            )}
            {petal.colorType === 'marigold-orange' && (
              <path
                d="M15 1 C21 6 27 11 27 17 C27 24 22 29 15 29 C8 29 3 24 3 17 C3 11 9 6 15 1 Z"
                fill="url(#marigoldOrangeGrad)"
              />
            )}

            <defs>
              <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="70%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
              <linearGradient id="marigoldYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="70%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
              <linearGradient id="marigoldOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="70%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
