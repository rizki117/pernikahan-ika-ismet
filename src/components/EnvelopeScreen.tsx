// components/EnvelopeScreen.tsx
// Amplop interaktif: bisa dibuka untuk menuju kartu undangan

interface EnvelopeScreenProps {
  guestName:   string;
  isOpening:   boolean;   // true saat animasi buka sedang berjalan
  onOpen:      () => void;
}

const SPARKLES = [
  { top: -24, left:  -28, delay: "0s"   },
  { top: -16, right: -36, delay: "0.5s" },
  { bottom: 8, left: -22, delay: "1s"   },
  { bottom: 0, right: -28, delay: "0.7s"},
] as const;

export default function EnvelopeScreen({ guestName, isOpening, onOpen }: EnvelopeScreenProps) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 40,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 28, padding: "0 24px",
    }}>
      <div style={{
        animation: isOpening
          ? "envOut 1s cubic-bezier(.5,0,.75,0) forwards"
          : "envIn 0.9s cubic-bezier(.22,1,.36,1) forwards",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 22,
      }}>

        {/* ── Amplop SVG ── */}
        <div style={{ position: "relative" }}>
          {/* Bintang-bintang berkilau */}
          {SPARKLES.map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              top: "top" in s ? s.top : undefined,
              left: "left" in s ? s.left : undefined,
              bottom: "bottom" in s ? s.bottom : undefined,
              right: "right" in s ? s.right : undefined,
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.8)",
              animation: `sparkle 2.5s ease-in-out infinite`,
              animationDelay: s.delay,
            }}>✦</div>
          ))}

          <svg
            width="240" height="170" viewBox="0 0 240 170" fill="none"
            style={{ filter: "drop-shadow(0 16px 48px rgba(100,180,255,0.45))" }}
          >
            {/* Badan amplop */}
            <rect x="2" y="35" width="236" height="133" rx="12"
              fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5"/>

            {/* Penutup amplop (animasi buka saat isOpening) */}
            <path d="M2 47 L120 108 L238 47"
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"
              style={{
                transformOrigin: "120px 47px",
                animation: isOpening ? "lidOpen 0.7s cubic-bezier(.5,0,.75,0) 0.1s both" : "none",
              }}
            />

            {/* Lipatan bawah */}
            <path d="M2 168 L120 110 L238 168"
              fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>

            {/* Stempel lilin */}
            <circle cx="120" cy="108" r="20"
              fill="rgba(91,164,229,0.55)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <text x="120" y="114" textAnchor="middle" fontSize="16" fill="white" fontFamily="serif">♥</text>

            {/* Garis dekoratif */}
            <line x1="40" y1="130" x2="200" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 6"/>
            <line x1="40" y1="148" x2="200" y2="148" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 6"/>
          </svg>
        </div>

        {/* ── Nama tamu ── */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "clamp(0.68rem, 2.2vw, 0.8rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}>
            Kepada yang terhormat
          </p>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
            color: "#a8d8ff",
            textShadow: "0 2px 20px rgba(100,200,255,0.6)",
            fontWeight: 700,
          }}>
            {guestName}
          </p>
        </div>

        {/* ── Tombol buka ── */}
        <button
          className="btn-main"
          onClick={onOpen}
          style={{
            background: "linear-gradient(135deg, rgba(100,180,255,0.28), rgba(150,100,255,0.28))",
            border: "1.5px solid rgba(255,255,255,0.45)",
            borderRadius: 50,
            padding: "clamp(12px,3vw,15px) clamp(30px,8vw,52px)",
            color: "#fff",
            fontSize: "clamp(0.88rem, 3vw, 1rem)",
            cursor: "pointer",
            letterSpacing: "0.1em",
            fontFamily: "'Cormorant Garamond', serif",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(100,180,255,0.28)",
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>✉</span> Buka Undangan
        </button>
      </div>
    </div>
  );
}
