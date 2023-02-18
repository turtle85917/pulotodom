import styled, { css } from "styled-components";
import L from "@languages";
import { cutaway } from "@global/Utility";

export default function Main(): JSX.Element {
  return <Container>
    <div>
      <NicknameGroup data-for="tooltip" data-tip="nickname-t">
        {L.get("nickname").split('').map((chunk, index) => <Nickname index={index} key={index}>{chunk}</Nickname>)}
      </NicknameGroup>
      <Introduction className="desc">{L.get("nickname-s")}</Introduction>
      <Vertical />
      <GuideGroup>
        <Guide>{L.get("guide")}</Guide>
        <Guide>{L.get("guide-d1")}</Guide>
        <Guide>{L.get("guide-d2")}</Guide>
      </GuideGroup>
      <ButtonGroup>
        <UtilityButton className="button" onClick={() => cutaway("/projects")}>{L.render()("projects")}</UtilityButton>
        <UtilityButton className="button" onClick={() => cutaway("/timeline")}>{L.render()("timeline")}</UtilityButton>
      </ButtonGroup>
    </div>
  </Container>;
}

const Container = styled.article`
  display: flex;
  margin-top: 10vh;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const NicknameGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-size: 40px;
`;

const Nickname = styled.div<{ index: number }>`
  transform: scale(0);
  ${({ index }) => css`
    animation: NicknameDrop 1s forwards ${index*0.225}s cubic-bezier(0, 0.15, 1, 0.35);
  `}

  @keyframes NicknameDrop {
    0% {
      transform: scale(0);
    }

    10% {
      transform: scale(1.155);
    }

    55% {
      transform: scale(0.925);
    }

    65% {
      transform: scale(1.125);
    }

    80% {
      transform: scale(0.935);
    }

    100% {
      transform: scale(1);
    }
  }
`;

const Introduction = styled.div`
  transform: translateY(-20px);
  opacity: 0;
  animation: DescDrop 2s forwards 600ms linear;

  @keyframes DescDrop {
    0% {
      opacity: 0;
      transform: translateY(-40px) scale(1.15);
    }

    50% {
      opacity: 0.5;
      transform: translateY(-5px) scale(1.15);
    }

    100% {
      opacity: 1;
      transform: translateY(10px) scale(1.15);
    }
  }
`;

const Vertical = styled.span`
  display: flex;
  width: 2px;
  height: 0px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff52;
  animation: VerticalDrop 1s forwards 2600ms;
  transform: translateY(15px);

  @keyframes VerticalDrop {
    0% {
      height: 0px;
    }

    50% {
      height: 110px;
    }

    100% {
      height: 85px;
    }
  }
`;

const GuideGroup = styled.div`
  text-align: right;
  margin-top: 20px;
  opacity: 0;
  animation: FadeIn 2s forwards 2500ms;
`;

const Guide = styled.div`
  font-family: Desc;
  font-size: 13pt;
  font-style: italic;
  font-weight: normal;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  animation: FadeIn 800ms forwards 3000ms;
`;

const UtilityButton = styled.button`
  font-size: 12pt;
  margin-top: 15px;
`;
