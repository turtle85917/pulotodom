// 이 컴포넌트에서는 모달 혹은 경고창 등 바로 위에 드러나야 하는 것들을 종합적으로 관리하는 컴포넌트입니다.

import React from "react";
import styled from "styled-components";
import L from "@languages";

interface State {
  openComponent: boolean;
  modalComponents: JSX.Element[];
}

export default class Aside extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      openComponent: false,
      modalComponents: []
    };
  }

  componentDidMount(): void {
    window.addEventListener("component-open", data => {
      const { modalComponents } = this.state;
      const { detail } = data as CustomEvent<Component>;
      this.setState({ openComponent: true });
      window.dispatchEvent(new Event("curtain-close"));
      if (detail.type === "Alert") {
        this.setState({
          modalComponents: [
            ...modalComponents,
            <DialogContainer key={modalComponents.length}>
              <DialogHead>
                <DialogHeadContent>{detail.title}</DialogHeadContent>
                <button className="mobile">{L.render("menu-x")}</button>
              </DialogHead>
              <DialogBody>{detail.content}</DialogBody>
            </DialogContainer>
          ]
        });
      }
    });
  }

  render(): React.ReactNode {
    return <Container>
      <div>{this.state.modalComponents}</div>
    </Container>;
  }
}

const Container = styled.aside`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

const DialogContainer = styled.div`
  position: absolute;
  min-width: 10vw;
  border-color: #a8a8a8;
  background-color: #dfdfdf;
  color: white;
  background-color: var(--color-green);
  z-index: 3;
`;

const DialogHead = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 15pt;
  padding: 0.3em 0.2em;
  background-color: #2a5845;
`;

const DialogHeadContent = styled.label`
  flex: 1 1 0;
  font-family: Desc;
`;

const DialogBody = styled.div`
  font-size: 15pt;
  padding: 0.2em;
`;
