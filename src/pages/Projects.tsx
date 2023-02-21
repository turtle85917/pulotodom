import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import L from "@languages";
import Card from "@components/Card";
import HttpStatusPage from "@components/HttpStatusPage";
import { cut, cutaway, getGithubApiCommitsLink, getHumanTimeDistance, getNPMApiLink, getVercelApiLink } from "@global/Utility";

export default function Projects(): JSX.Element {
  const { name } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [monologue, setMonologue] = useState<Project|null>(null);
  const [githubCommits, setGithubCommits] = useState<GithubCommit[]>([]);
  const [npmRegistry, setNpmRegistry] = useState<NpmRegistry|null>(null);
  const [npmDownloads, setNpmDownloads] = useState<NpmDownloads|null>(null);
  const [vercelProject, setVercelProject] = useState<VercelProjects|null>(null);
  
  useEffect(() => {
    import("@data/projects.json").then(data => {
      setLoading(false);
      setMonologue(data.default?.find(item => item.title === name) ?? null);
      setProjects(data.default);
    });
  }, []);

  useEffect(() => {
    if (!monologue) return;
    if (!monologue.links.github && !monologue.links.npm && !monologue.links.preview) return;
    const npmUrl = getNPMApiLink(monologue.links.npm ?? '');
    const vercelUrl = getVercelApiLink(monologue.links.preview ?? '');
    const githubUrl = getGithubApiCommitsLink(monologue.links.github ?? '');
    if (githubUrl) {
      setLoading(true);
      fetch(githubUrl).then(res => res.json()).then(data => {
        setLoading(false);
        setGithubCommits(data);
      });
    }
    if (vercelUrl) {
      setLoading(true);
      fetch(vercelUrl, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_VERCEL_API_TOKEN}`
        }
      }).then(res => res.json()).then(data => {
        setLoading(false);
        setVercelProject(data);
      });
    }
    if (npmUrl) {
      setLoading(true);
      fetch(npmUrl.registry).then(res => res.json()).then(data => setNpmRegistry(data));
      fetch(npmUrl.downloads).then(res => res.json()).then(data => {
        setLoading(false);
        setNpmDownloads(data);
      });
    }
  }, [monologue]);

  if (loading) return <div className="desc loading">{L.render(L.locale)("loading")}</div>;
  if (monologue === null && name) return <HttpStatusPage statusCode="404" needToReturn={true} />
  if (monologue !== null)
    return <Container>
      <Title>
        {monologue.title}
        <div className="desc">{monologue.description}</div>
      </Title>
      {monologue.links && <div className="desc">{L.render(L.locale)("loading")}</div>}
    </Container>;

  return <Container>
    <Title>
      {L.render(L.locale)("projects")}
      <div className="desc">{L.get(L.locale)("projects-d")}</div>
    </Title>
    <ProjectCards>
      {projects.map((item, index) => <Card title={item.title} description={cut(item.description, 50)} links={item.links} onClick={() => cutaway(`/projects/${item.title}`)} key={index} />)}
    </ProjectCards>
  </Container>;
}

const npmVersion = (registry: NpmRegistry) => {
  const latest = registry["dist-tags"]["latest"];
  const published = new Date(registry.time[latest]).getTime();
  return L.get(L.locale)("monologue-npm-version-c", latest, getHumanTimeDistance(published));
}

const Container = styled.article`
  display: flex;
  position: absolute;
  width: 100%;
  height: var(--absoulte-header);
  top: var(--header-height);
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20pt;
  color: #f1f1f1;

  div.desc {
    color: #bebebe;
    font-size: 12pt;
    font-family: Desc;
    font-weight: 100;
  }
`;

const ProjectCards = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 35px;
  width: 70%;
  margin-top: 1em;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.device.laptop} {
    grid-template-columns: repeat(1, 15em);
  }
`;
