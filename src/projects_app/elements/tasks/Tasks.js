// redux
import { useSelector } from "react-redux";
// elements
import Task from "./Task";

const Tasks = () => {
  // redux
  const { tasks } = useSelector(state => state.tasks);
  //console.log(tasks);

  // si no hay proyectos que mostrar
  if (tasks.length === 0)
    return <h2 className="msg__no__tasks">Por el momento no hay tareas, empieza por crear una...</h2>;

  return (
    <div className="tasks">
      {tasks.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

export default Tasks;
