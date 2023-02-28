import styled from "styled-components";
import HttpStatusPage from "@components/HttpStatusPage";
import { MDXProvider } from "@mdx-js/react";
import TestItem from "@data/timeline/20200219.mdx";

export default function Timeline(): JSX.Element {
  if (process.env.NODE_ENV === "production") return <HttpStatusPage statusCode="501" />

  return <Container>
    <MDXProvider
      components={{
        h1: MdxContentHeader
      }}
    >
      <TestItem />
    </MDXProvider>
  </Container>;
}

const Container = styled.article`
  margin-top: calc(var(--header-height) + 5px);
`;

const MdxContentHeader: React.FC = (props) => <StyledMdxContentHeader {...props} />
const StyledMdxContentHeader = styled.h1`
  font-size: 15pt;
  font-family: Desc;
`;
