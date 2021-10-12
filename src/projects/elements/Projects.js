// redux
import { useSelector } from "react-redux";
// elements
import Project from "./Project";

const Projects = () => {
  /*const projects = [
    { title: "proyecto 1", description: "Hola mundo" },
    { title: "proyecto 2", description: "Hola mundo 2" }
  ];*/

  const { projects } = useSelector(state => state.projects);
  //console.log(projects);
  // si no hay proyectos que mostrar
  if (projects.length === 0)
    return <h2>Por el momento no hay proyectos, empieza creando uno</h2>;

  return (
    <div className="projects">
      {projects.map(project => (
        <Project key={project.id} {...project} />
      ))}
    </div>
  );
};

export default Projects;
