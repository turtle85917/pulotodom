import styled from "styled-components";
import HttpStatusPage from "@components/HttpStatusPage";
import Card from "@components/Card";

export default function Status(): JSX.Element {
  if (process.env.NODE_ENV === "production") return <HttpStatusPage statusCode="501" />;

  return <Container>
    <Card title="hi" description="hi" />
  </Container>;
}

const Container = styled.article`

`;
