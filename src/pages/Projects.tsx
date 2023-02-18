import HttpStatusPage from "@global/HttpStatusPage";
import L from "@languages";

export default function Projects(): JSX.Element {
  if (process.env.NODE_ENV === "production") {
    return <HttpStatusPage statusCode="501" />
  }
  return <article>
    <h1>Hello, World!</h1>
  </article>;
}
