import { FunctionalComponent } from "preact";
import "./UndoButton.css";

type Props = { onClick: () => void; disabled?: boolean };
const UndoButton: FunctionalComponent<Props> = ({ onClick, disabled }) => (
  <button class="controls__undo" onClick={onClick} disabled={disabled}>
    Undo
  </button>
);
export default UndoButton;
