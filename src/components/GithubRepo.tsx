import React from "react";
import styled from "styled-components";
import Card from "./Card";
import L from "@languages";
import languagePalette from "@data/color/language.json";

interface Props {
  path: `${string}/${string}`;
}

interface State {
  loading: boolean;
  data: GithubRepository | null;
}

export default class GithubRepo extends React.Component<Props, State> {
  state: State = {
    loading: true,
    data: null
  }

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    new Promise<GithubRepository>((res, rej) =>
      fetch(`https://api.github.com/repos/${this.props.path}`)
      .then(blob => res(blob.json()))
      .catch(rej)
    ).then(res => {
      this.setState({ loading: false, data: res });
    });
  }

  public render(): React.ReactNode {
    return <Card
      title={this.state.data?.name || L.get("empty")}
      links={{
        github: this.state.data?.html_url || L.get("empty")
      }}
      footer={this.state.data?.language && <LanguageLabel data-label={this.state.data.language} style={{ "--background-color": languagePalette[this.state.data.language as keyof typeof languagePalette].color } as React.CSSProperties} />}
      >
      {
        this.state.loading
        ? <div className="desc">{L.render("loading")}</div>
        : <>
          {L.render("github-repository-stars", this.state.data?.stargazers_count.toLocaleString())}
          <br />
          {L.render("github-repository-forks", this.state.data?.forks_count.toLocaleString())}
        </>
      }
    </Card>
  }
}

const LanguageLabel = styled.span`
  display: flex;
  align-items: center;

  &:hover {
    &::before {
      border: 3px solid var(--background-color);
    }
    &::after {
      border-bottom: 2px dotted var(--alpha-black-200);
    }
  }

  &::before {
    content: '';
    display: block;
    width: 15px;
    height: 15px;
    margin-right: 0.5em;
    border-radius: 50%;
    transition: 300ms;
    border: 3px solid var(--alpha-white-100);
    background-color: var(--background-color);
  }
  &::after {
    content: attr(data-label);
    font-family: Desc;
  }
`;
