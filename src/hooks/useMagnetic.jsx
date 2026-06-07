// ─── useMagnetic ─────────────────────────────────────────────────────────────
// Hook: el elemento se desplaza suavemente hacia el cursor cuando entra en él.
// strength: 0 = sin efecto, 1 = sigue completamente al cursor.

(function () {
  const { useRef, useCallback } = React;
  const { useSpring } = window.Motion;

  function useMagnetic(strength = 0.35) {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.6 });
    const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.6 });

    const onMove = useCallback((e) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width  / 2)) * strength);
      y.set((e.clientY - (r.top  + r.height / 2)) * strength);
    }, [strength, x, y]);

    const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return { ref, x, y, onMove, reset };
  }

  window.useMagnetic = useMagnetic;
})();
