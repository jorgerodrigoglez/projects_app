// redux
import { useSelector } from "react-redux";

// elements
import { ModalToggle } from "../ModalToggle";
import { FormTask } from "./tasks/FormTask";
import Tasks from "./tasks/Tasks";

export const ProjectSelectedScreen = () => {
  // redux - desestructuramos el active del state projects
  // para edición de datos del proyecto
  const { active: project } = useSelector(state => state.projects);
  //console.log(project);

  return (
    <>
      <ModalToggle />
      <div className="project__header">
        <h1 className="project__title__screen">{project.title}</h1>
        <p className="project__description__screen">{project.description}</p>
      </div>
      {/* Formulario de tareas */}
      <FormTask />
      {/* Lista de Tareas */}
      <Tasks/>
    </>
  );
};
