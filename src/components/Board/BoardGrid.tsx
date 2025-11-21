import { FunctionalComponent } from "preact";
import "./BoardGrid.css";

/**
 * Props for the BoardGrid component.
 * @property size - Number of rows and columns (size × size grid).
 * @property gap - Space (in pixels) between grid cells.
 */
type Props = { size: number; gap: number };

/**
 * Renders the static background grid (empty slots) of the game board.
 * Uses CSS grid to evenly distribute square cells based on the board size.
 *
 * @param props.size - Number of rows and columns.
 * @param props.gap - Gap between grid cells, in pixels.
 * @returns A div containing the grid of placeholder slots.
 */
const BoardGrid: FunctionalComponent<Props> = ({ size, gap }) => (
  <div
    class="board-grid"
    style={{
      display: "grid",
      gap: `${gap}px`, // spacing between cells
      gridTemplateColumns: `repeat(${size}, 1fr)`, // equal-width columns
      gridTemplateRows: `repeat(${size}, 1fr)`, // equal-height rows
      width: "100%", // fill parent
      height: "100%", // fill parent
    }}
  >
    {Array.from({ length: size * size }).map((_, i) => (
      <div key={i} class="board-slot" /> // placeholder background slot
    ))}
  </div>
);

export default BoardGrid;
