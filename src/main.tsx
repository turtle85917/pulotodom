import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import L from "./languages";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <BrowserRouter>
    <h1>Hello, World!</h1>
    <h1>{L.render("test")()}</h1>
  </BrowserRouter>
);
