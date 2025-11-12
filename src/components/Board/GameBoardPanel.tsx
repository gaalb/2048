import { FunctionalComponent } from "preact";
import GameBoard from "./GameBoard";
import BoardSize from "./BoardSize";
import GameOverOverlay from "../Overlay/GameOverOverlay";
import { Board, MoveAnim } from "../../utils/board";
import "./GameBoardPanel.css";

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
