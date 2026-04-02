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
      { name: "React / Next.js", note: "Mi herramienta principal. CSR, SSR, ISR según lo que pida el proyecto." },
      { name: "TypeScript", note: "Porque el código se documenta solo." },
      { name: "Tailwind CSS", note: "Prototipado rápido sin perder control." },
      { name: "GSAP", note: "Para animaciones que se sienten, no que se notan." },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", note: "APIs REST rápidas y mantenibles." },
      { name: "Supabase / PostgreSQL", note: "Auth + DB + Storage. Todo en uno." },
      { name: "C#", note: "Formación universitaria sólida." },
    ],
  },
];

const STATS = [
  { value: "4+", label: "Proyectos en producción" },
  { value: "2025", label: "Graduado UTN" },
  { value: "∞", label: "Ganas de aprender" },
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
      className="editorial-px relative py-32 lg:py-48"
    >
      {/* Section label */}
      <div className="about-reveal mb-16 flex items-center gap-4">
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
        className="about-title font-display mb-24 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-8xl"
        style={{ letterSpacing: "-0.04em" }}
      >
        Construyo para la web <br />
        <span style={{ color: "var(--color-accent)" }}>
          desde Tucumán al mundo.
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
            . Me especializo en crear interfaces que combinan rendimiento con
            experiencia de usuario.
          </p>

          <p className="about-reveal text-xl leading-relaxed sm:text-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Mi enfoque es simple:{" "}
            <span style={{ color: "var(--color-text-primary)" }}>
              cada pixel importa, cada milisegundo cuenta
            </span>
            . No sigo tendencias por moda — elijo herramientas porque resuelven
            problemas reales. Y si algo se puede animar para que se sienta
            mejor, lo animo.
          </p>

          <p className="about-reveal text-xl leading-relaxed sm:text-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Cuando no estoy programando, probablemente estoy desarmando algún
            sitio web para entender cómo lo hicieron.
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
                className="mt-4 block text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="tech-grid mt-32 lg:mt-48">
        <h3
          className="about-reveal mb-16 text-sm sm:text-base font-bold uppercase tracking-[0.3em]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Stack & Herramientas
        </h3>

        <div className="grid gap-16 lg:grid-cols-2">
          {TECH_STACK.map((group) => (
            <div key={group.category}>
              <span
                className="tech-item mb-8 block text-sm font-bold uppercase tracking-[0.2em]"
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
