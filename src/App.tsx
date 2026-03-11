// App.tsx — Orkestrator utama
// Mengelola fase animasi (intro → amplop → halaman penuh)

import { useState, useEffect } from "react";
import bgImage from "./assets/myimg/bg1.jpeg";

import "./styles/animations.css";
import { getGuestName }  from "./utils/getGuestName";
import Background        from "./components/Background";
import IntroScreen       from "./components/IntroScreen";
import EnvelopeScreen    from "./components/EnvelopeScreen";
import MainPage          from "./components/MainPage";

type Phase = "intro" | "envelope" | "opening" | "main";

export default function App() {
  const [phase, setPhase]       = useState<Phase>("intro");
  const [showCard, setShowCard] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [guestName]             = useState<string>(getGuestName);

  useEffect(() => {
    const t = setTimeout(() => setPhase("envelope"), 2400);
    return () => clearTimeout(t);
  }, []);

  const handleOpenEnvelope = () => {
    setPhase("opening");
    setTimeout(() => {
      setPhase("main");
      setTimeout(() => setShowCard(true), 100);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflowX: "hidden",
      fontFamily: "'Georgia', serif",
    }}>
      {/* Background + petal — tampil di SEMUA fase termasuk main */}
      <Background bgImage={bgImage} />

      {/* Fase 1: Intro */}
      {phase === "intro" && <IntroScreen guestName={guestName} />}

      {/* Fase 2: Amplop */}
      {(phase === "envelope" || phase === "opening") && (
        <EnvelopeScreen
          guestName={guestName}
          isOpening={phase === "opening"}
          onOpen={handleOpenEnvelope}
        />
      )}

      {/* Fase 3: Cover page + popup */}
      {phase === "main" && (
        <MainPage
          guestName={guestName}
          showCard={showCard}
          onOpenDetails={() => setShowDetails(p => !p)}
          showDetails={showDetails}
        />
      )}
    </div>
  );
}