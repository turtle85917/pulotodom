import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import L from "@languages";
import Card from "@components/Card";
import HttpStatusPage from "@components/HttpStatusPage";
import { cut, cutaway, fillArrayWithEmptyValues, getHumanNowTime, getHumanTimeDistance } from "@global/Utility";

const REGEX_GITHUB_REPO_LINK = /https:\/\/github.com\/((?:.+)\/(?:.+))/;
const REGEX_NPM_REGISTRY_LINK = /https:\/\/www\.npmjs\.com\/package\/(.+)/;
const REGEX_VERCEL_LINK = /https:\/\/(.+?)\.vercel\.app/;

export default function Projects(): JSX.Element {
  const { name } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [monologue, setMonologue] = useState<Project>();
  const [githubCommits, setGithubCommits] = useState<GithubCommit[]>([]);
  const [npmRegistry, setNpmRegistry] = useState<NpmRegistry>();
  const [npmDownloads, setNpmDownloads] = useState<NpmDownloads>();
  const [vercelProject, setVercelProject] = useState<VercelProjects>();

  useEffect(() => {
    import("@data/projects.json").then(data => {
      setLoading(false);
      setMonologue(data.default?.find(item => item.title === name) ?? undefined);
      setProjects(data.default);
    });
  }, []);

  useEffect(() => {
    if (!monologue) return;
    if (!monologue.links.github && !monologue.links.npm && !monologue.links.preview) return;
    const npmExec = monologue.links.npm?.match(REGEX_NPM_REGISTRY_LINK);
    const vercelExec = monologue.links.preview?.match(REGEX_VERCEL_LINK);
    const githubExec = monologue.links.github?.match(REGEX_GITHUB_REPO_LINK);
    setLoading(true);
    Promise.all([
      githubExec && fetch(`https://api.github.com/repos/${githubExec[1]}/commits?per_page=1000000`).then(blob => blob.json()).catch(undefined),
      vercelExec && fetch(`https://api.vercel.com/v9/projects/${vercelExec[1]}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_VERCEL_API_TOKEN}`
        }
      }).then(blob => blob.json()).catch(undefined),
      npmExec && fetch(`https://registry.npmjs.org/${npmExec[1]}`).then(blob => blob.json()).catch(undefined)
    ]).then(reses => {
      setGithubCommits(reses[0]);
      setVercelProject(reses[1]);
      setNpmRegistry(reses[2]);
      if (npmExec) {
        new Promise<NpmDownloads>((res, rej) => fetch(`https://api.npmjs.org/downloads/range/${reses[2].time.created.slice(0, 10)}:${getHumanNowTime()}/${npmExec[1]}`).then(blob => res(blob.json())).catch(rej))
          .then(res => setNpmDownloads(res));
      }
      setLoading(false);
    });
  }, [monologue]);


  if (loading) return <div className="desc loading">{L.render("loading")}</div>;
  if (!monologue && name) return <HttpStatusPage statusCode="404" needToReturn={true} />
  if (monologue !== undefined) {
    const filledNpmDownloads = fillArrayWithEmptyValues(npmDownloads?.downloads.slice(-10)??[], 10, { day: '', downloads: 0 });
    const vercelStatus = vercelProject?.targets?.production.readyState
      ? L.render(`vercel-status-${vercelProject?.targets?.production.readyState.slice(0, 3)}`)
      : L.render("loading")
    ;
    const vercelCreatedAtHumanTimeDistance = vercelProject?.link?.createdAt
      ? getHumanTimeDistance(vercelProject?.link?.createdAt)
      : L.render("loading")
    ;

    return <Container>
      <Title>
        {monologue.title}
        <div className="desc">{monologue.description}</div>
      </Title>
      <FieldsetItems>
        {Object.entries(monologue.links).map(([k, v]) => <fieldset key={k}>
          <FieldsetHead onClick={() => window.open(v, "_blank")}>{L.render(`link-${k}`)}</FieldsetHead>
          <FieldsetBody>
            {k === "github"
              ? <>
                <span>{L.get("monologue-github-LC")}</span>
                <div className="desc">{githubCommits[0]?.commit.message || L.get("empty")}</div>
                <span>{L.get("monologue-github-TC", githubCommits.length || L.get("empty"))}</span>
              </>
              : k === "preview"
              ? <>
                <span>{L.get("monologue-preview-status")}</span>
                <div className="desc">{vercelStatus}</div>
                <span>{L.get("monologue-preview-created")}</span>
                <div className="desc">{vercelCreatedAtHumanTimeDistance}</div>
              </>
              : k === "npm"
              ? <>
                <span>{L.get("monologue-npm-version")}</span>
                <div className="desc">{npmVersion(npmRegistry)}</div>
                <span>{L.get("monologue-npm-license")}</span>
                <div className="desc">{npmRegistry?.license ?? L.get("empty")}</div>
                <span>{L.get("monologue-npm-downloads")}</span>
                <div className="desc">{L.get("time", npmDownloads?.downloads.reduce((prev, current) => ({ day: '', downloads: prev.downloads+current.downloads })).downloads)}</div>
                <Line
                  data={{
                    labels: filledNpmDownloads.map(d => d.day || L.get("empty")),
                    datasets: [
                      {
                        label: "Downloads",
                        data: filledNpmDownloads.map(d => d.downloads),
                        borderColor: "#37946e"
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    interaction: {
                      mode: "index" as const,
                      intersect: false
                    }
                  }}
                  width={700}
                  className="chart"
                />
                <Footer className="desc">{L.render("monologue-npm-limit-10")}</Footer>
              </>
              : <div className="desc">{L.render("loading")}</div>
            }
          </FieldsetBody>
        </fieldset>)}
      </FieldsetItems>
    </Container>;
  }

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

const npmVersion = (registry?: NpmRegistry) => {
  if (!registry) return L.render("loading");
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

  fieldset {
    background-color: #cdcdcd;
  }
`;

const FieldsetHead = styled.legend`
  margin: 0 0.3em;
  background-color: #ffffff;
  border-radius: 0.5em;
  padding: 0.35em;
  transition: 300ms;

  &:hover {
    cursor: pointer;
    background-color: #979797;
  }

  &:focus {
    outline: none;
  }
`;

const FieldsetBody = styled.div`
  padding: 0.5em;
  font-family: Desc;
`;

const Footer = styled.div`
  margin-top: 0.5em;
  padding-top: 0.5em;
  font-size: 15pt;
  border-top: 2px dotted black;
`;
