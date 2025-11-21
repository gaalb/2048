import { FunctionalComponent } from "preact";
import "./SfxToggle.css";

/**
 * Props for the SfxToggle component.
 * @property muted - Indicates whether sound effects are currently muted.
 * @property onToggle - Callback to toggle the mute state.
 */
type Props = {
  muted: boolean;
  onToggle: () => void;
};

/**
 * Button to toggle sound effects on or off.
 * Displays text based on current mute state.
 *
 * @param props.muted - Current sound mute state.
 * @param props.onToggle - Handler to toggle SFX on/off.
 * @returns A styled toggle button.
 */
const SfxToggle: FunctionalComponent<Props> = ({ muted, onToggle }) => (
  <button class="sfx-toggle" onClick={onToggle}>
    {muted ? "Unmute SFX" : "Mute SFX"}
  </button>
);

export default SfxToggle;
