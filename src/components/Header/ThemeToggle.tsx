import { FunctionalComponent } from "preact";
import "./ThemeToggle.css";

/**
 * Props for the ThemeToggle component.
 * @property theme - Current theme ("light" or "dark").
 * @property onToggle - Callback to switch between light and dark mode.
 */
type Props = { theme: "light" | "dark"; onToggle: () => void };

/**
 * Button to toggle between light and dark UI themes.
 * Displays text based on current theme.
 *
 * @param props.theme - The current active theme.
 * @param props.onToggle - Handler to toggle the theme.
 * @returns A styled button that toggles the theme.
 */
const ThemeToggle: FunctionalComponent<Props> = ({ theme, onToggle }) => (
  <button class="theme-toggle" onClick={onToggle}>
    {theme === "dark" ? "Lighten up!" : "Go dark!"}
  </button>
);

export default ThemeToggle;
