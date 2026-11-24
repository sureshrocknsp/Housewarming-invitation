import React, { useEffect, useRef, useState } from 'react';
import { Flower2, Eye, EyeOff } from 'lucide-react';

export default function FallingPetals() {
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !prefersReducedMotion;
    }
    return true;
  });

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Pause rendering when document is in background to save battery & CPU
    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Realistic petal color sets (Marigold Orange, Marigold Yellow, Jasmine White, Rose Red)
    const petalColors = [
      { fill: '#F5A623', stroke: '#D97706', type: 'marigold' },
      { fill: '#FBBF24', stroke: '#D97706', type: 'marigold' },
      { fill: '#FF7700', stroke: '#C2410C', type: 'marigold' },
      { fill: '#FFFBEB', stroke: '#FEF3C7', type: 'jasmine' },
      { fill: '#BE123C', stroke: '#9F1239', type: 'rose' },
    ];

    const petalCount = window.innerWidth < 768 ? 22 : 45;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        angle: Math.random() * 360,
        spinSpeed: (Math.random() - 0.5) * 1.8,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.scale(1, Math.cos(p.flip));
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      if (p.color.type === 'marigold') {
        // Elongated teardrop marigold petal
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.7, p.size * 0.8, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.8, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
      } else if (p.color.type === 'jasmine') {
        // Petite jasmine petal
        ctx.moveTo(0, -p.size * 0.8);
        ctx.quadraticCurveTo(p.size * 0.5, 0, 0, p.size * 0.8);
        ctx.quadraticCurveTo(-p.size * 0.5, 0, 0, -p.size * 0.8);
      } else {
        // Broad rounded rose petal
        ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
      }

      ctx.fillStyle = p.color.fill;
      ctx.fill();
      ctx.strokeStyle = p.color.stroke;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      if (!isDocumentVisible) return;

      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.008) * 0.4;
        p.angle += p.spinSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30"
          style={{ width: '100vw', height: '100vh' }}
        />
      )}

      {/* Subtle floating toggle for petals in lower corner */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? "Disable flower shower" : "Enable flower shower"}
        className="fixed bottom-24 right-4 z-40 bg-cream-light/90 hover:bg-cream border border-turmeric/60 text-maroon p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center justify-center text-xs gap-1 group"
      >
        <Flower2 className={`w-4 h-4 text-turmeric-dark ${isEnabled ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-maroon-dark font-medium pr-1">
          {isEnabled ? 'Petals Active' : 'Show Petals'}
        </span>
      </button>
    </>
  );
}
