// ─── Marquee ──────────────────────────────────────────────────────────────────
// Banda de texto deslizante. La velocidad reacciona al scroll.
// Props: speed (segundos por vuelta completa)

(function () {
  const { useRef } = React;
  const { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity, useAnimationFrame, wrap } = window.Motion;

  const ITEMS = [
    "MALANGA REAL",
    "HORNEADA EN LOTES PEQUEÑOS",
    "REBANADO A MANO",
    "SIN GLUTEN",
    "HECHO EN MÉXICO",
    "@LAPAPAMALA",
  ];

  function Marquee({ speed = 24 }) {
    const row     = [...ITEMS, ...ITEMS];
    const baseVel = 60 / speed;
    const baseX   = useMotionValue(0);

    const { scrollY } = useScroll();
    const scrollVel   = useVelocity(scrollY);
    const smoothVel   = useSpring(scrollVel, { damping: 50, stiffness: 380 });
    const velFactor   = useTransform(smoothVel, [0, 1000], [0, 4], { clamp: false });
    const x           = useTransform(baseX, (v) => wrap(-50, 0, v) + "%");
    const dir         = useRef(-1);

    useAnimationFrame((_t, delta) => {
      let move = dir.current * baseVel * (delta / 1000);
      const vf = velFactor.get();
      if (vf < 0) dir.current = -1; else if (vf > 0) dir.current = 1;
      move += dir.current * move * vf;
      baseX.set(baseX.get() + move);
    });

    return (
      <div className="overflow-hidden border-y-2 border-[var(--ink)] bg-[var(--clay)] py-3.5">
        <motion.div className="flex w-max items-center gap-8 whitespace-nowrap" style={{ x }}>
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-[17px] uppercase tracking-[0.03em] text-[var(--bone)]">
              {t} <span className="text-[var(--ink)]">★</span>
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  window.Marquee = Marquee;
})();
