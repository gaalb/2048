import { FunctionalComponent } from "preact";
import "./Badge.css";

type Props = { children: preact.ComponentChildren };
const Badge: FunctionalComponent<Props> = ({ children }) => (
  <span class="badge">{children}</span>
);
export default Badge;
