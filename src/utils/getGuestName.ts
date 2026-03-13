/**
 * Ambil nama tamu dari URL query parameter ?to=
 *
 * Contoh:
 *   ?to=Andi           → "Andi"
 *   ?to=Budi%20Santoso → "Budi Santoso"
 *   ?to=               → "Tamu Undangan"
 *   (kosong)           → "Tamu Undangan"
 */
export function getGuestName(): string {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("to");
  if (!name || !name.trim()) return "Tamu Undangan";
  return decodeURIComponent(name);
}