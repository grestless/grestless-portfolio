"use client";

export default function Marquee() {
  const items = [
    "NEXT.JS",
    "REACT",
    "TYPESCRIPT",
    "TAILWIND CSS",
    "GSAP",
    "NODE.JS",
    "SUPABASE",
    "POSTGRESQL",
    "UI DESIGN",
    "UX",
    "DESARROLLO WEB",
    "PERFORMANCE",
    "GIT",
  ];

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y py-5"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="animate-marquee flex w-max items-center gap-8">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className="font-display whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
