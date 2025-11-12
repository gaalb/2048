import { FunctionalComponent } from "preact";
import "./BoardFrame.css";

type Props = {
  width: number;
  height: number;
  children: preact.ComponentChildren;
};

const BoardFrame: FunctionalComponent<Props> = ({
  width,
  height,
  children,
}) => (
  <div
    class="board-frame"
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    {children}
  </div>
);

export default BoardFrame;
