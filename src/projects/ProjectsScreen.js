import { Bar } from "./Bar";
// component
import SidebarLeft from "./SidebarLeft";
import NothingSelected from "./elements/NothingSelected";
// element

// COMPONENT
export const ProjectsScreen = () => {
  return (
    <>
      <Bar />

      <div className="main__content__app">
        <SidebarLeft />
        <NothingSelected />
      </div>
    </>
  );
};
