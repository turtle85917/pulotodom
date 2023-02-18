import React from "react";
import styled from "styled-components";
import L from "@languages";
import { cutaway } from "@global/Utility";

interface Props {
  statusCode: string;
  needToReturn?: boolean;
}

export default class HttpStatusPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return <Container>
      <HttpStatusHead>
        <HttpStatusLabel>{this.props.statusCode}&nbsp;</HttpStatusLabel>
        {L.get(`error-${this.props.statusCode}`)}
      </HttpStatusHead>
      <HttpStatusDescription>{L.render()(`error-${this.props.statusCode}-d`)}</HttpStatusDescription>
      {this.props.needToReturn && <ReturnHome className="button mobile" onClick={() => cutaway('/')} data-for="tooltip" data-tip="return-t">{L.render()("return")}</ReturnHome>}
    </Container>
  }
}

const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const HttpStatusHead = styled.h1`
  font-size: 20pt;
`;

const HttpStatusLabel = styled.label`
  font-size: 10pt;
  font-family: Desc;
`;

const HttpStatusDescription = styled.span`
  text-align: right;
  font-family: Desc;
  margin-top: 15px;
`;

const ReturnHome = styled.button`
  margin-top: 15px;
`;
