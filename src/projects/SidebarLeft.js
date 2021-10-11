// redux
import { useDispatch } from "react-redux";
// elements
import FormProject from "./elements/FormProject";
import Projects from "./elements/Projects";

const SidebarLeft = () => {
  // react-redux
  const dispatch = useDispatch();

  return (
    <aside className="project__sidebar--left">
      <div className="project__new">
        <div className="add__project">
          <i className="fas fa-plus-circle fa-5x"></i>
          Nuevo proyecto
        </div>
      </div>

      <FormProject />
      <Projects />
    </aside>
  );
};

export default SidebarLeft;
