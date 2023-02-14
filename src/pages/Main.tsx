import styled, { css } from "styled-components";
import L from "@languages";

export default function Main(): JSX.Element {
  return <Container>
    <div>
      <NicknameGroup data-for="tooltip" data-tip="nickname-d">
        {L.get("nickname").split('').map((chunk, index) => <Nickname index={index} key={index}>{chunk}</Nickname>)}
      </NicknameGroup>
      <Introduction className="desc">{L.get("nickname-s")}</Introduction>
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
  flex-direction: row;
  font-size: 40px;
`;

const Nickname = styled.div<{ index: number }>`
  transform: scale(0);
  ${({ index }) => css`
    animation: Scale 1s forwards ${index*0.225}s cubic-bezier(0, 0.15, 1, 0.35);
  `}

  @keyframes Scale {
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
  animation: Drop 2s forwards 600ms cubic-bezier(0, 1.2, 1, -0.4);

  @keyframes Drop {
    0% {
      opacity: 0;
      transform: translateY(-40px) scale(1.15);
    }

    50% {
      opacity: 0.5;
    }

    60% {
      opacity: 0.95;
    }

    100% {
      opacity: 1;
      transform: translateY(10px) scale(1.15);
    }
  }
`;
