// ─── Spinner ──────────────────────────────────────────────────────────────────
// Anillo de carga animado. Uso: <Spinner size={18} />

(function () {
  const { motion } = window.Motion;

  function Spinner({ size = 18 }) {
    return (
      <motion.svg
        width={size} height={size} viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 0.7 }}
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.4" />
        <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </motion.svg>
    );
  }

  window.Spinner = Spinner;
})();
