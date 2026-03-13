// @ts-nocheck

// components/MainPage.tsx

import { useState, useEffect, useRef } from "react";
import { WEDDING } from "../utils/weddingConfig";

import TopDecorations from "./TopDecorations";
import InvitationCard from "./InvitationCard";
import CountdownTimer from "./CountdownTimer";

import HeroSection    from "./sections/HeroSection";
import QuranSection   from "./sections/QuranSection";
import CoupleSection  from "./sections/CoupleSection";
import EventSection   from "./sections/EventSection";
import GallerySection from "./sections/GallerySection";
import GiftsSection   from "./sections/GiftsSection";
import RSVPSection    from "./sections/RSVPSection";
import ClosingSection from "./sections/ClosingSection";

interface MainPageProps {
  guestName: string;
  showCard: boolean;
  onOpenDetails: () => void;
  showDetails: boolean;
}

const SHORTCUTS = [
  { icon: "📅", label: "Tanggal", sub: WEDDING.resepsiDate,      target: "section-acara"   },
  { icon: "⏰", label: "Waktu",   sub: WEDDING.resepsi.time,     target: "section-acara"   },
  { icon: "📍", label: "Lokasi",  sub: WEDDING.resepsi.venue,    target: "section-acara"   },
  { icon: "🎊", label: "Acara",   sub: "Resepsi Pernikahan",     target: "section-acara"   },
  { icon: "🖼️", label: "Galeri",  sub: "Foto Kami",              target: "section-galeri"  },
  { icon: "💎", label: "Hadiah",  sub: "Wedding Gifts",          target: "section-gifts"   },
];

// ── Scroll Reveal ──
function useScrollReveal(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
        observer.observe(el);
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [active]);
}

function SectionDivider() {
  return (
    <div style={{
      width: "100%", maxWidth: 440, margin: "0 auto",
      display: "flex", alignItems: "center", gap: 12, padding: "0 24px",
    }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.2))" }} />
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>🌸</div>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(255,255,255,0.2),transparent)" }} />
    </div>
  );
}

export default function MainPage({ guestName, showCard, onOpenDetails, showDetails }: MainPageProps) {
  const [opened,  setOpened]  = useState(false);
  const [muted,   setMuted]   = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useScrollReveal(opened);

  // ── Setup audio ──
  useEffect(() => {
    const audio = new Audio("/music/wedding.mp3");
    audio.loop   = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // ── Inject CSS ──
  useEffect(() => {
    const id = "main-reveal-style";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      .reveal, .reveal-left, .reveal-right, .reveal-scale {
        opacity: 0;
        transition: opacity 1s cubic-bezier(0.16,1,0.3,1),
                    transform 1s cubic-bezier(0.16,1,0.3,1);
      }
      .reveal       { transform: translateY(30px); }
      .reveal-left  { transform: translateX(-40px); }
      .reveal-right { transform: translateX(40px); }
      .reveal-scale { transform: scale(0.92); }
      .reveal.visible, .reveal-left.visible,
      .reveal-right.visible, .reveal-scale.visible {
        opacity: 1 !important;
        transform: none !important;
      }

      @keyframes mainBtnPulse {
        0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.22); }
        50%       { box-shadow: 0 12px 40px rgba(91,164,229,0.4); }
      }
      @keyframes mainShortcutIn {
        from { opacity: 0; transform: translateY(16px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes musicBarAnim {
        0%, 100% { height: 6px; }
        50%       { height: 14px; }
      }

      .btn-open-undangan {
        animation: mainBtnPulse 2.5s ease-in-out infinite;
        transition: transform 0.3s ease;
      }
      .btn-open-undangan:hover { transform: translateY(-3px) scale(1.03); }
      .btn-open-undangan:active { transform: scale(0.97); }

      .shortcut-grid-item {
        animation: mainShortcutIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
      }
      .shortcut-grid-item:nth-child(1) { animation-delay: 0.05s; }
      .shortcut-grid-item:nth-child(2) { animation-delay: 0.12s; }
      .shortcut-grid-item:nth-child(3) { animation-delay: 0.19s; }
      .shortcut-grid-item:nth-child(4) { animation-delay: 0.26s; }
      .shortcut-grid-item:nth-child(5) { animation-delay: 0.33s; }
      .shortcut-grid-item:nth-child(6) { animation-delay: 0.40s; }
      .shortcut-grid-item:hover {
        background: rgba(255,255,255,0.18) !important;
        transform: translateY(-4px) scale(1.02) !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.18) !important;
      }

      .music-bar {
        width: 3px;
        border-radius: 3px;
        background: #fff;
        animation: musicBarAnim 0.6s ease-in-out infinite;
      }
      .music-bar:nth-child(2) { animation-delay: 0.15s; }
      .music-bar:nth-child(3) { animation-delay: 0.3s; }
      .music-bar:nth-child(4) { animation-delay: 0.45s; }

      .btn-music {
        transition: transform 0.3s ease, background 0.3s ease;
      }
      .btn-music:hover {
        transform: scale(1.06);
        background: rgba(255,255,255,0.18) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) document.head.removeChild(el);
    };
  }, []);

  const scrollTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpen = () => {
    setOpened(true);
    onOpenDetails();
    // Putar musik saat tombol diklik
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setMuted(!muted);
    }
  };

  return (
    <div style={{
      position: "relative", zIndex: 20,
      width: "100%", minHeight: "100vh", overflowX: "hidden",
    }}>
      <TopDecorations visible={showCard} />

      {/* ══ COVER PAGE ══ */}
      {showCard && (
        <div style={{
          width: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", padding: "0 16px 60px",
        }}>
          <InvitationCard guestName={guestName} />

          {/* Tombol Buka Undangan */}
          {!opened && (
            <button
              className="btn-open-undangan"
              onClick={handleOpen}
              style={{
                marginTop: 26,
                background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(100,180,255,0.25))",
                border: "1.5px solid rgba(255,255,255,0.38)",
                borderRadius: 50,
                padding: "clamp(13px,3vw,16px) clamp(30px,7vw,50px)",
                color: "#fff",
                fontSize: "clamp(0.87rem,3vw,1rem)",
                cursor: "pointer",
                letterSpacing: "0.12em",
                fontFamily: "'Cormorant Garamond', serif",
                backdropFilter: "blur(12px)",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}
            >
              <span>🖼️</span> Buka Undangan
            </button>
          )}

          {/* Setelah dibuka */}
          {opened && (
            <>
              {/* Tombol musik */}
              <button
                className="btn-music"
                onClick={toggleMute}
                style={{
                  marginTop: 20,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 50,
                  padding: "9px 20px",
                  color: "#fff",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  display: "inline-flex", alignItems: "center", gap: 10,
                  letterSpacing: "0.08em",
                }}
              >
                {/* Animasi bar musik */}
                {!muted ? (
                  <>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16 }}>
                      <div className="music-bar" style={{ height: 8 }} />
                      <div className="music-bar" style={{ height: 12 }} />
                      <div className="music-bar" style={{ height: 6 }} />
                      <div className="music-bar" style={{ height: 10 }} />
                    </div>
                    <span>Musik On</span>
                  </>
                ) : (
                  <>
                    <span style={{ opacity: 0.5 }}>🔇</span>
                    <span style={{ opacity: 0.6 }}>Musik Off</span>
                  </>
                )}
              </button>

              <CountdownTimer />

              {/* Label */}
              <p style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: 24, marginBottom: 12,
              }}>
                ✦ &nbsp; Menu Cepat &nbsp; ✦
              </p>

              {/* Shortcut Grid */}
              <div style={{
                maxWidth: 440, width: "100%",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
              }}>
                {SHORTCUTS.map((item) => (
                  <button
                    key={item.label}
                    className="shortcut-grid-item"
                    onClick={() => scrollTo(item.target)}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 18,
                      padding: "16px 12px",
                      textAlign: "center",
                      backdropFilter: "blur(14px)",
                      cursor: "pointer",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 5,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
                    <div style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "clamp(0.56rem,1.8vw,0.65rem)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      color: "#fff",
                      fontSize: "clamp(0.7rem,2.5vw,0.82rem)",
                      fontWeight: 600, lineHeight: 1.3,
                    }}>
                      {item.sub}
                    </div>
                    <div style={{
                      color: "rgba(100,200,255,0.7)",
                      fontSize: "0.62rem", marginTop: 2,
                      letterSpacing: "0.05em",
                    }}>
                      ↓ lihat
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ══ SEMUA SECTION ══ */}
      {opened && (
        <>
          <HeroSection />
          <SectionDivider />
          <div id="section-pasangan"><CoupleSection /></div>
          <SectionDivider />
          <QuranSection />
          <SectionDivider />
          <div id="section-acara"><EventSection /></div>
          <SectionDivider />
          <div id="section-galeri"><GallerySection /></div>
          <SectionDivider />
          <div id="section-gifts"><GiftsSection /></div>
          <SectionDivider />
          <div id="section-rsvp"><RSVPSection /></div>
          <ClosingSection />
        </>
      )}
    </div>
  );
}