// components/sections/CoupleSection.tsx

import { useEffect } from "react";
import brideImg from "../../assets/weding/cewek.jpg";
import groomImg from "../../assets/weding/cowok.jpg";
import { WEDDING } from "../../utils/weddingConfig";

interface PersonCardProps {
  img: string;
  name: string;
  role: string;
  parentInfo: string[];
  side: "left" | "right";
  emoji: string;
}

function PersonCard({ img, name, role, parentInfo, side, emoji }: PersonCardProps) {
  const animClass = side === "left" ? "couple-slide-left" : "couple-slide-right";
  const baseDelay = side === "left" ? 0.3 : 0.6;

  return (
    <div
      className={`couple-card ${animClass}`}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 360,
        borderRadius: 28,
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
        textAlign: "center",
      }}
    >
      {/* Foto full-width bagian atas */}
      <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
        <img
          src={img}
          alt={name}
          className="couple-photo-img"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            transition: "transform 0.6s ease",
          }}
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
          }}
        />
        {/* Gradient overlay bawah foto */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: "linear-gradient(to bottom, transparent, rgba(20,40,70,0.7))",
        }} />

        {/* Badge role */}
        <div
          className="card-badge"
          style={{
            animationDelay: `${baseDelay + 0.5}s`,
            position: "absolute", bottom: 14, left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(91,164,229,0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.6)",
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 11,
            color: "#fff",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          {side === "left" ? "Mempelai Wanita" : "Mempelai Pria"}
        </div>
      </div>

      {/* Konten bawah */}
      <div style={{ padding: "22px 24px 26px" }}>

        {/* Emoji */}
        <div
          className="card-emoji"
          style={{ animationDelay: `${baseDelay + 0.6}s`, fontSize: 24, marginBottom: 8 }}
        >
          {emoji}
        </div>

        {/* Nama dengan shimmer */}
        <div
          className="card-name"
          style={{
            animationDelay: `${baseDelay + 0.75}s`,
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.7rem, 5.5vw, 2.1rem)",
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          {name}
        </div>

        {/* Garis hias */}
        <div
          className="card-divider"
          style={{
            animationDelay: `${baseDelay + 0.9}s`,
            display: "flex", alignItems: "center", gap: 8,
            justifyContent: "center", marginBottom: 14,
          }}
        >
          <div style={{ height: 1, width: 30, background: "rgba(255,255,255,0.3)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
          <div style={{ height: 1, width: 30, background: "rgba(255,255,255,0.3)" }} />
        </div>

        {/* Role label */}
        <div
          className="card-role"
          style={{
            animationDelay: `${baseDelay + 1.0}s`,
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            fontFamily: "'Cormorant Garamond', serif",
            marginBottom: 4,
          }}
        >
          {role}
        </div>

        {/* Info orang tua */}
        {parentInfo.map((line, i) => (
          <div
            key={i}
            className="card-parent-line"
            style={{
              animationDelay: `${baseDelay + 1.1 + i * 0.12}s`,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: i % 2 === 0 ? 600 : 400,
              color: i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
              fontSize: i % 2 === 1 ? "0.75rem" : "0.9rem",
              lineHeight: 2,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoupleSection() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes coupleSlideLeft {
        from { opacity: 0; transform: translateX(-50px) translateY(20px); }
        to   { opacity: 1; transform: translateX(0) translateY(0); }
      }
      @keyframes coupleSlideRight {
        from { opacity: 0; transform: translateX(50px) translateY(20px); }
        to   { opacity: 1; transform: translateX(0) translateY(0); }
      }
      @keyframes textFadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes textScalePop {
        from { opacity: 0; transform: scale(0.6); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes dividerExpand {
        from { opacity: 0; transform: scaleX(0.2); }
        to   { opacity: 1; transform: scaleX(1); }
      }
      @keyframes badgeSlideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes shimmerName {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes coupleAmpFade {
        from { opacity: 0; transform: scale(0.6) rotate(-10deg); }
        to   { opacity: 1; transform: scale(1) rotate(0deg); }
      }
      @keyframes heartFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50%       { transform: translateY(-6px) scale(1.08); }
      }
      @keyframes coupleTitleFade {
        from { opacity: 0; transform: translateY(-20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes vertLineGrow {
        from { transform: translate(-50%, -50%) scaleY(0); opacity: 0; }
        to   { transform: translate(-50%, -50%) scaleY(1); opacity: 1; }
      }
      @keyframes bgDrift {
        0%, 100% { transform: translateY(0) scale(1); }
        50%       { transform: translateY(-12px) scale(1.03); }
      }

      .card-badge {
        animation: badgeSlideDown 0.7s cubic-bezier(0.16,1,0.3,1) both;
        opacity: 0;
      }
      .card-emoji {
        animation: textScalePop 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        opacity: 0;
      }
      .card-name {
        background: linear-gradient(
          90deg,
          #a8d8f0 0%,
          #ffffff 35%,
          #5ba4e5 55%,
          #a8d8f0 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        opacity: 0;
        animation: textFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both,
                   shimmerName 4s linear 2s infinite;
      }
      .card-divider {
        animation: dividerExpand 0.7s cubic-bezier(0.16,1,0.3,1) both;
        opacity: 0;
        transform-origin: center;
      }
      .card-role {
        animation: textFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
        opacity: 0;
      }
      .card-parent-line {
        animation: textFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        opacity: 0;
      }
      .couple-card {
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
      }
      .couple-card:hover {
        transform: translateY(-8px) !important;
        box-shadow: 0 32px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.4) !important;
      }
      .couple-slide-left  { animation: coupleSlideLeft  1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
      .couple-slide-right { animation: coupleSlideRight 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s both; }
      .couple-amp {
        animation: coupleAmpFade 1s cubic-bezier(0.16,1,0.3,1) 0.9s both,
                   heartFloat 3.5s ease-in-out 2.5s infinite;
        display: inline-block;
      }
      .couple-title { animation: coupleTitleFade 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
      .couple-photo-img:hover { transform: scale(1.06); }
      .couple-vert-line {
        animation: vertLineGrow 1s ease 0.7s both;
        transform-origin: center;
      }
      .couple-amp-circle {
        animation: coupleAmpFade 1s cubic-bezier(0.16,1,0.3,1) 0.8s both;
      }
      .bg-orb { animation: bgDrift 10s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <section style={{
      width: "100%",
      padding: "70px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div className="bg-orb" style={{
        position: "absolute", top: "5%", right: "-8%",
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(91,164,229,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="bg-orb" style={{
        position: "absolute", bottom: "8%", left: "-10%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,216,240,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
        animationDelay: "3s",
      }} />

      {/* Judul section */}
      <div className="couple-title" style={{ textAlign: "center", marginBottom: 40, zIndex: 1 }}>
        <p style={{
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontSize: 11,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 10,
          fontFamily: "'Cormorant Garamond', serif",
        }}>
          ✦ &nbsp; Yang Berbahagia &nbsp; ✦
        </p>
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2rem, 6vw, 2.6rem)",
          color: "#fff",
          margin: 0,
          textShadow: "0 2px 20px rgba(91,164,229,0.4)",
        }}>
          Mempelai
        </h2>
      </div>

      {/* Card Wanita */}
      <div style={{ zIndex: 1, width: "100%", maxWidth: 360 }}>
        <PersonCard
          img={brideImg}
          name={WEDDING.brideFull}
          role={WEDDING.brideRole}
          parentInfo={[...WEDDING.brideParentsDetail]}
          side="left"
          emoji={WEDDING.brideEmoji}
        />
      </div>

      {/* Simbol & */}
      <div style={{ margin: "28px 0", position: "relative", zIndex: 1, display: "flex", justifyContent: "center" }}>
        <div className="couple-vert-line" style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 1, height: 68,
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
          transformOrigin: "center",
        }} />
        <div className="couple-amp-circle" style={{
          position: "relative", zIndex: 1,
          width: 54, height: 54, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          <span
            className="couple-amp"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1.6rem",
              color: "#fff",
            }}
          >
            &
          </span>
        </div>
      </div>

      {/* Card Pria */}
      <div style={{ zIndex: 1, width: "100%", maxWidth: 360 }}>
        <PersonCard
          img={groomImg}
          name={WEDDING.groomFull}
          role={WEDDING.groomRole}
          parentInfo={[...WEDDING.groomParentsDetail]}
          side="right"
          emoji={WEDDING.groomEmoji}
        />
      </div>
    </section>
  );
}