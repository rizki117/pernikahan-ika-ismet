// ============================================================
//  weddingConfig.ts
//  ✏️  Edit file ini untuk mengubah semua data undangan
//  Satu file ini akan otomatis dipakai di seluruh aplikasi
// ============================================================

export const WEDDING = {

  // ── Nama Mempelai ──────────────────────────────────────
  bride: "Ika Widiya",     
  brideFull: "Ika Widya", 
  brideRole: "Putri pertama dari",
  brideEmoji: "👰",

  groom: "Masteng",  
  groomFull: "Masteng",
  groomRole: "Putra Bungsu dari",
  groomEmoji: "🤵",

  // Inisial (untuk halaman penutup / ClosingSection)
  initials: "I & M",

  // ── Tanggal & Waktu ─────────────────────────────────────
  date: "Sabtu 12 Desember 2026",
  time: "08.00 – selesai",
  resepsiDate: "Sabtu 12 Desember 2026",
  akadDate: "Sabtu 12 Desember 2026",
  // ── Lokasi Akad ─────────────────────────────────────────
  akad: {
    label: "Akad Nikah",
      
    time:  "08:30",
    venue: "Kp.Babakansalam RT/RW 003/002",
    address: "Jl.Saketi Malingping",
    mapsUrl: "https://maps.app.goo.gl/wS7ZJnEk4RPK2uTP9",
  },

  // ── Lokasi Resepsi ──────────────────────────────────────
  resepsi: {
    label: "Resepsi",
    
    
    time:  "09.00 WIB – Selesai",
    venue: "Kp.Babakansalam RT/RW 003/002",
    address: "Jl. Saketi Malingping",
    mapsUrl: "https://maps.app.goo.gl/QJYY568ZvBK6Nfb8A",
  },

  // ── Orang Tua ───────────────────────────────────────────
  brideParents:  "Bapak Sumar & Ibu Koyat",
  groomParents:  "Bapak Adung & Ibu Nani",

  // Detail orang tua untuk CoupleSection (baris per baris)
  
  brideParentsDetail: ["Bapak Ganjar", "dan", "Ibu Cantika"],
  
  groomParentsDetail: ["Bapak Ahdi", "dan", "Ibu Nina"],

  // ── Rekening / Gift ─────────────────────────────────────
  bankAccounts: [
    { bank: "Mandiri", name: "Masteng", number: "098*******" },
    
    { bank: "GoPay",   name: "Ika",   number: "0812******" }, 
  ],

  // ── Kontak / RSVP ───────────────────────────────────────
  rsvpWhatsApp: "6281234567890",   // format: kode negara + nomor

  // ── Kutipan / Quote ─────────────────────────────────────
  quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri.",
  quoteSource: "QS. Ar-Rum: 21",

} as const;

// ── Tipe ekspor (opsional, untuk autocomplete) ──
export type WeddingConfig = typeof WEDDING;
