// 이 컴포넌트에서는 모달 혹은 경고창 등 바로 위에 드러나야 하는 것들을 종합적으로 관리하는 컴포넌트.

import React from "react";
import styled from "styled-components";
import L from "@languages";

interface State {
  openComponent: boolean;
  modalComponent: JSX.Element|null;
}

export default class Aside extends React.Component<{}, State> {
  public state: State = {
    openComponent: false,
    modalComponent: null
  };

  componentDidMount(): void {
    window.addEventListener("component-open", data => {
      const { detail } = data as CustomEvent<Component>;
      window.dispatchEvent(new Event("curtain-close"));
      if (detail.type === "Alert") {
        this.setState({
          openComponent: true,
          modalComponent: <DialogContainer className="modal" style={{ top: "0px", left: "0px" }}>
            <DialogHead>
              <DialogHeadContent>{detail.title}</DialogHeadContent>
              <button className="mobile" onClick={() => {
                this.setState({ modalComponent: null, openComponent: false });
                window.dispatchEvent(new Event("curtain-open"));
              }}>{L.render("menu-x")}</button>
            </DialogHead>
            <DialogBody>{detail.content}</DialogBody>
          </DialogContainer>
        }, () => {
          const currentModal = document.querySelector<HTMLDivElement>("div.modal");
          currentModal?.style.setProperty("top", `${(window.innerHeight - (currentModal?.clientHeight??0)) / 2}px`);
          currentModal?.style.setProperty("left", `${(window.innerWidth - (currentModal?.clientWidth??0)) / 2}px`);
        });
      }
    });
  }

  render(): React.ReactNode {
    if (!this.state.openComponent) return null;

    return <Container>
      {this.state.modalComponent}
    </Container>;
  }
}

const Container = styled.aside`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 3;
`;

const DialogContainer = styled.div`
  position: absolute;
  min-width: 15vw;
  color: var(--white);
  background-color: var(--green-100);
  z-index: 5;
`;

const DialogHead = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 12pt;
  padding: 0.3em 0.2em;
  touch-action: none;
  cursor: default;
  background-color: var(--green-300);
`;

const DialogHeadContent = styled.label`
  flex: 1;
  margin: 0 0.35rem;
  font-family: Desc;
  cursor: inherit;
`;

const DialogBody = styled.div`
  font-size: 15pt;
  padding: 0.2em;
`;
