import { FunctionalComponent } from "preact";
import "./TileLayer.css";

/**
 * Props for the TileLayer component.
 * @property children - TileSprite elements to be rendered in this layer.
 */
type Props = {
  children: preact.ComponentChildren;
};

/**
 * Layer that holds all tile sprites. Positioned absolutely over the grid,
 * allowing each tile to be individually positioned and animated.
 *
 * @param props.children - The tile sprites to render.
 * @returns A positioned container for animated tiles.
 */
const TileLayer: FunctionalComponent<Props> = ({ children }) => (
  <div class="tile-layer">{children}</div>
);

export default TileLayer;
