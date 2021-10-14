// firebase
import { db } from "../firebase/firebase-config";
// libreria de alertas
import Swal from "sweetalert2";
// types
import { types } from "../types/types";
// libreria de alertas
//import Swal from "sweetalert2";
// helper para obtener los proyectos de la bbdd de firebase
import { loadProjects } from "../helpers/loadProjects";

/************** NUEVO PROYECTO */

// CREAMOS UN NUEVO PROYECTO EN LA BBDD
export const newProject = () => {
  // el getState nos da acceso a todo el state de la app
  return async (dispatch, getState) => {
    //const state = getState();
    //console.log(state);
    const { uid } = getState().auth;
    //console.log(uid);

    const newProject = {
      title: "",
      description: "",
      date: new Date().getTime() // timestap
    };

    const docProject = await db
      .collection(`${uid}/projects/project`)
      .add(newProject);
    //console.log( docProject );
    // hay que cambiar reglas de firebase en produccion - write: if true; - para eliminar el error al pulsar el boton del Sidebar
    // a continuacion modificamos la regla de la bbdd de firestore por - write: if request.auth != null;
    dispatch(activeProject(docProject.id, newProject));
    // llamar a funcion para actualizar el proyecto
    dispatch(addNewProject(docProject.id, newProject));
  };
};
// INVOCAMOS AL REDUCER
// añade el proyecto y hace reflesh de los proyectos
export const addNewProject = (id, project) => ({
  type: types.projectAddNew,
  payload: {
    id,
    ...project
  }
});

// INVOCAMOS AL REDUCER
// cambia el active, al no ser null se activa el proyecto
export const activeProject = (id, project) => ({
  type: types.projectActive,
  payload: {
    id,
    ...project
  }
});

/**  */
// optimizacion del codigo de appRouter de helpers para obtener los proyectos de la bbdd
export const startLoadingProjects = uid => {
  return async dispatch => {
    // helpers
    // esto es una promesa
    const projects = await loadProjects(uid);
    dispatch(setProjects(projects));
  };
};

// almacena los proyectos en el state de projects
// función llamada desde appRouter
export const setProjects = projects => ({
  type: types.projectsLoad,
  payload: projects
});

/************** GUARDAMOS EL PROYECTO EDITADO */
export const startSaveProject = project => {
  return async (dispatch, getState) => {
    // uid del user
    const { uid } = getState().auth;

    // eliminar el id de la nota que recibimos por parametro antes de grabarlo en la bbdd
    const projectToFirebase = { ...project };
    delete projectToFirebase.id;

    await db
      .doc(`${uid}/projects/project/${project.id}`)
      .update(projectToFirebase);

    // llamar a funcion para actualizar la nota
    dispatch(refreshProjects(project.id, projectToFirebase));
    Swal.fire("Saved", project.title, "success");
  };
};

// actualizacion de reducer despues de la funcion startSaveNote
export const refreshProjects = (id, project) => ({
  type: types.projectUpdated,
  payload: {
    id,
    // incluye el id si la nota no viene con el id y da error en consola, aunque funciona
    project: {
      id,
      ...project
    }
  }
});
