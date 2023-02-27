import React from "react";
import styled from "styled-components";
import L from "@languages";
import { deviceSizes } from "./Theme";
import { cutaway, openAsideComponent } from "./Utility";

interface State {
  openLocaleDropdown: boolean;
  openMobileMenuWindow: boolean;
}

export default class Header extends React.Component<{}, State> {
  private navigations: Navgation[];

  constructor(props: {}) {
    super(props);
    this.state = {
      openLocaleDropdown: false,
      openMobileMenuWindow: false
    };
    this.navigations = [
      { path: "status", onClick: () => cutaway("/status") },
      { path: "contact", onClick: () => openAsideComponent("Alert", L.render("contact"), <div className="desc">{L.render("loading")}</div>) },
      { path: "projects", onClick: () => cutaway("/projects") },
      { path: "timeline", onClick: () => cutaway("/timeline") },
      { path: "locale", onClick: () => this.setState({ openLocaleDropdown: !this.state.openLocaleDropdown, openMobileMenuWindow: false }) }
    ];
  }

  public componentDidMount(): void {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.setState({ openLocaleDropdown: false });
    });
  }

  public render(): React.ReactNode {
    return <Container>
      <button className="mobile" onClick={() => cutaway('/')}>{L.render("home")}</button>
      <Nickname>
        <div className="desc">{L.get("nickname-d")}</div>
      </Nickname>
      <Navigation>
        {this.navigations.map(item => <button data-for="tooltip" data-tip={`${item.path}-t`} onClick={item.onClick} key={item.path}>
          {L.render(item.path)}
        </button>)}
        {this.state.openLocaleDropdown && <Dropdown>
          <DropdownMenu onClick={() => L.setLocale("ko-KR")}>{L.render("locale-ko")}</DropdownMenu>
          <DropdownMenu onClick={() => L.setLocale("en-US")}>{L.render("locale-en")}</DropdownMenu>
        </Dropdown>}
      </Navigation>
      <MenuButton className="mobile" onClick={() => this.setState({ openMobileMenuWindow: !this.state.openMobileMenuWindow, openLocaleDropdown: false })}>
        {L.render(`menu${this.state.openMobileMenuWindow ? "-x" : ''}`)}
      </MenuButton>
      {this.state.openMobileMenuWindow && <div className="mobileContainer">
        {this.navigations.map(item => <MenuItemButton className="mobile" onClick={item.onClick} key={item.path}>
          {L.render(item.path)}
          &nbsp;
          <MenuItemButtonDesc className="desc">{L.get(`${item.path}-t`)}</MenuItemButtonDesc>
        </MenuItemButton>)}
      </div>}
      {(this.state.openLocaleDropdown && window.innerWidth < deviceSizes.mobile) && <div className="mobileContainer">
        <MenuItemButton className="mobile" onClick={() => L.setLocale("ko-KR")}>{L.render("locale-ko")}</MenuItemButton>
        <MenuItemButton className="mobile" onClick={() => L.setLocale("en-US")}>{L.render("locale-en")}</MenuItemButton>
      </div>}
    </Container>;
  }
}

const Container = styled.header`
  display: flex;
  position: fixed;
  font-size: 14pt;
  padding: 0.5em;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 1;
  background-color: var(--grey-300);

  div.mobileContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    gap: 50px;
    width: 100%;
    height: var(--absoulte-header);
    top: var(--header-height);
    left: 0;
    z-index: 50;
    background-color: var(--alpha-black-100);
    animation: FadeIn 500ms forwards;
  }
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
  color: var(--white);
  font-size: 12pt;
  min-width: 40px;
  text-align: center;
  justify-content: center;
  min-width: 100px;
  z-index: 100;
  background-color: var(--grey-300);
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
    background-color: var(--grey-400);
  }
`;
