import React, { useState } from "react";
//FONT AWESOME
//yarn add @fortawesome/fontawesome-svg-core
//yarn add @fortawesome/free-solid-svg-icons
//yarn add @fortawesome/react-fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faTimes,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
// momment - npm install momment --save
import moment from "moment";
// redux
import { useDispatch } from "react-redux";
// action tasks
import {
  setTaskCheckChange,
  setActiveTask,
  startTaskDelete
} from "../../../actions/tasks";
// hook
import { useForm } from "../../../hooks/useForm";
// select de prioridades
import SelectPriorities from "./options/Priorities";

const Task = ({ task }) => {
  const { id, text, idProject, complete, date, priority, budget } = task;
  // desestructuracion de la tarea
  //console.log(id,task,date,complete,priority,budget);
  // moment
  const taskDate = moment(date);
  // redux
  const dispatch = useDispatch();
  // select priorities
  const [selectPriorities, setSelectPriorities] = useState(priority);
  // hook - para los datos de ingresos
  const [formValues, handleInputChange] = useForm({
    budgetInput: Number(budget)
  });
  //console.log(formValues);
  const { budgetInput } = formValues;
  //console.log(budgetInput);

  // activa y desastiva el check en la bbdd
  const toggleComplete = (id, task, e) => {
    e.preventDefault();
    // crea el objeto y cambia su valor
    const newComplete = {
      ...task,
      complete: !task.complete
    };
    //console.log(newComplete);
    // accion de cambio de check
    dispatch(setTaskCheckChange(id, task, newComplete));
  };

  // funcion para activar la tarea
  const handleActiveTask = () => {
    // para activar la tarea hay que enviar el id y la tarea como objeto
    dispatch(
      setActiveTask(id, {
        text,
        idProject,
        complete,
        date,
        priority,
        budget
      })
    );
  };

  // funcion para enviar el presupuesto de la tarea a la BBDD
  const handleNewBudget = e => {
    e.preventDefault();
    // envio de datos a bbdd
    // crea el objeto y cambia su valor

    const newBudget = {
      ...task,
      budget: budgetInput
    };
    //console.log(newBudget);
    // accion de actualizacion de input number
    dispatch(setTaskCheckChange(id, task, newBudget));
  };

  // cambia el select de prioridades
  const handlePriority = e => {
    //console.log(e.currentTarget.dataset.value);
    setSelectPriorities(e.currentTarget.dataset.value);
  };

  // funcion para enviar el presupuesto de la tarea a la BBDD
  const handleNewPriority = e => {
    e.preventDefault();
    // envio de datos a bbdd
    // crea el objeto y cambia su valor
    const newPriority = {
      ...task,
      priority: selectPriorities
    };
    //console.log(newBudget);
    // accion de actualizacion de input number
    dispatch(setTaskCheckChange(id, task, newPriority));
  };

  // fucion para eliminar tarea
  const handleDeleteTask = () => {
    // activar la tarea
    dispatch(setActiveTask(id, task));
    // ejecuta eliminacion
    dispatch(startTaskDelete(id));
  };

  return (
    <div className="tasks">
      <div className="task">
        <div className="task__icon">
          <FontAwesomeIcon
            icon={complete ? faCheck : faCircle}
            className="task__icon--check"
            onClick={e => toggleComplete(id, task, e)}
          />
        </div>

        <div className="task__dates">
          <p className="task__dates--date">{taskDate.format("LLLL")}</p>
          {priority && (
            <div className="task__dates--priority">
              <SelectPriorities
                className="task__dates--priority--input"
                selectPriorities={selectPriorities}
                handlePriority={handlePriority}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className="task__dates--priority--btn"
                onClick={handleNewPriority}
              />
            </div>
          )}
          <p className="task__dates--name">{text}</p>
          <div className="task__dates--expense">
            <div className="task__dates--expense--group">
              <p className="task__dates--expense--group--title">
                Presupuesto -{" "}
              </p>
              <input
                type="number"
                placeholder="0.00 €"
                className="task__dates--expense--group--text"
                name="budgetInput"
                value={budgetInput}
                onChange={handleInputChange}
              ></input>
              <button
                className="task__dates--expense--group--btn"
                onClick={handleNewBudget}
              >
                Save...
              </button>
            </div>
          </div>
        </div>
        {/* link para pagina de editar */}
        <div className="task__dates__btns">
          <FontAwesomeIcon
            icon={faEdit}
            className="task__dates__btns__icon--edit"
            onClick={handleActiveTask}
          />

          <FontAwesomeIcon
            icon={faTimes}
            className="task__dates__btns__icon--delete"
            onClick={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
