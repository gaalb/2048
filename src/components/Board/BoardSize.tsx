import { FunctionalComponent } from "preact";
import "./BoardSize.css";

/**
 * Props for the BoardSize component.
 * @property size - Current selected board size.
 * @property onChange - Callback to update the board size.
 */
type Props = {
  size: number;
  onChange: (newSize: number) => void;
};

const MIN_SIZE = 3;
const MAX_SIZE = 6;

/**
 * Component for displaying and adjusting the board size.
 * Provides "+" and "−" buttons to increment/decrement the size,
 * enforcing minimum and maximum limits.
 *
 * @param props.size - Current board size.
 * @param props.onChange - Function called with the updated size.
 * @returns JSX element for size adjustment UI.
 */
const BoardSize: FunctionalComponent<Props> = ({ size, onChange }) => (
  <div class="board-size">
    <span>Size: {size}</span>
    <div class="board-size__buttons">
      <button
        class="board-size__btn"
        onClick={() => onChange(size + 1)} // increase size
        disabled={size >= MAX_SIZE} // disable at max
      >
        +
      </button>
      <button
        class="board-size__btn"
        onClick={() => onChange(size - 1)} // decrease size
        disabled={size <= MIN_SIZE} // disable at min
      >
        -
      </button>
    </div>
  </div>
);

export default BoardSize;
