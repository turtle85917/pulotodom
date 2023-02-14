import React from "react";
import styled from "styled-components";
import L from "@languages";

export default class Header extends React.Component {
  render(): React.ReactNode {
    return <Container>
      <h1>{L.render("header-title")()}</h1>
    </Container>;
  }
}

const Container = styled.header`
  font-size: 14pt;
`;
