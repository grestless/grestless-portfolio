"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Trabajos", href: "#trabajos" },
  { label: "Sobre mí", href: "#about" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      // Simple show/hide animation using yPercent
      const showAnim = gsap.to(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.4,
        ease: "power2.inOut",
      });

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          // Solo ocultar si el menu mobile NO está abierto
          if (self.direction === 1 && self.scroll() > 100 && !isMenuOpen) {
            showAnim.play();
          } else {
            showAnim.reverse();
          }
        },
      });
    },
    { scope: navRef }
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Cerramos el menu al clickear un link
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle animado nativo del body para no scrollear fondo
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="editorial-px fixed top-0 left-0 z-50 flex w-full items-center justify-between py-4 md:py-6 transition-colors duration-300"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: isMenuOpen ? "transparent" : "rgba(228, 226, 221, 0.8)",
          borderBottom: isMenuOpen ? "1px solid transparent" : "1px solid var(--color-border)",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="magnetic font-display text-lg font-bold tracking-tight z-50 relative"
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          grestless<span style={{ color: "var(--color-accent)" }}>.</span>
        </a>

        {/* Links - Centrados matemáticamente con posicionamiento absoluto */}
        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm uppercase tracking-[0.15em] transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side controls (Desktop only) */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6">
          {/* CV Links */}
          <div 
            className="flex items-center gap-[0.35rem] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span className="opacity-70">Descargar CV:</span>
            <a
              href="/CV-GuillermoDGhiggia.pdf"
              download="CV_Guillermo_Ghiggia_ES.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              ES
            </a>
            <span className="opacity-40">/</span>
            <a
              href="/CV-GuillermoDGhiggiaEN.pdf"
              download="CV_Guillermo_Ghiggia_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              EN
            </a>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span className="hidden text-xs uppercase tracking-[0.15em] sm:inline"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Disponible
            </span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="relative z-50 flex flex-col items-center justify-center gap-[6px] p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span 
            className="h-[2px] w-6 bg-current transition-transform duration-300 ease-in-out" 
            style={{ transform: isMenuOpen ? "translateY(8px) rotate(45deg)" : "none", backgroundColor: "var(--color-text-primary)" }}
          />
          <span 
            className="h-[2px] w-6 bg-current transition-opacity duration-300 ease-in-out" 
            style={{ opacity: isMenuOpen ? 0 : 1, backgroundColor: "var(--color-text-primary)" }}
          />
          <span 
            className="h-[2px] w-6 bg-current transition-transform duration-300 ease-in-out" 
            style={{ transform: isMenuOpen ? "translateY(-8px) rotate(-45deg)" : "none", backgroundColor: "var(--color-text-primary)" }}
          />
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 z-40 flex flex-col justify-between px-6 pb-12 pt-32 md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "var(--color-bg-primary)",
        }}
      >
        <ul className="flex flex-col gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="font-display text-5xl font-bold tracking-tighter"
                style={{ 
                  color: "var(--color-text-primary)",
                  display: "block",
                  transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s"
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6" style={{
            transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: isMenuOpen ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s"
        }}>
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span className="text-sm uppercase tracking-[0.15em] font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Disponible
            </span>
          </div>

          {/* CV Links Mobile */}
          <div className="flex flex-col gap-2 uppercase tracking-[0.15em] text-sm font-semibold" style={{ color: "var(--color-text-secondary)" }}>
            <span className="opacity-70 text-xs">Descargar CV</span>
            <div className="flex gap-4 text-lg">
              <a href="/CV-GuillermoDGhiggia.pdf" download="CV_Guillermo_Ghiggia_ES.pdf">ES</a>
              <span className="opacity-40">/</span>
              <a href="/CV-GuillermoDGhiggiaEN.pdf" download="CV_Guillermo_Ghiggia_EN.pdf">EN</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
