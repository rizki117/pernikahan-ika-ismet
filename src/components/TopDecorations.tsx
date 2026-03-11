// components/TopDecorations.tsx
// Dua merpati cinta bercumbu – Canvas API (sama persis seperti ClosingSection)

import { useEffect, useRef } from "react";

interface TopDecorationsProps {
  visible: boolean;
}

// ─── Canvas width/height ───
const W = 220;
const H = 120;

export default function TopDecorations({ visible }: TopDecorationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    // ── Hearts ──
    const hearts = [
      { x: 110, y: 28, opacity: 0, size: 13, delay: 60  },
      { x: 97,  y: 32, opacity: 0, size: 8,  delay: 120 },
      { x: 123, y: 30, opacity: 0, size: 7,  delay: 185 },
    ];

    // ── Sparkles ──
    const sparks = [
      { x: 22,  y: 32, phase: 0   },
      { x: 198, y: 30, phase: 1.3 },
      { x: 110, y: 8,  phase: 2.5 },
      { x: 55,  y: 50, phase: 0.7 },
      { x: 165, y: 48, phase: 1.9 },
    ];

    // ── Draw one dove ──
    // cx, cy  = center of body
    // flip    = face left if true
    // wingAngle = -1..1
    // bobY    = vertical offset
    // headNod = head vertical offset
    // tint    = "blue" | "rose"
    function drawDove(
      cx: number, cy: number,
      flip: boolean,
      wingAngle: number,
      bobY: number,
      headNod: number,
      tint: "blue" | "rose"
    ) {
      ctx.save();

      // Mirror untuk burung kanan
      if (flip) {
        ctx.translate(cx * 2, 0);
        ctx.scale(-1, 1);
      }

      const x = cx;
      const y = cy + bobY;

      // Warna berdasarkan tint
      const bodyColor    = tint === "blue"
        ? "rgba(230,242,255,0.96)"
        : "rgba(255,235,242,0.96)";
      const bodySheen    = tint === "blue"
        ? "rgba(180,220,255,0.38)"
        : "rgba(255,190,215,0.38)";
      const wingColor    = tint === "blue"
        ? "rgba(245,252,255,0.88)"
        : "rgba(255,245,250,0.88)";
      const wingBack     = tint === "blue"
        ? "rgba(210,238,255,0.55)"
        : "rgba(255,220,238,0.55)";
      const neckIrr      = tint === "blue"
        ? "rgba(120,190,240,0.32)"
        : "rgba(240,140,185,0.32)";
      const headColor    = tint === "blue"
        ? "rgba(240,250,255,0.97)"
        : "rgba(255,242,248,0.97)";
      const headSheen    = tint === "blue"
        ? "rgba(200,232,255,0.32)"
        : "rgba(255,210,230,0.32)";
      const tailColor1   = tint === "blue"
        ? "rgba(255,255,255,0.75)"
        : "rgba(255,248,252,0.75)";
      const tailColor2   = tint === "blue"
        ? "rgba(230,245,255,0.55)"
        : "rgba(255,235,245,0.55)";

      // ── Soft glow under dove ──
      const grd = ctx.createRadialGradient(x, y + 14, 2, x, y + 14, 16);
      grd.addColorStop(0, tint === "blue"
        ? "rgba(160,210,245,0.2)"
        : "rgba(245,160,200,0.2)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.ellipse(x, y + 14, 16, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // ── Tail feathers ──
      ctx.save();
      ctx.translate(x - 13, y + 3);
      ctx.rotate(0.18);
      // Bulu ekor 1
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-8, 5, -15, 3, -17, 9);
      ctx.bezierCurveTo(-10, 4, -4, 7, 0, 0);
      ctx.fillStyle = tailColor1;
      ctx.fill();
      // Bulu ekor 2
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-7, 7, -12, 10, -13, 16);
      ctx.bezierCurveTo(-7, 9, -2, 9, 0, 0);
      ctx.fillStyle = tailColor2;
      ctx.fill();
      ctx.restore();

      // ── Back wing ──
      ctx.save();
      ctx.translate(x, y);
      const bwa = wingAngle * 0.32;
      ctx.rotate(bwa);
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.bezierCurveTo(-5, -7 - wingAngle * 9, -17, -13 - wingAngle * 7, -19, -21);
      ctx.bezierCurveTo(-13, -11, -5, -4, 0, 2);
      ctx.fillStyle = wingBack;
      ctx.fill();
      ctx.restore();

      // ── Body ──
      ctx.beginPath();
      ctx.ellipse(x, y + 2, 13, 8.5, -0.08, 0, Math.PI * 2);
      ctx.fillStyle = bodyColor;
      ctx.fill();
      // Body sheen
      ctx.beginPath();
      ctx.ellipse(x - 2, y - 1, 6.5, 3.8, -0.28, 0, Math.PI * 2);
      ctx.fillStyle = bodySheen;
      ctx.fill();

      // ── Front wing ──
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(wingAngle * 0.44);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -10 - wingAngle * 11, -15, -15 - wingAngle * 9, -17, -25);
      ctx.bezierCurveTo(-11, -13, -4, -6, 0, 0);
      ctx.fillStyle = wingColor;
      ctx.fill();
      // Wing feather detail lines
      ctx.beginPath();
      ctx.moveTo(-2, -2);
      ctx.bezierCurveTo(-8, -11 - wingAngle * 7, -13, -15 - wingAngle * 5, -15, -21);
      ctx.strokeStyle = tint === "blue"
        ? "rgba(180,218,248,0.42)"
        : "rgba(248,175,210,0.42)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-3, -4);
      ctx.bezierCurveTo(-9, -12 - wingAngle * 6, -12, -16 - wingAngle * 4, -14, -20);
      ctx.strokeStyle = tint === "blue"
        ? "rgba(180,218,248,0.28)"
        : "rgba(248,175,210,0.28)";
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();

      // ── Head ──
      // Kepala sedikit condong ke depan (arah paruh) untuk kesan bercumbu
      const headX = x + 12;
      const headY = y - 5 + headNod;
      ctx.beginPath();
      ctx.arc(headX, headY, 7, 0, Math.PI * 2);
      ctx.fillStyle = headColor;
      ctx.fill();
      // Head sheen
      ctx.beginPath();
      ctx.arc(headX - 2, headY - 2, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = headSheen;
      ctx.fill();

      // ── Neck iridescence ──
      ctx.beginPath();
      ctx.ellipse(x + 6, y - 1.5, 3.8, 2.2, -0.35, 0, Math.PI * 2);
      ctx.fillStyle = neckIrr;
      ctx.fill();

      // ── Beak – tipis & kecil khas merpati ──
      ctx.beginPath();
      ctx.moveTo(headX + 6, headY + 0.5);
      ctx.lineTo(headX + 13, headY - 0.5);
      ctx.lineTo(headX + 6, headY + 3);
      ctx.closePath();
      ctx.fillStyle = "rgba(248,190,100,0.95)";
      ctx.fill();
      // Garis tengah paruh
      ctx.beginPath();
      ctx.moveTo(headX + 6, headY + 1.5);
      ctx.lineTo(headX + 12.5, headY + 0.8);
      ctx.strokeStyle = "rgba(200,140,50,0.5)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // ── Eye ──
      ctx.beginPath();
      ctx.arc(headX + 1.5, headY - 1.5, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(35,20,8,0.9)";
      ctx.fill();
      // Eye shine
      ctx.beginPath();
      ctx.arc(headX + 2.2, headY - 2.2, 0.85, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fill();
      // Tiny secondary shine
      ctx.beginPath();
      ctx.arc(headX + 0.8, headY - 0.8, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();

      // ── Legs ──
      ctx.strokeStyle = "rgba(235,180,80,0.85)";
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      [x - 3, x + 3].forEach(lx => {
        ctx.beginPath();
        ctx.moveTo(lx, y + 10);
        ctx.lineTo(lx - 1, y + 17);
        ctx.stroke();
        // Toes
        [[-4, 2], [0, 4], [4, 2]].forEach(([dx, dy]) => {
          ctx.beginPath();
          ctx.moveTo(lx - 1, y + 17);
          ctx.lineTo(lx - 1 + dx, y + 17 + dy);
          ctx.stroke();
        });
      });

      ctx.restore();
    }

    // ── Draw branch ──
    function drawBranch(t: number) {
      const sway = Math.sin(t * 0.28) * 1.0;
      ctx.save();
      ctx.translate(0, sway);
      // Main branch
      ctx.beginPath();
      ctx.moveTo(20, 96);
      ctx.bezierCurveTo(65, 91, 130, 93, 200, 96);
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.stroke();
      // Sub branches & leaves
      ([[55,93,57,80],[110,93,108,80],[165,93,163,80]] as [number,number,number,number][])
        .forEach(([x1,y1,x2,y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
          ctx.strokeStyle = "rgba(255,255,255,0.22)";
          ctx.lineWidth = 1.3; ctx.stroke();
        });
      ([[57,78,-22],[108,78,0],[163,78,20]] as [number,number,number][])
        .forEach(([lx,ly,rot]) => {
          ctx.save();
          ctx.translate(lx,ly);
          ctx.rotate((rot*Math.PI)/180);
          ctx.beginPath();
          ctx.ellipse(0,0,5,2.5,0,0,Math.PI*2);
          ctx.fillStyle = "rgba(160,220,190,0.38)";
          ctx.fill();
          ctx.restore();
        });
      ctx.restore();
    }

    // ── Draw sparkle ──
    function drawSparkle(x: number, y: number, phase: number, t: number) {
      const a = (Math.sin(t * 1.9 + phase) + 1) / 2;
      const s = a * 0.85 + 0.12;
      ctx.save();
      ctx.globalAlpha = a * 0.88;
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.fillStyle = "rgba(255,248,180,1)";
      ctx.font = "10px serif";
      ctx.textAlign = "center";
      ctx.fillText("✦", 0, 4);
      ctx.restore();
    }

    // ── Animation loop ──
    function animate() {
      const t = frame / 60;
      ctx.clearRect(0, 0, W, H);

      // Wing flap – staggered
      const flapL = Math.sin(t * 3.2) * 0.72;
      const flapR = Math.sin(t * 3.2 + 0.65) * 0.72;

      // Gentle bob
      const bobL = Math.sin(t * 1.4) * 2.0;
      const bobR = Math.sin(t * 1.4 + 0.95) * 2.0;

      // Head nod – slow sway toward each other
      const nodL = Math.sin(t * 0.85) * 1.4;
      const nodR = Math.sin(t * 0.85 + 1.1) * 1.4;

      drawBranch(t);

      // Burung KIRI – putih rose, menghadap kanan
      drawDove(52, 62, false, flapL, bobL, nodL, "rose");

      // Burung KANAN – putih biru, menghadap kiri (flip)
      drawDove(168, 62, true, flapR, bobR, nodR, "blue");

      // Hearts melayang di tengah-atas
      hearts.forEach((h, i) => {
        if (frame < h.delay) return;
        const elapsed = (frame - h.delay) % 170;
        const progress = elapsed / 170;
        const hy = h.y - progress * 35;
        const alpha =
          progress < 0.22
            ? progress / 0.22
            : progress > 0.68
            ? 1 - (progress - 0.68) / 0.32
            : 1;
        const pulse = 1 + Math.sin(t * 4.2 + i * 1.4) * 0.13;
        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        ctx.translate(h.x, hy);
        ctx.scale(pulse, pulse);
        ctx.fillStyle = i === 0
          ? "rgba(255,100,140,1)"
          : "rgba(255,148,172,1)";
        ctx.font = `${h.size}px serif`;
        ctx.textAlign = "center";
        ctx.fillText("❤", 0, 0);
        ctx.restore();
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
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      paddingTop: "clamp(10px,3vw,22px)",
      opacity: visible ? 1 : 0,
      transition: "opacity 1s ease 0.5s",
    }}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ display: "block" }}
      />
    </div>
  );
}
