import { FunctionalComponent } from "preact";
import { Direction } from "../../utils/board";
import "./MoveButtons.css";

/**
 * Props for the MoveButtons component.
 * @property onMove - Callback triggered with a direction when a button is clicked.
 * @property disabled - Whether all move buttons should be disabled.
 */
type Props = { onMove: (dir: Direction) => void; disabled?: boolean };

/**
 * Renders four directional buttons (up, left, down, right)
 * to control tile movement. Buttons call `onMove` with the
 * corresponding direction and are disabled when the game is over.
 *
 * @param props.onMove - Handler to execute a move in a given direction.
 * @param props.disabled - Disables all directional buttons if true.
 * @returns JSX element with directional move controls.
 */
const MoveButtons: FunctionalComponent<Props> = ({ onMove, disabled }) => (
  <div class="controls__moves">
    <button class="btn" onClick={() => onMove("up")} disabled={disabled}>
      ↑
    </button>
    <button class="btn" onClick={() => onMove("left")} disabled={disabled}>
      ←
    </button>
    <button class="btn" onClick={() => onMove("down")} disabled={disabled}>
      ↓
    </button>
    <button class="btn" onClick={() => onMove("right")} disabled={disabled}>
      →
    </button>
  </div>
);

export default MoveButtons;
