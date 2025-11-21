import { useMemo, useState, useEffect } from "preact/hooks";

const slideUrl = `${import.meta.env.BASE_URL}sounds/slide.mp3`;
const popUrl = `${import.meta.env.BASE_URL}sounds/pop.mp3`;

const STORAGE_KEY = "sfxMuted"; // key in localStorage

/**
 * Custom hook for managing and playing sound effects.
 * Features:
 * - Persists mute state in localStorage
 * - Provides toggle to mute/unmute
 * - Returns Audio instances for move and merge sounds
 * - Provides play() function that respects mute state
 *
 * @returns Object containing mute state, toggle function, audio refs, and play handler.
 */
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

  // Persist mute state in local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {}
  }, [muted]);

  /** Toggles SFX mute/unmute state */
  const toggle = () => setMuted((m) => !m);

  /** Audio instance for slide/move sound effect (memoized) */
  const move = useMemo(() => {
    const a = new Audio(slideUrl);
    a.volume = 0.55;
    return a;
  }, []);

  /** Audio instance for merge/pop sound effect (memoized) */
  const merge = useMemo(() => {
    const a = new Audio(popUrl);
    a.volume = 0.25;
    return a;
  }, []);

  /**
   * Plays a provided sound effect, unless muted.
   * Resets playback time before playing to allow rapid retriggering.
   *
   * @param a - The HTMLAudioElement to play.
   */
  const play = (a: HTMLAudioElement) => {
    if (muted) return;
    try {
      a.currentTime = 0;
      void a.play();
    } catch {}
  };

  // Return the mute state, toggle function, and both sound refs + play()
  return { muted, toggle, move, merge, play };
}
