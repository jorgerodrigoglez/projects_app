import { db } from "../firebase/firebase-config";

/* HELPER PARA OBTENER LAS NOTAS DE LA BBDD */
export const loadProjects = async uid => {
  const projectsSnap = await db.collection(`${uid}/projects/project`).get();
  //console.log(projectsSnap);
  // definimos el array para obtener los proyectos
  const projects = [];

  // recorremos los proyectos
  projectsSnap.forEach(snapChild => {
    //console.log(snapChild.data()); //extraemos el description,date,title del documento de bbdd, pero falta el id
    projects.push({
      // extraemos el id de cada nota
      id: snapChild.id,
      // extraemos la data de cada nota
      ...snapChild.data()
    });
  });
  // retornamos los proyectos de la bbdd de firebase
  //console.log(projects);
  return projects;
};