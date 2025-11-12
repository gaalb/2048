import { FunctionalComponent } from "preact";
import "./TileLayer.css";

// Layer that holds all tiles, needed for absolute positioning inside the board
const TileLayer: FunctionalComponent<{
  children: preact.ComponentChildren;
}> = ({ children }) => <div class="tile-layer">{children}</div>;

export default TileLayer;
