import React from "react";
import styled from "styled-components";
import { MDXProvider } from "@mdx-js/react";
import L from "@languages";
import HttpStatusPage from "@components/HttpStatusPage";

type TimelineData = [string, typeof import("*.mdx")["default"]|undefined];

const REGEX_DATE = /(\d{4})(\d{2})(\d{2})/;
const YEARS = [2020, 2021, 2022, 2023];
// NOTE 월 12개 / 일 최대 31개 / 최근 일자까지만 표기
const dates = Array.from(YEARS, (v) =>
  Array.from({ length: 12 }, (_, mk) =>
    Array.from({ length: 32 }, (_, dk) =>
      `${v}${(mk+1).toString().padStart(2, '0')}${(dk+1).toString().padStart(2, '0')}`
    )
    .filter(item =>
      new Date(item.replace(REGEX_DATE, "$1.$2.$3")).getMonth() === mk &&
      Math.round(Date.now()/100000) >= new Date(item.replace(REGEX_DATE, "$1.$2.$3")).getTime()/100000
    )
  )
)
.flat(2);

export default function Timeline(): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [timelineDatas, setTimelineDatas] = React.useState<TimelineData[]>([]);

  React.useEffect(() => {
    Promise.all(
      dates.map(item =>
        import(`../data/timeline/${item}.mdx`)
          .then<TimelineData>(res => [item, res.default])
          .catch<TimelineData>(() => [item, undefined])
      )
    ).then(datas => {
      // NOTE 값이 존재하는 위치로 이동
      let sliceIndex = datas.findIndex(item => item[1] !== undefined);
      if (sliceIndex === -1) sliceIndex = 0;

      setTimelineDatas(datas.slice(sliceIndex));
      setLoading(false);
    });
  }, []);

  if (process.env.NODE_ENV === "production") return <HttpStatusPage statusCode="501" />
  if (loading) return <div className="desc loading">{L.render("loading")}</div>

  return <Container>
    <Header>
      <label className="desc">{L.render("timeline-d")}</label>
    </Header>
    <TimelineItems>
      <MDXProvider
        components={{
          p: (props) => <p {...props} style={{ fontFamily: "Desc" }} />
        }}
      >
        {timelineDatas.map(([date, TItem]) => <TimelineItem key={date}>
          <TimelineItemLabel className={TItem && "active"}>{date.replace(REGEX_DATE, "$1.$2.$3")}</TimelineItemLabel>
          {TItem && <div className="content">
            <TItem />
          </div>}
        </TimelineItem>)}
      </MDXProvider>
    </TimelineItems>
  </Container>;
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: var(--absolute-header);
  top: var(--header-height);
  left: 0;
`;

const Header = styled.div`
  margin: 0.5em 1em;
`;

const TimelineItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const TimelineItem = styled.div`
  padding: 0.5em;
  border-left: 2px dotted var(--alpha-black-100);

  div.content {
    margin: 0.65em;
  }
`;

const TimelineItemLabel = styled.span`
  font-family: monospace;

  &.active {
    font-size: 14pt;
    font-family: Desc;
  }
`;
