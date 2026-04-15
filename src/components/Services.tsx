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
        // Volvemos a items-center para que no quede ese aire blanco gigante arriba
        className="flex h-full w-[max-content] items-center"
      >
        {/* Intro Panel: Ocupa toda la pantalla (w-screen) y se centra perfectamente */}
        <div className="editorial-px flex h-full w-screen shrink-0 flex-col justify-center lg:pl-[10vw]">
          {/* Aumentado el margen inferior en mobile de mb-6 a mb-12 */}
          <div className="mb-6 flex items-center gap-4 md:mb-8 text-balance">
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

          {/* Tamaño base ajustado a text-6xl (y un leading un poquito más suelto) para rellenar más */}
          <h2
            className="font-display max-w-5xl text-6xl font-bold leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ letterSpacing: "-0.05em" }}
          >
            Diseño, <br />
            desarrollo & <br />
            <span style={{ color: "var(--color-accent)" }}>entrega.</span>
          </h2>

          {/* Aumentado el margen superior de mt-8 a mt-12 y un texto un poquito más grande (text-xl) */}
          <div className="mt-6 max-w-md md:mt-8">
            <p className="text-xl leading-relaxed opacity-60 md:text-2xl" style={{ color: "var(--color-text-primary)" }}>
              Soluciones digitales de alto nivel enfocadas en rendimiento, estética y experiencia de usuario.
            </p>
          </div>
        </div>

        {/* Service Cards Panels */}
        {SERVICES.map((service, idx) => (
          <div
            key={service.number}
            // Altura armoniosa (h-[75%]) para que no quede ni muy corta ni muy larga
            className={`group relative flex h-[75%] w-[85vw] shrink-0 flex-col justify-between overflow-hidden border bg-[var(--color-bg-elevated)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:h-[70%] md:w-[60vw] lg:h-[75%] lg:w-[50vw] ${
              idx === 0
                ? "md:ml-[10vw]"
                : ""
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

            {/* Solución de raíz: padding dinámico forzado. 
                Min 2.5rem (40px) en mobile. Escala fluido hasta un máximo de 5rem (80px) en desktop.
                Esto es imposible que sea ignorado por el navegador o sobreescrito. */}
            <div
              className="relative z-10 flex h-full flex-col justify-between"
              style={{
                paddingTop: "clamp(2rem, 5vh, 4rem)",
                paddingBottom: "clamp(2rem, 5vh, 4rem)",
                paddingLeft: "clamp(2.5rem, 6vw, 5rem)",
                paddingRight: "clamp(1.5rem, 5vw, 4rem)",
              }}
            >
              <div className="flex flex-col gap-6 lg:gap-10">
                <div className="flex flex-col gap-2">
                  <span
                    className="font-display text-xs font-bold tracking-widest md:text-base"
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
                  className="max-w-md text-base leading-relaxed opacity-80 md:text-xl"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {service.description}
                </p>
              </div>

              <div className="mt-4 md:mt-6">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                  Tecnologías
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-[var(--color-accent)] md:text-xs"
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

        {/* Spacer at the end */}
        <div className="w-[15vw] shrink-0 md:w-[30vw] lg:w-[40vw]" />
      </div>
    </section>
  );
}
