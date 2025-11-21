import { FunctionalComponent } from "preact";
import "./UndoButton.css";

/**
 * Props for the UndoButton component.
 * @property onClick - Callback to undo the last move.
 * @property disabled - Whether the button is disabled.
 */
type Props = { onClick: () => void; disabled?: boolean };

/**
 * Button to undo the previous move.
 * Disabled when no undo is available or logically disallowed.
 *
 * @param props.onClick - Function executed when undo is requested.
 * @param props.disabled - Disables button click when true.
 * @returns A styled "Undo" button.
 */
const UndoButton: FunctionalComponent<Props> = ({ onClick, disabled }) => (
  <button class="controls__undo" onClick={onClick} disabled={disabled}>
    Undo
  </button>
);

export default UndoButton;
