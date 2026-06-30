// ─── CMS Loader ───────────────────────────────────────────────────────────────
// Conecta con el CMS (cms-webproject.vercel.app) para traer los datos en vivo:
// sabores, puntos de venta y textos editables. Si el CMS no responde, usa los
// valores estáticos de flavors.js / plazas.js / config como respaldo (fallback).
//
// window.CMS_READY es una Promise que App.jsx espera antes de montar React,
// así los datos siempre están listos antes del primer render.

(function () {
  var CMS_API = 'https://cms-webproject.vercel.app/api/site/papamala';

  window.CMS_READY = fetch(CMS_API, { cache: 'no-store' })
    .then(function (res) {
      if (!res.ok) throw new Error('CMS respondió ' + res.status);
      return res.json();
    })
    .then(function (data) {
      if (data.error) throw new Error(data.error);

      var c = data.collections || {};

      // ── Sabores ──
      if (Array.isArray(c.sabores) && c.sabores.length) {
        window.FLAVORS = c.sabores
          .filter(function (s) { return s.visible !== false; })
          .map(function (s, i) {
            return {
              id: s.id || 'fl-' + i,
              name: s.name, note: s.note, tint: s.tint, ink: s.ink,
              kcal: s.kcal, tag: s.tag, price: s.price,
            };
          });
      }

      // ── Puntos de venta ──
      if (Array.isArray(c.plazas) && c.plazas.length) {
        window.PLAZAS = c.plazas
          .filter(function (p) { return p.visible !== false; })
          .map(function (p) {
            return {
              city: p.city, state: p.state, tint: p.tint, ink: p.ink, tag: p.tag,
              points: p.points || [],
            };
          });
      }

      // ── Textos editables ──
      window.CMS_TEXT = {
        hero: data.hero || {},
        manifesto: data.manifesto || {},
        contacto: data.contacto || {},
        footer: data.footer || {},
      };

      // ── Config (WhatsApp, colores) ──
      if (data.config) {
        if (data.config.waNumber) window.WA_NUMBER = data.config.waNumber;
        if (data.config.clayColor) {
          document.documentElement.style.setProperty('--clay', data.config.clayColor);
        }
      }

      console.log('[CMS] Datos cargados desde', CMS_API);
      return data;
    })
    .catch(function (err) {
      // Fallback silencioso: el sitio sigue funcionando con los datos
      // estáticos de flavors.js / plazas.js si el CMS no responde.
      console.warn('[CMS] No se pudo conectar, usando datos locales:', err.message);
      window.CMS_TEXT = window.CMS_TEXT || {};
      return null;
    });
})();
