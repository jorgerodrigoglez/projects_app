// firebase
import { db } from "../firebase/firebase-config";
// types
import { types } from "../types/types";
// helper para obtener las tareas de la bbdd de firebase
//import { loadTasks } from "../helpers/loadTasks";

/************** NUEVO PROYECTO */

// CREAMOS UN NUEVO PROYECTO EN LA BBDD
export const newTask = (task, project) => {
  // el getState nos da acceso a todo el state de la app
  return async (dispatch, getState) => {
    //const state = getState();
    //console.log(state);
    const { uid } = getState().auth;
    //console.log(uid, task, project);
    const newTask = {
      task,
      idProject: project.id,
      // hora actual
      date: new Date().getTime()
    };
    //console.log(newTask);
    const docProjectTask = await db
      .collection(`${uid}/projects/tasks`)
      .add(newTask);
    //console.log( docTask );
    // llamada a funcion para añadir nueva tarea al state de tareas indicándole el proyecto al que pertenece
    dispatch(addNewTask(docProjectTask.id, newTask));
  };
};
// INVOCAMOS AL REDUCER
// añade las tareas y hace reflesh de las tareas
export const addNewTask = (id, task) => ({
  type: types.taskAdd,
  payload: {
    id,
    ...task
  }
});

/**  */
// optimizacion del codigo de appRouter de helpers para obtener las tareas de la bbdd
/*export const startLoadingTasks = uid => {
  return async dispatch => {
    // helpers
    // esto es una promesa
    const tasksBbdd = await loadTasks(uid);
    //console.log(tasksBbdd);
    dispatch(setTasks(tasksBbdd));
  };
};*/

// almacena las tareas en el state de tareas
/*export const setTasks = tasks => ({
  type: types.tasksLoad,
  payload: tasks
});*/

/** */
// selecciona tareas del proyecto activo
export const startLoadingTasksProject = (idProject) => {
  return async (dispatch, getState) => {
    //console.log(idProject);
    // uid del usuario
    const uid = getState().auth.uid;
    /** Firebase documentation : https://firebase.google.com/docs/firestore/query-data/queries */
    const taskRef = db.collection(`${uid}/projects/tasks`);
    const snapshot = await taskRef.where("idProject", "==", idProject).get();
    
    // definimos array para recoger los dos objetos que devuelve la BBDD
    const tasksProject = [];

    if (snapshot.empty) {
      //console.log("No matching documents");
      // llamada al reducer
      dispatch(setTasksProject(tasksProject));
      return;
    }
    // los recorremos e incluimos en array
    snapshot.forEach(doc => {
      tasksProject.push({
        //console.log(doc.data());
        // añadir id a la tarea, pues el objeto devuelto por la BBDD no lo incluye
        id: doc.id,
        ...doc.data()
      });
      //console.log(tasksProject);
      // llamada al reducer
      dispatch(setTasksProject(tasksProject));
    });
    /** */
  };
};

// envio de las tareas de cada proyecto
export const setTasksProject = tasksProject => ({
  type: types.tasksProject,
  payload: tasksProject
});
