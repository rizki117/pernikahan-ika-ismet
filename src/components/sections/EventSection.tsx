// components/sections/EventSection.tsx

import { useEffect } from "react";
import { WEDDING } from "../../utils/weddingConfig";

// ── Helper: parse tanggal dari string Indonesia ("Sabtu 11 April 2026") ──
function parseDateID(dateStr: string) {
  // Format yang diharapkan: "Sabtu 11 April 2026"
  const parts = dateStr.trim().split(/\s+/);
  // parts[0] = hari, parts[1] = tanggal, parts[2] = bulan, parts[3] = tahun
  return {
    day:   parts[0],
    date:  parts[1].padStart(2, "0"),
    month: parts[2],
    year:  parts[3],
  };
}

// Tanggal akad & resepsi dari weddingConfig
const akadDate    = parseDateID(WEDDING.akadDate);
const resepsiDate = parseDateID(WEDDING.resepsiDate);

interface EventCardProps {
  title: string;
  icon: string;
  day: string;
  date: string;
  month: string;
  year: string;
  time: string;
  address: string[];
  mapUrl: string;
  animClass?: string;
  baseDelay?: number;
}

function EventCard({
  title, icon, day, date, month, year,
  time, address, mapUrl,
  animClass = "",
  baseDelay = 0.4,
}: EventCardProps) {
  return (
    <div
      className={`event-card ${animClass}`}
      style={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 28,
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* ── Header strip ── */}
      <div style={{
        background: "linear-gradient(135deg, rgba(91,164,229,0.35), rgba(58,130,196,0.25))",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        padding: "22px 24px 18px",
        position: "relative",
      }}>
        {[
          { top: 10, left: 10, borderTop: "1.5px solid rgba(255,255,255,0.45)", borderLeft: "1.5px solid rgba(255,255,255,0.45)" },
          { top: 10, right: 10, borderTop: "1.5px solid rgba(255,255,255,0.45)", borderRight: "1.5px solid rgba(255,255,255,0.45)" },
        ].map((s, i) => (
          <div key={i} className="ec-corner"
            style={{ animationDelay: `${baseDelay + 0.2 + i * 0.2}s`, position: "absolute", width: 14, height: 14, ...s }}
          />
        ))}

        {/* Icon / Logo */}
        <div className="ec-icon" style={{ animationDelay: `${baseDelay + 0.5}s`, fontSize: 36, marginBottom: 10 }}>
          {icon}
        </div>

        {/* Judul */}
        <h3 className="ec-title"
          style={{
            animationDelay: `${baseDelay + 0.9}s`,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
            margin: 0,
            letterSpacing: "0.05em",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          {title}
        </h3>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "26px 24px 28px" }}>

        {/* Kotak tanggal */}
        <div className="ec-date-box"
          style={{
            animationDelay: `${baseDelay + 1.3}s`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 6,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16, padding: "14px 16px",
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Hari</div>
            <div style={{ color: "#fff", fontSize: "clamp(0.78rem, 2.5vw, 0.88rem)", fontWeight: 600 }}>{day}</div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)", margin: "0 8px" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>Tanggal</div>
            <div className="ec-date-num"
              style={{
                animationDelay: `${baseDelay + 1.55}s`,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 7vw, 2.6rem)",
                fontWeight: 700, color: "#fff", lineHeight: 1,
              }}
            >{date}</div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)", margin: "0 8px" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Bulan</div>
            <div style={{ color: "#fff", fontSize: "clamp(0.78rem, 2.5vw, 0.88rem)", fontWeight: 600 }}>{month}</div>
          </div>
        </div>

        {/* Tahun */}
        <div className="ec-year"
          style={{
            animationDelay: `${baseDelay + 1.8}s`,
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)",
            letterSpacing: "0.2em", marginBottom: 16, marginTop: 8,
          }}
        >{year}</div>

        {/* Waktu badge */}
        <div className="ec-time"
          style={{
            animationDelay: `${baseDelay + 2.1}s`,
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(91,164,229,0.2)",
            border: "1px solid rgba(91,164,229,0.35)",
            borderRadius: 50, padding: "8px 20px", marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 14 }}>🕐</span>
          <span style={{ color: "#fff", fontSize: "clamp(0.82rem, 2.8vw, 0.92rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
            {time}
          </span>
        </div>

        {/* Garis + pin */}
        <div className="ec-divider"
          style={{
            animationDelay: `${baseDelay + 2.4}s`,
            display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>📍</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Alamat */}
        <div style={{ marginBottom: 20 }}>
          <p className="ec-addr-label"
            style={{
              animationDelay: `${baseDelay + 2.7}s`,
              color: "rgba(255,255,255,0.5)", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8,
            }}
          >Lokasi Acara</p>
          {address.map((line, i) => (
            <p key={i} className="ec-addr-line"
              style={{
                animationDelay: `${baseDelay + 2.95 + i * 0.3}s`,
                color: i === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                fontSize: "clamp(0.8rem, 2.8vw, 0.9rem)",
                lineHeight: 1.8, fontWeight: i === 0 ? 600 : 400, margin: 0,
              }}
            >{line}</p>
          ))}
        </div>

        {/* Tombol map */}
        <a href={mapUrl} target="_blank" rel="noopener noreferrer"
          className="event-map-btn ec-map-btn"
          style={{
            animationDelay: `${baseDelay + 3.5}s`,
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 28px", borderRadius: 50,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", fontSize: "clamp(0.8rem, 2.8vw, 0.9rem)",
            fontWeight: 600, textDecoration: "none",
            backdropFilter: "blur(8px)", letterSpacing: "0.05em",
            transition: "all 0.4s ease",
          }}
        >
          <span>🗺️</span> Lihat Map
        </a>
      </div>
    </div>
  );
}

export default function EventSection() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes eventSlideLeft {
        from { opacity: 0; transform: translateX(-45px) translateY(22px); }
        to   { opacity: 1; transform: translateX(0) translateY(0); }
      }
      @keyframes eventSlideRight {
        from { opacity: 0; transform: translateX(45px) translateY(22px); }
        to   { opacity: 1; transform: translateX(0) translateY(0); }
      }
      @keyframes eventTitleFade {
        from { opacity: 0; transform: translateY(-22px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes eventDividerFade {
        from { opacity: 0; transform: scaleX(0); }
        to   { opacity: 1; transform: scaleX(1); }
      }
      @keyframes ecCornerFade {
        from { opacity: 0; transform: scale(0.5); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes ecFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes ecDateNumRise {
        from { opacity: 0; transform: translateY(28px) scale(0.85); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes ecDividerGrow {
        from { opacity: 0; transform: scaleX(0); }
        to   { opacity: 1; transform: scaleX(1); }
      }
      @keyframes ecBtnSlide {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes iconDrop {
        from { opacity: 0; transform: translateY(-30px) scale(0.7); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes iconFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25%       { transform: translateY(-4px) rotate(2deg) scale(1.03); }
        50%       { transform: translateY(-6px) rotate(0deg) scale(1.04); }
        75%       { transform: translateY(-3px) rotate(-2deg) scale(1.02); }
      }
      @keyframes iconGlow {
        0%, 100% { filter: drop-shadow(0 0 0px rgba(255,210,80,0)); }
        40%       { filter: drop-shadow(0 2px 10px rgba(255,210,80,0.5)); }
        60%       { filter: drop-shadow(0 2px 16px rgba(255,180,60,0.6)); }
      }
      @keyframes shimmerTitle {
        0%   { background-position: -300% center; }
        100% { background-position: 300% center; }
      }
      @keyframes ecTimePulse {
        0%, 100% { box-shadow: 0 0 0px rgba(91,164,229,0); }
        50%       { box-shadow: 0 0 18px rgba(91,164,229,0.38); }
      }
      @keyframes ecCardGlow {
        0%, 100% { box-shadow: 0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3); }
        50%       { box-shadow: 0 26px 72px rgba(91,164,229,0.18), inset 0 1px 0 rgba(255,255,255,0.4); }
      }
      @keyframes bgOrb {
        0%, 100% { transform: scale(1) translateY(0); }
        50%       { transform: scale(1.05) translateY(-12px); }
      }

      .event-title   { animation: eventTitleFade  1.8s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
      .event-divider { animation: eventDividerFade 1.6s ease                       0.6s  both; transform-origin: center; }

      .event-left  { animation: eventSlideLeft  2s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
      .event-right { animation: eventSlideRight 2s cubic-bezier(0.16,1,0.3,1) 0.55s both; }

      .event-card {
        transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease;
        animation: ecCardGlow 7s ease-in-out 5s infinite;
      }
      .event-card:hover {
        transform: translateY(-7px) !important;
        box-shadow: 0 32px 76px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.38) !important;
      }

      .ec-corner {
        animation: ecCornerFade 1.1s cubic-bezier(0.34,1.4,0.64,1) both;
        opacity: 0;
      }

      .ec-icon {
        display: block;
        opacity: 0;
        animation:
          iconDrop  1.4s cubic-bezier(0.34,1.3,0.64,1) both,
          iconFloat 5s   ease-in-out                    3.5s infinite,
          iconGlow  5s   ease-in-out                    3.5s infinite;
      }

      .ec-title {
        opacity: 0;
        background: linear-gradient(
          90deg,
          #ffffff 0%,
          #a8d8f0 35%,
          #ffffff 55%,
          #a8d8f0 80%,
          #ffffff 100%
        );
        background-size: 300% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation:
          ecFadeUp     1.6s cubic-bezier(0.16,1,0.3,1) both,
          shimmerTitle 8s  linear                       4s infinite;
      }

      .ec-date-box  { animation: ecFadeUp       2s cubic-bezier(0.16,1,0.3,1) both; opacity: 0; }
      .ec-date-num  { animation: ecDateNumRise  1.8s cubic-bezier(0.34,1.3,0.64,1) both; opacity: 0; display: block; }
      .ec-year      { animation: ecFadeUp       1.8s cubic-bezier(0.16,1,0.3,1) both; opacity: 0; }

      .ec-time {
        animation:
          ecFadeUp    1.8s cubic-bezier(0.16,1,0.3,1) both,
          ecTimePulse 5s  ease-in-out                  5s infinite;
        opacity: 0;
      }

      .ec-divider   { animation: ecDividerGrow  2s   cubic-bezier(0.16,1,0.3,1) both; opacity: 0; transform-origin: center; }
      .ec-addr-label{ animation: ecFadeUp       1.8s cubic-bezier(0.16,1,0.3,1) both; opacity: 0; display: block; }
      .ec-addr-line { animation: ecFadeUp       1.8s cubic-bezier(0.16,1,0.3,1) both; opacity: 0; display: block; }
      .ec-map-btn   { animation: ecBtnSlide     1.8s cubic-bezier(0.16,1,0.3,1) both; opacity: 0; }

      .event-map-btn:hover {
        background: rgba(255,255,255,0.22) !important;
        transform: scale(1.05) !important;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      }

      .ev-bg-orb { animation: bgOrb 13s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <section
      id="section-acara"
      style={{
        width: "100%",
        padding: "70px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div className="ev-bg-orb" style={{
        position: "absolute", top: "4%", right: "-10%",
        width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(91,164,229,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="ev-bg-orb" style={{
        position: "absolute", bottom: "6%", left: "-8%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,216,240,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
        animationDelay: "5s",
      }} />

      {/* Judul section */}
      <div className="event-title" style={{ textAlign: "center", marginBottom: 16, zIndex: 1 }}>
        <p style={{
          letterSpacing: "0.35em", textTransform: "uppercase",
          fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 10,
          fontFamily: "'Cormorant Garamond', serif",
        }}>
          ✦ &nbsp; Jadwal Acara &nbsp; ✦
        </p>
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2rem, 6vw, 2.6rem)",
          color: "#fff", margin: 0,
          textShadow: "0 2px 20px rgba(91,164,229,0.4)",
        }}>
          Hari Istimewa
        </h2>
      </div>

      {/* Garis divider */}
      <div className="event-divider" style={{
        display: "flex", alignItems: "center", gap: 10,
        width: "100%", maxWidth: 400, marginBottom: 8, zIndex: 1,
      }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>🌸</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
      </div>

      {/* Card Akad Nikah */}
      <div style={{ zIndex: 1, width: "100%", maxWidth: 400 }}>
        <EventCard
          title={WEDDING.akad.label}
          icon="💍"
          day={akadDate.day}
          date={akadDate.date}
          month={akadDate.month}
          year={akadDate.year}
          time={WEDDING.akad.time}
          address={[WEDDING.akad.venue, WEDDING.akad.address]}
          mapUrl={WEDDING.akad.mapsUrl}
          animClass="event-left"
          baseDelay={0.35}
        />
      </div>

      {/* Card Resepsi */}
      <div style={{ zIndex: 1, width: "100%", maxWidth: 400 }}>
        <EventCard
          title={WEDDING.resepsi.label}
          icon="🎊"
          day={resepsiDate.day}
          date={resepsiDate.date}
          month={resepsiDate.month}
          year={resepsiDate.year}
          time={WEDDING.resepsi.time}
          address={[WEDDING.resepsi.venue, WEDDING.resepsi.address]}
          mapUrl={WEDDING.resepsi.mapsUrl}
          animClass="event-right"
          baseDelay={0.55}
        />
      </div>
    </section>
  );
}
