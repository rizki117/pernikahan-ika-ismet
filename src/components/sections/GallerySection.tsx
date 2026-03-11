// components/sections/GallerySection.tsx
// Galeri foto dengan lightbox — import foto dari src/galery/
// Jika foto belum ada, section tetap tampil tanpa error

import { useState, useEffect, useCallback } from "react";

// ── Import foto galeri ────────────────────────────────────────
// Pastikan file ada di src/galery/ dengan nama 1.jpg, 2.jpg dst
// Jika belum ada fotonya, hapus/comment baris import yang belum ada

const photoModules = import.meta.glob("../../assets/galery/*.{jpg,jpeg,png,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

// Ambil semua URL foto dan urutkan berdasarkan nama file
const PHOTOS: string[] = Object.keys(photoModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => photoModules[key].default);

// ─────────────────────────────────────────────────────────────

const AUTO_INTERVAL = 3000;

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAuto, setIsAuto]           = useState(true);
  const [fadeIn, setFadeIn]           = useState(true);

  const isOpen = activeIndex !== null;

  const goTo = useCallback((index: number) => {
    if (PHOTOS.length === 0) return;
    setFadeIn(false);
    setTimeout(() => {
      setActiveIndex((index + PHOTOS.length) % PHOTOS.length);
      setFadeIn(true);
    }, 180);
  }, []);

  const goPrev = () => { setIsAuto(false); goTo((activeIndex ?? 0) - 1); };
  const goNext = () => { setIsAuto(false); goTo((activeIndex ?? 0) + 1); };

  useEffect(() => {
    if (!isOpen || !isAuto) return;
    const timer = setInterval(() => goTo((activeIndex ?? 0) + 1), AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [isOpen, isAuto, activeIndex, goTo]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { setActiveIndex(null); setIsAuto(true); }
      if (e.key === "ArrowLeft")  { setIsAuto(false); goTo((activeIndex ?? 0) - 1); }
      if (e.key === "ArrowRight") { setIsAuto(false); goTo((activeIndex ?? 0) + 1); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, activeIndex, goTo]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Jika belum ada foto sama sekali
  if (PHOTOS.length === 0) {
    return (
      <section id="section-galeri" style={{ width: "100%", padding: "70px 20px 80px", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "clamp(1.4rem,5vw,1.9rem)", color: "#2e6fad", marginBottom: 16,
        }}>Our Gallery</h2>
        <div style={{
          background: "rgba(255,255,255,0.7)", border: "2px dashed rgba(91,164,229,0.4)",
          borderRadius: 16, padding: "40px 20px", maxWidth: 400, margin: "0 auto",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🖼️</div>
          <p style={{ color: "#5ba4e5", fontSize: "0.9rem" }}>
            Tambahkan foto ke folder <code>src/galery/</code><br/>
            dengan nama <code>1.jpg, 2.jpg, 3.jpg ...</code>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="section-galeri" style={{ width: "100%", padding: "70px 20px 80px" }}>

      {/* Judul */}
      <div className="reveal" style={{ textAlign: "center", marginBottom: 32, transitionDelay: "0.1s" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "clamp(1.4rem,5vw,1.9rem)", color: "#2e6fad", marginBottom: 8,
        }}>Our Gallery</h2>
        <div style={{
          width: 50, height: 1,
          background: "linear-gradient(90deg,transparent,rgba(91,164,229,0.6),transparent)",
          margin: "0 auto",
        }} />
        <p style={{ color: "#5ba4e5", fontSize: "clamp(0.72rem,2.5vw,0.82rem)", marginTop: 8, opacity: 0.8 }}>
          Ketuk foto untuk melihat lebih besar ✨
        </p>
      </div>

      {/* Grid foto 2 kolom */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "clamp(8px,2vw,14px)", maxWidth: 500, margin: "0 auto",
      }}>
        {PHOTOS.map((src, i) => (
          <div
            key={i}
            className="reveal-scale"
            onClick={() => { setActiveIndex(i); setIsAuto(true); setFadeIn(true); }}
            style={{
              borderRadius: 12, overflow: "hidden",
              border: "2px solid rgba(91,164,229,0.3)",
              boxShadow: "0 4px 16px rgba(91,164,229,0.12)",
              aspectRatio: "3/4", cursor: "pointer", position: "relative",
              transitionDelay: `${0.05 * i}s`,
            }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transition: "transform 0.4s ease",
              }}
              onMouseOver={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.07)")}
              onMouseOut={(e)  => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {isOpen && activeIndex !== null && (
        <div
          onClick={() => { setActiveIndex(null); setIsAuto(true); }}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(5,10,30,0.94)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            animation: "introIn 0.3s ease forwards",
          }}
        >
          {/* Tutup */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIndex(null); setIsAuto(true); }}
            style={{
              position: "absolute", top: 20, right: 20,
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "50%", width: 44, height: 44,
              color: "#fff", fontSize: "1.2rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)", zIndex: 10,
            }}
          >✕</button>

          {/* Counter */}
          <div style={{
            position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.7)", fontSize: "0.85rem",
            background: "rgba(255,255,255,0.1)", padding: "4px 14px",
            borderRadius: 50, backdropFilter: "blur(6px)",
          }}>
            {activeIndex + 1} / {PHOTOS.length}
          </div>

          {/* Foto utama */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(90vw,480px)", maxHeight: "72vh", width: "100%",
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              border: "2px solid rgba(91,164,229,0.4)",
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "scale(1)" : "scale(0.97)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            <img src={PHOTOS[activeIndex]} alt={`Gallery ${activeIndex + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", maxHeight: "72vh" }} />
          </div>

          {/* Navigasi */}
          <div onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", gap: 20, marginTop: 24, alignItems: "center" }}>
            <button onClick={goPrev} style={navBtnStyle}>‹</button>
            <button
              onClick={() => setIsAuto(p => !p)}
              style={{
                background: isAuto ? "rgba(91,164,229,0.35)" : "rgba(255,255,255,0.1)",
                border: `1px solid ${isAuto ? "rgba(91,164,229,0.7)" : "rgba(255,255,255,0.25)"}`,
                borderRadius: 50, padding: "7px 18px", color: "#fff",
                fontSize: "0.78rem", cursor: "pointer", backdropFilter: "blur(6px)",
                transition: "all 0.2s ease",
              }}
            >{isAuto ? "⏸ Auto" : "▶ Auto"}</button>
            <button onClick={goNext} style={navBtnStyle}>›</button>
          </div>

          {/* Dot indicator */}
          <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: 7, marginTop: 18 }}>
            {PHOTOS.map((_, i) => (
              <button key={i} onClick={() => { setIsAuto(false); goTo(i); }}
                style={{
                  width: i === activeIndex ? 22 : 8, height: 8, borderRadius: 50,
                  background: i === activeIndex ? "rgba(91,164,229,0.9)" : "rgba(255,255,255,0.3)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                }} />
            ))}
          </div>

          {/* Progress bar */}
          {isAuto && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, height: 3,
              background: "rgba(91,164,229,0.8)",
              animation: `lineGrow ${AUTO_INTERVAL}ms linear infinite`,
              transformOrigin: "left center",
            }} />
          )}
        </div>
      )}
    </section>
  );
}

const navBtnStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: "50%", width: 48, height: 48, color: "#fff", fontSize: "1.6rem",
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  backdropFilter: "blur(6px)", transition: "background 0.2s ease", lineHeight: 1,
};
