import "@global/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ReactTooltip from "react-tooltip";
import Main from "@pages/Main";
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

const Curtain = (): JSX.Element|null => {
  const [animated, setAnimated] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 500);
  }, []);

  if (animated) return null;

  return <CurtainContainer>
    <CurtainPart className="left" />
    <CurtainPart className="right" />
  </CurtainContainer>;
}

document.title = L.get("title", locale());
ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
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

const CurtainContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const CurtainPart = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 500ms;
  transform: translateX(0%);

  &.left {
    animation: CurtainLeft 500ms forwards;
    @keyframes CurtainLeft {
      to {
        transform: translateX(-100%);
      }
    }
  }

  &.right {
    animation: CurtainRight 500ms forwards;
    @keyframes CurtainRight {
      to {
        transform: translateX(100%);
      }
    }
  }
`;
