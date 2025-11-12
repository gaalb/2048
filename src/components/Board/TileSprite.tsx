import { FunctionalComponent } from "preact";
import "./TileSprite.css";

type Props = {
  left: number;
  top: number;
  size: number;
  dx: number;
  dy: number;
  transition: string;
  children: preact.ComponentChildren;
};

const TileSprite: FunctionalComponent<Props> = ({
  left,
  top,
  size,
  dx,
  dy,
  transition,
  children,
}) => (
  <div
    class="tile-sprite"
    style={{
      left: `${left}px`,
      top: `${top}px`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `translate(${dx}px, ${dy}px)`,
      transition,
    }}
  >
    {children}
  </div>
);

export default TileSprite;
