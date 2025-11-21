import { FunctionalComponent } from "preact";
import GameBoard from "./GameBoard";
import BoardSize from "./BoardSize";
import GameOverOverlay from "../Overlay/GameOverOverlay";
import { Board, MoveAnim } from "../../utils/board";
import "./GameBoardPanel.css";

/**
 * Props for the GameBoardPanel component.
 * @property title - Optional title text shown above the board (defaults to "2048").
 * @property size - Current board size (number of rows/columns).
 * @property onSizeChange - Callback to change the board size.
 * @property board - Current board state as a 2D matrix of tile values.
 * @property animMoves - Optional list of tile moves used for animation.
 * @property animMs - Optional animation duration in milliseconds.
 * @property gameOver - Flag indicating whether the game has ended.
 * @property score - Current score of the game.
 */
type Props = {
  title?: string;
  size: number;
  onSizeChange: (n: number) => void;

  board: Board;
  animMoves?: MoveAnim[];
  animMs?: number;

  gameOver: boolean;
  score: number;
};

/**
 * Panel component that wraps the game board, its title, and size selector.
 * It also displays a game over overlay when the game has finished.
 *
 * @param props.title - Title displayed above the board.
 * @param props.size - Size of the board.
 * @param props.onSizeChange - Handler to change the board size.
 * @param props.board - Current board matrix.
 * @param props.animMoves - Optional list of tile moves for animation.
 * @param props.animMs - Duration of the movement animation in ms.
 * @param props.gameOver - Whether the game is currently over.
 * @param props.score - Current score to show in the overlay.
 * @returns JSX section containing the board UI.
 */
const GameBoardPanel: FunctionalComponent<Props> = ({
  title = "2048",
  size,
  onSizeChange,
  board,
  animMoves,
  animMs = 150,
  gameOver,
  score,
}) => {
  return (
    <section class="panel">
      <h2 class="board-panel__header">
        <span class="board-panel__title">{title}</span>
        <BoardSize size={size} onChange={onSizeChange} />
      </h2>
      <GameBoard board={board} animMoves={animMoves} animMs={animMs} />
      {gameOver && <GameOverOverlay score={score} />}
    </section>
  );
};

export default GameBoardPanel;
