// ─── App ──────────────────────────────────────────────────────────────────────
// Componente raíz. Orquesta todos los componentes de la página.
// Espera a que window.CMS_READY resuelva (datos del CMS) antes de montar,
// así Hero/Manifesto/Footer ya reciben los textos editables desde el primer render.

(function () {
  const { useState } = React;

  function App() {
    const [cart, { addToCart, removeFromCart }] = window.useCart();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const cartCount = cart.reduce((n, i) => n + i.qty, 0);
    const text = window.CMS_TEXT || {};

    return (
      <div className="min-h-screen bg-[var(--bone)] text-[var(--ink)]">
        <Nav cartCount={cartCount} onCartOpen={() => setDrawerOpen(true)} />
        <Hero
          logoSrc={window.ASSET.mascotSticker}
          circleColor={text.config && text.config.clayColor || "#C41E1E"}
          badge={text.hero && text.hero.badge || "Snacks saludables de malanga"}
          cmsText={text.hero}
        />
        <Marquee speed={24} />
        <Manifesto cmsText={text.manifesto} />
        <FlavorGallery cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
        <PuntosDeVenta />
        <ContactSection cmsText={text.contacto} />
        <Footer cmsText={text.footer} />

        <CartDrawer
          cart={cart}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
        />
      </div>
    );
  }

  function mount() {
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  }

  // Espera los datos del CMS (con timeout de seguridad) antes de montar.
  if (window.CMS_READY) {
    const timeout = new Promise((resolve) => setTimeout(resolve, 1500));
    Promise.race([window.CMS_READY, timeout]).then(mount);
  } else {
    mount();
  }
})();
