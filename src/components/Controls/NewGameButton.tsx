import { FunctionalComponent } from "preact";
import "./NewGameButton.css";

const NewGameButton: FunctionalComponent<{ onClick: () => void }> = ({
  onClick,
}) => (
  <button class="controls__new-game" onClick={onClick}>
    New Game
  </button>
);
export default NewGameButton;
