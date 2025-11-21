import { render } from "preact";
import App from "./components/App";
import "./index.css";

/** Root element where the Preact application is mounted */
const root = document.getElementById("app");

if (root) {
  /**
   * Render the root <App /> component into the DOM element with id "app".
   */
  render(<App />, root);
}
