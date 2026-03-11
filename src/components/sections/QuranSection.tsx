// components/sections/QuranSection.tsx

import { useEffect } from "react";

export default function QuranSection() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* ── Keyframes utama ── */
      @keyframes quranFadeUp {
        from { opacity: 0; transform: translateY(25px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes quranScaleIn {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes quranLineGrow {
        from { transform: scaleX(0); opacity: 0; }
        to   { transform: scaleX(1); opacity: 1; }
      }
      @keyframes quranGlow {
        0%, 100% { text-shadow: 0 2px 20px rgba(91,164,229,0.35); }
        50%       { text-shadow: 0 2px 35px rgba(91,164,229,0.7), 0 0 60px rgba(91,164,229,0.25); }
      }
      @keyframes quranCardGlow {
        0%, 100% { box-shadow: 0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3); }
        50%       { box-shadow: 0 26px 72px rgba(91,164,229,0.2), inset 0 1px 0 rgba(255,255,255,0.45); }
      }
      @keyframes quranCornerFade {
        from { opacity: 0; transform: scale(0.5); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes quranOrnamentFloat {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-5px); }
      }
      @keyframes quranOrnamentGlow {
        0%, 100% { opacity: 0.65; letter-spacing: 0.3em; }
        50%       { opacity: 1;    letter-spacing: 0.45em; }
      }
      @keyframes quranVerseBoxIn {
        from { opacity: 0; transform: translateY(20px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes quranQuoteBadge {
        from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.8); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
      }
      @keyframes quranVerseText {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes quranRefPop {
        from { opacity: 0; transform: scale(0.75); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes quranRefPulse {
        0%, 100% { background: rgba(91,164,229,0.18); box-shadow: 0 0 0px rgba(91,164,229,0); }
        50%       { background: rgba(91,164,229,0.30); box-shadow: 0 0 18px rgba(91,164,229,0.3); }
      }
      @keyframes shimmerSalam {
        0%   { background-position: -300% center; }
        100% { background-position: 300% center; }
      }
      @keyframes bgOrb {
        0%, 100% { transform: scale(1) translateY(0); }
        50%       { transform: scale(1.06) translateY(-10px); }
      }

      /* ── Card ── */
      .quran-card {
        animation: quranScaleIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both,
                   quranCardGlow 5s ease-in-out 2s infinite;
      }

      /* ── Sudut dekoratif ── */
      .quran-corner {
        animation: quranCornerFade 0.8s cubic-bezier(0.34,1.56,0.64,1) both;
        opacity: 0;
      }

      /* ── Ornamen atas ── */
      .quran-ornament {
        animation: quranFadeUp 1s ease 0.5s both;
        opacity: 0;
      }
      .quran-ornament-inner {
        animation: quranOrnamentFloat 4s ease-in-out 2s infinite,
                   quranOrnamentGlow  4s ease-in-out 2s infinite;
        display: inline-block;
      }

      /* ── Salam ── */
      .quran-salam {
        background: linear-gradient(
          90deg,
          #ffffff 0%,
          #a8d8f0 30%,
          #ffffff 50%,
          #a8d8f0 70%,
          #ffffff 100%
        );
        background-size: 300% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: quranFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.7s both,
                   shimmerSalam 6s linear 2.5s infinite;
        opacity: 0;
      }

      /* ── Garis tengah ── */
      .quran-line {
        animation: quranLineGrow 1s ease 1.0s both;
        transform-origin: center;
        opacity: 0;
      }

      /* ── Teks pembuka ── */
      .quran-intro {
        animation: quranFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 1.1s both;
        opacity: 0;
      }

      /* ── Box ayat ── */
      .quran-verse-box {
        animation: quranVerseBoxIn 1.2s cubic-bezier(0.16,1,0.3,1) 1.4s both;
        opacity: 0;
      }

      /* ── Badge kutip di atas box ── */
      .quran-quote-badge {
        animation: quranQuoteBadge 0.8s cubic-bezier(0.34,1.56,0.64,1) 1.7s both;
        opacity: 0;
      }

      /* ── Teks ayat (tiap baris staggered) ── */
      .quran-verse-line {
        animation: quranVerseText 0.7s cubic-bezier(0.16,1,0.3,1) both;
        opacity: 0;
        display: block;
      }

      /* ── Referensi ── */
      .quran-ref {
        animation: quranRefPop 0.8s cubic-bezier(0.34,1.56,0.64,1) 2.5s both,
                   quranRefPulse 4s ease-in-out 3.5s infinite;
        opacity: 0;
      }

      /* ── Hover ── */
      .quran-ref:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
      }
      .quran-verse-box:hover {
        background: rgba(255,255,255,0.12) !important;
        transition: background 0.4s ease;
      }

      /* ── BG orb ── */
      .quran-bg-orb {
        animation: bgOrb 10s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Baris teks ayat dipecah untuk animasi staggered
  const verseLines = [
    "Dan di antara tanda-tanda (kebesaran)-Nya ialah",
    "Dia menciptakan pasangan-pasangan untukmu",
    "dari jenismu sendiri, agar kamu cenderung",
    "dan merasa tenteram kepadanya,",
    "dan Dia menjadikan di antaramu",
    "rasa kasih dan sayang.",
  ];

  const corners = [
    { top: 14, left: 14, borderTop: "1.5px solid rgba(255,255,255,0.4)", borderLeft: "1.5px solid rgba(255,255,255,0.4)" },
    { top: 14, right: 14, borderTop: "1.5px solid rgba(255,255,255,0.4)", borderRight: "1.5px solid rgba(255,255,255,0.4)" },
    { bottom: 14, left: 14, borderBottom: "1.5px solid rgba(255,255,255,0.4)", borderLeft: "1.5px solid rgba(255,255,255,0.4)" },
    { bottom: 14, right: 14, borderBottom: "1.5px solid rgba(255,255,255,0.4)", borderRight: "1.5px solid rgba(255,255,255,0.4)" },
  ];

  return (
    <section style={{
      width: "100%",
      padding: "70px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background orbs */}
      <div className="quran-bg-orb" style={{
        position: "absolute", top: "10%", right: "-12%",
        width: 340, height: 340, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(91,164,229,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="quran-bg-orb" style={{
        position: "absolute", bottom: "5%", left: "-10%",
        width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,216,240,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
        animationDelay: "4s",
      }} />

      {/* Card utama */}
      <div
        className="quran-card"
        style={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 28,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          padding: "44px 28px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Sudut dekoratif — tiap sudut muncul dengan delay berbeda */}
        {corners.map((s, i) => (
          <div
            key={i}
            className="quran-corner"
            style={{
              animationDelay: `${0.3 + i * 0.1}s`,
              position: "absolute",
              width: 18, height: 18,
              ...s,
            }}
          />
        ))}

        {/* Ornamen atas */}
        <div className="quran-ornament" style={{ marginBottom: 20 }}>
          <div
            className="quran-ornament-inner"
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.3em",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            ✦ ☪ ✦
          </div>
        </div>

        {/* Assalamualaikum — shimmer teks */}
        <h2
          className="quran-salam"
          style={{
            fontSize: "clamp(1.05rem, 3.8vw, 1.25rem)",
            fontWeight: 700,
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.06em",
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </h2>

        {/* Garis hias */}
        <div className="quran-line" style={{
          width: 80, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          margin: "0 auto 20px",
        }} />

        {/* Teks pembuka */}
        <p
          className="quran-intro"
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "clamp(0.95rem, 3.2vw, 1.08rem)",
            lineHeight: 2,
            maxWidth: 380,
            margin: "0 auto 28px",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
          }}
        >
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
          Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami.
        </p>

        {/* Box ayat */}
        <div
          className="quran-verse-box"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 18,
            padding: "28px 20px 22px",
            marginBottom: 20,
            position: "relative",
          }}
        >
          {/* Badge kutip dekoratif */}
          <div
            className="quran-quote-badge"
            style={{
              position: "absolute",
              top: -14, left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(91,164,229,0.3)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              borderRadius: 20,
              padding: "3px 14px",
              fontSize: 18,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: 4,
              whiteSpace: "nowrap",
            }}
          >
            " "
          </div>

          {/* Teks ayat — tiap baris muncul staggered */}
          <p style={{
            color: "rgba(255,255,255,0.87)",
            fontSize: "clamp(0.95rem, 3.2vw, 1.08rem)",
            lineHeight: 2.2,
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
          }}>
            {verseLines.map((line, i) => (
              <span
                key={i}
                className="quran-verse-line"
                style={{ animationDelay: `${1.8 + i * 0.13}s` }}
              >
                {line}{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Referensi ayat */}
        <div
          className="quran-ref"
          style={{
            display: "inline-block",
            background: "rgba(91,164,229,0.2)",
            border: "1px solid rgba(91,164,229,0.35)",
            borderRadius: 50,
            padding: "7px 22px",
            color: "#fff",
            fontSize: "clamp(0.92rem, 2.8vw, 1.05rem)",
            fontWeight: 700,
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.12em",
            cursor: "default",
          }}
        >
          Q.S Ar-Rum : 21
        </div>

      </div>
    </section>
  );
}
