import React from "react";
import styled from "styled-components";
import { MDXProvider } from "@mdx-js/react";
import L from "@languages";
import HttpStatusPage from "@components/HttpStatusPage";

type TimelineData = [string, typeof import("*.mdx")["default"]|undefined];

const REGEX_DATE = /(\d{4})(\d{2})(\d{2})/;
const YEARS = [2020, 2021, 2022, 2023];
const MARGIN = 10;

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

  React.useEffect(() => {
    if (timelineDatas.length === 0) return;
    // NOTE 스크롤 관련 이벤트
    window.addEventListener("wheel", (event) => {
      event.preventDefault();
      const scrollDirection = event.deltaY >= 0 ? "down" : "up";
      const children = Array.from(document.querySelectorAll<HTMLDivElement>(`div.${TimelineItem.styledComponentId}.active`));
      const nearest = children.findIndex(child => child.offsetTop - MARGIN === window.scrollY) + (scrollDirection === "up" ? -1 : 1);
      if (nearest < -1) return;
      if (nearest === -1) window.scrollTo({ top: 0, behavior: "smooth" });
      else {
        if (children.length <= nearest) return;
        window.scrollTo({
          top: children[nearest].offsetTop - MARGIN,
          behavior: "smooth"
        });
      }
    }, { passive: false });
    window.addEventListener("scroll", (event) => {});
  }, [timelineDatas]);

  if (process.env.NODE_ENV === "production") return <HttpStatusPage statusCode="501" />
  if (loading) return <div className="desc loading">{L.render("loading")}</div>

  return <Container>
    <Header className="desc">{L.render("timeline-d")}</Header>
    <TimelineItems>
      <MDXProvider
        components={{
          p: (props) => <p {...props} style={{ fontFamily: "Desc" }} />
        }}
      >
        {timelineDatas.map(([date, TItem]) => <TimelineItem className={TItem && "active"} key={date}>
          <TimelineItemLabel>{date.replace(REGEX_DATE, "$1.$2.$3")}</TimelineItemLabel>
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
  margin: 1em;
  line-height: 2em;
`;

const TimelineItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const TimelineItem = styled.div`
  padding: 0.5em 1em;
  border-left: 2px dotted var(--alpha-black-100);

  &.active {
    border-left: 2px solid var(--alpha-black-100);
  }

  div.content {
    margin: 0.65em;
  }
`;

const TimelineItemLabel = styled.span`
  font-family: monospace;

  div.active & {
    font-size: 14pt;
    font-family: Desc;
  }
`;
