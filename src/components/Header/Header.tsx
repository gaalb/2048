import { FunctionalComponent } from "preact";
import Badge from "./Badge";
import ThemeToggle from "./ThemeToggle";
import SfxToggle from "./SfxToggle";
import "./Header.css";

/**
 * Props for the Header component.
 * @property score - Current score of the game.
 * @property highScore - Highest score achieved (from localStorage).
 * @property theme - Current UI theme ("light" or "dark").
 * @property onToggleTheme - Callback to switch between light/dark theme.
 * @property sfxMuted - Whether sound effects are muted.
 * @property onToggleSfx - Callback to toggle sound effects on/off.
 */
type Props = {
  score: number;
  highScore: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  sfxMuted: boolean;
  onToggleSfx: () => void;
};

/**
 * Renders the top header section of the game UI.
 * Displays current score, high score, and provides theme and sound toggles.
 *
 * @param props.score - Live game score.
 * @param props.highScore - Persisted highest score.
 * @param props.theme - Current display theme.
 * @param props.onToggleTheme - Handler for switching theme.
 * @param props.sfxMuted - Whether sound effects are muted.
 * @param props.onToggleSfx - Handler for toggling sound effects.
 * @returns JSX header element with badges and toggle buttons.
 */
const Header: FunctionalComponent<Props> = ({
  score,
  highScore,
  theme,
  onToggleTheme,
  sfxMuted,
  onToggleSfx,
}) => (
  <header class="header">
    <Badge>Score: {score}</Badge>
    <Badge>High Score: {highScore}</Badge>
    <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    <SfxToggle muted={sfxMuted} onToggle={onToggleSfx} />
  </header>
);

export default Header;
