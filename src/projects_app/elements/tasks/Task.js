
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
// redux
import { useDispatch } from "react-redux";
// action tasks
import { setTaskCheck } from "../../../actions/tasks";

const Task = ({ task }) => {
  const { id, text, complete, date} = task;
  //console.log(id,task,date,complete);
  // desestructuracion del is de la tarea
  // moment
  const taskDate = moment(date);
  // redux
  const dispatch = useDispatch();
  // desestructuramos active del state de projects

  // activa y desastiva el check en la bbdd
  const toggleComplete = (id, task) => {
    // crea el objeto y cambia su valor
    const newComplete = {
      ...task,
      complete: !task.complete
    };
    //console.log(newComplete);
    // accion de cambio de check
    dispatch(setTaskCheck(id, task, newComplete));
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
          />

          <FontAwesomeIcon
            icon={faTimes}
            className="task__dates__btns__icon--delete"
            //onClick={() => deleteTask(id, uidUser)}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
