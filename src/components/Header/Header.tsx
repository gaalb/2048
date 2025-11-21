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
    <div class="header_scores">
      <Badge>Score: {score}</Badge>
      <Badge>High Score: {highScore}</Badge>
    </div>
    <div class="header_toggles">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <SfxToggle muted={sfxMuted} onToggle={onToggleSfx} />
    </div>
  </header>
);

export default Header;
