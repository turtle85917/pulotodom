import styled from "styled-components";
import L from "@languages";

export default function NotFound(): JSX.Element {
  return <Container>
    <HttpStatusHead>
      <HttpStatusLabel>404 </HttpStatusLabel>
      {L.get("error-404")}
    </HttpStatusHead>
    <HttpStatusDescription>{L.render()("error-404-d")}</HttpStatusDescription>
    <ReturnHome className="button mobile" href="/" data-for="tooltip" data-tip="return-t">{L.render()("return")}</ReturnHome>
  </Container>;
}

const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const HttpStatusHead = styled.h1`
  font-size: 20pt;
`;

const HttpStatusLabel = styled.label`
  font-size: 10pt;
  font-family: Desc;
`;

const HttpStatusDescription = styled.span`
  text-align: right;
  font-family: Desc;
  margin-top: 15px;
`;

const ReturnHome = styled.a`
  margin-top: 15px;
`;
