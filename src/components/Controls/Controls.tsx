import { FunctionalComponent } from "preact";
import NewGameButton from "./NewGameButton";
import UndoButton from "./UndoButton";
import MoveButtons from "./MoveButtons";
import { Direction } from "../../utils/board";
import "./Controls.css";

type Props = {
  onNewGame: () => void;
  onUndo: () => void;
  undoDisabled?: boolean;
  onMove: (dir: Direction) => void;
  gameOver?: boolean;
};

const Controls: FunctionalComponent<Props> = ({
  onNewGame,
  onUndo,
  undoDisabled,
  onMove,
  gameOver = false,
}) => (
  <div class="controls">
    <NewGameButton onClick={onNewGame} />
    <UndoButton onClick={onUndo} disabled={undoDisabled} />
    <MoveButtons onMove={onMove} disabled={gameOver} />
  </div>
);

export default Controls;
