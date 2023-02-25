import React from "react";
import styled from "styled-components";
import L from "@languages";

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  links?: Record<string, string>;
  onClick?: () => any;
}

export default class Card extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render(): React.ReactNode {
    return <Container onClick={this.props.onClick}>
      <Head>{this.props.title}</Head>
      <Body>{this.props.children}</Body>
      {this.props.links && <Footer>
        {Object.entries(this.props.links).map(([k, v], index) => <SourceItem href={v} target="_blank" key={index}>{L.render(`link-${k}`)}</SourceItem>)}
      </Footer>}
      {this.props.footer && <Footer>{this.props.footer}</Footer>}
    </Container>;
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(20vw - 5%);
  height: fit-content;
  padding: 0.5em;
  transition: 300ms;
  border-radius: 10px;
  cursor: pointer;
  background-color: #e2e2e2;
  border-bottom: 0.4em solid #a7a7a7;
  box-shadow: 0px 20px 50px -15px rgba(0, 0, 0, 0.7);

  &:hover {
    transform: translateY(-10px);
  }

  @media ${({ theme }) => theme.device.laptop} {
    width: 90%;

    &:last-child {
      margin-bottom: 1.5em;
    }
  }
`;

const Head = styled.div`
  font-size: 15pt;
  text-align: center;
  border-bottom: 2px dotted #000000;
`;

const Body = styled.div`
  padding: 0.5em;
  margin-left: auto;
  margin-right: auto;
  font-family: Desc;
  height: max(10%, 15vw);
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 0.5em;
  padding: 0.5em 0.2em 0 0.2em;
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
