"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    title: "Desarrollo Frontend",
    description:
      "Interfaces modernas con React y Next.js. Tipografía, color, movimiento — cada detalle cuenta para que el producto se sienta vivo.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    number: "02",
    title: "Desarrollo Backend",
    description:
      "APIs REST, autenticación, bases de datos, pasarelas de pago. La infraestructura invisible que hace que todo funcione sin fricciones.",
    tools: ["Node.js", "Express", "Supabase", "PostgreSQL", "Stripe"],
  },
  {
    number: "03",
    title: "Diseño UI/UX",
    description:
      "Diseño centrado en el usuario. No sigo tendencias — resuelvo problemas con interfaces claras, rápidas y que generan confianza.",
    tools: ["Figma", "Prototipado", "Sistemas de diseño", "Testing"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = scrollContentRef.current;
      if (!container) return;

      const getScrollDistance = () => container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative flex h-screen w-full items-center overflow-hidden"
    >
      <div
        ref={scrollContentRef}
        className="flex h-full w-[max-content] items-center"
      >
        {/* Intro Panel (Pins to screen width initially) */}
        <div className="editorial-px flex h-full w-screen shrink-0 flex-col justify-start pt-[15vh] md:justify-center md:pt-0 lg:pl-[10vw]">
          <div className="mb-10 flex items-center gap-4 md:mb-16">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.4em] md:text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Servicios / Especialidades
            </span>
          </div>

          <h2
            className="font-display max-w-5xl text-5xl font-bold leading-[0.85] sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ letterSpacing: "-0.05em" }}
          >
            Diseño, <br />
            desarrollo & <br />
            <span style={{ color: "var(--color-accent)" }}>entrega.</span>
          </h2>

          <div className="mt-8 max-w-md md:mt-12">
            <p className="text-lg opacity-60 md:text-xl" style={{ color: "var(--color-text-primary)" }}>
              Soluciones digitales de alto nivel enfocadas en rendimiento, estética y experiencia de usuario.
            </p>
          </div>
        </div>

        {/* Service Cards Panels */}
        {SERVICES.map((service, idx) => (
          <div
            key={service.number}
            className={`group relative flex h-[75%] md:h-[70%] lg:h-[75%] w-[85vw] shrink-0 flex-col justify-between overflow-hidden border bg-[var(--color-bg-elevated)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:w-[60vw] lg:w-[50vw] ${idx === 0 ? "ml-[10vw] mr-6 md:ml-[15vw] md:mr-12" : "mx-6 md:mx-12"
              }`}
            style={{ borderColor: "var(--color-border)" }}
          >
            {/* Massive Background Number (Outline Style) */}
            <span
              className="font-display absolute -right-4 -top-8 z-0 text-[180px] font-bold opacity-10 transition-all duration-700 group-hover:-translate-x-6 group-hover:scale-110 sm:text-[220px] md:-right-8 md:-top-12 md:text-[300px]"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-text-primary)",
              }}
            >
              {service.number}
            </span>

            <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-16 lg:p-20">
              <div className="flex flex-col gap-8 lg:gap-12">
                <div className="flex flex-col gap-2">
                  <span
                    className="font-display text-sm font-bold tracking-widest md:text-base"
                    style={{ color: "var(--color-accent)" }}
                  >
                    SERVICIO {service.number}
                  </span>
                  <h3
                    className="font-display text-4xl font-bold leading-[0.9] sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {service.title.split(" ").map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h3>
                </div>

                <p
                  className="max-w-md text-lg leading-relaxed opacity-80 md:text-xl"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {service.description}
                </p>
              </div>

              <div className="mt-12">
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                  Tecnologías
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-[var(--color-accent)] md:text-xs"
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Spacer at the end so the last card doesn't perfectly hug the viewport right edge */}
        <div className="w-[15vw] shrink-0 md:w-[30vw] lg:w-[40vw]" />
      </div>
    </section>
  );
}
