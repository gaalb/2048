import { FunctionalComponent } from "preact";
import "./BoardFrame.css";

/**
 * Props for the BoardFrame component.
 * @property width - Width of the board in pixels.
 * @property height - Height of the board in pixels.
 * @property children - Nested components rendered inside the board frame.
 */
type Props = {
  width: number;
  height: number;
  children: preact.ComponentChildren;
};

/**
 * A container component that sets fixed width and height for the game board
 * and wraps its children inside a styled frame.
 *
 * @param props.width - Width of the board in pixels.
 * @param props.height - Height of the board in pixels.
 * @param props.children - Contents to display inside the board frame.
 * @returns A styled div containing the board.
 */
const BoardFrame: FunctionalComponent<Props> = ({
  width,
  height,
  children,
}) => (
  <div
    class="board-frame"
    // inline dimensions based on props
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    {children}
  </div>
);

export default BoardFrame;
