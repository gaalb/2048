import { FunctionalComponent } from "preact";
import "./Tile.css";

type TileProps = { value: number };

const Tile: FunctionalComponent<TileProps> = ({ value }) => {
  const label = value > 0 ? String(value) : "";
  const clsValue = value > 2048 ? 2048 : value; // cap style at 2048
  const cls = value > 0 ? `tile--v${clsValue}` : "tile--empty";
  return <div class={`tile ${cls}`}>{label}</div>;
};

export default Tile;
