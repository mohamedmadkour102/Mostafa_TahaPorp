import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Bubble = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  alpha: number;
};

function createBubbles(count: number, w: number, h: number): Bubble[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: h * (0.52 + Math.random() * 0.48),
    r: 1.2 + Math.random() * 3.5,
    speed: 0.25 + Math.random() * 0.55,
    drift: (Math.random() - 0.5) * 0.35,
    alpha: 0.15 + Math.random() * 0.35,
  }));
}

export function WeatherAtmosphere() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animate = !reduce;

  useEffect(() => {
    if (!animate) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let bubbles: Bubble[] = [];
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(36, Math.floor((width * height) / 28000));
      bubbles = createBubbles(count, width, height);
    };

    const draw = () => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const waterLine = h * 0.48;
      ctx.clearRect(0, 0, w, h);

      for (const b of bubbles) {
        b.y -= b.speed;
        b.x += b.drift + Math.sin(b.y * 0.02) * 0.15;
        if (b.y < waterLine + 8) {
          b.y = h + b.r;
          b.x = Math.random() * w;
        }
        if (b.x < -10) b.x = w + 10;
        if (b.x > w + 10) b.x = -10;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 230, 255, ${b.alpha})`;
        ctx.fillStyle = `rgba(180, 220, 255, ${b.alpha * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.fill();
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [animate]);

  return (
    <div
      className={`weather-atmosphere weather-hydro ${reduce ? "weather-static" : ""}`}
      aria-hidden
    >
      <div className="weather-sky weather-sky-fallback" />

      <div className="weather-photo-wrap">
        <img
          className={`weather-photo ${animate ? "weather-photo-motion" : ""}`}
          src="/atmosphere/hydro-risk-bg.jpg?v=storm-4k"
          alt=""
          draggable={false}
        />
      </div>

      <div className="weather-video-tint weather-photo-tint" />
      <div className="weather-haze" />
      {animate && <canvas ref={canvasRef} className="weather-rain-canvas" />}
    </div>
  );
}
