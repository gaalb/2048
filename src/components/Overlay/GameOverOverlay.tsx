import { FunctionalComponent } from "preact";
import Overlay from "./Overlay";
import "./GameOverOverlay.css";

const GameOverOverlay: FunctionalComponent<{ score: number }> = ({ score }) => (
  <Overlay>
    <div class="overlay__title">Game Over</div>
    <div class="overlay__score">Score: {score}</div>
  </Overlay>
);
export default GameOverOverlay;
