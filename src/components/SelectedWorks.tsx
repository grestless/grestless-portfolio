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
  year: string;
  url: string;
  image: string;
  tech: string[];
}

const PROJECTS: Project[] = [
  {
    id: "hecho-arte",
    number: "01",
    title: "Hecho Arte",
    category: "Landing Page — E-commerce",
    year: "2025",
    url: "https://hecho-arte.vercel.app/",
    image: "/projects/HA.png",
    tech: ["Next.js", "React", "Tailwind CSS", "GSAP"],
  },
  {
    id: "moonparet",
    number: "02",
    title: "Moonparet",
    category: "E-commerce — Full Stack",
    year: "2025",
    url: "https://moonparet.vercel.app/",
    image: "/projects/moonparet.png",
    tech: ["Next.js", "Supabase", "Stripe", "Tailwind CSS"],
  },
  {
    id: "yoreparo",
    number: "03",
    title: "YoReparo",
    category: "Plataforma — Full Stack",
    year: "2025",
    url: "https://yoreparo.app/",
    image: "/projects/inicioYoRep.png",
    tech: ["React", "Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "mjm-soluciones",
    number: "04",
    title: "MJM Soluciones",
    category: "Landing Page — Corporativa",
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

      {/* Project rows */}
      <div className="flex flex-col w-full border-t" style={{ borderColor: "var(--color-border)" }}>
        {PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-row group flex flex-col gap-8 border-b py-6 transition-colors duration-500 md:flex-row md:items-center md:justify-between md:py-8 lg:py-10"
            style={{ borderColor: "var(--color-border)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-text-primary)";
              handleMouseEnter(project.id);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              handleMouseLeave();
            }}
          >
            {/* Left: Number + Title */}
            <div className="flex flex-1 items-start md:items-center gap-6 lg:gap-12 py-1">
              <span
                className="font-display text-lg font-bold md:min-w-[3rem] lg:text-2xl mt-1 md:mt-0"
                style={{ color: "var(--color-text-secondary)" }}
              >
                /{project.number}
              </span>
              <h3
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1] transition-transform duration-500 group-hover:translate-x-6"
                style={{ letterSpacing: "-0.03em", wordBreak: "break-word" }}
              >
                <span className="transition-colors lg:text-7xl md:text-6xl sm:text-5xl duration-500 group-hover:text-[var(--color-accent)] inline-block pb-2">
                  {project.title}
                </span>
              </h3>
            </div>

            {/* Center: Category */}
            <span
              className="mt-2 text-base transition-colors duration-300 md:mt-0 md:text-lg lg:w-1/4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {project.category}
            </span>

            {/* Right: Year + Arrow */}
            <div className="flex items-center justify-between gap-6 md:justify-end lg:w-1/4">
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-300"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                className="text-base font-medium"
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
