// components/sections/ClosingSection.tsx

import { useEffect, useRef } from "react";
import { WEDDING } from "../../utils/weddingConfig";

const SOCIALS = [
  {
    name: "WhatsApp",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: "rgba(37,211,102,0.25)", border: "rgba(37,211,102,0.45)", text: "#a8ffcc",
    href: "https://wa.me/6281234567890",
  },
  {
    name: "Instagram",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: "rgba(225,48,108,0.22)", border: "rgba(225,48,108,0.4)", text: "#ffb3cc",
    href: "https://instagram.com/masdigital",
  },
  {
    name: "TikTok",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
    color: "rgba(255,255,255,0.12)", border: "rgba(255,255,255,0.28)", text: "#fff",
    href: "https://tiktok.com/@masdigital",
  },
];

// ── Canvas Dove Animation Component ──
function DoveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    // Hearts floating up
    const hearts: { x: number; y: number; vy: number; opacity: number; size: number; delay: number }[] = [
      { x: 100, y: 70, vy: 0, opacity: 0, size: 12, delay: 80 },
      { x: 85,  y: 75, vy: 0, opacity: 0, size: 8,  delay: 140 },
      { x: 115, y: 72, vy: 0, opacity: 0, size: 7,  delay: 200 },
    ];

    // Sparkles
    const sparks: { x: number; y: number; phase: number }[] = [
      { x: 28,  y: 38, phase: 0   },
      { x: 172, y: 35, phase: 1.2 },
      { x: 100, y: 12, phase: 2.4 },
      { x: 50,  y: 55, phase: 0.8 },
      { x: 150, y: 52, phase: 1.8 },
    ];

    function drawDove(
      cx: number, cy: number,
      flip: boolean,
      wingAngle: number,  // 0 = flat, 1 = up, -1 = down
      bobY: number,
      headNod: number
    ) {
      ctx!.save();
      if (flip) {
        ctx!.translate(cx * 2, 0);
        ctx!.scale(-1, 1);
      }

      const x = cx;
      const y = cy + bobY;

      // Soft glow under dove
      const grd = ctx!.createRadialGradient(x, y + 16, 2, x, y + 16, 18);
      grd.addColorStop(0, "rgba(168,216,240,0.18)");
      grd.addColorStop(1, "rgba(168,216,240,0)");
      ctx!.beginPath();
      ctx!.ellipse(x, y + 16, 18, 5, 0, 0, Math.PI * 2);
      ctx!.fillStyle = grd;
      ctx!.fill();

      // Tail feathers
      ctx!.save();
      ctx!.translate(x - 14, y + 4);
      ctx!.rotate(0.15);
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.bezierCurveTo(-8, 4, -14, 2, -16, 8);
      ctx!.bezierCurveTo(-10, 4, -4, 6, 0, 0);
      ctx!.fillStyle = "rgba(255,255,255,0.72)";
      ctx!.fill();
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.bezierCurveTo(-8, 6, -13, 8, -14, 14);
      ctx!.bezierCurveTo(-8, 8, -2, 8, 0, 0);
      ctx!.fillStyle = "rgba(255,255,255,0.55)";
      ctx!.fill();
      ctx!.restore();

      // Back wing
      ctx!.save();
      ctx!.translate(x, y);
      const backWingAngle = wingAngle * 0.35;
      ctx!.rotate(backWingAngle);
      ctx!.beginPath();
      ctx!.moveTo(0, 2);
      ctx!.bezierCurveTo(-6, -8 - wingAngle * 10, -18, -14 - wingAngle * 8, -20, -22);
      ctx!.bezierCurveTo(-14, -12, -6, -4, 0, 2);
      ctx!.fillStyle = "rgba(255,255,255,0.52)";
      ctx!.fill();
      ctx!.restore();

      // Body
      ctx!.beginPath();
      ctx!.ellipse(x, y + 2, 14, 9, -0.1, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(255,255,255,0.92)";
      ctx!.fill();
      // Body sheen
      ctx!.beginPath();
      ctx!.ellipse(x - 2, y - 1, 7, 4, -0.3, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(220,240,255,0.35)";
      ctx!.fill();

      // Front wing
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(wingAngle * 0.45);
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.bezierCurveTo(-5, -10 - wingAngle * 12, -16, -16 - wingAngle * 10, -18, -26);
      ctx!.bezierCurveTo(-12, -14, -4, -6, 0, 0);
      ctx!.fillStyle = "rgba(255,255,255,0.78)";
      ctx!.fill();
      // Wing feather detail
      ctx!.beginPath();
      ctx!.moveTo(-2, -2);
      ctx!.bezierCurveTo(-8, -12 - wingAngle * 8, -14, -16 - wingAngle * 6, -16, -22);
      ctx!.strokeStyle = "rgba(200,225,245,0.4)";
      ctx!.lineWidth = 0.8;
      ctx!.stroke();
      ctx!.restore();

      // Head
      const headX = x + 13;
      const headY = y - 6 + headNod;
      ctx!.beginPath();
      ctx!.arc(headX, headY, 7.5, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(255,255,255,0.94)";
      ctx!.fill();
      // Head sheen
      ctx!.beginPath();
      ctx!.arc(headX - 2, headY - 2, 3.5, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(220,240,255,0.3)";
      ctx!.fill();

      // Beak
      ctx!.beginPath();
      ctx!.moveTo(headX + 6, headY + 0.5);
      ctx!.lineTo(headX + 13, headY - 1);
      ctx!.lineTo(headX + 6, headY + 3);
      ctx!.closePath();
      ctx!.fillStyle = "rgba(255,195,130,0.92)";
      ctx!.fill();

      // Eye
      ctx!.beginPath();
      ctx!.arc(headX + 2, headY - 1.5, 2, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(40,25,10,0.88)";
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(headX + 2.6, headY - 2.1, 0.8, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(255,255,255,0.95)";
      ctx!.fill();

      // Neck iridescence
      ctx!.beginPath();
      ctx!.ellipse(x + 6, y - 2, 4, 2.5, -0.4, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(140,200,240,0.3)";
      ctx!.fill();

      // Legs
      ctx!.strokeStyle = "rgba(255,195,130,0.82)";
      ctx!.lineWidth = 1.3;
      ctx!.lineCap = "round";
      [x - 3, x + 3].forEach(lx => {
        ctx!.beginPath();
        ctx!.moveTo(lx, y + 11);
        ctx!.lineTo(lx - 1, y + 17);
        ctx!.stroke();
        // Toes
        [[-4, 2], [0, 4], [4, 2]].forEach(([dx, dy]) => {
          ctx!.beginPath();
          ctx!.moveTo(lx - 1, y + 17);
          ctx!.lineTo(lx - 1 + dx, y + 17 + dy);
          ctx!.stroke();
        });
      });

      ctx!.restore();
    }

    function drawBranch(t: number) {
      const sway = Math.sin(t * 0.3) * 1.2;
      ctx!.save();
      ctx!.translate(0, sway);
      // Main branch
      ctx!.beginPath();
      ctx!.moveTo(15, 88);
      ctx!.bezierCurveTo(55, 84, 100, 86, 185, 88);
      ctx!.strokeStyle = "rgba(255,255,255,0.42)";
      ctx!.lineWidth = 2.8;
      ctx!.lineCap = "round";
      ctx!.stroke();
      // Sub branches
      [[50, 86, 52, 74], [100, 86, 100, 74], [150, 87, 148, 74]].forEach(([x1,y1,x2,y2]) => {
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = "rgba(255,255,255,0.28)";
        ctx!.lineWidth = 1.4;
        ctx!.stroke();
      });
      // Leaves
      [[52, 72, -20], [100, 72, 0], [148, 72, 18]].forEach(([lx, ly, rot]) => {
        ctx!.save();
        ctx!.translate(lx, ly);
        ctx!.rotate((rot * Math.PI) / 180);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, 5.5, 2.8, 0, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(168,216,240,0.42)";
        ctx!.fill();
        ctx!.restore();
      });
      ctx!.restore();
    }

    function drawHeart(x: number, y: number, size: number, alpha: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = "rgba(255,150,170,1)";
      ctx!.font = `${size}px serif`;
      ctx!.textAlign = "center";
      ctx!.fillText("❤", x, y);
      ctx!.restore();
    }

    function drawSparkle(x: number, y: number, phase: number, t: number) {
      const a = (Math.sin(t * 1.8 + phase) + 1) / 2;
      const s = a * 0.9 + 0.1;
      ctx!.save();
      ctx!.globalAlpha = a * 0.85;
      ctx!.translate(x, y);
      ctx!.scale(s, s);
      ctx!.fillStyle = "rgba(255,255,210,1)";
      ctx!.font = "10px serif";
      ctx!.textAlign = "center";
      ctx!.fillText("✦", 0, 4);
      ctx!.restore();
    }

    function animate() {
      const t = frame / 60;
      ctx!.clearRect(0, 0, 200, 110);

      // Wing flap — smooth sinusoidal, staggered per dove
      const flapL = Math.sin(t * 3.2) * 0.7;
      const flapR = Math.sin(t * 3.2 + 0.6) * 0.7;

      // Gentle bob
      const bobL = Math.sin(t * 1.4) * 2.2;
      const bobR = Math.sin(t * 1.4 + 0.9) * 2.2;

      // Head nod — slow, gentle
      const nodL = Math.sin(t * 0.9) * 1.5;
      const nodR = Math.sin(t * 0.9 + 1.1) * 1.5;

      drawBranch(t);

      // Left dove (faces right — normal)
      drawDove(44, 62, false, flapL, bobL, nodL);
      // Right dove (faces left — flipped)
      drawDove(156, 62, true, flapR, bobR, nodR);

      // Hearts
      hearts.forEach((h, i) => {
        if (frame < h.delay) return;
        const localT = (frame - h.delay) / 60;
        h.vy = -0.35;
        const elapsed = (frame - h.delay) % 160;
        const progress = elapsed / 160;
        const hy = h.y - progress * 32;
        const alpha = progress < 0.25
          ? progress / 0.25
          : progress > 0.7
          ? 1 - (progress - 0.7) / 0.3
          : 1;
        const pulse = 1 + Math.sin(localT * 4 + i) * 0.12;
        ctx!.save();
        ctx!.globalAlpha = alpha * 0.88;
        ctx!.translate(h.x, hy);
        ctx!.scale(pulse, pulse);
        ctx!.fillStyle = i === 0 ? "rgba(255,120,150,1)" : "rgba(255,160,180,1)";
        ctx!.font = `${h.size}px serif`;
        ctx!.textAlign = "center";
        ctx!.fillText("❤", 0, 0);
        ctx!.restore();
      });

      // Sparkles
      sparks.forEach(s => drawSparkle(s.x, s.y, s.phase, t));

      frame++;
      animId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={110}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}

export default function ClosingSection() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes closeFadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes closeScaleIn {
        from { opacity: 0; transform: scale(0.85); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes closeLineGrow {
        from { transform: scaleX(0); opacity: 0; }
        to   { transform: scaleX(1); opacity: 1; }
      }
      @keyframes closeShimmer {
        0%   { background-position: -300% center; }
        100% { background-position: 300% center; }
      }
      @keyframes closeHeartbeat {
        0%, 100% { transform: scale(1); }
        25%       { transform: scale(1.12); }
        50%       { transform: scale(1); }
        75%       { transform: scale(1.06); }
      }
      @keyframes closePetalFall {
        0%   { transform: translateY(-10px) rotate(0deg); opacity: 0; }
        20%  { opacity: 1; }
        100% { transform: translateY(30px) rotate(180deg); opacity: 0; }
      }
      @keyframes closeGlow {
        0%, 100% { box-shadow: 0 20px 60px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.3); }
        50%       { box-shadow: 0 26px 70px rgba(91,164,229,0.2), inset 0 1px 0 rgba(255,255,255,0.4); }
      }
      @keyframes footerReveal {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes socialPop {
        from { opacity: 0; transform: scale(0.8) translateY(10px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes footerShine {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes footerLogoPulse {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        50%       { transform: scale(1.05); filter: brightness(1.2); }
      }

      .close-card    { animation: closeScaleIn 1.3s cubic-bezier(0.16,1,0.3,1) 0.2s both,
                                  closeGlow 5s ease-in-out 2s infinite; }
      .close-initial { animation: closeFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
      .close-line    { animation: closeLineGrow 1s ease 0.7s both; transform-origin: center; }
      .close-title   { animation: closeFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.8s both; }
      .close-desc    { animation: closeFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 1.0s both; }
      .close-salam   { animation: closeFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 1.2s both; }
      .close-by      { animation: closeFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 1.4s both; }
      .close-name1   { animation: closeFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 1.6s both; }
      .close-amp     { animation: closeFadeUp 1s ease 1.8s both,
                                  closeHeartbeat 3s ease-in-out 3s infinite;
                       display: inline-block; }
      .close-name2   { animation: closeFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 2.0s both; }
      .close-shimmer {
        background: linear-gradient(
          90deg,
          #5ba4e5 0%, #a8d8f0 30%, #ffffff 50%, #a8d8f0 70%, #5ba4e5 100%
        );
        background-size: 300% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: closeShimmer 5s linear 2.5s infinite;
      }
      .close-petal {
        position: absolute; font-size: 14px;
        animation: closePetalFall 3s ease-in-out infinite;
        pointer-events: none;
      }
      .footer-wrap   { animation: footerReveal 1s cubic-bezier(0.16,1,0.3,1) 2.4s both; }
      .footer-brand  { animation: footerLogoPulse 4s ease-in-out 3s infinite; display: inline-block; }
      .social-btn-0  { animation: socialPop 0.7s cubic-bezier(0.16,1,0.3,1) 2.6s both; }
      .social-btn-1  { animation: socialPop 0.7s cubic-bezier(0.16,1,0.3,1) 2.75s both; }
      .social-btn-2  { animation: socialPop 0.7s cubic-bezier(0.16,1,0.3,1) 2.9s both; }
      .social-link {
        transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
      }
      .social-link:hover {
        transform: translateY(-4px) scale(1.04);
        box-shadow: 0 12px 30px rgba(0,0,0,0.2);
      }
      .footer-shine {
        background: linear-gradient(
          135deg,
          rgba(58,130,196,0.55) 0%, rgba(91,164,229,0.4) 40%,
          rgba(126,200,227,0.45) 70%, rgba(58,130,196,0.55) 100%
        );
        background-size: 200% auto;
        animation: footerShine 6s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const petals = [
    { left: "10%", top: "15%", delay: "0s"   },
    { left: "25%", top: "8%",  delay: "0.8s" },
    { left: "70%", top: "12%", delay: "1.5s" },
    { left: "88%", top: "20%", delay: "0.4s" },
    { left: "50%", top: "5%",  delay: "2s"   },
  ];

  return (
    <section style={{
      width: "100%", padding: "70px 20px 0",
      display: "flex", flexDirection: "column",
      alignItems: "center", position: "relative",
    }}>
      <div className="close-card" style={{
        width: "100%", maxWidth: 440, borderRadius: 30,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.25)",
        padding: "44px 28px 40px", textAlign: "center",
        position: "relative", overflow: "hidden", marginBottom: 0,
      }}>
        {petals.map((p, i) => (
          <span key={i} className="close-petal" style={{ left: p.left, top: p.top, animationDelay: p.delay }}>🌸</span>
        ))}
        {[
          { top: 14, left: 14, borderTop: "1.5px solid rgba(255,255,255,0.4)", borderLeft: "1.5px solid rgba(255,255,255,0.4)" },
          { top: 14, right: 14, borderTop: "1.5px solid rgba(255,255,255,0.4)", borderRight: "1.5px solid rgba(255,255,255,0.4)" },
          { bottom: 14, left: 14, borderBottom: "1.5px solid rgba(255,255,255,0.4)", borderLeft: "1.5px solid rgba(255,255,255,0.4)" },
          { bottom: 14, right: 14, borderBottom: "1.5px solid rgba(255,255,255,0.4)", borderRight: "1.5px solid rgba(255,255,255,0.4)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 18, height: 18, ...s }} />
        ))}

        {/* ── Canvas Merpati Animasi ── */}
        <div style={{ marginBottom: 20 }}>
          <DoveCanvas />
        </div>

        <div className="close-initial close-shimmer" style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(3.4rem, 11vw, 4.6rem)",
          marginBottom: 16, lineHeight: 1,
        }}>
          {WEDDING.initials}
        </div>

        <div className="close-line" style={{
          display: "flex", alignItems: "center", gap: 8,
          justifyContent: "center", marginBottom: 20,
        }}>
          <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.3)" }} />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>🌸</span>
          <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.3)" }} />
        </div>

        <h2 className="close-title" style={{
          color: "#fff", fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.6rem, 5.5vw, 2.1rem)", fontWeight: 700,
          marginBottom: 14, letterSpacing: "0.05em",
          textShadow: "0 2px 15px rgba(91,164,229,0.4)",
        }}>
          Terima Kasih
        </h2>

        <p className="close-desc" style={{
          color: "rgba(255,255,255,0.72)",
          fontSize: "clamp(0.95rem, 3.5vw, 1.08rem)",
          lineHeight: 1.9, maxWidth: 360, margin: "0 auto 18px",
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
        }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>

        <div className="close-salam" style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 50, padding: "9px 22px",
          color: "#fff", fontWeight: 700,
          fontSize: "clamp(0.88rem, 3vw, 1rem)",
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.04em", marginBottom: 28,
        }}>
          Wassalamu'alaikum Warahmatullahi Wabarakatuh
        </div>

        <p className="close-by" style={{
          color: "rgba(255,255,255,0.5)", fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14,
        }}>
          Kami Yang Berbahagia
        </p>

        <div className="close-name1" style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2.1rem, 7.5vw, 2.9rem)",
          color: "#fff", lineHeight: 1.2,
          textShadow: "0 2px 12px rgba(91,164,229,0.3)",
        }}>
          {WEDDING.brideFull}
        </div>

        <div style={{ margin: "8px 0", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <div style={{ height: 1, width: 30, background: "rgba(255,255,255,0.25)" }} />
          <span className="close-amp" style={{
            fontFamily: "'Playfair Display', serif", fontStyle: "italic",
            fontSize: "clamp(1.2rem, 4vw, 1.6rem)", color: "rgba(255,255,255,0.8)",
          }}>&amp;</span>
          <div style={{ height: 1, width: 30, background: "rgba(255,255,255,0.25)" }} />
        </div>

        <div className="close-name2" style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2.1rem, 7.5vw, 2.9rem)",
          color: "#fff", lineHeight: 1.2,
          textShadow: "0 2px 12px rgba(91,164,229,0.3)",
        }}>
          {WEDDING.groomFull}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer-wrap" style={{ width: "100%", marginTop: 0, overflow: "hidden" }}>
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 400 40" preserveAspectRatio="none" style={{ width: "100%", height: 40, display: "block" }}>
            <path d="M0,20 C100,40 300,0 400,20 L400,40 L0,40 Z" fill="rgba(30,60,100,0.55)" />
          </svg>
        </div>
        <div className="footer-shine" style={{
          padding: "28px 24px 32px",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 50, padding: "8px 20px", marginBottom: 10,
            }}>
              <span style={{ fontSize: 18 }}>✨</span>
              <span className="footer-brand" style={{
                color: "#fff", fontWeight: 800,
                fontSize: "clamp(1rem, 3.5vw, 1.15rem)",
                letterSpacing: "0.08em",
                fontFamily: "'Cormorant Garamond', serif",
              }}>MasDigital</span>
            </div>
            <p style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(0.72rem, 2.5vw, 0.8rem)",
              margin: 0, lineHeight: 1.7,
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            }}>
              Jasa Pembuatan Undangan Digital<br />Elegan • Modern • Berkesan
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            maxWidth: 300, margin: "0 auto 20px",
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
          </div>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.2em",
            textTransform: "uppercase", textAlign: "center", marginBottom: 14,
          }}>Hubungi Kami</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 28 }}>
            {SOCIALS.map((s, i) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`social-link social-btn-${i}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, textDecoration: "none" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: s.color, border: `1.5px solid ${s.border}`,
                  backdropFilter: "blur(10px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.text, boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                }}>{s.icon}</div>
                <span style={{
                  color: "rgba(255,255,255,0.75)", fontSize: "0.68rem",
                  fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                }}>{s.name}</span>
              </a>
            ))}
          </div>
          <div style={{
            marginTop: 24, textAlign: "center",
            color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", letterSpacing: "0.1em",
          }}>
            © 2026 MasDigital · All Rights Reserved
          </div>
        </div>
      </footer>
    </section>
  );
}