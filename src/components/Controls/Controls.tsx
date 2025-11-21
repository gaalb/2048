import { FunctionalComponent } from "preact";
import NewGameButton from "./NewGameButton";
import UndoButton from "./UndoButton";
import MoveButtons from "./MoveButtons";
import { Direction } from "../../utils/board";
import "./Controls.css";

/**
 * Props for the Controls component.
 * @property onNewGame - Callback to start a new game.
 * @property onUndo - Callback to undo the last move.
 * @property undoDisabled - Whether the Undo button should be disabled.
 * @property onMove - Callback to perform a directional move.
 * @property gameOver - Whether the game is currently over.
 */
type Props = {
  onNewGame: () => void;
  onUndo: () => void;
  undoDisabled?: boolean;
  onMove: (dir: Direction) => void;
  gameOver?: boolean;
};

/**
 * Renders the control panel, including New Game, Undo, and movement buttons.
 * Movement buttons are disabled when the game is over.
 *
 * @param props.onNewGame - Handler to start a new game.
 * @param props.onUndo - Handler to undo the previous move.
 * @param props.undoDisabled - Disables Undo button when undo is unavailable.
 * @param props.onMove - Handler to perform a move in a direction.
 * @param props.gameOver - Disables movement buttons when true.
 * @returns JSX element containing game controls.
 */
const Controls: FunctionalComponent<Props> = ({
  onNewGame,
  onUndo,
  undoDisabled,
  onMove,
  gameOver = false,
}) => (
  <div class="controls">
    <div class="controls__row-top">
      <h2 class="panel_title controls__title">Controls</h2>
      <NewGameButton onClick={onNewGame} />
      <UndoButton onClick={onUndo} disabled={undoDisabled} />
    </div>
    <MoveButtons onMove={onMove} disabled={gameOver} />
  </div>
);

export default Controls;
