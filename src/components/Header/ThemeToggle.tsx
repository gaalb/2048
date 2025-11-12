import { FunctionalComponent } from "preact";
import "./ThemeToggle.css";

type Props = { theme: "light" | "dark"; onToggle: () => void };
const ThemeToggle: FunctionalComponent<Props> = ({ theme, onToggle }) => (
  <button class="theme-toggle" onClick={onToggle}>
    {theme === "dark" ? "Lighten up!" : "Go dark!"}
  </button>
);
export default ThemeToggle;
