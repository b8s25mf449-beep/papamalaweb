// ─── GhostButton ──────────────────────────────────────────────────────────────
// Botón secundario con borde y efecto magnético.
// Uso: <GhostButton href="#sabores">Ver sabores <Ico.Arrow /></GhostButton>

(function () {
  const { motion } = window.Motion;

  function GhostButton({ children, onClick, href = "#" }) {
    const mag = window.useMagnetic(0.2);

    return (
      <motion.a
        ref={mag.ref} onMouseMove={mag.onMove} onMouseLeave={mag.reset}
        href={href} onClick={onClick}
        style={{ x: mag.x, y: mag.y }}
        whileTap={{ scale: 0.96 }}
        transition={window.SPRING}
        className="inline-flex h-14 items-center gap-2 rounded-full border-2 border-[var(--ink)]
          bg-transparent px-6 text-[15px] font-bold tracking-tight text-[var(--ink)] no-underline
          transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]"
      >
        {children}
      </motion.a>
    );
  }

  window.GhostButton = GhostButton;
})();
