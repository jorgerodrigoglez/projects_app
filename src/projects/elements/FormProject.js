// redux
import { useDispatch, useSelector } from "react-redux";
// hook useForm
import { useForm } from "../../hooks/useForm";
// actions messages
import { setError, removeError } from "../../actions/messages";
// action projects
import { newProject } from "../../actions/projects";

const FormProject = () => {
  // react-redux
  const dispatch = useDispatch();
  // redux - desestructuramos msgError del state messages
  const { msgError } = useSelector(state => state.messages);
  // hook
  const [formValues, setValues, handleInputChange] = useForm({
    title: "",
    description: ""
  });
  // desestructuramos el objeto que retorna el hook
  const { title, description } = formValues;
  //console.log(title, description);

  // funcion para añadir un nuevo projecto
  const handleAddProject = e => {
    e.preventDefault();
    //console.log(title,description);
    if (isFormProjectValid()) {
      dispatch(newProject(title, description));
    }
    // limpia los campos del formulario
    setValues({
      title: "",
      description: ""
    });
  };

  // funcion para validar los campos del formulario
  // solo es obligatorio poner el titulo del proyecto
  const isFormProjectValid = () => {
    if (title === "") {
      dispatch(setError("El título es obligatorio"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <div className="project__form">
      <p className="project__section__title">Sección proyectos</p>
      <div className="project__form__content">
        <input
          type="text"
          placeholder="Título"
          className="project__title--input"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          cols="40"
          rows="2"
          placeholder="Descripción"
          className="project__description"
          name="description"
          value={description}
          onChange={handleInputChange}
        ></textarea>

        <div className="project__new" onClick={handleAddProject}>
          <div className="add__project">
            <i className="fas fa-plus-circle fa-5x"></i>
            añadir proyecto
          </div>
        </div>
      </div>
      {/* Mensaje de error */}
      {msgError && <div className="auth__alert--error">{msgError}</div>}
    </div>
  );
};

export default FormProject;
