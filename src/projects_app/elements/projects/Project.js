// momment - npm install momment --save
import moment from "moment";
// redux
import { useDispatch } from "react-redux";
// action projects
import { activeProject } from "../../../actions/projects";

const ProjectEntry = ({ id, title, description, date }) => {
  //console.log( id, date, title, description );
  // moment
  const projectDate = moment(date);
  //console.log(projectDate);
  // redux
  const dispatch = useDispatch();

  // funcion para activar el proyecto
  const handleActiveProject = () => {
    // para activar el proyecto hay que enviar el id y el proyecto como objeto
    dispatch(
      activeProject(id, {
        title,
        description,
        date
      })
    );
  };


  return (
    <div className="project" onClick={handleActiveProject}>
      <div className="project__dates">
        <p className="project__title">{title}</p>
        <p className="project__text">{description}</p>
      </div>

      <div className="project__date-box">
        {/* moment */}
        <h4>{projectDate.format("LT")}</h4>
        <span>{projectDate.format("LL")}</span>
      </div>

    </div>
  );
};

export default ProjectEntry;
