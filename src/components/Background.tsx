// components/Background.tsx
// Menampilkan background image, overlay gelap, blob warna, dan hujan petal 🌸

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left:     `${(i * 7.3) % 100}%`,
  duration: `${7 + (i * 1.3) % 6}s`,
  delay:    `${(i * 0.7) % 6}s`,
  size:     `${0.8 + (i * 0.15) % 0.9}rem`,
}));

interface BackgroundProps {
  bgImage: string;
}

export default function Background({ bgImage }: BackgroundProps) {
  return (
    <>
      {/* Foto background */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }} />

      {/* Overlay gelap */}
      <div style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(145deg, rgba(5,15,45,0.62) 0%, rgba(10,10,30,0.45) 50%, rgba(25,5,50,0.65) 100%)",
        zIndex: 1,
      }} />

      {/* Blob biru kanan atas */}
      <div style={{
        position: "fixed", top: -120, right: -120,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(80,160,255,0.22) 0%, transparent 70%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Blob ungu kiri bawah */}
      <div style={{
        position: "fixed", bottom: -100, left: -100,
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(180,100,255,0.14) 0%, transparent 70%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Petal jatuh 🌸 */}
      {PETALS.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed", top: "-30px", left: p.left,
            zIndex: 15, pointerEvents: "none",
            fontSize: p.size,
            animationName: "petalFall",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          🌸
        </div>
      ))}
    </>
  );
}
