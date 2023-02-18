import React from "react";
import styled, { css } from "styled-components";
import { boolToNumber, reverseNumber } from "@global/Utility";

interface State {
  animated: boolean;
  reverse: boolean;
}

export default class Curtain extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      animated: false,
      reverse: false
    };
  }

  public componentDidMount(): void {
    this.animatedTimeout();
    window.addEventListener("curtain-close", () => {
      this.setState({ animated: false, reverse: true });
      this.animatedTimeout();
    });
  }

  public animatedTimeout() {
    window.setTimeout(() => {
      this.setState({ animated: true });
    }, 500);
  }

  public render(): React.ReactNode {
    if (this.state.animated) return null;
    return <CurtainContainer>
      <CurtainPart className="left" reverse={this.state.reverse} />
      <CurtainPart className="right" reverse={this.state.reverse} />
    </CurtainContainer>;
  }
}

const CurtainContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const CurtainPart = styled.div<{ reverse: boolean; }>`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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