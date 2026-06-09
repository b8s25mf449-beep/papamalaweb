// ─── Manifesto ────────────────────────────────────────────────────────────────
// Sección "Origen" — historia de la marca con foto graffiti y pills de atributos.

(function () {
  const ATTRIBUTES = ["Sin gluten", "Hechas con ingredientes naturales", "Lotes pequeños", "Veggie"];

  function Manifesto() {
    return (
      <section id="origen" className="relative mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">

          {/* Foto graffiti */}
          <Reveal className="order-2 md:order-1">
            <div className="sticker relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[22px] border-[3px] border-[var(--ink)]">
              <img src={window.ASSET.graffiti} alt="Sticker Papa Mala" className="block w-full object-cover" />
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 md:order-2">
            <Reveal>
              <span className="font-scrawl text-[26px] font-bold text-[var(--clay)]">
                desde la cocina, con actitud
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-1 font-display text-[clamp(2.2rem,5.2vw,4rem)] uppercase leading-[0.9] tracking-tight text-[var(--ink)]">
                Snack saludable,<br />sin pedir <span className="text-[var(--clay)]">permiso.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="mt-5 max-w-[48ch] text-[16px] font-medium leading-relaxed text-[var(--ink)]/70">
              La malanga es un tubérculo noble: ligero, naturalmente sin gluten y con un crujido que no se rinde.
              Nada de polvos raros — solo malanga, aire caliente y condimentos de calidad.
            </Reveal>
            <Reveal delay={0.18} className="mt-7 flex flex-wrap gap-2.5">
              {ATTRIBUTES.map((t) => <Pill key={t}>{t}</Pill>)}
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  window.Manifesto = Manifesto;
})();
