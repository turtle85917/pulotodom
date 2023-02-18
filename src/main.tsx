import "@global/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ReactTooltip from "react-tooltip";
import Main from "@pages/Main";
import Projects from "@pages/Projects";
import Curtain from "@components/Curtain";
import HttpStatusPage from "@components/HttpStatusPage";
import theme from "@global/Theme";
import Header from "@global/Header";
import L from "@languages";
import ko from "@languages/ko-KR.json";
import en from "@languages/en-US.json";

export const locale = () => localStorage.getItem("pf.locale") ?? L.defaultLocale;

// 언어 추가 (필수)
L.addLocale("ko-KR", ko);
L.addLocale("en-US", en);

// pf.* 설정
localStorage.setItem("pf.locale", locale());

document.title = L.get("title", locale());
ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<HttpStatusPage statusCode="404" needToReturn={true} />} />
      </Routes>
      <ReactTooltip id="tooltip" place="top" getContent={(tip) => <Tooltip>{L.render(locale())(tip)}</Tooltip>} />
      <Curtain />
    </BrowserRouter>
  </ThemeProvider>
);

// styled 정의
const Tooltip = styled.div`
  font-family: Desc;
`;
