import React, { useState, useEffect, useRef } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// hook useForm
import { useForm } from "../../../hooks/useForm";
// actions tasks
import {
  startEditTask,
  setActiveTask,
  startLoadingTasksProject,
  refreshTaskActive
} from "../../../actions/tasks";
// task - elements- options
import SelectPriorities from "./options/Priorities";

export const FormEditTask = () => {
  // react-redux
  const dispatch = useDispatch();
  // para edición de datos del proyecto
  const { activeTask: task } = useSelector(state => state.tasks);
  //console.log(task);

  // hook para editar datos del proyecto activo
  const [formValues, handleInputChange, reset] = useForm(task);
  // desestructuramos el objeto que retorna el hook
  const { text, idProject, priority } = formValues;
  console.log(text, idProject, priority);

  // select priorities
  const [selectPriorities, setSelectPriorities] = useState(priority);

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
    //console.log(formValues);
    dispatch(setActiveTask(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  // funcion de edición de la tarea
  const handleEditTask = e => {
    e.preventDefault();
    //console.log(selectPriorities);
    // crea el objeto y cambia su valor
    const newPriority = {
      ...task,
      priority: selectPriorities
    };
    //console.log(newPriority);
    // edita la tarea en la bbdd de firebase y la elimina como tarea activa
    dispatch(startEditTask(newPriority));
    // llama a las tareas de un proyecto
    dispatch(startLoadingTasksProject(idProject, task.id));
    //limpia datos del formulario
    reset();
  };

  // cancelar edicion
  const handleCancelEdit = e => {
    e.preventDefault();
    // hay que eliminar la tarea como activa
    dispatch(refreshTaskActive(task, task.id));
    // hay que llamar a las tareas de un proyecto
    dispatch(startLoadingTasksProject(idProject));
  };

  // cambia el select de prioridades
  const handlePriority = e => {
    //console.log(e.currentTarget.dataset.value);
    setSelectPriorities(e.currentTarget.dataset.value);
  };

  return (
    <div>
      <form className="form__task">
        <SelectPriorities
          selectPriorities={selectPriorities}
          handlePriority={handlePriority}
        />
        <input
          type="text"
          placeholder="Tarea"
          className="form__task--input"
          name="text"
          value={text}
          onChange={handleInputChange}
        />

        <div className="form__task__btn">
          <button className="form__task__btn--edit" onClick={handleEditTask}>
            Editar...
          </button>
          <button
            className="form__task__btn--cancel"
            onClick={handleCancelEdit}
          >
            Cancelar...
          </button>
        </div>
      </form>
    </div>
  );
};
