// redux
import { useSelector } from "react-redux";
// elements
import Task from "./Task";
// elements - tasks - options
import TotalBudgets from "./options/TotalBudgets";

const Tasks = ({ showTasks }) => {
  //console.log(showTasks);
  // redux
  const { tasks } = useSelector(state => state.tasks);
  //console.log(tasks);

  return (
    <div className="tasks">
      {tasks.length > 0 ? (
        tasks.map(task => {
          // si el valor es true, por defecto es true, muestra todas las tareas
          if (showTasks) {
            //console.log(showTasks);
            return <Task key={task.id} task={task} />;
            // si la tarea no esta completada la mostramos
          } else if (!task.complete) {
            //console.log(task.complete);
            return <Task key={task.id} task={task} />;
          }
          // si ya esta completada la tarea no la mostramos
          return null;
        })
      ) : (
        <h2 className="msg__no__tasks">
          Por el momento no hay tareas, empieza por crear una...
        </h2>
      )}
      {/* Barra de total presupuestado */}
      {tasks.length > 0 && (
        <div className="tasks__total__budget">
          {tasks.map((task, index) => (
            <TotalBudgets key={task.id} tasks={tasks} index={index}/>
          ))}
        </div>
      )}
    </div>
  );
};
export default Tasks;
