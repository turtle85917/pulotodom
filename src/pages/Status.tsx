import React from "react";
import styled from "styled-components";
import { checkColorBright } from "@global/Utility";
import Card from "@components/Card";
import L from "@languages";
import Aside from "@components/Aside";

const SKILL_CATEGORIES = ["frontend", "backend", "framework", "database", "engine"];

export default function Status(): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [skills, setSkills] = React.useState<Skills|null>(null);

  React.useEffect(() => {
    import("@data/skills.json").then(data => {
      setSkills(data.default as Skills);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="desc loading">{L.render("loading")}</div>;

  return <Container>
    <Card
      title={L.render("status-skills")}
      footer={<More
        className="desc"
        onClick={() => Aside.openModal(SKILL_CATEGORIES.map(item => <fieldset key={item}>
          <FieldsetHead>{L.render(`skill-tag-${item}`)}</FieldsetHead>
          <div className="children">
            {skills?.filter(skill => skill.tags.includes(item)).map(skill => <div className="desc" style={{ background: skill.gradient, backgroundColor: skill.color, color: checkColorBright(skill.color) ? "var(--grey-100)" : "var(--black)", padding: "0.2em", borderRadius: "2px" }} key={skill.name}>{skill.name}</div>)}
          </div>
        </fieldset>), L.render("status-skills"))}
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
