// components/sections/HeroSection.tsx

import { useEffect, useRef } from "react";
import brideImg from "../../assets/weding/cewek.jpg";
import groomImg from "../../assets/weding/cowok.jpg";
import { WEDDING } from "../../utils/weddingConfig";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.92); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes slideLeft {
        from { opacity: 0; transform: translateX(-40px) scale(0.95); }
        to   { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes slideRight {
        from { opacity: 0; transform: translateX(40px) scale(0.95); }
        to   { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes shimmer {
        0%   { background-position: -300% center; }
        100% { background-position: 300% center; }
      }
      @keyframes floatUp {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-8px); }
      }
      @keyframes rotateLine {
        from { transform: scaleX(0); opacity: 0; }
        to   { transform: scaleX(1); opacity: 1; }
      }
      @keyframes softPulse {
        0%, 100% { transform: scale(1); opacity: 0.85; }
        50%       { transform: scale(1.15); opacity: 1; }
      }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 25px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4); }
        50%       { box-shadow: 0 30px 90px rgba(91,164,229,0.2), inset 0 1px 0 rgba(255,255,255,0.5); }
      }

      .hero-card {
        animation: scaleIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both,
                   glowPulse 4s ease-in-out 2s infinite;
      }
      .hero-label {
        animation: fadeIn 1.5s ease 0.8s both;
      }
      .hero-bride {
        animation: slideLeft 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.0s both;
      }
      .hero-groom {
        animation: slideRight 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both;
      }
      .hero-ring {
        animation: fadeIn 1.2s ease 1.6s both;
      }
      .hero-name1 {
        animation: fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.8s both;
      }
      .hero-amp {
        animation: softPulse 3s ease-in-out 2.5s infinite;
        display: inline-block;
      }
      .hero-ampline {
        animation: fadeIn 1.2s ease 2.0s both;
      }
      .hero-name2 {
        animation: fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 2.2s both;
      }
      .hero-divider {
        animation: fadeIn 1.2s ease 2.6s both;
      }
      .hero-desc {
        animation: fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 2.8s both;
      }
      .hero-date {
        animation: fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 3.2s both;
      }
      .hero-line {
        animation: rotateLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2.1s both;
        transform-origin: center;
      }
      .hero-photo-wrap {
        animation: floatUp 6s ease-in-out 3s infinite;
      }
      .hero-photo-img {
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                    box-shadow 0.5s ease;
      }
      .hero-photo-img:hover {
        transform: scale(1.06) rotate(-2deg);
        box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important;
      }
      .hero-shimmer-text {
        background: linear-gradient(
          90deg,
          #5ba4e5 0%,
          #a8d8f0 30%,
          #ffffff 50%,
          #a8d8f0 70%,
          #5ba4e5 100%
        );
        background-size: 300% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 5s linear 3s infinite;
      }
      .hero-corner {
        animation: fadeIn 1.5s ease 0.5s both;
      }
      .hero-date-pill {
        transition: transform 0.3s ease, background 0.3s ease;
        cursor: default;
      }
      .hero-date-pill:hover {
        transform: scale(1.04);
        background: rgba(255,255,255,0.2) !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Card utama */}
      <div
        className="hero-card"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.12)",
          borderRadius: 32,
          padding: "50px 30px",
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Sudut dekoratif */}
        {[
          { top: 14, left: 14, borderTop: "2px solid rgba(255,255,255,0.5)", borderLeft: "2px solid rgba(255,255,255,0.5)" },
          { top: 14, right: 14, borderTop: "2px solid rgba(255,255,255,0.5)", borderRight: "2px solid rgba(255,255,255,0.5)" },
          { bottom: 14, left: 14, borderBottom: "2px solid rgba(255,255,255,0.5)", borderLeft: "2px solid rgba(255,255,255,0.5)" },
          { bottom: 14, right: 14, borderBottom: "2px solid rgba(255,255,255,0.5)", borderRight: "2px solid rgba(255,255,255,0.5)" },
        ].map((s, i) => (
          <div key={i} className="hero-corner" style={{ position: "absolute", width: 20, height: 20, ...s }} />
        ))}

        {/* Label */}
        <p
          className="hero-label"
          style={{
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontSize: 13,
            color: "rgba(255,255,255,0.75)",
            marginBottom: 28,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          ✦ &nbsp; The Wedding Of &nbsp; ✦
        </p>

        {/* Foto couple */}
        <div
          className="hero-photo-wrap"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={brideImg}
              alt="Bride"
              className="hero-bride hero-photo-img"
              style={{
                width: 115,
                height: 145,
                objectFit: "cover",
                borderRadius: 24,
                boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
                border: "3px solid rgba(255,255,255,0.4)",
              }}
            />
          </div>

          {/* Ikon cincin tengah */}
          <div
            className="hero-ring"
            style={{
              alignSelf: "center",
              fontSize: 22,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <span className="hero-amp">💍</span>
          </div>

          <div style={{ position: "relative" }}>
            <img
              src={groomImg}
              alt="Groom"
              className="hero-groom hero-photo-img"
              style={{
                width: 115,
                height: 145,
                objectFit: "cover",
                borderRadius: 24,
                boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
                border: "3px solid rgba(255,255,255,0.4)",
              }}
            />
          </div>
        </div>

        {/* Nama 1 */}
        <h1
          className="hero-name1 hero-shimmer-text"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(2.6rem,7vw,3.6rem)",
            margin: "0 0 4px",
            lineHeight: 1.1,
          }}
        >
          {WEDDING.bride}
        </h1>

        {/* Garis & ampersand */}
        <div
          className="hero-ampline"
          style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}
        >
          <div className="hero-line" style={{ height: 1, width: 50, background: "rgba(255,255,255,0.4)" }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 22, fontFamily: "Playfair Display" }}>&</span>
          <div className="hero-line" style={{ height: 1, width: 50, background: "rgba(255,255,255,0.4)" }} />
        </div>

        {/* Nama 2 */}
        <h1
          className="hero-name2 hero-shimmer-text"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(2.6rem,7vw,3.6rem)",
            margin: "0 0 24px",
            lineHeight: 1.1,
          }}
        >
          {WEDDING.groom}
        </h1>

        {/* Garis hias */}
        <div
          className="hero-divider"
          style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 20 }}
        >
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.25)" }} />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>🌸</span>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.25)" }} />
        </div>

        {/* Teks undangan */}
        <p
          className="hero-desc"
          style={{
            maxWidth: 340,
            margin: "0 auto",
            fontSize: 15.5,
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
          }}
        >
          Dengan penuh kebahagiaan kami mengundang Anda untuk hadir
          dalam hari istimewa pernikahan kami.
        </p>

        {/* Tanggal */}
        <div
          className="hero-date hero-date-pill"
          style={{
            marginTop: 28,
            display: "inline-block",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 50,
            padding: "10px 28px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            fontSize: 16,
            color: "#fff",
            backdropFilter: "blur(8px)",
          }}
        >
          {WEDDING.date.toUpperCase()}
        </div>
      </div>
    </section>
  );
}
