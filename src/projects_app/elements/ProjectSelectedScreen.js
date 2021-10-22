// redux
import { useSelector } from "react-redux";

// elements
import { ModalToggle } from "../ModalToggle";
import { FormAddTask } from "./tasks/FormAddTask";
import Tasks from "./tasks/Tasks";
import { FormEditTask } from "./tasks/FormEditTask";

export const ProjectSelectedScreen = () => {
  // redux - desestructuramos el active del state projects
  // para mostrar cambios tanto al añadir un nuevo proyecto como al editar los datos del proyecto
  const { active: project } = useSelector(state => state.projects);
  //console.log(project);
  // para edición de datos del proyecto
  const { activeTask: task } = useSelector(state => state.tasks);

  return (
    <>
      <ModalToggle />
      <div className="project__header">
        <h1 className="project__title__screen">{project.title}</h1>
        <p className="project__description__screen">{project.description}</p>
      </div>
      {/* Si la tarea esta activa - se activa desde el boton de editar - se muestra el formulario de edición sino se muestra el formulario de añadir tareas */}
      { task ? <FormEditTask/> : <FormAddTask /> }
      {/* Lista de Tareas */}
      <Tasks />
    </>
  );
};
