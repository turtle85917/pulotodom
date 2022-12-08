import { useEffect, useState } from "react";

import Card from "./components/Card";
import SkillList from "./components/SkillList";

function App() {
  const decodeHash = () => {
    if (!location.hash) return 0;
    return +location.hash.slice(2);
  };

  const [activeWrap, setActiveWrap] = useState<number>(decodeHash());
  const [hover, setHover] = useState<number>(-1)

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
        <p id="d0">한국 시간 기준 2008년생이에요.</p>
        <p id="d1">Vite, React, TypeScript 기술을 섞어 쓰는걸 좋아해요.</p>
        <p id="d2">전 Unity보단 Godot을 쓰며 게임을 만들고 있어요.</p>
        <p id="d3">나름의 꿈이라면 <span className="desc">풀스택 개발자</span>가 되고 싶다는거?</p>
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
        <p className="desc" id="d2">목록이 길순 있어요. 하지만 중복되는게 있답니다.</p>
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
            category="클라이언트"
            skills={["godot"]}
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
          제가 만들어낸 작업물들의 코드는 전부다 깃허브에 있어요.
        </p>
        <div className="projects">
          <Card>
            <>
              <div className="title">AI가 봐주는 MBTI</div>
              <div className="desc">AI가 이미지를 분석하여 비슷한 MBTI 유형 5개를 나열해줘요.</div>
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
              <div className="desc">처음으로 TailwindCSS를 사용하여 디자인을 한 프로젝트입니다.</div>
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
        <p id="d0">연락처</p>
        <p className="desc" id="d1">
          저랑 소통할 수 있는 소셜 계정을 알려드릴게요.
          <br />
          붉은색은 연락 받는게 느릴 수 있어요.
        </p>
        <div className="contacts">
          <Card>
            <>
              <div className="title">Discord</div>
              <div className="desc">플로토돔#6110</div>
            </>
          </Card>
          <Card className="slow">
            <>
              <div className="title">Email</div>
              <div className="desc">nosiu6562@gmail.com</div>
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
          이곳은 Vite, React, TypeScript 기술이 들어갔어요.
        </p>
        <p>한국 시간 기준으로</p>
        <div>22.11.04 - 개발 착수</div>
        <div>22.11.05 - 개발 완료</div>
        <details>
          <summary>22.12.09 - 코드 수정</summary>
          <ul className="desc">
            <li>드디어 막힌 스크롤이 풀렸어요.</li>
            <li>길고 지루한 설명을 압축했어요.</li>
          </ul>
        </details>
      </div>
      <div className="fp-nav">
        <ul>
          {["Intro#1", "Intro#2", "Skills", "Projects", "Contact", "TMI"].map((name,idx) => (
            <li key={idx} className={activeWrap === idx ? "active" : undefined} onClick={() => {
              location.href = `#w${idx}`;
              setActiveWrap(idx);
            }}
            onMouseLeave={() => {
              setHover(-1);
              document.querySelector(`div.fp-nav div.fp-tooltip#t${idx}`)?.classList.remove("active")
            }}
            onMouseOver={() => {
              setHover(idx);
              document.querySelector(`div.fp-nav div.fp-tooltip#t${idx}`)?.classList.add("active")
            }}
            >
              <div className="fp-tooltip" id={`t${idx}`} style={{ display: hover === idx ? "block" : "none" }}>{name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App;