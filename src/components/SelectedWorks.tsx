"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  year: string;
  url: string;
  image: string;
  tech: string[];
}

const PROJECTS: Project[] = [
  {
    id: "moonparet",
    number: "01",
    title: "Moonparet",
    category: "E-commerce — Full Stack",
    description: "Tienda online integral con gestión de pagos y panel administrativo.",
    year: "2025",
    url: "https://moonparet.vercel.app/",
    image: "/projects/moonparet.png",
    tech: ["Next.js", "Supabase", "Stripe", "Tailwind CSS"],
  },
  {
    id: "yoreparo",
    number: "02",
    title: "YoReparo",
    category: "Plataforma — Full Stack",
    description: "Red de servicios que conecta profesionales técnicos con clientes.",
    year: "2025",
    url: "https://yoreparo.app/",
    image: "/projects/inicioYoRep.png",
    tech: ["React", "Next.js", "TypeScript", "PostgreSQL"],
  },
   {
    id: "hecho-arte",
    number: "03",
    title: "Hecho Arte",
    category: "Landing Page — Personal",
    description: "Experiencia visual inmersiva orientada a la exposición de productos artesanales.",
    year: "2026",
    url: "https://hecho-arte.vercel.app/",
    image: "/projects/HA.png",
    tech: ["Next.js", "React", "Tailwind CSS", "GSAP"],
  },
  {
    id: "mjm-soluciones",
    number: "04",
    title: "MJM Soluciones",
    category: "Landing Page — Corporativa",
    description: "Presencia web digital optimizada para la conversión y captación de clientes.",
    year: "2025",
    url: "https://landingmjmsoluciones.vercel.app/",
    image: "/projects/mjmSoluc.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Shadcn/ui"],
  },
];

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useGSAP(
    () => {
      /* ── Section title reveal ── */
      gsap.fromTo(
        ".works-title",
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".works-title",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── Project rows stagger ── */
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, {
      x: e.clientX - 160,
      y: e.clientY - 100,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseEnter = (projectId: string) => {
    setActiveProject(projectId);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  const activeImage = PROJECTS.find((p) => p.id === activeProject)?.image;

  return (
    <section
      ref={sectionRef}
      id="trabajos"
      className="editorial-px relative py-10 lg:py-12"
      onMouseMove={handleMouseMove}
    >
      {/* Floating preview image */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-40 hidden overflow-hidden rounded-xl md:block"
        style={{
          width: "320px",
          height: "200px",
          opacity: 0,
          transform: "scale(0.95)",
        }}
      >
        {activeImage && (
          <Image
            src={activeImage}
            alt="Project preview"
            fill
            className="object-cover"
            sizes="320px"
          />
        )}
      </div>

      {/* Section label */}
      <div className="mb-8 flex items-center gap-4">
        <span
          className="text-xs font-medium uppercase tracking-[0.3em]"
          style={{ color: "var(--color-accent)" }}
        >
          03
        </span>
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--color-border)" }}
        />
        <span
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Trabajos seleccionados
        </span>
      </div>

      {/* Title */}
      <h2
        className="works-title font-display mb-12 max-w-5xl text-4xl font-bold sm:text-5xl md:text-6xl lg:text-8xl"
        style={{ letterSpacing: "-0.04em" }}
      >
        Proyectos que <br />
        <span style={{ color: "var(--color-accent)" }}>hablan por mí.</span>
      </h2>

      {/* Project rows / Horizontal Mobile Cards */}
      <div 
        className="flex md:flex-col w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 md:gap-0 md:border-t pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
        style={{ borderColor: "var(--color-border)" }}
      >
        {PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group flex flex-col gap-4 md:gap-8 md:border-b md:py-8 lg:py-10 transition-colors duration-500 md:flex-row md:items-center md:justify-between min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-center snap-always border border-[var(--color-border)] md:border-x-0 md:border-t-0 rounded-2xl md:rounded-none p-4 md:p-0"
            style={{ borderColor: "var(--color-border)" }}
            onMouseEnter={(e) => {
              if (window.innerWidth >= 768) e.currentTarget.style.borderColor = "var(--color-text-primary)";
              handleMouseEnter(project.id);
            }}
            onMouseLeave={(e) => {
              if (window.innerWidth >= 768) e.currentTarget.style.borderColor = "var(--color-border)";
              handleMouseLeave();
            }}
          >
            {/* Mobile Image (Carrusel Card Image) */}
            <div 
              className="relative w-full aspect-[4/3] overflow-hidden rounded-xl md:hidden flex items-center justify-center p-2"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain transition-transform duration-700 group-active:scale-95 p-2"
                sizes="(max-width: 768px) 85vw, 320px"
              />
            </div>

            {/* Left: Number + Title */}
            <div className="flex flex-1 flex-col md:flex-row md:items-center gap-2 md:gap-6 lg:gap-12 py-1">
              <span
                className="font-display text-sm md:text-lg font-bold md:min-w-[3rem] lg:text-2xl"
                style={{ color: "var(--color-text-secondary)" }}
              >
                /{project.number}
              </span>
              <h3
                className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1] transition-transform duration-500 md:group-hover:translate-x-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span className="transition-colors md:group-hover:text-[var(--color-accent)] inline-block md:pb-2">
                  {project.title}
                </span>
              </h3>
            </div>

            {/* Center: Category & Description */}
            <div className="flex flex-col gap-1.5 md:gap-2 lg:w-1/3 xl:w-1/4">
              <span
                className="text-sm md:text-base lg:text-lg transition-colors duration-300"
                style={{ color: "var(--color-text-primary)" }}
              >
                {project.category}
              </span>
              <p 
                className="text-xs md:text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {project.description}
              </p>
            </div>

            {/* Right: Year + Tech */}
            <div className="flex items-center justify-between gap-4 md:justify-end lg:w-[30%] xl:w-1/4 mt-auto md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--color-border)] md:border-transparent">
              <div className="flex flex-wrap gap-2 md:justify-end">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs border px-2 py-1 rounded-full whitespace-nowrap" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <span
                className="text-sm md:text-base font-medium flex-shrink-0"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {project.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
