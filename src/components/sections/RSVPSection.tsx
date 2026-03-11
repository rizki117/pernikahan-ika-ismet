// components/sections/RSVPSection.tsx

import { useState, useEffect } from "react";

interface Wish {
  name: string;
  message: string;
  attend: string;
  time: string;
}

const ATTEND_OPTIONS = [
  { value: "hadir",       label: "Hadir",       icon: "✅", color: "rgba(46,200,120,0.25)",  border: "rgba(46,200,120,0.5)",  text: "#a8ffda" },
  { value: "tidak hadir", label: "Tidak Hadir", icon: "❌", color: "rgba(255,80,80,0.2)",    border: "rgba(255,80,80,0.45)",  text: "#ffb3b3" },
  { value: "masih ragu",  label: "Masih Ragu",  icon: "🤔", color: "rgba(255,200,50,0.2)",   border: "rgba(255,200,50,0.45)", text: "#ffe9a0" },
];

export default function RSVPSection() {
  const [name,    setName]    = useState("");
  const [message, setMessage] = useState("");
  const [attend,  setAttend]  = useState("hadir");
  const [wishes,  setWishes]  = useState<Wish[]>([]);
  const [sent,    setSent]    = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes rsvpFadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes rsvpScaleIn {
        from { opacity: 0; transform: scale(0.92); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes rsvpWishIn {
        from { opacity: 0; transform: translateX(-20px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes rsvpSentPop {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.06); }
        100% { transform: scale(1); }
      }
      @keyframes rsvpIconFloat {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-6px); }
      }
      @keyframes rsvpGlow {
        0%, 100% { box-shadow: 0 20px 60px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.3); }
        50%       { box-shadow: 0 24px 70px rgba(91,164,229,0.18), inset 0 1px 0 rgba(255,255,255,0.4); }
      }

      .rsvp-title   { animation: rsvpFadeUp  1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
      .rsvp-form    { animation: rsvpScaleIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both;
                      animation: rsvpScaleIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both,
                                 rsvpGlow    5s ease-in-out 2s infinite; }
      .rsvp-icon    { animation: rsvpIconFloat 3.5s ease-in-out 1s infinite; display: inline-block; }
      .rsvp-wish    { animation: rsvpWishIn 0.6s cubic-bezier(0.16,1,0.3,1) both; }
      .rsvp-sent    { animation: rsvpSentPop 0.4s ease; }

      .rsvp-input {
        width: 100%;
        padding: 13px 16px;
        border-radius: 14px;
        font-size: clamp(0.82rem, 3vw, 0.92rem);
        color: #fff;
        background: rgba(255,255,255,0.08);
        outline: none;
        font-family: 'Cormorant Garamond', serif;
        margin-bottom: 12px;
        transition: border 0.3s ease, background 0.3s ease;
        box-sizing: border-box;
      }
      .rsvp-input::placeholder { color: rgba(255,255,255,0.4); }
      .rsvp-input:focus {
        background: rgba(255,255,255,0.13);
        border-color: rgba(255,255,255,0.5) !important;
      }
      .rsvp-submit-btn {
        transition: transform 0.3s ease, opacity 0.3s ease, background 0.3s ease;
      }
      .rsvp-submit-btn:hover {
        transform: translateY(-2px);
        opacity: 0.92;
      }
      .rsvp-submit-btn:active {
        transform: scale(0.97);
      }
      .rsvp-attend-btn {
        transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
      }
      .rsvp-attend-btn:hover {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) return;
    setWishes((prev) => [
      { name, message, attend, time: new Date().toLocaleDateString("id-ID") },
      ...prev,
    ]);
    setName(""); setMessage(""); setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const selectedAttend = ATTEND_OPTIONS.find(o => o.value === attend)!;

  return (
    <section
      id="section-rsvp"
      style={{
        width: "100%",
        padding: "70px 20px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* Judul */}
      <div className="rsvp-title" style={{ textAlign: "center" }}>
        <p style={{
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontSize: 11,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 10,
          fontFamily: "'Cormorant Garamond', serif",
        }}>
          ✦ &nbsp; Konfirmasi Kehadiran &nbsp; ✦
        </p>
        <div className="rsvp-icon" style={{ fontSize: 30, marginBottom: 10 }}>💌</div>
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2rem, 6vw, 2.6rem)",
          color: "#fff",
          margin: 0,
          textShadow: "0 2px 20px rgba(91,164,229,0.4)",
        }}>
          Ucapan & RSVP
        </h2>
      </div>

      {/* Form */}
      <div
        className="rsvp-form"
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 28,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.3)",
          padding: "30px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Sudut dekoratif */}
        {[
          { top: 12, left: 12, borderTop: "1.5px solid rgba(255,255,255,0.35)", borderLeft: "1.5px solid rgba(255,255,255,0.35)" },
          { top: 12, right: 12, borderTop: "1.5px solid rgba(255,255,255,0.35)", borderRight: "1.5px solid rgba(255,255,255,0.35)" },
          { bottom: 12, left: 12, borderBottom: "1.5px solid rgba(255,255,255,0.35)", borderLeft: "1.5px solid rgba(255,255,255,0.35)" },
          { bottom: 12, right: 12, borderBottom: "1.5px solid rgba(255,255,255,0.35)", borderRight: "1.5px solid rgba(255,255,255,0.35)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 16, height: 16, ...s }} />
        ))}

        {/* Input Nama */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <div style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, color: "rgba(255,255,255,0.4)", pointerEvents: "none",
          }}>👤</div>
          <input
            className="rsvp-input"
            style={{
              paddingLeft: 38,
              border: `1px solid ${focused === "name" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.18)"}`,
            }}
            placeholder="Nama kamu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
        </div>

        {/* Textarea */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <div style={{
            position: "absolute", left: 14, top: 14,
            fontSize: 14, color: "rgba(255,255,255,0.4)", pointerEvents: "none",
          }}>✍️</div>
          <textarea
            className="rsvp-input"
            style={{
              paddingLeft: 38,
              height: 100,
              resize: "none",
              border: `1px solid ${focused === "msg" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.18)"}`,
            }}
            placeholder="Ucapan & doa untuk pengantin..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocused("msg")}
            onBlur={() => setFocused(null)}
          />
        </div>

        {/* Pilihan kehadiran */}
        <p style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 10,
          textAlign: "center",
        }}>
          Konfirmasi Kehadiran
        </p>
        <div style={{
          display: "flex", gap: 8, marginBottom: 20, justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {ATTEND_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAttend(opt.value)}
              className="rsvp-attend-btn"
              style={{
                padding: "8px 16px",
                borderRadius: 50,
                background: attend === opt.value ? opt.color : "rgba(255,255,255,0.06)",
                border: `1px solid ${attend === opt.value ? opt.border : "rgba(255,255,255,0.18)"}`,
                color: attend === opt.value ? opt.text : "rgba(255,255,255,0.5)",
                fontSize: "clamp(0.68rem, 2.2vw, 0.78rem)",
                cursor: "pointer",
                fontWeight: attend === opt.value ? 700 : 400,
                display: "flex", alignItems: "center", gap: 5,
                backdropFilter: "blur(8px)",
              }}
            >
              <span>{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>

        {/* Tombol kirim */}
        <button
          onClick={handleSubmit}
          className={`rsvp-submit-btn ${sent ? "rsvp-sent" : ""}`}
          style={{
            width: "100%",
            padding: "13px",
            background: sent
              ? "linear-gradient(135deg, rgba(46,200,120,0.4), rgba(30,160,90,0.4))"
              : "linear-gradient(135deg, rgba(91,164,229,0.45), rgba(58,130,196,0.45))",
            border: `1px solid ${sent ? "rgba(46,200,120,0.5)" : "rgba(255,255,255,0.3)"}`,
            borderRadius: 14,
            color: "#fff",
            fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.08em",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {sent ? <><span>✨</span> Terkirim!</> : <><span>💌</span> Kirim Ucapan</>}
        </button>
      </div>

      {/* Daftar ucapan */}
      {wishes.length > 0 && (
        <div style={{ width: "100%", maxWidth: 420 }}>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 14,
          }}>
            ✦ &nbsp; Ucapan Tamu &nbsp; ✦
          </p>

          {wishes.map((w, i) => {
            const opt = ATTEND_OPTIONS.find(o => o.value === w.attend)!;
            return (
              <div
                key={i}
                className="rsvp-wish"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  background: "rgba(255,255,255,0.09)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 20,
                  padding: "18px 20px",
                  marginBottom: 12,
                  textAlign: "left",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 34, height: 34,
                      borderRadius: "50%",
                      background: "rgba(91,164,229,0.25)",
                      border: "1px solid rgba(91,164,229,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, color: "#fff", fontWeight: 700,
                    }}>
                      {w.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "clamp(0.85rem, 3vw, 0.93rem)",
                    }}>
                      {w.name}
                    </span>
                  </div>
                  <span style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "0.7rem",
                  }}>
                    {w.time}
                  </span>
                </div>

                <p style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "clamp(0.8rem, 2.8vw, 0.88rem)",
                  lineHeight: 1.7,
                  marginBottom: 12,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                }}>
                  "{w.message}"
                </p>

                <span style={{
                  fontSize: "0.72rem",
                  padding: "4px 12px",
                  borderRadius: 50,
                  background: opt.color,
                  border: `1px solid ${opt.border}`,
                  color: opt.text,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}>
                  {opt.icon} {opt.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
