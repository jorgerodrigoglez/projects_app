// momment - npm install momment --save
//import moment from "moment";
// redux
import { useDispatch } from "react-redux";

const ProjectEntry = ({ title, description }) => {
  //console.log( id, date, title, description );
  // moment
  //const noteDate = moment(date);
  //console.log(noteDate);
  // redux
  const dispatch = useDispatch();
  // funcion para activar la nota

  return (
    <div className="project">
      <div className="project__body">
        <p className="project__title">{title}</p>
        <p className="project__text">{description}</p>
      </div>

      <div className="project__date-box">
        {/* moment */}
        <h4></h4>
        <span></span>
      </div>
    </div>
  );
};

export default ProjectEntry;
