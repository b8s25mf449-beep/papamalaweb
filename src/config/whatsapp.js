// ─── WhatsApp config ─────────────────────────────────────────────────────────
// Cambia WA_NUMBER a tu número real (código de país + número, sin + ni espacios)
// Ejemplo México: "529987654321"

window.WA_NUMBER = "529871752310";

window.openWhatsApp = function (msg) {
  var text = encodeURIComponent(msg || "Hola Papa Mala 👋 Me interesa saber más sobre sus productos");
  window.open("https://wa.me/" + window.WA_NUMBER + "?text=" + text, "_blank", "noopener,noreferrer");
};
