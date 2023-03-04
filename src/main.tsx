import "@global/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ReactTooltip from "react-tooltip";
import Curtain from "@components/Curtain";
import theme from "@global/Theme";
import Header from "@global/Header";
import Footer from "@global/Footer";
import Aside from "@components/Aside";
import HttpStatusPage from "@components/HttpStatusPage";
import Main from "@pages/Main";
import Status from "@pages/Status";
import Projects from "@pages/Projects";
import Timeline from "@pages/Timeline";
import L from "@languages";
import ko from "@languages/ko-KR.json";
import en from "@languages/en-US.json";

// 언어 추가 (필수)
L.addLocale("ko-KR", ko);
L.addLocale("en-US", en);

// chart.js 관련 설정
import "@lib/registerChartjs";

// pf.* 설정 (portfolio의 약어)
localStorage.setItem("pf.locale", L.locale);

document.title = L.get("title");
ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/projects/:name" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/status" element={<Status />} />
        <Route path="*" element={<HttpStatusPage statusCode="404" needToReturn={true} />} />
      </Routes>
      <ReactTooltip id="tooltip" place="top" getContent={(tip) => <Tooltip>{L.render(tip)}</Tooltip>} />
      <Footer />
      <Aside />
      <Curtain />
    </BrowserRouter>
  </ThemeProvider>
);

// 디자인 정의
const Tooltip = styled.div`
  font-family: Desc;
`;
