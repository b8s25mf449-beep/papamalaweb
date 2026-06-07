// ─── Reveal ───────────────────────────────────────────────────────────────────
// Animación de entrada: fade-in + slide-up con IntersectionObserver.
// Los elementos sobre el fold revelan inmediatamente al montar.
// Uso: <Reveal delay={0.1}>contenido</Reveal>

(function () {
  const { useRef, useState, useEffect } = React;
  const { motion } = window.Motion;

  function Reveal({ children, delay = 0, y = 18, className = "", as = "div" }) {
    const Comp = motion[as] || motion.div;
    const ref  = useRef(null);
    const [shown, setShown] = useState(!window.CAN_ANIM);

    useEffect(() => {
      if (!window.CAN_ANIM) return;
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) { setShown(true); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
      }, { threshold: 0.12 });
      io.observe(el);
      return () => io.disconnect();
    }, []);

    return (
      <Comp
        ref={ref}
        className={className}
        initial={window.ini({ opacity: 0, y, filter: "blur(6px)" })}
        animate={shown
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y,   filter: "blur(6px)" }
        }
        transition={{ ...window.SPRING_SOFT, delay }}
      >
        {children}
      </Comp>
    );
  }

  window.Reveal = Reveal;
})();
