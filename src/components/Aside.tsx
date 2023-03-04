// 모달 혹은 경고창 등 바로 위에 드러나야 하는 것들을 종합적으로 관리하는 컴포넌트.

import React from "react";
import styled from "styled-components";
import L from "@languages";

interface State {
  type: ComponentType | null;
  title: string | JSX.Element | null;
  body: React.ReactNode;
  onSubmit: ((answer?: boolean) => void) | null;
  onClose: (() => void) | null;
}

export default class Aside extends React.Component<{}, State> {
  public state: State = {
    type: null,
    title: null,
    body: null,
    onSubmit: null,
    onClose: null
  };
  private tick: number = 0;
  private static singleton: Aside;

  public static openModal(body: React.ReactNode, title?: string | JSX.Element) {
    window.dispatchEvent(new Event("curtain-close"));
    return new Promise<void>((res, rej) => Aside.singleton.setState({
      type: "Alert",
      title: title ?? null,
      body,
      onSubmit: () => res(),
      onClose: rej
    }));
  }

  public static openConfirm(body: React.ReactNode, title?: string | JSX.Element) {
    window.dispatchEvent(new Event("curtain-close"));
    return new Promise<boolean>((res, rej) => Aside.singleton.setState({
      type: "Confirm",
      title: title ?? null,
      body,
      onSubmit: (answer) => res(answer as any),
      onClose: rej
    }));
  }

  public componentDidMount(): void {
    Aside.singleton = this;
    window.addEventListener("keydown", this.keydownListener.bind(this));
  }

  public componentDidUpdate(): void {
    if (this.state.type) {
      this.tick = window.setInterval(() => {
        const currentModal = document.querySelector<HTMLDivElement>("div.modal");
        currentModal?.style.setProperty("top", `${((window.innerHeight + (window.scrollY * 2)) - (currentModal?.clientHeight??0)) / 2}px`);
        currentModal?.style.setProperty("left", `${((window.innerWidth + (window.scrollX * 2)) - (currentModal?.clientWidth??0)) / 2}px`);
      }, 100);
    }
    if (this.state.type === null) {
      window.clearInterval(this.tick);
    }
  }

  public render(): React.ReactNode {
    if (!this.state.type) return null;

    return <Container>
      {this.state.type && <DialogContainer className="modal" style={{ top: "0px", left: "0px" }}>
        <DialogHead>
          <DialogHeadContent>{this.state.title || L.get("empty")}</DialogHeadContent>
          <button className="mobile" onClick={this.clickCloseButton.bind(this)}>{L.render("menu-x")}</button>
        </DialogHead>
        <DialogBody>{this.state.body}</DialogBody>
        {this.state.type === "Confirm" && <DialogConfirmComponent>
          <button className="mobile" onClick={this.clickYesButton.bind(this)}>{L.get("yes")}</button>
          <button className="mobile no" onClick={this.clickNoButton.bind(this)}>{L.get("no")}</button>
        </DialogConfirmComponent>}
      </DialogContainer>}
    </Container>;
  }

  private clickYesButton() {
    this.state.onSubmit?.(true);
    this.setState({ type: null });
    window.dispatchEvent(new Event("curtain-open"));
  }

  private clickNoButton() {
    this.state.onSubmit?.(false);
    this.setState({ type: null });
    window.dispatchEvent(new Event("curtain-open"));
  }

  private clickCloseButton() {
    this.state.onClose?.();
    this.setState({ type: null });
    window.dispatchEvent(new Event("curtain-open"));
  }

  private keydownListener(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.state.onClose?.();
      this.setState({ type: null });
      window.dispatchEvent(new Event("curtain-open"));
    }
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
  max-width: 90%;
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
  padding: 0.2em;
  font-size: 14pt;
  color: var(--grey-300);
`;

const DialogConfirmComponent = styled.div`
  display: flex;
  margin: 0.5em 0;
  align-items: center;
  justify-content: space-around;

  button.no {
    color: var(--white);
    background-color: var(--rose-100);
  }
`;
