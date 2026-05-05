export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="editorial-px flex min-h-[100px] flex-col items-start justify-between gap-8 border-t py-10 lg:py-12 sm:flex-row sm:items-center"
      style={{ borderColor: "var(--color-border)" }}
    >
      <span
        className="text-xs"
        style={{ color: "var(--color-text-secondary)" }}
      >
        © {currentYear} Guillermo D. Ghiggia
      </span>

      <span
        className="text-xs"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Crafted in Argentina.{" "}
        <span
          className="select-none"
          title="Hiciste bien en inspeccionar esto 👀"
          style={{ color: "var(--color-accent)" }}
        >
          Built for the web.
        </span>
      </span>

      {/* Easter egg — local time */}
      <span
        className="text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--color-border)" }}
        title="Zona horaria: GMT-3 (Tucumán)"
      >
        Tucumán, AR
      </span>
    </footer>
  );
}
