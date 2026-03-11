// components/CountdownTimer.tsx
// Menampilkan tanggal acara & hitung mundur real-time

import { useState, useEffect } from "react";
import { WEDDING } from "../utils/weddingConfig";

// ── Parse WEDDING.date dari format "Sabtu 11 April 2026" ────
const MONTH_MAP: Record<string, number> = {
  Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
  Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
};

function buildWeddingDate(): Date {
  // Format: "Sabtu 11 April 2026"
  const parts = WEDDING.date.trim().split(/\s+/);
  const day   = parseInt(parts[1], 10);
  const month = MONTH_MAP[parts[2]] ?? 0;
  const year  = parseInt(parts[3], 10);

  // Ambil jam dari WEDDING.time, format: "08.00 – selesai"
  const jamStr = WEDDING.time.split(".")[0];
  const jam    = parseInt(jamStr, 10);

  return new Date(year, month, day, jam, 0, 0);
}

const WEDDING_DATE = buildWeddingDate();
// ────────────────────────────────────────────────────────────

interface TimeLeft {
  hari:   number;
  jam:    number;
  menit:  number;
  detik:  number;
}

function hitungSisa(): TimeLeft {
  const selisih = WEDDING_DATE.getTime() - Date.now();
  if (selisih <= 0) return { hari: 0, jam: 0, menit: 0, detik: 0 };

  return {
    hari:  Math.floor(selisih / (1000 * 60 * 60 * 24)),
    jam:   Math.floor((selisih / (1000 * 60 * 60)) % 24),
    menit: Math.floor((selisih / (1000 * 60)) % 60),
    detik: Math.floor((selisih / 1000) % 60),
  };
}

// Format angka jadi 2 digit, misal 5 → "05"
const pad = (n: number) => String(n).padStart(2, "0");

// Format tanggal menjadi "22.03.2026"
const formatTanggal = (d: Date) =>
  `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(hitungSisa);
  const [sudahLewat, setSudahLewat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const sisa = hitungSisa();
      setTimeLeft(sisa);
      if (sisa.hari === 0 && sisa.jam === 0 && sisa.menit === 0 && sisa.detik === 0) {
        setSudahLewat(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Hari",  value: timeLeft.hari  },
    { label: "Jam",   value: timeLeft.jam   },
    { label: "Menit", value: timeLeft.menit },
    { label: "Detik", value: timeLeft.detik },
  ];

  return (
    <div style={{
      marginTop: 20,
      maxWidth: 440,
      width: "100%",
      textAlign: "center",
      animation: "btnUp 0.8s cubic-bezier(.34,1.56,.64,1) 1.6s both",
    }}>

      {/* ── Tanggal acara — lebih besar & menonjol ── */}
      <div style={{ marginBottom: 6 }}>
        <p style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontFamily: "'Cormorant Garamond', serif",
          marginBottom: 6,
        }}>
          Save The Date
        </p>
        <p style={{
          color: "#fff",
          fontSize: "clamp(1.5rem, 5.5vw, 2rem)",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textShadow: "0 2px 20px rgba(100,180,255,0.5)",
          marginBottom: 2,
        }}>
          {formatTanggal(WEDDING_DATE)}
        </p>
        <p style={{
          color: "rgba(168,216,255,0.8)",
          fontSize: "clamp(0.75rem, 2.5vw, 0.88rem)",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          letterSpacing: "0.12em",
        }}>
          Pukul {WEDDING.time}
        </p>
      </div>

      {/* Garis pemisah tipis */}
      <div style={{
        width: 60, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(100,180,255,0.5), transparent)",
        margin: "12px auto 14px",
      }} />

      {sudahLewat ? (
        <p style={{
          color: "#a8d8ff",
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
        }}>
          🎉 Hari Pernikahan Telah Tiba!
        </p>
      ) : (
        /* ── Kotak hitung mundur — lebih kompak ── */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(6px, 1.5vw, 9px)",
        }}>
          {units.map(({ label, value }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(100,180,255,0.35)",
              borderRadius: 10,
              padding: "8px 4px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 2px 12px rgba(100,180,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}>
              {/* Angka */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
                fontWeight: 600,
                color: "#a8d8ff",
                lineHeight: 1,
                marginBottom: 3,
                textShadow: "0 1px 8px rgba(100,180,255,0.5)",
              }}>
                {pad(value)}
              </div>

              {/* Label */}
              <div style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(0.52rem, 1.6vw, 0.62rem)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}