import { FunctionalComponent } from "preact";
import "./BoardGrid.css";

type Props = { size: number; gap: number };

const BoardGrid: FunctionalComponent<Props> = ({ size, gap }) => (
  <div
    class="board-grid"
    style={{
      display: "grid",
      gap: `${gap}px`,
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gridTemplateRows: `repeat(${size}, 1fr)`,
      width: "100%",
      height: "100%",
    }}
  >
    {Array.from({ length: size * size }).map((_, i) => (
      <div key={i} class="board-slot" />
    ))}
  </div>
);

export default BoardGrid;
