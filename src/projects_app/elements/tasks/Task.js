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
  setTaskCheck,
  setActiveTask,
  startTaskDelete
} from "../../../actions/tasks";

const Task = ({ task }) => {
  const { id, text, idProject, complete, date } = task;
  //console.log(id,task,date,complete);
  // desestructuracion del is de la tarea
  // moment
  const taskDate = moment(date);
  // redux
  const dispatch = useDispatch();

  // activa y desastiva el check en la bbdd
  const toggleComplete = (id, task) => {
    // crea el objeto y cambia su valor
    const newComplete = {
      ...task,
      complete: !task.complete
    };
    //console.log(newComplete);
    // accion de cambio de check
    dispatch(setTaskCheck(id,task,newComplete));
  };
  // funcion para activar la tarea
  const handleActiveTask = () => {
    // para activar la tarea hay que enviar el id y la tarea como objeto
    dispatch(
      setActiveTask(id, {
        text,
        idProject,
        complete,
        date
      })
    );
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
            onClick={() => toggleComplete(id, task)}
          />
        </div>

        <div className="task__dates">
          <p className="task__dates--date">{taskDate.format("LLLL")}</p>
          <p className="task__dates--name">{text}</p>
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
