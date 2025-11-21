import { FunctionalComponent } from "preact";
import "./NewGameButton.css";

/**
 * Props for the NewGameButton component.
 * @property onClick - Callback to initiate starting a new game.
 */
type Props = { onClick: () => void };

/**
 * Button component to start a new game.
 * Calls the provided onClick handler when pressed.
 *
 * @param props.onClick - Function to trigger a new game.
 * @returns A styled "New Game" button.
 */
const NewGameButton: FunctionalComponent<Props> = ({ onClick }) => (
  <button class="controls__new-game" onClick={onClick}>
    New Game
  </button>
);

export default NewGameButton;
