// components/sections/GiftsSection.tsx

import { useState, useEffect } from "react";
import { WEDDING } from "../../utils/weddingConfig";

// ── Warna header per nama bank ──────────────────────────────
function getBankColor(bank: string): string {
  const name = bank.toLowerCase();
  if (name.includes("bca"))     return "linear-gradient(135deg, rgba(0,100,180,0.7), rgba(0,70,140,0.6))";
  if (name.includes("mandiri")) return "linear-gradient(135deg, rgba(0,100,60,0.7), rgba(0,70,40,0.6))";
  if (name.includes("bri"))     return "linear-gradient(135deg, rgba(0,82,165,0.7), rgba(0,60,130,0.6))";
  if (name.includes("bni"))     return "linear-gradient(135deg, rgba(255,140,0,0.7), rgba(200,100,0,0.6))";
  if (name.includes("dana"))    return "linear-gradient(135deg, rgba(0,140,255,0.7), rgba(0,100,210,0.6))";
  if (name.includes("ovo"))     return "linear-gradient(135deg, rgba(100,0,180,0.7), rgba(70,0,130,0.6))";
  if (name.includes("gopay"))   return "linear-gradient(135deg, rgba(0,180,80,0.7), rgba(0,130,60,0.6))";
  // default
  return "linear-gradient(135deg, rgba(91,164,229,0.5), rgba(58,130,196,0.4))";
}

function getBankLogo(bank: string): string {
  const name = bank.toLowerCase();
  if (name.includes("bca"))     return "🏦";
  if (name.includes("mandiri")) return "🏛️";
  if (name.includes("bri"))     return "🏦";
  if (name.includes("bni"))     return "🏦";
  if (name.includes("dana"))    return "💙";
  if (name.includes("ovo"))     return "💜";
  if (name.includes("gopay"))   return "💚";
  return "💳";
}

interface BankCardProps {
  bank: string;
  bankColor: string;
  logo: string;
  accountNumber: string;
  accountName: string;
  delay?: string;
}

function BankCard({ bank, bankColor, logo, accountNumber, accountName, delay = "0s" }: BankCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber.replace(/\s/g, "")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="gift-card"
      style={{
        width: "100%",
        borderRadius: 22,
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 16px 50px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.3)",
        animationDelay: delay,
      }}
    >
      {/* Header bank */}
      <div style={{
        background: bankColor,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}>
        <div style={{
          width: 42, height: 42,
          borderRadius: 12,
          background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
          border: "1px solid rgba(255,255,255,0.3)",
        }}>
          {logo}
        </div>
        <div>
          <div style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}>
            Transfer Via
          </div>
          <div style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "clamp(0.95rem, 3vw, 1.05rem)",
            letterSpacing: "0.05em",
          }}>
            {bank}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 14,
        }}>
          <div style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}>
            Nomor Rekening
          </div>
          <div style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "clamp(1rem, 3.5vw, 1.15rem)",
            letterSpacing: "0.1em",
            fontFamily: "monospace",
            marginBottom: 4,
          }}>
            {accountNumber}
          </div>
          <div style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "clamp(0.78rem, 2.5vw, 0.85rem)",
          }}>
            a/n {accountName}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="gift-copy-btn"
          style={{
            width: "100%",
            padding: "11px 0",
            borderRadius: 50,
            background: copied
              ? "rgba(72,199,142,0.25)"
              : "rgba(255,255,255,0.12)",
            border: copied
              ? "1px solid rgba(72,199,142,0.5)"
              : "1px solid rgba(255,255,255,0.25)",
            color: copied ? "#a8ffda" : "#fff",
            fontSize: "clamp(0.8rem, 2.8vw, 0.88rem)",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.3s ease",
            backdropFilter: "blur(8px)",
            letterSpacing: "0.05em",
          }}
        >
          {copied ? <><span>✓</span> Tersalin!</> : <><span>📋</span> Salin Nomor</>}
        </button>
      </div>
    </div>
  );
}

export default function GiftsSection() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes giftFadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes giftScaleIn {
        from { opacity: 0; transform: scale(0.9); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes giftCardIn {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes giftIconFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50%       { transform: translateY(-6px) rotate(5deg); }
      }

      .gift-title   { animation: giftFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
      .gift-desc    { animation: giftFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
      .gift-icon    { animation: giftIconFloat 4s ease-in-out 1s infinite; display: inline-block; }
      .gift-card    { animation: giftCardIn 1.2s cubic-bezier(0.16,1,0.3,1) both; }
      .gift-card:nth-child(1) { animation-delay: 0.5s; }
      .gift-card:nth-child(2) { animation-delay: 0.7s; }
      .gift-card:nth-child(3) { animation-delay: 0.9s; }

      .gift-card {
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
      }
      .gift-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 24px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35) !important;
      }
      .gift-copy-btn:hover {
        background: rgba(255,255,255,0.2) !important;
        transform: scale(1.02);
      }
      .gift-note {
        animation: giftFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.9s both;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <section
      id="section-gifts"
      style={{
        width: "100%",
        padding: "70px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Judul */}
      <div className="gift-title" style={{ textAlign: "center", marginBottom: 6 }}>
        <p style={{
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontSize: 11,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 10,
          fontFamily: "'Cormorant Garamond', serif",
        }}>
          ✦ &nbsp; Hadiah Pernikahan &nbsp; ✦
        </p>
        <div className="gift-icon" style={{ fontSize: 32, marginBottom: 10 }}>🎁</div>
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2rem, 6vw, 2.6rem)",
          color: "#fff",
          margin: 0,
          textShadow: "0 2px 20px rgba(91,164,229,0.4)",
        }}>
          Wedding Gifts
        </h2>
      </div>

      {/* Deskripsi */}
      <div
        className="gift-desc"
        style={{
          width: "100%",
          maxWidth: 400,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 18,
          padding: "18px 22px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <p style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: "clamp(0.82rem, 3vw, 0.93rem)",
          lineHeight: 1.9,
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
        }}>
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
          Jika ingin memberi hadiah, Anda dapat mengirimkannya secara cashless melalui:
        </p>
      </div>

      {/* Cards — otomatis dari weddingConfig.bankAccounts */}
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 }}>
        {WEDDING.bankAccounts.map((acc, i) => (
          <BankCard
            key={i}
            bank={acc.bank}
            bankColor={getBankColor(acc.bank)}
            logo={getBankLogo(acc.bank)}
            accountNumber={acc.number}
            accountName={acc.name}
            delay={`${0.5 + i * 0.2}s`}
          />
        ))}
      </div>

      {/* Catatan */}
      <div
        className="gift-note"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 50,
          padding: "10px 20px",
          maxWidth: 400,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 14 }}>🙏</span>
        <p style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "clamp(0.75rem, 2.5vw, 0.82rem)",
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
        }}>
          Terima kasih atas perhatian dan kasih sayang Anda
        </p>
      </div>
    </section>
  );
}
