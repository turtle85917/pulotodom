import L from "@languages";

export default function Main(): JSX.Element {
  return <article>
    {L.render("test", "세상", "나")()}
  </article>
}
