import "@global/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ReactTooltip from "react-tooltip";
import Curtain from "@components/Curtain";
import theme from "@global/Theme";
import Header from "@global/Header";
import L from "@languages";
import ko from "@languages/ko-KR.json";
import en from "@languages/en-US.json";
import PageRoutes from "@global/Routes";

export const locale = () => localStorage.getItem("pf.locale") ?? L.defaultLocale;

// 언어 추가 (필수)
L.addLocale("ko-KR", ko);
L.addLocale("en-US", en);

// pf.* 설정
localStorage.setItem("pf.locale", locale());

document.title = L.get()("title");
ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <PageRoutes />
      <ReactTooltip id="tooltip" place="top" getContent={(tip) => <Tooltip>{L.render()(tip)}</Tooltip>} />
      <Curtain />
    </BrowserRouter>
  </ThemeProvider>
);

// styled 정의
const Tooltip = styled.div`
  font-family: Desc;
`;
