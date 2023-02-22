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
        setGithubCommits(data);
        setLoading(false);
      });
    }
    if (vercelUrl) {
      setLoading(true);
      fetch(vercelUrl, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_VERCEL_API_TOKEN}`
        }
      }).then(res => res.json()).then(data => {
        setVercelProject(data);
        setLoading(false);
      });
    }
    if (npmUrl) {
      setLoading(true);
      fetch(npmUrl.registry).then(res => res.json()).then(data => setNpmRegistry(data));
      fetch(npmUrl.downloads).then(res => res.json()).then(data => {
        setNpmDownloads(data);
        setLoading(false);
      });
    }
  }, [monologue]);

  if (loading) return <div className="desc loading">{L.render("loading")}</div>;
  if (monologue === null && name) return <HttpStatusPage statusCode="404" needToReturn={true} />
  if (monologue !== null)
    return <Container>
      <Title>
        {monologue.title}
        <div className="desc">{monologue.description}</div>
      </Title>
      <FieldsetItems>
        {Object.entries(monologue.links).map(([k, v]) => <fieldset key={k}>
          <FieldsetHead>{L.render(`link-${k}`)}</FieldsetHead>
          <FieldsetBody>
            {k === "github"
              ? <>
                <span>{L.get("monologue-github-LC")}</span>
                <div className="desc">{githubCommits[0]?.commit.message}</div>
                <span>{L.get("monologue-github-TC", githubCommits.length)}</span>
              </>
              : k === "preview"
              ? <>
                <span>{L.get("monologue-preview-status")}</span>
                <div className="desc">{L.render(`vercel-status-${vercelProject?.targets?.production.readyState.slice(0, 3)}`)}</div>
                <span>{L.get("monologue-preview-created")}</span>
                <div className="desc">{getHumanTimeDistance(vercelProject?.link?.createdAt??0)}</div>
              </>
              : k === "npm"
              ? <>
                <span>{L.get("monologue-npm-version")}</span>
                <div className="desc">{npmVersion(npmRegistry)}</div>
                <span>{L.get("monologue-npm-license")}</span>
                <div className="desc">{npmRegistry?.license}</div>
                <span>{L.get("monologue-npm-downloads")}</span>
                <div className="desc">{L.get("time", npmDownloads?.downloads.reduce((prev, current) => ({ day: '', downloads: prev.downloads+current.downloads })).downloads)}</div>
              </>
              : <div className="desc">{L.render("loading")}</div>
            }
          </FieldsetBody>
        </fieldset>)}
      </FieldsetItems>
    </Container>;

  return <Container>
    <Title>
      {L.render("projects")}
      <div className="desc">{L.get("projects-d")}</div>
    </Title>
    <ProjectCards>
      {projects.map((item, index) => <Card title={item.title} description={cut(item.description, 45)} links={item.links} onClick={() => cutaway(`/projects/${item.title}`)} key={index} />)}
    </ProjectCards>
  </Container>;
}

const npmVersion = (registry: NpmRegistry|null) => {
  if (registry === null) return L.render("loading");
  const latest = registry["dist-tags"]["latest"];
  const published = new Date(registry.time[latest]).getTime();
  return L.render("monologue-npm-version-c", latest, getHumanTimeDistance(published));
}

const Container = styled.article`
  display: flex;
  position: absolute;
  width: 100%;
  height: var(--absoulte-header);
  top: var(--header-height);
  left: 0;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20pt;
  color: #f1f1f1;
  margin: 0.5em;

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
    flex-flow: column;
  }
`;

const FieldsetItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: calc(70vw - 10%);
`;

const FieldsetHead = styled.legend`
  margin: 0 0.3em;
  padding: 0 0.2em;
`;

const FieldsetBody = styled.div`
  padding: 0.5em;
  font-family: Desc;
`;
