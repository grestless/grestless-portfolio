"use client";

import { useEffect, useRef } from "react";

export default function CanvasNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener("resize", resize);
    resize();

    // To prevent recalculating noise for every pixel on every frame,
    // we create a smaller off-screen noise buffer and draw it rapidly.
    const noiseBuffer = document.createElement("canvas");
    noiseBuffer.width = 100;
    noiseBuffer.height = 100;
    const noiseCtx = noiseBuffer.getContext("2d");

    const renderNoise = () => {
      if (!noiseCtx) return;
      
      const idata = noiseCtx.createImageData(100, 100);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;
      
      // Black and white noise with very low alpha
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.1) {
          buffer32[i] = 0x0f000000; // very subtle black noise
        }
      }
      noiseCtx.putImageData(idata, 0, 0);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ctx.createPattern(noiseBuffer, "repeat") || "transparent";
      ctx.fillRect(0, 0, w, h);

      // Throttled frame request for performance (cinematic 12fps noise)
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(renderNoise);
      }, 1000 / 12);
    };

    renderNoise();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9000] opacity-50 mix-blend-multiply"
      style={{ transform: "translateZ(0)" }}
    />
  );
}
