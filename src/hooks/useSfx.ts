import { useMemo, useState, useEffect } from "preact/hooks";

const STORAGE_KEY = "sfxMuted"; // key in localStorage

export default function useSfx() {
  // Load persisted mute state or default to false
  const [muted, setMuted] = useState<boolean>(() => {
    // lazy initializer: if localStorage has a saved value, use that
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "true";
    } catch {
      return false;
    }
  });

  // Persist mute state in local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {}
  }, [muted]);

  const toggle = () => setMuted((m) => !m);

  // persistent object encapsulating the move sound effect
  const move = useMemo(() => {
    const a = new Audio("/sounds/slide.mp3");
    a.volume = 0.55;
    return a;
  }, []);

  //persistent object encapsulating the merge sound effect
  const merge = useMemo(() => {
    const a = new Audio("/sounds/pop.mp3");
    a.volume = 0.25;
    return a;
  }, []);

  // play a sound effect if not muted, else do nothing
  const play = (a: HTMLAudioElement) => {
    if (muted) return;
    try {
      a.currentTime = 0;
      void a.play();
    } catch {}
  };

  // return the mute state, the toggle function, and the sound effects
  return { muted, toggle, move, merge, play };
}
