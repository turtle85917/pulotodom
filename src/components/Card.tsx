import React from "react";
import styled from "styled-components";
import L from "@languages";

interface Props {
  title: string;
  description: string;
  links?: Record<string, string>;
}

export default class Card extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render(): React.ReactNode {
    return <Container>
      <Head>{this.props.title}</Head>
      <Body>{this.props.description}</Body>
      {this.props.links && <Source>
        {Object.entries(this.props.links).map(([k, v], index) => <SourceItem href={v} target="_blank" key={index}>{L.render()(`link-${k}`)}</SourceItem>)}
      </Source>}
    </Container>;
  }
}

const Container = styled.div`
  padding: 0.5em;
  min-height: 10rem;
  transition: 300ms;
  border-radius: 10px;
  cursor: pointer;
  background-color: #e2e2e2;
  border-bottom: 0.4em solid #a7a7a7;
  box-shadow: 0px 20px 50px -15px rgba(0,0,0,0.7);
  animation: CardExpand 500ms forwards;

  &:hover {
    transform: translateY(-10px);
  }
`;

const Head = styled.div`
  font-size: 15pt;
  text-align: center;
  border-bottom: 2px dotted #000000;
`;

const Body = styled.div`
  margin: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Desc;
`;

const Source = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 0.5em;
  padding-top: 0.5em;
  border-top: 2px dotted #000000;
  justify-content: center;
`;

const SourceItem = styled.a`
  padding-right: 0.5em;
  border-right: 0.2px solid #000000;
  font-size: 10.5pt;

  &:last-child {
    padding-right: 0;
    border-right: none;
  }
`;
