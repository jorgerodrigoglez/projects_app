import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
// elements
import { ModalToggle } from "../ModalToggle";
import { FormAddTask } from "./tasks/FormAddTask";
import Tasks from "./tasks/Tasks";
import { FormEditTask } from "./tasks/FormEditTask";
import OptionsTasks from "./tasks/options/OptionsTasks";

export const ProjectSelectedScreen = () => {
  // redux - desestructuramos el active del state projects
  // para mostrar cambios tanto al añadir un nuevo proyecto como al editar los datos del proyecto
  const { active: project } = useSelector(state => state.projects);
  //console.log(project);
  // para edición de datos del proyecto
  const { activeTask: task, tasks } = useSelector(state => state.tasks);
  // para mostrar u ocultar tareas completadas
  const [showTasks, setShowTasks] = useState(true);
  // para mostrar el formulario para añadir una tarea o editar tareas
  const [showForm, setShowForm] = useState(true);

  // muestra u oculta texto del boton de tareas completadas o no completadas
  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };
  // cambia el texto del boton toggle
  const handleText = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <ModalToggle />
      <div className="project__header">
        <p className="project__header__note">** Para añadir y editar tareas el formulario debe estar abierto</p>
        <h1 className="project__title__screen">
          {project.title}
          <div
            className="project__title__screen--btn-form"
            onClick={handleText}
          >
            {showForm ? "Mostrar formulario..." : "Ocultar formulario..."}
          </div>
        </h1>
        <p className="project__description__screen">{project.description}</p>
      </div>
      {/* Si la tarea esta activa - se activa desde el boton de editar - se muestra el formulario de edición sino se muestra el formulario de añadir tareas */}
      {!showForm && (task ? <FormEditTask /> : <FormAddTask />)}
      {/* Menu opciones */}
      {tasks.length !== 0 ? (
        <OptionsTasks showTasks={showTasks} toggleTasks={toggleTasks} />
      ) : null}
      {/* Lista de Tareas */}
      <Tasks showTasks={showTasks} />
    </>
  );
};
