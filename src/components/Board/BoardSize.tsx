import { FunctionalComponent } from "preact";
import "./BoardSize.css";

type Props = {
  size: number;
  onChange: (newSize: number) => void;
};

const MIN_SIZE = 3;
const MAX_SIZE = 6;

const BoardSize: FunctionalComponent<Props> = ({ size, onChange }) => (
  <div class="board-size">
    <span>Size: {size}</span>
    <div class="board-size__buttons">
      <button
        class="board-size__btn"
        onClick={() => onChange(size + 1)}
        disabled={size >= MAX_SIZE}
      >
        +
      </button>
      <button
        class="board-size__btn"
        onClick={() => onChange(size - 1)}
        disabled={size <= MIN_SIZE}
      >
        –
      </button>
    </div>
  </div>
);

export default BoardSize;
