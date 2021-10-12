// redux
import { useSelector } from "react-redux";
// component
import { Bar } from "./Bar";
import SidebarLeft from "./SidebarLeft";
// element
import NothingSelected from "./elements/NothingSelected";
import { ProjectSelectedScreen } from "./elements/ProjectSelectedScreen";

// COMPONENT
export const ProjectsScreen = () => {
  // redux
  const { active } = useSelector(state => state.projects);

  return (
    <>
      <Bar />

      <div className="main__content__app">
        <SidebarLeft />
        {active ? <ProjectSelectedScreen /> : <NothingSelected />}
      </div>
    </>
  );
};
