import React from "react";
import styled from "styled-components";
import { MDXProvider } from "@mdx-js/react";
import L from "@languages";
import HttpStatusPage from "@components/HttpStatusPage";

type TimelineData = [string, typeof import("*.mdx")["default"]|undefined];

const REGEX_DATE = /(\d{4})(\d{2})(\d{2})/;
const REGEX_CONTROL_KEY = /(?:Page|Arrow)(Up|Down)/;
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
      // NOTE 스크롤바 숨기기
      document.body.style.setProperty("overflow-y", "hidden");

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
    const children = Array.from(document.querySelectorAll<HTMLDivElement>("div.active"));
    const handleScrollTo = (direction: "up" | "down") => {
      const nearest = children.findIndex(child => child.offsetTop - MARGIN === window.scrollY) + (direction === "up" ? -1 : 1);
      if (nearest < -1) return;
      if (nearest === -1) window.scrollTo({ top: 0, behavior: "smooth" });
      else {
        if (children.length <= nearest) return;
        const offset = children[nearest].offsetTop - MARGIN;
        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      handleScrollTo(event.deltaY >= 0 ? "down" : "up");
    }

    const onMouseDown = (event: MouseEvent) => {
      // NOTE 휠 클릭 막기
      if (event.button === 1) event.preventDefault();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const exec = REGEX_CONTROL_KEY.exec(event.key);
      if (exec) handleScrollTo(exec[1].toLowerCase() as "up" | "down");
    }

    const onTouchStart = (event: TouchEvent) => {
      const positions: [number, number][] = [];
      if (event.cancelable) event.preventDefault();

      const onTouchMove = (event: TouchEvent) => {
        if (event.cancelable) event.preventDefault();
        positions.push([event.touches[0].screenX, event.touches[0].screenY]);
      }

      const onTouchEnd = (_event: TouchEvent) => {
        if (positions.length === 0) return;
        const position = positions
          .reduce((pv, v) => [pv[0] - Math.round(v[0] / positions.length), pv[1] - Math.round(v[1] / positions.length)]);
        handleScrollTo(position[1] >= 0 ? "down" : "up");
      }

      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
    }

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });

    return (() => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
    });
  }, [timelineDatas]);

  if (process.env.NODE_ENV === "production") return <HttpStatusPage statusCode="501" />;
  if (loading) return <div className="desc loading">{L.render("loading")}</div>

  return <Container>
    <Header>{L.render("timeline-d")}</Header>
    <TimelineItems>
      <MDXProvider
        components={{
          p: (props) => <p {...props} style={{ fontFamily: "Desc" }} />,
          hr: (props: any) => <MDXHr {...props} />
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

const Header = styled.h4`
  margin: 1em;
  color: var(--grey-600);
  line-height: 2em;
  font-family: Desc;
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

const MDXHr = styled.hr`
  width: calc(140px + 20vw);
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;
