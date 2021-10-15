// momment
import moment from "moment";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions project
import { newProject, startDeleting } from "../../../actions/projects";
// actions ui
import { uiOpenModal } from "../../../actions/ui";

export const ProjectBar = () => {
  // moment
  const date = moment();
  // react-redux
  const dispatch = useDispatch();
  // para edición de datos del proyecto
  const { active } = useSelector(state => state.projects);

  // guardar el proyecto
  const handleNewProject = e => {
    e.preventDefault();
    dispatch(newProject());
  };

  // elimina el projecto
  // por el momento el titulo y la descripcion
  // manejador de borrar nota
  const handleDelete = () => {
    //console.log(id);
    dispatch(startDeleting(active.id));
  };

  // abre el modal
  const openModal = () => {
    dispatch(uiOpenModal());
  };

  return (
    <div className="bar__project">
      <span className="bar__project--date">{date.format("LLLL")}</span>

      <div className="bar__project__box">
        {active && (
          <div className="bar__project__btn">
            <button className="bar__project__btn--edit" onClick={openModal}>
              Editar
            </button>
            <button
              className="bar__project__btn--delete"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        )}
        <div className="project__new" onClick={openModal}>
          <div className="add__project" onClick={handleNewProject} >
            <i className="fas fa-plus-circle fa-5x"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
