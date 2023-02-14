import React from "react";
import styled from "styled-components";
import L from "@languages";
import Template from "@global/Template";

interface S {
  openLocaleDropdown: boolean;
}

export default class Header extends Template<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = {
      openLocaleDropdown: false
    }
  }

  public handlingLocale(locale: string) {
    this.locale = locale;
    this.setState({ openLocaleDropdown: false });
  }

  render(): React.ReactNode {
    return <Container>
      <Image src="/slime.png" />
      <Nickname>
        {L.render("nickname")(this.locale)}
        <div className="desc">{L.render("nickname-d")(this.locale)}</div>
      </Nickname>
      <Navigation>
        <button data-for="tooltip" data-tip="locale-d" onClick={() => this.setState({ openLocaleDropdown: !this.state.openLocaleDropdown })}>
          {L.render("locale")(this.locale)}
        </button>
        {this.state.openLocaleDropdown && <Dropdown>
          <DropdownMenu onClick={() => this.handlingLocale("ko-KR")}>{L.render("locale-ko")(this.locale)}</DropdownMenu>
          <DropdownMenu onClick={() => this.handlingLocale("en-US")}>{L.render("locale-en")(this.locale)}</DropdownMenu>
        </Dropdown>}
      </Navigation>
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
`
