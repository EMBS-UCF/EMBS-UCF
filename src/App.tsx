import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Events from "@/pages/Events";
import Officers from "@/pages/Officers";
import Resources from "@/pages/Resources";
import Join from "@/pages/Join";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

/**
 * Pages are imported eagerly rather than lazily. The whole site is a few
 * dozen kilobytes of components, so splitting it would add a request
 * waterfall on navigation without meaningfully improving first load.
 */
export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="events" element={<Events />} />
        <Route path="officers" element={<Officers />} />
        <Route path="resources" element={<Resources />} />
        <Route path="join" element={<Join />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
