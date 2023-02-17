import React from "react";
import styled from "styled-components";
import L from "@languages";

interface S {
  openLocaleDropdown: boolean;
}

export default class Header extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = {
      openLocaleDropdown: false
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
        <button data-for="tooltip" data-tip="timeline-t" onClick={() => this.setState({ openLocaleDropdown: !this.state.openLocaleDropdown })}>
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
      <MenuButton onClick={() => {}}>
        {L.render()("mobile-menu")}
      </MenuButton>
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
