// redux
import { useSelector } from "react-redux";
// elements
import Project from "./Project";

const Projects = () => {
  // redux
  const { projects } = useSelector(state => state.projects);
  //console.log(projects);
  // si no hay proyectos que mostrar
  if (projects.length === 0)
    return <h2>Por el momento no hay proyectos, empieza creando uno</h2>;

  return (
    <>
      <div className="notes"> 
        <p>** Para crear un nuevo proyecto pulsa el botón "+" de la barra superior</p>
        <p>** Para selecionar un proyecto pulsa sobre el proyecto correspondiente</p>
      </div>
      <div className="projects">
        {projects.map(project => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </>
  );
};

export default Projects;
