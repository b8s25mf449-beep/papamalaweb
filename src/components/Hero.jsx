// ─── Hero ─────────────────────────────────────────────────────────────────────
// Sección principal: headline, CTA, mascota con círculo, stickers flotantes
// y contadores animados.
// Props: logoSrc, circleColor, badge

(function () {
  const { useRef, useState, useEffect } = React;
  const { motion, useSpring, animate } = window.Motion;

  /* Sticker flotante con efecto magnético y animación idle */
  function StickerChip({ children, top, left, right, rotate, delay, tint }) {
    const mag = window.useMagnetic(0.55);
    return (
      <motion.div
        ref={mag.ref} onMouseMove={mag.onMove} onMouseLeave={mag.reset}
        style={{ x: mag.x, y: mag.y, top, left, right }}
        initial={window.ini({ opacity: 0, scale: 0.5, rotate: rotate - 18 })}
        animate={{ opacity: 1, scale: 1, rotate }}
        transition={{ ...window.SPRING_SOFT, delay }}
        className="absolute z-30 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ repeat: Infinity, duration: 4.5 + delay * 2.5, ease: "easeInOut" }}
        >
          <div
            className="sticker flex items-center gap-2 rounded-full border-2 border-[var(--ink)] px-3.5 py-2"
            style={{ backgroundColor: tint }}
          >
            <span
              className="text-[13px] font-bold uppercase tracking-tight"
              style={{ color: tint === "var(--ink)" ? "var(--bone)" : "var(--ink)" }}
            >
              {children}
            </span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  /* Contador animado por spring al entrar en el viewport */
  function CountUp({ value, suffix = "", className }) {
    const ref = useRef(null);
    const [n, setN] = useState(window.CAN_ANIM ? 0 : value);

    useEffect(() => {
      const el = ref.current; if (!el) return;
      let controls, fallback, done = false;
      const run = () => {
        if (done) return; done = true;
        if (window.CAN_ANIM && !document.hidden) {
          controls = animate(0, value, {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setN(Math.round(v)),
          });
        }
        fallback = setTimeout(() => setN(value), 1400);
      };
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) run(); }),
        { threshold: 0.4 }
      );
      io.observe(el);
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 9999) * 0.95) run();
      return () => { io.disconnect(); controls && controls.stop(); clearTimeout(fallback); };
    }, [value]);

    return <span ref={ref} className={className}>{n}{suffix}</span>;
  }

  /* Hero principal */
  function Hero({
    logoSrc     = window.ASSET.mascotSticker,
    circleColor = "#C41E1E",
    badge       = "Snacks saludables de malanga",
  }) {
    const STATS = [
      ["100", "%",  "malanga real"],
      [null,  null, "Crujido Garantizado"],
      ["11",  "",   "sabores con actitud"],
    ];

    return (
      <section className="relative overflow-hidden">
        <div className="halftone pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-8 pt-8 md:px-10 md:pt-14 lg:grid-cols-[1.02fr_0.98fr]">

          {/* Copy */}
          <div className="relative z-10">
            <Reveal delay={0.05}>
              <Pill className="whitespace-nowrap">
                <span className="inline-grid h-3.5 w-3.5 place-items-center text-[var(--clay)]"><Ico.Leaf /></span>
                {badge}
              </Pill>
            </Reveal>

            <h1 className="mt-5 font-display text-[clamp(2.9rem,6.6vw,5.4rem)] uppercase leading-[0.9] tracking-[0.005em] text-[var(--ink)]">
              {["La papa", "que se", "porta"].map((t, i) => (
                <Reveal key={t} as="span" delay={0.08 + i * 0.07} className="block">{t}</Reveal>
              ))}
              <Reveal key="mal" as="span" delay={0.28} className="block">
                <span className="relative inline-block">
                  <span className="text-[var(--clay)]">mal</span>
                  <span className="text-[var(--ink)]">.</span>
                  <motion.span
                    className="absolute -bottom-[0.04em] left-0 z-0 block h-[0.1em] w-[1.55em] bg-[var(--clay)]"
                    initial={window.ini({ scaleX: 0, originX: 0 })}
                    animate={{ scaleX: 1 }}
                    transition={{ ...window.SPRING_SOFT, delay: 0.55 }}
                  />
                </span>
              </Reveal>
            </h1>

            <Reveal delay={0.36} className="mt-7 max-w-[34ch] text-[16.5px] font-medium leading-relaxed text-[var(--ink)]/70">
              Malanga rebanada a mano, horneada en lotes pequeños y preparada con ingredientes de calidad.
              Crujiente con mala actitud, pero buena conciencia.
            </Reveal>

            <Reveal delay={0.4} className="mt-8 flex flex-wrap items-center gap-3">
              <BuyButton
                label="Comprar a Mayoreo" price="$1550"
                waMessage="Hola Papa Mala 👋 Me interesa una compra a mayoreo. ¿Me pueden dar más información?"
              />
              <GhostButton href="#sabores">Ver sabores <Ico.Arrow /></GhostButton>
            </Reveal>

            <Reveal delay={0.48} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              {STATS.map(([n, suf, t]) => (
                <div key={t} className="flex items-baseline gap-2">
                  {n !== null
                    ? <><CountUp value={Number(n)} suffix={suf} className="font-display text-[30px] leading-none text-[var(--clay)]" />
                        <span className="max-w-[10ch] text-[12.5px] font-semibold leading-tight text-[var(--ink)]/60">{t}</span></>
                    : <span className="font-display text-[22px] uppercase leading-tight tracking-tight text-[var(--clay)]">{t}</span>
                  }
                </div>
              ))}
            </Reveal>
          </div>

          {/* Producto visual */}
          <div className="relative">
            <motion.div
              initial={window.ini({ opacity: 0, scale: 0.9, y: 26 })}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...window.SPRING_SOFT, delay: 0.18 }}
              className="relative mx-auto aspect-square w-full max-w-[480px]"
            >
              {/* Disco rojo */}
              <div className="absolute inset-0 grid place-items-center">
                <motion.div
                  initial={window.ini({ scale: 0.7, opacity: 0 })}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ...window.SPRING_SOFT, delay: 0.1 }}
                  style={{ backgroundColor: circleColor }}
                  className="h-[88%] w-[88%] rounded-full ring-[3px] ring-[var(--ink)]"
                />
              </div>
              {/* Mascota */}
              <motion.img
                src={logoSrc} alt="Mascota Papa Mala"
                initial={window.ini({ opacity: 0, rotate: -8, scale: 0.8 })}
                animate={{ opacity: 1, rotate: -4, scale: 1 }}
                transition={{ ...window.SPRING, delay: 0.3 }}
                whileHover={{ rotate: 2, scale: 1.04 }}
                style={{ filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.28))" }}
                className="absolute inset-0 z-10 m-auto h-[82%] w-[82%] object-contain"
              />
            </motion.div>

            {/* Sticker bowl */}
            <motion.div
              initial={window.ini({ opacity: 0, y: 30, rotate: 6 })}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ ...window.SPRING_SOFT, delay: 0.42 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              className="sticker absolute -bottom-2 left-0 z-30 hidden w-[44%] overflow-hidden rounded-2xl border-[3px] border-[var(--ink)] bg-[var(--paper)] sm:block md:-left-2"
            >
              <img src={window.ASSET.bowl} alt="Chips de malanga Papa Mala" className="block aspect-square w-full object-cover" />
            </motion.div>

            <StickerChip top="4%"  right="2%"  rotate={6}  delay={0.60} tint="var(--bone)">Sin gluten</StickerChip>
            <StickerChip top="40%" left="-3%"  rotate={-7} delay={0.74} tint="var(--ink)">Hecho a mano</StickerChip>
          </div>
        </div>
      </section>
    );
  }

  window.Hero = Hero;
})();
