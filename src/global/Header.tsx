import React from "react";
import styled from "styled-components";
import L from "@languages";

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

  render(): React.ReactNode {
    return <Container>
      <Image src="/slime.png" />
      <Nickname>
        {L.get("nickname")}
        <div className="desc">{L.get("nickname-d")}</div>
      </Nickname>
      <Navigation>
        <button data-for="tooltip" data-tip="projects-t">
          {L.render()("projects")}
        </button>
        <button data-for="tooltip" data-tip="timeline-t">
          {L.render()("timeline")}
        </button>
        <button data-for="tooltip" data-tip="locale-t" onClick={() => this.setState({ openLocaleDropdown: !this.state.openLocaleDropdown })}>
          {L.render()("locale")}
        </button>
        {/* {this.state.openLocaleDropdown && <Dropdown>
          <DropdownMenu>{L.render()("locale-ko")}</DropdownMenu>
          <DropdownMenu>{L.render()("locale-en")}</DropdownMenu>
        </Dropdown>} */}
      </Navigation>
      <MenuButton className="mobile" onClick={() => this.setState({ openMobileMenuWindow: !this.state.openMobileMenuWindow })}>
        {L.render()("mobile-menu")}
      </MenuButton>
      {this.state.openMobileMenuWindow && <MenuContainer>
        <MenuItemButton className="mobile">
          {L.render()("projects")}
          &nbsp;
          <div className="desc">{L.get("projects-t")}</div>
        </MenuItemButton>
        <MenuItemButton className="mobile">
          {L.render()("timeline")}
          &nbsp;
          <div className="desc">{L.get("timeline-t")}</div>
        </MenuItemButton>
        <MenuItemButton className="mobile">
          {L.render()("locale")}
          &nbsp;
          <div className="desc">{L.get("locale-t")}</div>
        </MenuItemButton>
      </MenuContainer>}
    </Container>;
  }
}

const Container = styled.header`
  display: flex;
  font-size: 14pt;
  padding: 0.5em;
  background-color: #e7e7e7;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 4px;

  @media ${({ theme }) => theme.device.tablet} {
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
  height: calc(100vh - 60px);
  top: 60px;
  left: 0;
  z-index: 50;
  background-color: #575757dc;
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

const Nickname = styled.span`
  font-size: 15pt;
  flex: 1 1 0;
  margin: auto 0.5em;
`;

const Image = styled.img`
  border-radius: 9999px;
  width: 40px;
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
