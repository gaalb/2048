import { useEffect, useRef } from "preact/hooks";

export type SwipeDir = "up" | "down" | "left" | "right";

/**
 * Calls onSwipe(dir) when a swipe exceeds `threshold` px.
 * Optional `enabled` lets you limit to phones/tablets.
 */
export default function useSwipe(
  onSwipe: (dir: SwipeDir) => void,
  threshold = 24,
  enabled = true
) {
  const startX = useRef(0);
  const startY = useRef(0);
  const active = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const onDown = (e: PointerEvent) => {
      active.current = true;
      startX.current = e.clientX;
      startY.current = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (!active.current) return;
      active.current = false;

      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

      if (Math.abs(dx) > Math.abs(dy)) onSwipe(dx > 0 ? "right" : "left");
      else onSwipe(dy > 0 ? "down" : "up");
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onSwipe, threshold, enabled]);
}
