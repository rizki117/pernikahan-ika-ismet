// components/EventDetails.tsx
// Shortcut navigasi — klik langsung scroll ke section tujuan

import { WEDDING } from "../utils/weddingConfig";

// Fungsi scroll halus ke section berdasarkan id
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const SHORTCUTS = [
  { icon: "📅", label: "Tanggal", sub: WEDDING.resepsiDate,      target: "section-acara"  },
  { icon: "⏰", label: "Waktu",   sub: WEDDING.resepsi.time,     target: "section-acara"  },
  { icon: "📍", label: "Lokasi",  sub: WEDDING.resepsi.venue,    target: "section-acara"  },
  { icon: "🎊", label: "Acara",   sub: "Resepsi Pernikahan",     target: "section-acara"  },
  { icon: "🖼️", label: "Potret",  sub: "Gallery",                target: "section-galeri" },
  { icon: "💎", label: "Rewards", sub: "Gifts",                  target: "section-gifts"  },
];

export default function EventDetails() {
  return (
    <div style={{
      marginTop: 20,
      maxWidth: 440,
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      animation: "detailsIn 0.7s cubic-bezier(.22,1,.36,1) forwards",
    }}>
      {SHORTCUTS.map((item, i) => (
        <button
          key={item.label}
          onClick={() => scrollTo(item.target)}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: 16,
            padding: "clamp(12px,3vw,18px) clamp(10px,2vw,14px)",
            textAlign: "center",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            animation: `detailsIn 0.6s ease ${i * 0.08}s both`,
            transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(100,180,255,0.25)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(0.97)";
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {/* Ikon */}
          <div style={{ fontSize: "1.4rem" }}>{item.icon}</div>

          {/* Label */}
          <div style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.58rem, 1.8vw, 0.68rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            {item.label}
          </div>

          {/* Nilai */}
          <div style={{
            color: "#fff",
            fontSize: "clamp(0.72rem, 2.5vw, 0.84rem)",
            fontWeight: 600,
            lineHeight: 1.3,
          }}>
            {item.sub}
          </div>

          {/* Panah kecil */}
          <div style={{
            color: "rgba(100,180,255,0.7)",
            fontSize: "0.65rem",
            marginTop: 2,
          }}>
            ↓ lihat
          </div>
        </button>
      ))}
    </div>
  );
}
