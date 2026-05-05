"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import About from "@/components/About";
import SelectedWorks from "@/components/SelectedWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Hero title reveal ── */
      const lines = gsap.utils.toArray<HTMLSpanElement>(".hero-line");
      gsap.set(lines, { yPercent: 120, rotate: 3 });
      gsap.to(lines, {
        yPercent: 0,
        rotate: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.5,
      });

      /* ── Subtitle + CTA fade in ── */
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 1.3,
        }
      );

      /* ── Scroll indicator ── */
      gsap.fromTo(
        ".scroll-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          delay: 2,
        }
      );
    },
    { scope: mainRef }
  );

  return (
    <main ref={mainRef}>
      {/* ═══ HERO ═══ */}
      <section className="editorial-px relative w-full flex min-h-[85vh] lg:min-h-[100dvh] flex-col items-center pt-[96px] pb-12 sm:pt-[120px] sm:pb-16 lg:pt-[160px] lg:pb-24 overflow-hidden">
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          {/* Tag */}
          <div className="hero-fade relative z-10 w-full max-w-4xl flex items-center justify-center gap-3 mb-4 sm:mb-6 lg:mb-10">
            <span
              className="h-2 w-2 rounded-full hidden md:block"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-center"
              style={{ color: "var(--color-text-primary)", opacity: 0.8 }}
            >
              Full Stack Developer — Tucumán, Argentina
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display relative z-10 w-full max-w-6xl text-center mt-2 font-bold leading-[0.98] sm:leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.15rem, 10vw, 6rem)" }}
          >
            {[
              "Diseño limpio.",
              "Código escalable.",
              "Webs pensadas",
              "para las personas.",
            ].map((text, i) => (
              <span key={i} className="block overflow-hidden py-0.5 sm:py-1">
                <span className="hero-line inline-block">
                  {i === 1 ? (
                    <>
                      <span style={{ color: "var(--color-accent)" }}>
                        Código
                      </span>{" "}
                      escalable.
                    </>
                  ) : (
                    text
                  )}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="hero-fade relative z-10 mt-6 sm:mt-8 max-w-lg text-center text-base sm:text-lg lg:text-xl px-2 sm:px-0"
            style={{ color: "var(--color-text-secondary)", opacity: 0.8 }}
          >
            Desarrollo web con foco en experiencia de usuario, rendimiento y
            detalles que importan.
          </p>

          {/* CTA */}
          <div className="hero-fade flex items-center justify-center gap-8 relative mt-12 z-10">
            <a
              href="#trabajos"
              className="magnetic group flex flex-col"
            >
              <div
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-200 group-hover:text-accent"
                style={{ color: "var(--color-text-primary)" }}
              >
                <span>Ver Trabajos</span>
                <span className="font-light transform transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
              <div
                className="mt-1.5 h-[1px] w-full transition-colors duration-200"
                style={{ backgroundColor: "var(--color-text-primary)" }}
              />
            </a>

            <a
              href="#contacto"
              className="magnetic whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-200"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-secondary)")
              }
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 sm:mt-10 lg:mt-14 flex flex-col items-center gap-4">
          <span
            className="block text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Scroll
          </span>
          <span
            className="scroll-line block h-10 w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-text-primary), transparent)",
            }}
          />
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="relative w-full block">
        <Marquee />
      </div>

      {/* ═══ SERVICES ═══ */}
      <Services />

      {/* ═══ ABOUT ═══ */}
      <About />

      {/* ═══ SELECTED WORKS ═══ */}
      <SelectedWorks />

      {/* ═══ MARQUEE ═══ */}
      <div className="relative w-full block py-3 lg:py-4">
        <Marquee />
      </div>

      {/* ═══ CONTACT ═══ */}
      <Contact />

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </main>
  );
}
