// ─── Framer Motion presets ───────────────────────────────────────────────────
// Configuración global de animaciones spring.

window.SPRING      = { type: "spring", stiffness: 320, damping: 30,  mass: 0.9 };
window.SPRING_SOFT = { type: "spring", stiffness: 180, damping: 24,  mass: 1   };
window.SPRING_SNAP = { type: "spring", stiffness: 420, damping: 34,  mass: 0.7 };

// Detecta si las animaciones de Framer Motion pueden correr.
// Cuando la página carga en pestaña oculta, rAF se pausa y las entradas
// se quedan en opacity:0. En ese caso se muestra el estado final directamente.
window.CAN_ANIM = typeof document !== "undefined" ? !document.hidden : true;
if (typeof document !== "undefined" && !window.CAN_ANIM) {
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) window.CAN_ANIM = true;
  }, { once: true });
}

// Helper: devuelve el estado inicial solo si las animaciones pueden correr.
window.ini = function (state) { return window.CAN_ANIM ? state : false; };
