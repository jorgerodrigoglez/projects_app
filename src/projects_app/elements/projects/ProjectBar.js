// momment
import moment from "moment";
// sweetalert2
import Swal from "sweetalert2";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions project
import { newProject, startDeletingProject } from "../../../actions/projects";
// actions ui
import { uiOpenModal } from "../../../actions/ui";
// actions tasks
import { startDeletingTasksProject } from "../../../actions/tasks";

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
  // manejador de borrar un proyecto
  const handleDelete = () => {
    //console.log(active.id);
    // aviso antes de borrado
    Swal.fire({
      title: "¿Seguro que desea eliminar el proyecto y todas sus tareas?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!"
    }).then(result => {
      if (result.value) {
        //borra el nombre y descripcion del proyecto - etiqueta lateral
        dispatch(startDeletingProject(active.id));
        //borra las tareas del proyecto correspondiente
        dispatch(startDeletingTasksProject(active.id));  
      }
    });
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
              Editar proyecto
            </button>
            <button
              className="bar__project__btn--delete"
              onClick={handleDelete}
            >
              Borrar proyecto
            </button>
          </div>
        )}
        <div className="project__new" onClick={openModal}>
          <div className="add__project" onClick={handleNewProject}>
            <i className="fas fa-plus-circle fa-5x"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
