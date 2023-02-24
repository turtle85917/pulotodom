import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@components/Card";
import HttpStatusPage from "@components/HttpStatusPage";
import Request from "@global/Request";
import L from "@languages";

export default function Status(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [allTimeSinceToday, setAllTimeSinceToday] = useState<WakatimeAllTimeSinceToday>();
  const [commits, setCommits] = useState<WakatimeCommits>();

  useEffect(() => {
    const R = new Request("https://wakatime.com/api/v1", [["api_key", import.meta.env.VITE_WAKATIME_API_KEY]]);
    R.get<WakatimeAllTimeSinceToday>("/users/current/all_time_since_today", (result) => setAllTimeSinceToday(result));
    R.get<WakatimeCommits>("/users/current/projects", (result) => {
      setCommits(result);
      setLoading(false);
    });
  }, []);

  if (process.env.NODE_ENV === "production") return <HttpStatusPage statusCode="501" />;
  if (loading) return <div className="desc loading">{L.render("loading")}</div>;

  return <Container>
    <Card
      title={L.render("status-env")}
      description={<>
        <span>{L.get("status-env-total-time")}</span>
        <div className="desc">{allTimeSinceToday?.data.text}</div>
        <span>{L.get("status-env-projects")}</span>
        <div className="desc">{L.get("piece", commits?.total??0)}</div>
      </>}
      footer={L.get("status-env-f")}
      />
    <Card
      title={L.render("status-skills")}
      description={<>
        <div className="desc">{L.render("loading")}</div>
      </>}
      />
  </Container>;
}

const Container = styled.article`
  display: flex;
  position: absolute;
  width: 100%;
  gap: 5em;
  height: var(--absoulte-header);
  top: var(--header-height);
  left: 0;
  padding-top: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
