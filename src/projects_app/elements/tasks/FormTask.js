// redux
import { useDispatch, useSelector } from "react-redux";
// hook form
import { useForm } from "../../../hooks/useForm";
// actions messages
import { removeError, setError } from "../../../actions/messages";
// actions tasks
import { newTask } from "../../../actions/tasks";

export const FormTask = () => {
  // react-redux
  const dispatch = useDispatch();
  // redux - desestructuramos msgError del state messages
  const { msgError } = useSelector(state => state.messages);
  // desestructuramos active del state de projects
  const { active:project } = useSelector(state => state.projects);
  // hook para captar valores de la tarea
  const [formValues, handleInputChange, reset] = useForm({
    text: "",
    complete: false,
  });
  // desestructuramos el objeto que retorna el hook
  const { text, complete } = formValues;
  //console.log(task);
  // funcion para validar y enviar la tarea a bbdd
  const handleTask = e => {
    e.preventDefault();
    //console.log(email, password);
    if (isFormTaskValid()) {
      //console.log(task);
      dispatch(newTask(text, project, complete));
      //limpia datos del formulario
      reset();
    }
  };
  // funcion para validar los campos del formulario
  const isFormTaskValid = () => {
    if (text === "") {
      dispatch(setError("La tarea no puede estar vacia"));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <form className="form__task" onSubmit={handleTask}>
      <input
        type="text"
        placeholder="Tarea"
        className="form__task--input"
        name="text"
        value={text}
        onChange={handleInputChange}
      />
      {/* Mensaje de error */}
      {msgError && <div className="auth__alert--error">{msgError}</div>}
      <div className="form__task--btn">
        <button>Añadir...</button>
      </div>
    </form>
  );
};
