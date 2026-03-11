// components/InvitationCard.tsx
// Nama mempelai diambil otomatis dari weddingConfig.ts

import { WEDDING } from "../utils/weddingConfig";   // ← sesuaikan path jika perlu

interface InvitationCardProps {
  guestName: string;
}

const CORNERS = [
  { top: 14, left:  14, borderTop:    "1.5px solid rgba(255,255,255,0.4)", borderLeft:   "1.5px solid rgba(255,255,255,0.4)", borderRadius: "10px 0 0 0" },
  { top: 14, right: 14, borderTop:    "1.5px solid rgba(255,255,255,0.4)", borderRight:  "1.5px solid rgba(255,255,255,0.4)", borderRadius: "0 10px 0 0" },
  { bottom: 14, left:  14, borderBottom: "1.5px solid rgba(255,255,255,0.4)", borderLeft:   "1.5px solid rgba(255,255,255,0.4)", borderRadius: "0 0 0 10px" },
  { bottom: 14, right: 14, borderBottom: "1.5px solid rgba(255,255,255,0.4)", borderRight:  "1.5px solid rgba(255,255,255,0.4)", borderRadius: "0 0 10px 0" },
] as const;

export default function InvitationCard({ guestName }: InvitationCardProps) {
  return (
    <div
      className="floating glow-card"
      style={{
        maxWidth: 440, width: "100%", marginTop: 20,
        background: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.07) 100%)",
        border: "1.5px solid rgba(255,255,255,0.3)",
        borderRadius: 26,
        padding: "clamp(28px,6vw,50px) clamp(20px,5vw,42px)",
        textAlign: "center",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.28)",
        position: "relative",
        overflow: "hidden",
        animation: "cardIn 1s cubic-bezier(.22,1,.36,1) forwards",
      }}
    >
      {/* Sudut dekoratif */}
      {CORNERS.map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 32, height: 32, ...s }} />
      ))}

      {/* Cahaya dalam */}
      <div style={{
        position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
        width: 250, height: 250, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,180,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── The Wedding Of ── */}
      <p style={{
        color: "rgba(255,255,255,0.65)",
        fontSize: "clamp(0.62rem, 2vw, 0.75rem)",
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        marginBottom: 22,
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
      }}>
        ✦&nbsp;&nbsp;The Wedding Of&nbsp;&nbsp;✦
      </p>

      {/* ── Nama mempelai wanita ── dari weddingConfig */}
      <div className="shimmer-name" style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: "clamp(2rem, 7vw, 2.9rem)",
        fontWeight: 700, lineHeight: 1.15, marginBottom: 6,
        animation: "nameIn1 0.9s ease 0.2s both",
      }}>
        {WEDDING.bride}
      </div>

      {/* ── & ── */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: "clamp(1.6rem, 5vw, 2.1rem)",
        color: "rgba(255,255,255,0.55)",
        margin: "6px 0",
        animation: "ampIn 0.7s cubic-bezier(.34,1.56,.64,1) 0.45s both",
      }}>
        &amp;
      </div>

      {/* ── Nama mempelai pria ── dari weddingConfig */}
      <div className="shimmer-name" style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: "clamp(2rem, 7vw, 2.9rem)",
        fontWeight: 700, lineHeight: 1.15, marginBottom: 30,
        animation: "nameIn2 0.9s ease 0.6s both",
      }}>
        {WEDDING.groom}
      </div>

      {/* ── Garis pembatas ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        justifyContent: "center", marginBottom: 24,
        animation: "btnUp 0.7s ease 0.9s both",
      }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45))", animation: "lineGrow 0.8s ease 0.85s both", display: "inline-block" }} />
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>♥</div>
        <div style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.45), transparent)", animation: "lineGrow 0.8s ease 0.85s both", display: "inline-block" }} />
      </div>

      {/* ── Badge nama tamu dari URL ── */}
      <div className="guest-badge" style={{
        background: "rgba(100,180,255,0.12)",
        border: "1px solid rgba(100,180,255,0.3)",
        borderRadius: 12,
        padding: "12px 20px",
        display: "inline-block",
      }}>
        <p style={{
          color: "rgba(255,255,255,0.58)",
          fontSize: "clamp(0.7rem, 2.5vw, 0.82rem)",
          marginBottom: 5,
          fontStyle: "italic",
        }}>
          Kepada Bapak/Ibu/Saudara/i
        </p>
        <p style={{
          color: "#a8d8ff",
          fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
          fontWeight: 700,
          fontFamily: "'Dancing Script', cursive",
          textShadow: "0 2px 16px rgba(100,200,255,0.5)",
        }}>
          {guestName}
        </p>
      </div>
    </div>
  );
}
