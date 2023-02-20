import React from "react";
import styled from "styled-components";
import L from "@languages";
import { cutaway } from "./Utility";

interface S {
  openLocaleDropdown: boolean;
  openMobileMenuWindow: boolean;
  openMobileLocaleDropDown: boolean;
}

export default class Header extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = {
      openLocaleDropdown: false,
      openMobileMenuWindow: false,
      openMobileLocaleDropDown: false
    }
  }

  public componentDidMount(): void {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.setState({ openLocaleDropdown: false });
      }
    });
  }

  public render(): React.ReactNode {
    return <Container>
      <Nickname>
        <div className="desc">{L.get(L.locale)("nickname-d")}</div>
      </Nickname>
      <Navigation>
        {/\/(.+)/.test(window.location.pathname) && <button onClick={() => cutaway('/')} data-for="tooltip" data-tip="return-t">
          {L.render(L.locale)("return")}
        </button>}
        <button onClick={() => cutaway("/projects")} data-for="tooltip" data-tip="projects-t">
          {L.render(L.locale)("projects")}
        </button>
        <button onClick={() => cutaway("/timeline")} data-for="tooltip" data-tip="timeline-t">
          {L.render(L.locale)("timeline")}
        </button>
        <button data-for="tooltip" data-tip="locale-t" onClick={() => this.setState({ openLocaleDropdown: !this.state.openLocaleDropdown })}>
          {L.render(L.locale)("locale")}
        </button>
        {this.state.openLocaleDropdown && <Dropdown>
          <DropdownMenu onClick={() => L.setLocale("ko-KR")}>{L.render(L.locale)("locale-ko")}</DropdownMenu>
          <DropdownMenu onClick={() => L.setLocale("en-US")}>{L.render(L.locale)("locale-en")}</DropdownMenu>
        </Dropdown>}
      </Navigation>
      <MenuButton className="mobile" onClick={() => this.setState({ openMobileMenuWindow: !this.state.openMobileMenuWindow })}>
        {L.render(L.locale)(`menu${this.state.openMobileMenuWindow ? "-x" : ''}`)}
      </MenuButton>
      {this.state.openMobileMenuWindow && <MenuContainer>
        {/\/(.+)/.test(window.location.pathname) && <MenuItemButton className="mobile" onClick={() => cutaway('/')}>
          {L.render(L.locale)("return")}
          &nbsp;
          <MenuItemButtonDesc className="desc">{L.get(L.locale)("return-t")}</MenuItemButtonDesc>
        </MenuItemButton>}
        <MenuItemButton className="mobile" onClick={() => cutaway("/projects")}>
          {L.render(L.locale)("projects")}
          &nbsp;
          <MenuItemButtonDesc className="desc">{L.get(L.locale)("projects-t")}</MenuItemButtonDesc>
        </MenuItemButton>
        <MenuItemButton className="mobile" onClick={() => cutaway("/timeline")}>
          {L.render(L.locale)("timeline")}
          &nbsp;
          <MenuItemButtonDesc className="desc">{L.get(L.locale)("timeline-t")}</MenuItemButtonDesc>
        </MenuItemButton>
        <MenuItemButton className="mobile">
          {L.render(L.locale)("locale")}
          &nbsp;
          <MenuItemButtonDesc className="desc">{L.get(L.locale)("locale-t")}</MenuItemButtonDesc>
        </MenuItemButton>
      </MenuContainer>}
    </Container>;
  }
}

const Container = styled.header`
  display: flex;
  font-size: 14pt;
  padding: 0.5em;
  height: var(--header-height);
  background-color: #e7e7e7;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 4px;

  @media ${({ theme }) => theme.device.mobile} {
    & {
      display: none;
    }
  }
`;

const MenuButton = styled.button`
  display: none;

  @media ${({ theme }) => theme.device.mobile} {
    & {
      display: block;
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 50px;
  width: 100%;
  height: var(--absoulte-header);
  top: var(--header-height);
  left: 0;
  z-index: 50;
  background-color: #575757dc;
  animation: FadeIn 500ms forwards;
`;

const MenuItemButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;

  div.desc {
    font-size: 6pt;
  }

  &:first-child {
    margin-top: 50px;
  }
`;

const MenuItemButtonDesc = styled.div`
  margin-top: auto;
  margin-bottom: 6.25px;
`;

const Nickname = styled.span`
  font-size: 15pt;
  flex: 1 1 0;
  margin: auto 0.5em;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 55px;
  right: 0;
  color: white;
  font-size: 12pt;
  min-width: 40px;
  text-align: center;
  justify-content: center;
  min-width: 100px;
  z-index: 100;
  background-color: #8a8a8a;
`;

const DropdownMenu = styled.a`
  font-family: Desc;
  display: flex;
  height: 30px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  transition: 200ms;

  &:hover {
    background-color: #535353;
  }
`;
