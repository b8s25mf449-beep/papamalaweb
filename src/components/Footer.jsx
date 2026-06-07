// ─── Footer ───────────────────────────────────────────────────────────────────
// Pie de página con logo, descripción, Instagram y botón de compra.

(function () {
  function Footer() {
    return (
      <footer className="border-t-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--bone)]">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-10">
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_0.6fr]">

            {/* Columna izquierda */}
            <div>
              <div className="flex items-center gap-3">
                <img src={window.ASSET.mascotRed} alt="" className="h-12 w-12 object-contain"
                  style={{ filter: "brightness(0) invert(1)" }} />
                <span className="font-display text-[40px] uppercase leading-none tracking-tight">Papa Mala</span>
              </div>
              <p className="mt-5 max-w-[44ch] text-[15px] font-medium leading-relaxed text-[var(--bone)]/65">
                Snacks saludables de malanga, hechos en lotes pequeños. La papa que se porta mal, pero te quiere bien.
              </p>
              <a href="https://www.instagram.com/lapapamala/" target="_blank" rel="noopener noreferrer"
                className="mt-4 block font-scrawl text-[24px] text-[var(--clay)] no-underline transition-colors hover:opacity-80">
                @lapapamala
              </a>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col items-start gap-4 md:items-end">
              <BuyButton
                label="¡COMPRA YA!" price="$35 c/u"
                waMessage="Hola Papa Mala 👋 Quiero comprar bolsas a $35 c/u. ¿Cuántos sabores tienen disponibles?"
              />
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-bold uppercase tracking-tight text-[var(--bone)]/55 md:justify-end">
                <a href="#sabores"  className="no-underline hover:text-[var(--bone)]">Sabores</a>
                <a href="#origen"   className="no-underline hover:text-[var(--bone)]">Origen</a>
                <a href="#contacto" className="no-underline hover:text-[var(--bone)]">Mayoreo</a>
                <a href={"https://wa.me/" + window.WA_NUMBER} target="_blank" rel="noopener noreferrer"
                  className="no-underline hover:text-[#25D366]">WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--bone)]/15 pt-6 text-[12px] font-semibold uppercase tracking-tight text-[var(--bone)]/40">
            <span>© 2026 Papa Mala · Hecho en México</span>
            <span>Malanga real · Sin gluten · Lotes pequeños</span>
          </div>
        </div>
      </footer>
    );
  }

  window.Footer = Footer;
})();
