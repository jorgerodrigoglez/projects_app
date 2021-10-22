import React, { useEffect, useRef } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// hook useForm
import { useForm } from "../../../hooks/useForm";
// actions tasks
import {
  startSaveTask,
  activeTask,
  startLoadingTasksProject
} from "../../../actions/tasks";

export const FormEditTask = () => {
  // react-redux
  const dispatch = useDispatch();

  // para edición de datos del proyecto
  const { activeTask: task } = useSelector(state => state.tasks);
  //console.log(task);
  // hook para editar datos del proyecto activo
  const [formValues, handleInputChange, reset] = useForm(task);
  // desestructuramos el objeto que retorna el hook
  const { text, idProject } = formValues;
  //console.log(text);

  // hay que cambiar el estado cuando cambia la tarea activa, ya que ésta no cambia por si sola
  // se guarda la referencia del proyecto activeTask.id actual
  const activeIdTask = useRef(task.id);
  // si cambia el id del proyecto activo, entonces lo cambiamos
  useEffect(() => {
    if (task.id !== activeIdTask.current) {
      reset(task);
      // establecemos la nueva tarea activa
      activeIdTask.current = task.id;
    }
  }, [task, reset]);
  // actualiza los datos del proyecto activo
  useEffect(() => {
    // activeTask, esta en el action de tasks
    // Aunque el id este repetido se sobrescribe al enviar el objeto completo
    dispatch(activeTask(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  // funcion de edición de la tarea
  const handleEditTask = e => {
    e.preventDefault();
    //console.log(task);
    // edita la tarea en la bbdd de firebase
    dispatch(startSaveTask(task));
    // llama a las tareas de un proyecto
    dispatch(startLoadingTasksProject(idProject));
    //limpia datos del formulario
    reset();
  };

  return (
    <div>
      <form className="form__task" onSubmit={handleEditTask}>
        <input
          type="text"
          placeholder="Tarea"
          className="form__task--input"
          name="text"
          value={text}
          onChange={handleInputChange}
        />

        <div className="form__task--btn">
          <button>Editar...</button>
        </div>
      </form>
    </div>
  );
};
