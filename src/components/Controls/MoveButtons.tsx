import { FunctionalComponent } from "preact";
import { Direction } from "../../utils/board";
import "./MoveButtons.css";

type Props = { onMove: (dir: Direction) => void; disabled?: boolean };

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
