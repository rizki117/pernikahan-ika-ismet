// components/IntroScreen.tsx
// Layar splash pertama kali dibuka: "You're Invited" + nama tamu

interface IntroScreenProps {
  guestName: string;
}

export default function IntroScreen({ guestName }: IntroScreenProps) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      animation: "introIn 1.2s cubic-bezier(.22,1,.36,1) forwards",
    }}>
      {/* Lingkaran berdenyut */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: "absolute",
          width:  130 + i * 65,
          height: 130 + i * 65,
          borderRadius: "50%",
          border: `1px solid rgba(255,255,255,${0.28 - i * 0.08})`,
          animation: `ringPulse ${2.5 + i * 0.6}s ease-in-out infinite`,
          animationDelay: `${i * 0.35}s`,
        }} />
      ))}

      {/* Ikon cincin */}
      <div style={{ fontSize: "4rem", marginBottom: 12, filter: "drop-shadow(0 4px 20px rgba(255,255,255,0.4))" }}>
        💍
      </div>

      {/* Judul */}
      <div style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: "clamp(2.2rem, 8vw, 3.6rem)",
        color: "#fff",
        textShadow: "0 2px 40px rgba(100,200,255,0.9)",
        textAlign: "center",
        letterSpacing: "0.02em",
        lineHeight: 1.25,
      }}>
        You're Invited
      </div>

      {/* Garis tipis */}
      <div style={{
        width: 70, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
        margin: "16px auto",
      }} />

      {/* Salam ke tamu */}
      <div style={{
        color: "rgba(255,255,255,0.75)",
        fontSize: "clamp(0.85rem, 3vw, 1.05rem)",
        letterSpacing: "0.12em",
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
      }}>
        Halo, <span style={{ color: "#a8d8ff", fontWeight: 600 }}>{guestName}</span> 👋
      </div>
    </div>
  );
}
