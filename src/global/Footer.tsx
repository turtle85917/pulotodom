import React from "react";
import styled from "styled-components";
import L from "@languages";

export default class Footer extends React.Component {
  public render(): React.ReactNode {
    return <Container>
      <div className="desc">
        <a href="https://github.com/turtle85917/pulotodom" target="_blank">
          {L.get("footer")}
        </a>
      </div>
    </Container>
  }
}

const Container = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: var(--green-100);

  div.desc {
    font-size: 12pt;
    margin: 0.1em 0;

    a {
      font-family: Desc;
    }
  }
`;
