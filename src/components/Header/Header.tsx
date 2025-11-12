import { FunctionalComponent } from "preact";
import Badge from "./Badge";
import ThemeToggle from "./ThemeToggle";
import SfxToggle from "./SfxToggle";
import "./Header.css";

type Props = {
  score: number;
  highScore: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  sfxMuted: boolean;
  onToggleSfx: () => void;
};

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
