import { useEffect, useState } from "react";
import styled from "styled-components";
import L from "@languages";
import Card from "@components/Card";
import HttpStatusPage from "@components/HttpStatusPage";

export default function Projects(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    new Promise<{ default: Project[]; }>((resolve) => resolve(import("@data/projects.json"))).then(data => {
      setLoading(false);
      setProjects(data.default);
    });
  }, []);

  if (process.env.NODE_ENV === "production") return <HttpStatusPage statusCode="501" />;
  if (loading) return <div className="desc">{L.render()("loading")}</div>;

  return <Container>
    <Title>
      {L.render()("projects")}
      <div className="desc">{L.get("projects-d")}</div>
    </Title>
    <ProjectCards>
      {/* {projects.map((item, index) => <Card title={item.title} description={item.description} links={item.links} key={index} />)} */}
      <Card title="test" description="test" />
    </ProjectCards>
  </Container>;
}

const Container = styled.article`
  position: absolute;
  width: 100%;
  height: var(--absoulte-header);
  top: var(--header-height);
  left: 0;
`;

const Title = styled.h1`
  font-size: 20pt;
  margin-top: 0.5em;
  margin-left: 0.5em;
  color: #f1f1f1;

  div.desc {
    color: #bebebe;
    font-size: 10.5pt;
    font-family: Desc;
  }
`;

const ProjectCards = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 1em;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(5, 15em);

  @media ${({ theme }) => theme.device.laptop} {
    grid-template-columns: repeat(1, 15em);
  }
`;
