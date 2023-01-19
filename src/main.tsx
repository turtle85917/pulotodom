import "@styles/index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Layout from "@Layout";

import Home from "@pages/Home";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <BrowserRouter>
    <Layout />
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
);
