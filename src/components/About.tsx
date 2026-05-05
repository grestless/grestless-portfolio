"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", note: "Mi entorno principal para construir interfaces interactivas y escalables." },
      { name: "TypeScript", note: "Me ayuda a mantener el código predecible, seguro y robusto a largo plazo." },
      { name: "Tailwind CSS", note: "Ideal para maquetación ágil, manteniendo un diseño consistente." },
      { name: "GSAP", note: "Lo uso para aportar interacciones suaves que mejoren la experiencia web sin sobrecargarla." },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", note: "Para construir APIs sencillas, eficientes y fáciles de mantener." },
      { name: "Supabase / PostgreSQL", note: "Mis bases de datos de confianza para gestionar la información de forma segura." },
      { name: "C#", note: "El lenguaje donde consolidé mis bases lógicas y estructuradas en la facultad." },
    ],
  },
];

const STATS = [
  { value: "4+", label: "Proyectos en producción" },
  { value: "2025", label: "Graduado UTN" },
  { value: "100%", label: "Desarrollo End-to-End" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>(".about-reveal");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.fromTo(
        ".about-title",
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      const techItems = gsap.utils.toArray<HTMLElement>(".tech-item");
      gsap.fromTo(
        techItems,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="editorial-px relative py-10 lg:py-12"
    >
      {/* Section label */}
      <div className="about-reveal mb-8 flex items-center gap-4">
        <span
          className="text-xs font-medium uppercase tracking-[0.3em]"
          style={{ color: "var(--color-accent)" }}
        >
          02
        </span>
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--color-border)" }}
        />
        <span
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Sobre mí
        </span>
      </div>

      {/* Title */}
      <h2
        className="about-title font-display mb-12 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-8xl"
        style={{ letterSpacing: "-0.04em" }}
      >
        Diseño. Desarrollo. <br />
        <span style={{ color: "var(--color-accent)" }}>
          Despliegue.
        </span>
      </h2>

      {/* Main grid: text + stats */}
      <div className="grid gap-20 lg:grid-cols-12">
        {/* Narrative — 8 cols */}
        <div className="space-y-8 lg:col-span-8 xl:col-span-7">
          <p className="about-reveal text-xl leading-relaxed sm:text-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Soy Guillermo — desarrollador web Full Stack y técnico universitario
            en programación de la{" "}
            <span style={{ color: "var(--color-text-primary)" }}>
              Universidad Tecnológica Nacional
            </span>
            . Disfruto creando productos digitales sólidos de principio a fin.
          </p>

          <p className="about-reveal text-xl leading-relaxed sm:text-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Opero básicamente como un{" "}
            <span style={{ color: "var(--color-text-primary)" }}>
              estudio de un solo desarrollador
            </span>
            . Me encargo del ciclo de vida completo del proyecto: desde la arquitectura 
            de datos en el backend hasta la última interacción en la pantalla. Esto me 
            permite tener una visión íntegra para asegurar que todo encaje perfectamente.
          </p>

          <p className="about-reveal text-xl leading-relaxed sm:text-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Mi enfoque se basa en el aprendizaje continuo y en resolver los problemas de la 
            forma más limpia posible. Y aunque me encanta llevar proyectos de punta a punta, 
            siempre estoy dispuesto a charlar sobre nuevas tecnologías, colaborar e intercambiar ideas.
          </p>
        </div>

        {/* Stats — 4 cols */}
        <div className="flex flex-col gap-16 lg:col-span-4 lg:col-start-9 xl:col-start-9">
          {STATS.map((stat) => (
            <div key={stat.label} className="about-reveal">
              <span
                className="font-display block text-6xl font-bold md:text-7xl lg:text-8xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                {stat.value}
              </span>
              <span
                className="mt-2 block text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Espaciador explícito un poco más chico */}
      <div aria-hidden="true" className="h-12 w-full sm:h-16 md:h-20 lg:h-24" />

      {/* Tech Stack */}
      <div className="tech-grid w-full">
        <h3
          className="about-reveal mb-8 text-sm sm:text-base font-bold uppercase tracking-[0.3em]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Stack & Herramientas
        </h3>

        <div className="grid gap-16 lg:grid-cols-2">
          {TECH_STACK.map((group) => (
            <div key={group.category}>
              <span
                className="tech-item mb-4 block text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-accent)" }}
              >
                {group.category}
              </span>
              <div className="flex flex-col gap-6">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="tech-item flex flex-col gap-2"
                  >
                    <span
                      className="font-display text-2xl font-bold sm:text-3xl"
                      style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="text-base leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
