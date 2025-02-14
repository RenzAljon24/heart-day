// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const Flower = ({ style }: { style: React.CSSProperties }) => (
  <div className="flower" style={style}>
    <div className="flower-center" />
    {[...Array(8)].map((_, i) => (
      <div key={i} className="petal" style={{ transform: `rotate(${i * 45}deg)` }} />
    ))}
  </div>
);

export default function Home() {
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);
  const [flowers, setFlowers] = useState<{ id: number; x: number; y: number; delay: number; scale: number }[]>([]);

  const fireConfetti = () => {
    // Create a heart-shaped burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timer = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Pink hearts
      confetti({
        ...defaults,
        particleCount: particleCount * 0.5,
        colors: ['#ff69b4', '#ff1493', '#ff007f'],
        shapes: ['circle'],
        gravity: 1.2,
        scalar: 2,
        drift: 0,
      });

      // Rose petals (custom shapes)
      confetti({
        ...defaults,
        particleCount: particleCount * 0.5,
        colors: ['#fbcfe8', '#fce7f3', '#fdf2f8', '#fecdd3', '#fda4af'],
        scalar: randomInRange(1, 2),
        drift: randomInRange(-0.5, 0.5),
      });
    }, 250);

    // Fire some initial bursts
    const count = 3;
    const defaults2 = {
      origin: { y: 0.7 },
      colors: ['#ff69b4', '#ff1493', '#ff007f', '#fbcfe8', '#fce7f3'],
    };

    for(let i = 0; i < count; i++) {
      setTimeout(() => {
        confetti({
          ...defaults2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          startVelocity: randomInRange(45, 55),
        });
      }, i * 200);
    }
  };

  useEffect(() => {
    // Initialize falling petals
    const petalCount = 30;
    const newPetals = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setPetals(newPetals);

    // Initialize blooming flowers
    const flowerCount = 12;
    const newFlowers = Array.from({ length: flowerCount }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      delay: Math.random() * 2,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-red-100 relative overflow-hidden">
      {/* Background Flowers */}
      {flowers.map((flower) => (
        <Flower
          key={flower.id}
          style={{
            position: 'absolute',
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            transform: `scale(${flower.scale})`,
            animationDelay: `${flower.delay}s`,
          }}
        />
      ))}

      {/* Falling Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-falling-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            transform: `scale(${petal.scale})`,
          }}
        >
          <div className="petal-falling" />
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 md:space-y-8 relative z-10 py-12">
          <div className="animate-float">
            <Heart className="w-16 h-16 md:w-20 md:h-20 mx-auto text-red-500 animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-red-600 tracking-wide animate-fade-in">
            Happy Valentine&apos;s Day
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-red-500 max-w-2xl mx-auto animate-fade-in-delay px-4">
            Love blooms in every corner of our hearts...
          </p>
          <button
            onClick={fireConfetti}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full 
              shadow-lg transform transition hover:scale-105 animate-fade-in-delay-2"
          >
            Send Love ❤️
          </button>
        </div>
      </div>
    </main>
  );
}