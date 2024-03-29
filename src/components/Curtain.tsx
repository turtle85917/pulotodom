import React from "react";
import styled, { css } from "styled-components";
import { boolToNumber, reverseNumber } from "@global/Utility";

interface State {
  animated: boolean;
  reverse: boolean;
}

export default class Curtain extends React.Component<{}, State> {
  public state: State = {
    animated: false,
    reverse: false
  };

  public componentDidMount(): void {
    this.animatedTimeout();
    window.addEventListener("curtain-open", () => {
      this.setState({ animated: false, reverse: false });
      // NOTE 애니메이션 다시 재생
      const curtainElement = document.querySelector<HTMLDivElement>("div.curtain");
      curtainElement?.querySelectorAll<HTMLDivElement>("div").forEach(item => item.animate([
        { opacity: 0 }
      ], { duration: 320, fill: "forwards" }));
      this.animatedTimeout();
    });
    window.addEventListener("curtain-close", () => this.setState({ animated: false, reverse: true }));
  }

  private animatedTimeout(): void {
    window.setTimeout(() => {
      this.setState({ animated: true });
    }, 500);
  }

  public render(): React.ReactNode {
    if (this.state.animated) return null;

    return <CurtainContainer className="curtain">
      <CurtainPart className="left" reverse={this.state.reverse} />
      <CurtainPart className="right" reverse={this.state.reverse} />
    </CurtainContainer>;
  }
}

const CurtainContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
`;

const CurtainPart = styled.div<{ reverse: boolean; }>`
  width: 100%;
  height: 100vh;
  background-color: var(--alpha-black-100);
  transition: 500ms;
  animation: CurtainAnimation 500ms forwards;

  ${({ reverse }) => css`
    transform: translateX(var(--goal));
    &.left {
      --goal: ${reverseNumber(!reverse) * -100}%;
      --direction: ${boolToNumber(!reverse) * -100}%;
    }

    &.right {
      --goal: ${reverseNumber(!reverse) * 100}%;
      --direction: ${boolToNumber(!reverse) * 100}%;
    }

    @keyframes CurtainAnimation {
      to {
        transform: translateX(${reverse ? '0' : "var(--direction)"});
      }
    }
  `}
`;
