import { useEffect, useState } from "preact/hooks";

const STORAGE_KEY = "theme"; // key in localStorage
export default function useTheme() {
  const hasWindow = typeof window !== "undefined";
  // check whether the browser has a preference for light vs dark mode
  const prefersDark = (() => {
    // immediately invoked function expression
    if (!hasWindow) return false; //
    return (
      window.matchMedia && // matchMedia support
      window.matchMedia("(prefers-color-scheme: dark)").matches // dark mode preference in browser
    );
  })();

  // variable for what theme is set currently, and its setter
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // lazy initializer
    const saved = hasWindow ? localStorage.getItem(STORAGE_KEY) : null; // already have a preference saved
    if (saved === "light" || saved === "dark") return saved; // then use that
    return prefersDark ? "dark" : "light"; // else fall back to browser preference
  });

  // make sure that when the variable them is set, this reflects in the
  //appropriate html attribute, and the new preference is saved to local storage
  useEffect(() => {
    // when the theme is changed, save it in the html
    document.documentElement.setAttribute("theme", theme);
    try {
      // and save the new preference in the storage as well
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  // functional update: toggle to the opposite of the current theme
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return { theme, toggle };
}
