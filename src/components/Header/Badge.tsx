import { FunctionalComponent } from "preact";
import "./Badge.css";

/**
 * Props for the Badge component.
 * @property children - Content to be displayed inside the badge.
 */
type Props = { children: preact.ComponentChildren };

/**
 * Renders a stylized badge element, typically used for displaying
 * small blocks of highlighted information such as score values.
 *
 * @param props.children - Content to render inside the badge.
 * @returns A span element styled as a badge.
 */
const Badge: FunctionalComponent<Props> = ({ children }) => (
  <span class="badge">{children}</span>
);

export default Badge;
