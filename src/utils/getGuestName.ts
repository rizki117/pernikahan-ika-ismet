/**
 * Ambil nama tamu dari URL path.
 *
 * Contoh:
 *   /Andi          → "Andi"
 *   /miah          → "miah"
 *   /Budi%20Santoso → "Budi Santoso"
 *   /              → "Tamu Undangan"
 */
export function getGuestName(): string {
  const path = window.location.pathname;
  const segment = path.replace(/^\//, "").split("/")[0];
  if (!segment) return "Tamu Undangan";
  return decodeURIComponent(segment);
}
