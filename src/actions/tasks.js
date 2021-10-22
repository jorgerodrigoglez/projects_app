// firebase
import { db } from "../firebase/firebase-config";
// types
import { types } from "../types/types";
// helper para obtener las tareas de la bbdd de firebase
//import { loadTasks } from "../helpers/loadTasks";

/************** NUEVO PROYECTO */

// CREAMOS UN NUEVO PROYECTO EN LA BBDD
export const newTask = (text, project, complete) => {
  // el getState nos da acceso a todo el state de la app
  return async (dispatch, getState) => {
    //const state = getState();
    //console.log(state);
    const { uid } = getState().auth;
    //console.log(uid, task, project);
    const newTask = {
      text,
      idProject: project.id,
      complete,
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

// INVOCAMOS AL REDUCER
// cambia el active, al no ser null se activa la tarea
export const activeTask = (id, task) => ({
  type: types.taskActive,
  payload: {
    id,
    ...task
  }
});

/** */
// selecciona tareas del proyecto activo
export const startLoadingTasksProject = idProject => {
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
      // llamada al reducer para obtener las tareas de un proyecto
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
      // llamada al reducer para obtener las tareas de un proyecto
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

/** INPUT CHECK DE CADA TAREA*/
export const setTaskCheck = ( id, task, newComplete) => {
  return async (dispatch, getState) => {
    //console.log(task, newComplete);
    // uid del usuario
    const uid = getState().auth.uid;
    //se envía el valor a la BBDD
    await db
      .doc(`${uid}/projects/tasks/${id}`)
      .update(newComplete)
      .then(() => {
        console.log("La tarea fue editada con exito");
      })
      .catch(err => {
        console.log(err);
      });
    // llamada al reducer para cambiar el state de tasks complete
    dispatch(setCheck(newComplete));
    // refrescar tareas del proyecto seleccionado
    dispatch(startLoadingTasksProject(task.idProject) )
  };
};

// llamada el reducer para cambiar el check de la tarea
export const setCheck = newComplete => ({
  type: types.taskCheck,
  payload: newComplete
});

/************** GUARDAMOS LA TAREA EDITADA EN BBDD */
export const startSaveTask = task => {
  return async (dispatch, getState) => {
    // uid del user
    const { uid } = getState().auth;

    // eliminar el id de la nota que recibimos por parametro antes de grabarlo en la bbdd
    const taskToFirebase = { ...task };
    delete taskToFirebase.id;

    await db
      .doc(`${uid}/projects/tasks/${task.id}`)
      .update(taskToFirebase);

    // llamar a funcion para quitar la tarea que esta activa
    dispatch(refreshTaskActive(task));
  };
};
// llamada el reducer para cambiar el activeTask de la tarea
export const refreshTaskActive = task => ({
  type: types.taskActiveReflesh,
  payload: task
})
