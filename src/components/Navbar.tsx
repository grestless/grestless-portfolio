"use client";

import { useRef } from "react";
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
          // If we scroll down more than 100px, hide it. If we scroll up, show it.
          if (self.direction === 1 && self.scroll() > 100) {
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
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="editorial-px fixed top-0 left-0 z-50 flex w-full items-center justify-between py-4 md:py-6"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: "rgba(228, 226, 221, 0.8)", // Matching --color-bg-primary with transparency
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="magnetic font-display text-lg font-bold tracking-tight"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        grestless<span style={{ color: "var(--color-accent)" }}>.</span>
      </a>

      {/* Links */}
      <ul className="hidden items-center gap-8 md:flex">
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
    </nav>
  );
}
