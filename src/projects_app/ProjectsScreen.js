// redux
import { useSelector } from "react-redux";
// component
import { Bar } from "./Bar";
import SidebarLeft from "./SidebarLeft";
// element
import NothingSelected from "./elements/NothingSelected";
import { ProjectSelectedScreen } from "./elements/ProjectSelectedScreen";
import { ProjectBar } from "./elements/projects/ProjectBar";
// helper
import toggle from "../helpers/toggle";

// COMPONENT
export const ProjectsScreen = () => {
  // redux
  const { active } = useSelector(state => state.projects);

  return (
    <>
      <Bar />

      <div className="main__content__app">
        <SidebarLeft />
        <div className="project__selected">
          <ProjectBar toggle={toggle}/>
          {active ? <ProjectSelectedScreen toggle={toggle} /> : <NothingSelected />}
        </div>
      </div>
    </>
  );
};
