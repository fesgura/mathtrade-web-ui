/* A user's WhatsApp is their phone (Mi cuenta has no WhatsApp field), typed
 * in any format: "11 4577-2829", "+54 9 11 ...", "541145772829". wa.me needs
 * the international number in digits only.
 * - Starts with 54: already international, kept as is (incl. 12-digit
 *   "54" + area + number without the mobile 9).
 * - Otherwise: a local Argentine mobile; drop the trunk 0 and prefix 549. */
export const normalizeWhatsapp = (value: unknown = ""): string => {
  const digits = `${value ?? ""}`.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("54")) return digits;
  return `549${digits.replace(/^0+/, "")}`;
};

/** wa.me link for a phone/WhatsApp value, or "" when it has no digits. */
export const whatsappLink = (value: unknown = ""): string => {
  const number = normalizeWhatsapp(value);
  return number ? `https://wa.me/${number}` : "";
};
