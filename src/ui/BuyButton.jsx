// ─── BuyButton ────────────────────────────────────────────────────────────────
// Botón de compra con 3 estados: idle → loading → done.
// Al completar, abre WhatsApp con el mensaje configurado.
// Uso: <BuyButton label="Comprar" price="$35 c/u" waMessage="Hola..." />

(function () {
  const { useState, useRef, useEffect } = React;
  const { motion, AnimatePresence } = window.Motion;

  function BuyButton({ label = "Comprar ahora", price = "$120", waMessage }) {
    const [state, setState] = useState("idle"); // idle | loading | done
    const mag    = window.useMagnetic(0.28);
    const timers = useRef([]);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const click = () => {
      if (state !== "idle") return;
      setState("loading");
      timers.current.push(setTimeout(() => {
        setState("done");
        timers.current.push(setTimeout(() => {
          const msg = waMessage || `Hola Papa Mala 👋 Quiero comprar: ${label} ${price}`;
          window.openWhatsApp(msg);
        }, 300));
      }, 1200));
      timers.current.push(setTimeout(() => setState("idle"), 3400));
    };

    const tint = state === "done" ? "var(--green)" : "var(--clay)";

    return (
      <motion.button
        ref={mag.ref} onMouseMove={mag.onMove} onMouseLeave={mag.reset}
        onClick={click}
        style={{ x: mag.x, y: mag.y, backgroundColor: tint }}
        whileTap={{ scale: 0.96 }}
        transition={window.SPRING}
        className="group relative inline-flex h-14 min-w-[15.5rem] items-center justify-center gap-2.5
          overflow-hidden rounded-full px-7 text-[15px] font-bold tracking-tight text-[var(--bone)]
          shadow-[0_14px_30px_-12px_rgba(140,0,0,0.55)] ring-2 ring-[var(--ink)]"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-700 ease-out group-hover:translate-x-full" />
        <AnimatePresence mode="popLayout" initial={false}>
          {state === "idle" && (
            <motion.span key="idle" className="inline-flex items-center gap-2.5"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={window.SPRING_SNAP}>
              <Ico.WhatsApp /> <span>{label}</span>
              <span className="h-3.5 w-px bg-white/30" />
              <span className="tabular-nums opacity-80">{price}</span>
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span key="loading" className="inline-flex items-center gap-2.5"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={window.SPRING_SNAP}>
              <Spinner /> <span>Abriendo WhatsApp…</span>
            </motion.span>
          )}
          {state === "done" && (
            <motion.span key="done" className="inline-flex items-center gap-2.5"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={window.SPRING_SNAP}>
              <motion.span initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={window.SPRING_SNAP}>
                <Ico.Check />
              </motion.span>
              <span>¡En camino!</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  window.BuyButton = BuyButton;
})();
