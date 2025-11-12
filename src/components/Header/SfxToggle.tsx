import { FunctionalComponent } from "preact";
import "./SfxToggle.css";

type Props = {
  muted: boolean;
  onToggle: () => void;
};

const SfxToggle: FunctionalComponent<Props> = ({ muted, onToggle }) => (
  <button class="sfx-toggle" onClick={onToggle}>
    {muted ? "Unmute SFX" : "Mute SFX"}
  </button>
);

export default SfxToggle;
