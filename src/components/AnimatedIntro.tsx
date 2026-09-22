import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Ref } from "react";
import { Pause, Play } from "lucide-react";

const name = "Paul Kahura";
const descriptions = [
  "Fact: I am a software engineer and venture builder based in Kiambu County, Kenya.",
  "Fact: I build across mobile apps, AI systems, data platforms, and cloud infrastructure.",
  "Fact: My work has helped bring two startups to market with international reach.",
  "Fact: I have built products for transport, healthcare operations, communications, and physical spaces.",
  "Fact: I work with React, Flutter, Python, TypeScript, and AWS to take ideas into production.",
];
const glyphs = "01<>/+#%*:_";
const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (callback: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

export function AnimatedIntro({
  headingRef,
}: {
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const [typed, setTyped] = useState(0);
  const [paused, setPaused] = useState(false);
  const [frame, setFrame] = useState({
    text: descriptions[0],
    index: 0,
    scrambling: false,
  });
  const lastIndex = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;
    let count = 0;
    const timer = window.setInterval(() => {
      setTyped(++count);
      if (count >= name.length) window.clearInterval(timer);
    }, 90);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    let timeout = 0;
    let interval = 0;
    let deck: number[] = [];
    function nextDescription() {
      if (!deck.length) {
        deck = descriptions
          .map((_, index) => index)
          .filter((index) => index !== lastIndex.current);
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
      }
      const index = deck.pop()!;
      const target = descriptions[index];
      lastIndex.current = index;
      let step = 0;
      interval = window.setInterval(() => {
        step++;
        const settled = step >= 18;
        const text = settled
          ? target
          : [...target]
              .map((char, offset) =>
                char === " " || offset < (step / 18) * target.length
                  ? char
                  : glyphs[Math.floor(Math.random() * glyphs.length)],
              )
              .join("");
        setFrame({ text, index, scrambling: !settled });
        if (settled) {
          window.clearInterval(interval);
          timeout = window.setTimeout(nextDescription, 5200);
        }
      }, 38);
    }
    timeout = window.setTimeout(nextDescription, 4800);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [reducedMotion, paused]);

  return (
    <>
      <h1 ref={headingRef} tabIndex={-1} className="name" aria-label={name}>
        <span className="name-reserve" aria-hidden="true">
          {name}
          <span className="block-cursor" />
        </span>
        <span className="typed-name" aria-hidden="true">
          {reducedMotion ? name : name.slice(0, typed)}
          <span className="block-cursor" />
        </span>
      </h1>
      <p className="home-title">
        Senior Software Engineer &amp; Forward Deployed Engineer
      </p>
      <div className="description-line">
        <p className="home-description">
          <span className="sr-only">{descriptions[0]}</span>
          <span
            aria-hidden="true"
            className="decrypt-line"
            data-phase={
              reducedMotion || paused
                ? "settled"
                : frame.scrambling
                  ? "scrambling"
                  : "settled"
            }
            data-description={reducedMotion ? 0 : frame.index}
          >
            {reducedMotion
              ? descriptions[0]
              : paused
                ? descriptions[frame.index]
                : frame.text}
          </span>
        </p>
        {!reducedMotion && (
          <button
            className="animation-toggle icon-button"
            aria-label={
              paused ? "Resume text animation" : "Pause text animation"
            }
            title={paused ? "Resume text animation" : "Pause text animation"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        )}
      </div>
    </>
  );
}
