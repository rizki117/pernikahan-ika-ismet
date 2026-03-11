// utils/useScrollReveal.ts
// Hook untuk animasi elemen saat masuk viewport ketika di-scroll

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe semua elemen yang punya class reveal*
    const targets = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
