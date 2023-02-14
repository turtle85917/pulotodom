import "@global/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "@pages/Main";
import Header from "@global/Header";
import L from "@languages";
import ko from "@languages/ko-KR.json";

// 언어 추가 (필수)
L.addLocale("ko-KR", ko);

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>
);
