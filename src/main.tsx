import "@global/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Main from "@pages/Main";
import Header from "@global/Header";
import L from "@languages";
import ko from "@languages/ko-KR.json";
import en from "@languages/en-US.json";

// 언어 추가 (필수)
L.addLocale("ko-KR", ko);
L.addLocale("en-US", en);

// pf.* 설정
const locale = () => localStorage.getItem("pf.locale") ?? L.defaultLocale;
localStorage.setItem("pf.locale", locale());

document.title = L.get("title", locale());
ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
    <ReactTooltip id="tooltip" place="left" getContent={(tip) => <Tooltip>{L.render(tip)(locale())}</Tooltip>} />
  </BrowserRouter>
);

const Tooltip = styled.div`
  font-family: Desc;
`;
