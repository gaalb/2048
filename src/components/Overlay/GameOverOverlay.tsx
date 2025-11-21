import { FunctionalComponent } from "preact";
import Overlay from "./Overlay";
import "./GameOverOverlay.css";

/**
 * Props for the GameOverOverlay component.
 * @property score - Final score to display when the game ends.
 */
type Props = { score: number };

/**
 * Displays a centered overlay when the game is over,
 * showing a "Game Over" message along with the final score.
 *
 * @param props.score - The player's final score.
 * @returns JSX overlay element with game over message.
 */
const GameOverOverlay: FunctionalComponent<Props> = ({ score }) => (
  <Overlay>
    <div class="overlay__title">Game Over</div>
    <div class="overlay__score">Score: {score}</div>
  </Overlay>
);

export default GameOverOverlay;
