
// elements
import FormProject from "./elements/FormProject";
import Projects from "./elements/Projects";

const SidebarLeft = () => {
  return (
    <aside className="project__sidebar--left">
      <FormProject />

      <Projects />
    </aside>
  );
};

export default SidebarLeft;
