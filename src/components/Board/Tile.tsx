import { FunctionalComponent } from "preact";
import "./Tile.css";

/**
 * Props for the Tile component.
 * @property value - Numeric value of this tile. 0 means empty.
 */
type TileProps = { value: number };

/**
 * Renders a single tile with styling based on its numeric value.
 * Values above 2048 use the 2048 styling, and value 0 is treated as empty.
 *
 * @param props.value - The number displayed on the tile (0 means empty).
 * @returns A styled div representing a tile.
 */
const Tile: FunctionalComponent<TileProps> = ({ value }) => {
  const label = value > 0 ? String(value) : ""; // show number only if positive
  const clsValue = value > 2048 ? 2048 : value; // cap style at 2048
  const cls = value > 0 ? `tile--v${clsValue}` : "tile--empty"; // choose CSS class
  return <div class={`tile ${cls}`}>{label}</div>;
};

export default Tile;
