import { db } from "../firebase/firebase-config";

/* HELPER PARA OBTENER LOS PROYECTOS DE LA BBDD */
export const loadProjects = async uid => {
  const projectsSnap = await db.collection(`${uid}/projects/projects`).get();
  //console.log(projectsSnap);
  // definimos el array para obtener los proyectos
  const projects = [];

  // recorremos los proyectos
  projectsSnap.forEach(snapChild => {
    //console.log(snapChild.data()); //extraemos el description,date,title del documento de bbdd, pero falta el id
    projects.push({
      // extraemos el id de cada proyecto
      id: snapChild.id,
      // extraemos la data de cada proyecto
      ...snapChild.data()
    });
  });
  // retornamos los proyectos de la bbdd de firebase
  //console.log(projects);
  return projects;
};