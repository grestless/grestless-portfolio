export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="editorial-px flex min-h-[100px] flex-col items-start justify-between gap-8 border-t py-24 lg:py-32 sm:flex-row sm:items-center"
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
        Diseñado y desarrollado por mí, con café y{" "}
        <span
          className="select-none"
          title="Hiciste bien en inspeccionar esto 👀"
          style={{ color: "var(--color-accent)" }}
        >
          obsesión por los detalles
        </span>
        .
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
