import { useEffect, useState } from "react";

import Card from "./components/Card";
import SkillList from "./components/SkillList";

function App() {
  const decodeHash = () => {
    if (!location.hash) return 0;
    return +location.hash.slice(2);
  };

  const [activeWrap, setActiveWrap] = useState<number>(decodeHash());

  useEffect(() => {
    setInterval(() => {
      const observer = new IntersectionObserver((event) => event.forEach((element, idx) => {
        if (element.intersectionRatio) element.target.classList.add("active");
        else element.target.classList.remove("active");
      }));
  
      document.querySelectorAll("div.wrap").forEach(element => observer.observe(element));
    }, 100);
  }, []);

  return (
    <>
      <div className="wrap" id="w0">
        <p id="d0">🇰🇷 기준 2008년생이에요.</p>
        <p id="d1">React를 주로 쓰며, TypeScript 그리고 Vite랑 함께 써요!</p>
        <p id="d2">나름의 꿈이라면 <span className="desc">풀스택 개발자</span>가 되는 거에요.</p>
      </div>
      <div className="wrap" id="w1">
        <p className="flex" id="d0"><span className="wave">👋</span>&nbsp;환영해요!</p>
        <p id="d1">제 활동명은 <span className="desc">플로토돔</span>이에요.</p>
        <p id="d2">94번 원소. 플루토늄에서 따왔어요.</p>
        <p id="d3">간단하게 <span className="desc pulto">플토</span>라고 불러주세요.</p>
      </div>
      <div className="wrap" id="w2">
        <p id="d0">아래는 간단한 제 코딩 스킬이에요.</p>
        <p className="desc" id="d1">자주 쓰는 거를 카테고리 별로 모아두었어요.</p>
        <div className="skills">
          <SkillList
            category="프론트엔드"
            skills={["html5", "css", "scss", "tailwindcss", "javascript", "typescript", "react", "next", "vite"]}
            />
          <SkillList
            category="백엔드"
            skills={["javascript", "typescript", "express"]}
            />
          <SkillList
            category="프레임워크"
            skills={["react", "next", "vite", "express"]}
            />
            <SkillList
            category="데이터베이스"
            skills={["mongodb", "sqlite"]}
            />
        </div>
      </div>
      <div className="wrap" id="w3">
        <p id="d0">작업물 목록</p>
        <p className="desc" id="d1">
          제가 만들어낸 작업물들은 전부다 깃허브에 있어요.
          <br />
          따라서 밑에 있는 카드들에 연결되어 있는 외부 링크도 깃허브에요.
        </p>
        <div className="projects">
          <Card>
            <>
              <div className="title">AI가 봐주는 MBTI</div>
              <div className="desc">사이트에 이미지를 업로드하거나 끌어다 놓으면 AI가 그 이미지를 분석하여 가장 근접한 MBTI 유형 5개를 나열해서 보여줍니다.</div>
              <div className="links">
                <a id="link" href="https://github.com/turtle85917/mbti-ai" target="_blank">소스 코드</a>
                <a id="link" href="https://mbti-ai.vercel.app/" target="_blank">웹사이트</a>
              </div>
            </>
          </Card>
          <Card>
            <>
              <div className="title">Flood-it</div>
              <div className="desc">통일되지 않는 색 타일들을 전부 하나의 색으로 맞추는 퍼즐 게임입니다.</div>
              <div className="links">
                <a id="link" href="https://github.com/turtle85917/flood-it" target="_blank">소스 코드</a>
                <a id="link" href="https://flood-it-nine.vercel.app/" target="_blank">웹사이트</a>
              </div>
            </>
          </Card>
          <Card>
            <>
              <div className="title">Live Chatting</div>
              <div className="desc">처음으로 TailwindCSS를 사용하여 디자인을 한 프로젝트입니다. 실시간으로 소통하는 백엔드 서버와 프론트엔드 서버가 분리되어 있습니다. 각 코드는 브랜치에 따로 나뉘어 있습니다.</div>
              <div className="links">
                <a id="link" href="https://github.com/turtle85917/live-chatting" target="_blank">소스 코드</a>
                <a id="link" href="https://live-chatting.vercel.app/" target="_blank">웹사이트</a>
              </div>
            </>
          </Card>
        </div>
        <a id="more" href="https://github.com/turtle85917?tab=repositories" target="_blank">더보기...</a>
      </div>
      <div className="wrap" id="w4">
        <p id="d0">SNS</p>
        <p className="desc" id="d1">
          저랑 소통할 수 있는 소셜 계정을 알려드릴게요.
          <br />
          붉은색은 연락 받는게 느릴 수 있어요.
        </p>
        <div className="contacts">
          <Card className="slow">
            <>
              <div className="title">Email</div>
              <div className="desc">nosiu6562@gmail.com</div>
            </>
          </Card>
          <Card>
            <>
              <div className="title">Discord</div>
              <div className="desc">플로토돔#6110</div>
            </>
          </Card>
          <Card className="slow">
            <>
              <div className="title">Twitter</div>
              <div className="desc">@command93332155</div>
            </>
          </Card>
        </div>
      </div>
      <div className="wrap" id="w5">
        <p id="d0">제 포트폴리오의 마지막 페이지</p>
        <p className="desc" id="d1">제 포트폴리오 사이트를 구경해주셔서 감사해요.</p>
        <p id="d2">
          <br />
          <br />
          이 사이트는 Vite, React, TypeScript를 사용하여 제작되었어요.
        </p>
        <p id="d3">🇰🇷 기준으로 <span className="desc">22년 11월 4일</span> 개발이 시작되었고 <span className="desc">22년 11월 5일</span>에 개발이 완료되었어요.</p>
      </div>
      <div className="fp-nav">
        <ul>
          {["Intro#1", "Intro#2", "Skills", "Projects", "SNS", "TMI"].map((name,idx) => (
            <li key={idx} className={activeWrap === idx ? "active" : undefined} onClick={() => {
              location.href = `#w${idx}`;
              setActiveWrap(idx);
            }}
            onMouseLeave={() => {
              (document.querySelector(`div.fp-nav div#t${idx}.fp-tooltip`) as HTMLDivElement).style.display = "none";
            }}
            onMouseOver={() => {
              (document.querySelector(`div.fp-nav div#t${idx}.fp-tooltip`) as HTMLDivElement).style.display = "block";
            }}>
              <div className="fp-tooltip" id={`t${idx}`}>{name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App;