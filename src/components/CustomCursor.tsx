"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // quickTo is highly optimized for constantly changing values like mouse position
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

    // Increased duration for the ring gives it the distinct "lag/follow" feel
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3" });

    // Track active magnetic element
    let activeMagnetic: HTMLElement | null = null;
    let magneticProps = { h: 0, v: 0, left: 0, top: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      xToDot(clientX);
      yToDot(clientY);

      // Normal tracking unless hovered over a magnetic element
      if (!activeMagnetic) {
        xToRing(clientX);
        yToRing(clientY);
      } else {
        // Calculate offset from center of the magnetic button
        const x = clientX - magneticProps.left - magneticProps.h;
        const y = clientY - magneticProps.top - magneticProps.v;

        // Move the ring exactly to the center of the magnetic button + pull fraction
        xToRing(magneticProps.left + magneticProps.h + x * 0.1);
        yToRing(magneticProps.top + magneticProps.v + y * 0.1);

        // Move the button itself slightly towards the mouse
        gsap.to(activeMagnetic, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Interactive element setups
    const setupInteractives = () => {
      // 1. Setup Magnetic Physics Elements
      document.querySelectorAll(".magnetic").forEach((el) => {
        const htmlEl = el as HTMLElement;

        const enter = () => {
          gsap.to(ring, { scale: 1.5, opacity: 0.3, duration: 0.3 });
          gsap.to(dot, { scale: 0, duration: 0.3 });

          activeMagnetic = htmlEl;
          const rect = htmlEl.getBoundingClientRect();
          magneticProps = {
            h: rect.width / 2,
            v: rect.height / 2,
            left: rect.left,
            top: rect.top,
          };
        };

        const leave = () => {
          gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
          gsap.to(dot, { scale: 1, duration: 0.3 });

          activeMagnetic = null;
          // Snap button back to original position
          gsap.to(htmlEl, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
          });
        };

        if (!htmlEl.dataset.magneticInit) {
          htmlEl.addEventListener("mouseenter", enter);
          htmlEl.addEventListener("mouseleave", leave);
          htmlEl.dataset.magneticInit = "true";
        }
      });

      // 2. Setup Standard Interactive Hover (links, buttons without magnetic class)
      const interactives = document.querySelectorAll(
        'a:not(.magnetic), button:not(.magnetic), [data-cursor="hover"]'
      );
      interactives.forEach((el) => {
        const htmlEl = el as HTMLElement;

        const enter = () => {
          gsap.to(ring, {
            scale: 2.5,
            opacity: 0.4,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
        };

        const leave = () => {
          gsap.to(ring, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        if (!htmlEl.dataset.hoverInit) {
          htmlEl.addEventListener("mouseenter", enter);
          htmlEl.addEventListener("mouseleave", leave);
          htmlEl.dataset.hoverInit = "true";
        }
      });
    };

    setupInteractives();

    // Re-run upon DOM mutation for new elements
    const observer = new MutationObserver(() => {
      setupInteractives();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          top: "-3px",
          left: "-3px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--color-accent)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998]"
        style={{
          top: "-16px",
          left: "-16px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid var(--color-accent)",
          opacity: 1,
          willChange: "transform",
        }}
      />
    </div>
  );
}
