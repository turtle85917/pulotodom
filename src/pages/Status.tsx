import React from "react";
import styled from "styled-components";
import Request from "@global/Request";
import { checkColorBright, openAsideComponent } from "@global/Utility";
import Card from "@components/Card";
import HttpStatusPage from "@components/HttpStatusPage";
import L from "@languages";

const SKILL_CATEGORIES = ["frontend", "backend", "framework", "database", "engine"];

export default function Status(): JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [skills, setSkills] = React.useState<Skills|null>(null);
  const [allTimeSinceToday, setAllTimeSinceToday] = React.useState<WakatimeAllTimeSinceToday|null>(null);
  const [commits, setCommits] = React.useState<WakatimeCommits|null>(null);

  React.useEffect(() => {
    const R = new Request("https://wakatime.com/api/v1", [["api_key", import.meta.env.VITE_WAKATIME_API_KEY]]);
    R.get<WakatimeAllTimeSinceToday>("/users/current/all_time_since_today", (result) => setAllTimeSinceToday(result));
    R.get<WakatimeCommits>("/users/current/projects", (result) => setCommits(result));

    import("@data/skills.json").then(data => {
      setSkills(data.default as Skills);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="desc loading">{L.render("loading")}</div>;

  return <Container>
    <Card
      title={L.render("status-env")}
      footer={L.render("status-env-f")}
      >
      <span>{L.get("status-env-total-time")}</span>
      <div className="desc">{allTimeSinceToday?.data.text}</div>
      <span>{L.get("status-env-projects")}</span>
      <div className="desc">{L.get("piece", commits?.total??0)}</div>
    </Card>
    <Card
      title={L.render("status-skills")}
      footer={<More
        className="desc"
        onClick={() => openAsideComponent("Alert", L.render("status-skills"), SKILL_CATEGORIES.map(item => <fieldset key={item}>
          <FieldsetHead>{L.render(`skill-tag-${item}`)}</FieldsetHead>
          <div className="children">
            {skills?.filter(skill => skill.tags.includes(item)).map(skill => <div className="desc" style={{ background: skill.gradient, backgroundColor: skill.color, color: checkColorBright(skill.color) ? "var(--grey-100)" : "var(--black)", padding: "0.2em", borderRadius: "2px" }} key={skill.name}>{skill.name}</div>)}
          </div>
        </fieldset>))}
        >
          {L.render("more")}
        </More>
      }
      >
      {L.get("status-skills-d")}
    </Card>
  </Container>;
}

const Container = styled.article`
  display: flex;
  position: absolute;
  gap: 2.5rem;
  width: 100%;
  top: var(--header-height);
  left: 0;
  padding-top: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const More = styled.a`
  transition: 300ms;
  &:hover {
    color: var(--blue-100);
  }
`;

const FieldsetHead = styled.legend`
  margin: 0 0.3em;
  padding: 0.35em;
  font-size: 12pt;
  color: var(--grey-600);
  font-family: Desc;
  border-radius: 0.5em;

  &+div.children {
    display: flex;
    gap: 4px;
    flex-flow: row wrap;
    padding: 0.5em;
  }

  &:focus {
    outline: none;
  }
`;
