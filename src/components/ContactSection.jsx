// ─── ContactSection ───────────────────────────────────────────────────────────
// Sección de contacto: botón toggle que revela un formulario.
// Al enviar, formatea los datos y abre WhatsApp con el mensaje pre-llenado.

(function () {
  const { useState, useRef, useEffect } = React;
  const { motion, AnimatePresence } = window.Motion;

  /* Campo de formulario reutilizable */
  function Field({ label, type = "text", name, value, onChange, required, textarea, placeholder }) {
    const cls =
      "w-full rounded-[14px] border-2 border-[var(--ink)] bg-[var(--paper)] px-4 py-3 " +
      "text-[15px] font-medium text-[var(--ink)] placeholder:text-[var(--ink)]/35 " +
      "outline-none transition-shadow focus:shadow-[0_0_0_3px_var(--clay)]";
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--ink)]/55">
          {label}{required && <span className="text-[var(--clay)]"> *</span>}
        </span>
        {textarea
          ? <textarea name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} rows={4} className={cls + " resize-none"} />
          : <input   type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className={cls} />
        }
      </label>
    );
  }

  /* Sección completa */
  function ContactSection() {
    const [open,  setOpen]  = useState(false);
    const [state, setState] = useState("idle"); // idle | sending | done
    const [form,  setForm]  = useState({ nombre: "", correo: "", telefono: "", ciudad: "", mensaje: "" });
    const timers = useRef([]);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const submit = (e) => {
      e.preventDefault();
      if (state === "sending") return;
      setState("sending");

      timers.current.push(setTimeout(() => {
        setState("done");
        // Construye el mensaje para WhatsApp con los datos del formulario
        const lines = [
          "👋 *Nuevo contacto desde Papa Mala*",
          "",
          `*Nombre:*   ${form.nombre}`,
          form.correo   ? `*Correo:*    ${form.correo}`    : null,
          form.telefono ? `*Teléfono:*  ${form.telefono}`  : null,
          form.ciudad   ? `*Ciudad:*    ${form.ciudad}`    : null,
          form.mensaje  ? `\n*Mensaje:*\n${form.mensaje}`  : null,
        ].filter(Boolean).join("\n");
        window.openWhatsApp(lines);
      }, 1400));

      timers.current.push(setTimeout(() => {
        setState("idle");
        setOpen(false);
        setForm({ nombre: "", correo: "", telefono: "", ciudad: "", mensaje: "" });
      }, 3800));
    };

    return (
      <section id="contacto" className="relative overflow-hidden border-t-2 border-[var(--ink)] bg-[var(--tan)]/40 py-16 md:py-20">
        <div className="halftone pointer-events-none absolute inset-0 opacity-[0.08]" />
        <div className="relative mx-auto max-w-[1280px] px-5 text-center md:px-10">

          <Reveal><span className="font-scrawl text-[26px] font-bold text-[var(--clay)]">¿hablamos?</span></Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-1 font-display text-[clamp(2.2rem,5.5vw,4rem)] uppercase leading-[0.9] tracking-tight text-[var(--ink)]">
              Pide a <span className="text-[var(--clay)]">mayoreo</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mx-auto mt-4 max-w-[44ch] text-[16px] font-medium leading-relaxed text-[var(--ink)]/65">
            Déjanos tus datos y te contactamos para surtir tu tienda, evento o antojo en grande.
          </Reveal>

          {/* Botón toggle */}
          <Reveal delay={0.18} className="mt-8">
            <motion.button
              onClick={() => setOpen((o) => !o)}
              whileTap={{ scale: 0.96 }} transition={window.SPRING}
              className="inline-flex h-14 items-center gap-2.5 rounded-full border-2 border-[var(--ink)] bg-[var(--clay)] px-8 text-[15px] font-bold uppercase tracking-tight text-[var(--bone)] shadow-[0_14px_30px_-12px_rgba(140,0,0,0.55)]"
            >
              <Ico.WhatsApp /> Contacto
              <motion.span animate={{ rotate: open ? 90 : 0 }} transition={window.SPRING}><Ico.Arrow /></motion.span>
            </motion.button>
          </Reveal>

          {/* Formulario animado */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div key="form"
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={window.SPRING_SOFT}
                className="mx-auto w-full max-w-[560px] overflow-hidden"
              >
                <form onSubmit={submit}
                  className="sticker mt-8 rounded-[24px] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-6 text-left md:p-8"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {state === "done"
                      ? (
                        <motion.div key="ok"
                          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                          transition={window.SPRING_SNAP}
                          className="flex flex-col items-center gap-3 py-8 text-center"
                        >
                          <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-[var(--ink)] bg-[var(--green)] text-[var(--bone)] text-[26px]">
                            <Ico.Check />
                          </span>
                          <h3 className="font-display text-[26px] uppercase leading-none tracking-tight text-[var(--ink)]">¡Recibido!</h3>
                          <p className="max-w-[34ch] text-[14px] font-medium text-[var(--ink)]/60">
                            Gracias, {form.nombre || "amig@"}. Abrimos WhatsApp con tus datos.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div key="fields" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Nombre"   name="nombre"   value={form.nombre}   onChange={onChange} required placeholder="Tu nombre" />
                            <Field label="Correo"   type="email" name="correo"   value={form.correo}   onChange={onChange} required placeholder="tucorreo@mail.com" />
                            <Field label="Teléfono" type="tel"   name="telefono" value={form.telefono} onChange={onChange} placeholder="55 0000 0000" />
                            <Field label="Ciudad"   name="ciudad"   value={form.ciudad}   onChange={onChange} placeholder="Tu ciudad" />
                          </div>
                          <div className="mt-4">
                            <Field label="Mensaje" name="mensaje" value={form.mensaje} onChange={onChange} textarea
                              placeholder="¿Cuántas bolsas necesitas? ¿Para qué ocasión?…" />
                          </div>
                          <p className="mt-3 text-center text-[12px] font-medium text-[var(--ink)]/45">
                            Al enviar se abrirá WhatsApp con tus datos pre-llenados.
                          </p>
                          <motion.button type="submit"
                            whileTap={{ scale: 0.97 }} transition={window.SPRING}
                            disabled={state === "sending"}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-[var(--ink)] bg-[var(--clay)] py-3.5 text-[15px] font-bold uppercase tracking-tight text-[var(--bone)] disabled:opacity-80"
                          >
                            <AnimatePresence mode="popLayout" initial={false}>
                              {state === "sending"
                                ? <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2.5"><Spinner /> Enviando…</motion.span>
                                : <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2.5"><Ico.WhatsApp /> Enviar por WhatsApp <Ico.Arrow /></motion.span>
                              }
                            </AnimatePresence>
                          </motion.button>
                        </motion.div>
                      )
                    }
                  </AnimatePresence>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  }

  window.ContactSection = ContactSection;
})();
