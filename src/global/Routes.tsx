import { Route, Routes } from "react-router-dom";
import Main from "@pages/Main";
import Projects from "@pages/Projects";
import HttpStatusPage from "@components/HttpStatusPage";

export default function PageRoutes(): JSX.Element {
  return <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/projects/:name" element={<Projects />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="*" element={<HttpStatusPage statusCode="404" needToReturn={true} />} />
  </Routes>
}
