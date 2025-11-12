import { FunctionalComponent } from "preact";
import "./Overlay.css";

type Props = { children: preact.ComponentChildren };
const Overlay: FunctionalComponent<Props> = ({ children }) => (
  <div class="overlay">
    <div class="overlay__box">{children}</div>
  </div>
);
export default Overlay;
