// ─── Pill ─────────────────────────────────────────────────────────────────────
// Badge/etiqueta redondeada. Uso: <Pill>Sin gluten</Pill>

(function () {
  function Pill({ children, className = "" }) {
    return (
      <span
        className={
          "inline-flex w-max items-center gap-2 whitespace-nowrap rounded-full " +
          "border-2 border-[var(--ink)] bg-[var(--bone)] px-3.5 py-1.5 " +
          "text-[12px] font-bold uppercase tracking-[0.02em] text-[var(--ink)] " +
          className
        }
      >
        {children}
      </span>
    );
  }

  window.Pill = Pill;
})();
