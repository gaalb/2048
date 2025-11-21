import { FunctionalComponent } from "preact";
import "./TileSprite.css";

/**
 * Props for the TileSprite component.
 * @property left - Absolute left position in pixels.
 * @property top - Absolute top position in pixels.
 * @property size - Size (width and height) of the sprite in pixels.
 * @property dx - Horizontal translation offset for animation.
 * @property dy - Vertical translation offset for animation.
 * @property transition - CSS transition string applied to movement.
 * @property children - The rendered Tile component inside this sprite.
 */
type Props = {
  left: number;
  top: number;
  size: number;
  dx: number;
  dy: number;
  transition: string;
  children: preact.ComponentChildren;
};

/**
 * Wraps a tile in an absolutely positioned container that handles
 * animation via CSS transforms. Used to animate tile movement.
 *
 * @param props.left - Absolute left position of tile.
 * @param props.top - Absolute top position of tile.
 * @param props.size - Dimensions of the tile (square).
 * @param props.dx - Horizontal translation in pixels.
 * @param props.dy - Vertical translation in pixels.
 * @param props.transition - CSS transition for smooth movement.
 * @param props.children - Child tile component to render.
 * @returns JSX div representing an animated tile container.
 */
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
      left: `${left}px`, // absolute x-position
      top: `${top}px`, // absolute y-position
      width: `${size}px`,
      height: `${size}px`,
      transform: `translate(${dx}px, ${dy}px)`, // movement offset
      transition, // animation settings
    }}
  >
    {children}
  </div>
);

export default TileSprite;
