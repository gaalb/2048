import { FunctionalComponent } from "preact";
import Tile from "./Tile";
import { Board, MoveAnim } from "../../utils/board";
import BoardFrame from "./BoardFrame";
import BoardGrid from "./BoardGrid";
import TileLayer from "./TileLayer";
import TileSprite from "./TileSprite";

/**
 * Props for the GameBoard component.
 * @property board - Current board state as a 2D array of tile values.
 * @property animMoves - Optional list of tile movements used for animation.
 * @property animMs - Optional animation duration in milliseconds.
 */
type GameBoardProps = {
  board: Board;
  animMoves?: MoveAnim[];
  animMs?: number;
};

const BOARD_PX = 340; // total board pixel size
const PAD = 10; // padding inside board
const GAP = 10; // gap between cells

/**
 * Renders the visual game board with tiles and movement animations.
 * Uses a fixed-size frame and computes tile positions and translation
 * offsets from the board state and animation data.
 *
 * @param props.board - The current board matrix.
 * @param props.animMoves - Optional list of tile moves to animate.
 * @param props.animMs - Duration of the tile movement animation in ms.
 * @returns The rendered game board with tiles.
 */
const GameBoard: FunctionalComponent<GameBoardProps> = ({
  board,
  animMoves,
  animMs = 150,
}) => {
  const size = board.length;
  const cellPx = (BOARD_PX - 2 * PAD - GAP * (size - 1)) / size; // cell pixel size
  const cellLeft = (col: number) => PAD + col * (cellPx + GAP); // cell left position
  const cellTop = (row: number) => PAD + row * (cellPx + GAP); // cell top position

  // Map from a tile's original position to its target position (for animation)
  const animIndex = new Map<string, { toRow: number; toCol: number }>();
  if (animMoves) {
    for (const m of animMoves) {
      animIndex.set(`${m.from.row},${m.from.col}`, {
        toRow: m.to.row,
        toCol: m.to.col,
      });
    }
  }

  // Prepare sprites with their positions and movement deltas
  const sprites: Array<{
    key: string;
    row: number;
    col: number;
    value: number;
    dx: number;
    dy: number;
  }> = [];

  for (let r = 0; r < size; r++) {
    // for each row
    for (let c = 0; c < size; c++) {
      // for each column
      const v = board[r][c]; // tile value
      if (v <= 0) continue; // skip empty tiles
      const to = animIndex.get(`${r},${c}`); // check if this tile is moving
      const tr = to ? to.toRow : r; // target row
      const tc = to ? to.toCol : c; // target column
      const dx = (tc - c) * (cellPx + GAP); // horizontal offset for animation
      const dy = (tr - r) * (cellPx + GAP); // vertical offset for animation
      // add sprite with position and movement delta
      sprites.push({ key: `${r}-${c}-${v}`, row: r, col: c, value: v, dx, dy });
    }
  }

  // unified transition style for all moving tiles
  const transition = animMoves ? `transform ${animMs}ms ease` : "none";

  return (
    <BoardFrame width={BOARD_PX} height={BOARD_PX}>
      <BoardGrid size={size} gap={GAP} />
      <TileLayer>
        {sprites.map((s) => (
          <TileSprite
            key={s.key}
            left={cellLeft(s.col)}
            top={cellTop(s.row)}
            size={cellPx}
            dx={s.dx}
            dy={s.dy}
            transition={transition} // apply movement transition upon re-render
          >
            <Tile value={s.value} />
          </TileSprite>
        ))}
      </TileLayer>
    </BoardFrame>
  );
};

export default GameBoard;
