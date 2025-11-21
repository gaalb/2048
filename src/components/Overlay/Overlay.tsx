import { FunctionalComponent } from "preact";
import "./Overlay.css";

/**
 * Props for the Overlay component.
 * @property children - The content displayed inside the overlay box.
 */
type Props = { children: preact.ComponentChildren };

/**
 * Generic overlay component that covers its parent area.
 * Darkens the background and centers its children inside a box.
 *
 * @param props.children - Elements to render in the overlay content box.
 * @returns A full-size overlay with centered content.
 */
const Overlay: FunctionalComponent<Props> = ({ children }) => (
  <div class="overlay">
    <div class="overlay__box">{children}</div>
  </div>
);

export default Overlay;
