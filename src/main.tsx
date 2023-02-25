import "@global/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ReactTooltip from "react-tooltip";
import Curtain from "@components/Curtain";
import theme from "@global/Theme";
import Header from "@global/Header";
import Aside from "@global/Aside";
import PageRoutes from "@global/Routes";
import L from "@languages";
import ko from "@languages/ko-KR.json";
import en from "@languages/en-US.json";

// 언어 추가 (필수)
L.addLocale("ko-KR", ko);
L.addLocale("en-US", en);

// chart.js 관련 설정
import "@lib/registerChartjs";

// pf.* 설정
localStorage.setItem("pf.locale", L.locale);

document.title = L.get("title");
ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <PageRoutes />
      <ReactTooltip id="tooltip" place="top" getContent={(tip) => <Tooltip>{L.render(tip)}</Tooltip>} />
      <Aside />
      <Curtain />
    </BrowserRouter>
  </ThemeProvider>
);

// 디자인 정의
const Tooltip = styled.div`
  font-family: Desc;
`;
