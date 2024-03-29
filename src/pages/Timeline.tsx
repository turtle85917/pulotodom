import React from "react";
import styled from "styled-components";
import { MDXProvider } from "@mdx-js/react";
import L from "@languages";
import GithubRepo from "@components/GithubRepo";

type TimelineData = [string, typeof import("*.mdx")["default"]|undefined];
type Direction = "up" | "down";

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
    let scroll = { play: false, y: 0 };
    const children = Array.from(document.querySelectorAll<HTMLDivElement>("div.active"));
    const handleScrollTo = (direction: Direction) => {
      if (scroll.play) return;
      const nearest = children.findIndex(child => child.offsetTop - MARGIN === window.scrollY) + (direction === "up" ? -1 : 1);
      scroll.play = nearest >= -1 && children.length > nearest;
      if (nearest < -1) return;
      if (nearest === -1) {
        scroll.y = 0;
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        if (children.length <= nearest) return;
        const offset = children[nearest].offsetTop - MARGIN;
        scroll.y = offset;
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
      if (exec || /[ws]/.test(event.key)) {
        event.preventDefault();
        handleScrollTo(
          event.key === 'w'
          ? "up"
          : (exec?.[1].toLowerCase() as Direction ?? "down")
        );
      }
    }

    const onScroll = (event: Event) => {
      if (scroll.play) {
        scroll.play = window.scrollY !== scroll.y;
        return;
      }
      event.preventDefault();
    }

    // BUG 모바일 UX 버그
    const onTouchStart = (event: TouchEvent) => {
      const positions: [number, number][] = [];
      event.preventDefault();
      const onTouchMove = (event: TouchEvent) => {
        if (event.cancelable) event.preventDefault();
        positions.push([event.touches[0].screenX, event.touches[0].screenY]);
      }

      const onTouchEnd = (_event: TouchEvent) => {
        if (positions.length === 0) return;
        const start = positions[0];
        const end = positions[positions.length-1];
        const distance = [start[0]-end[0], start[1]-end[1]];
        if (positions.length > 10) handleScrollTo(distance[1] >= 0 ? "down" : "up");
      }

      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
    }

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: false });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
  }, [timelineDatas]);

  if (loading) return <div className="desc loading">{L.render("loading")}</div>

  return <Container>
    <Header>{L.render("timeline-d")}</Header>
    <TimelineItems>
      <MDXProvider
        components={{
          p: (props) => <p {...props} style={{ fontFamily: "Desc" }} />,
          hr: (props: any) => <MDXHr {...props} />,
          L: (props) => <div className="desc">{L.render(props.k)}</div>,
          Repository: (props) => <GithubRepo {...props} />
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
