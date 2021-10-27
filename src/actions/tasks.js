// firebase
import { db } from "../firebase/firebase-config";
// types
import { types } from "../types/types";
// sweetalert2
import Swal from "sweetalert2";

/************** NUEVO PROYECTO */

// CREAMOS UN NUEVO PROYECTO EN LA BBDD
export const newTask = (text, project, complete, priority, budget) => {
  //console.log(text, project, complete, priority, budget);
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
      priority,
      budget,
      // hora actual
      date: new Date().getTime()
    };
    //console.log(newTask);
    const docProjectTask = await db
      .collection(`${uid}/projects/tasks`)
      .add(newTask);
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
export const setActiveTask = (id, task) => ({
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

/** INPUT CHECK Y NUMBER DE CADA TAREA*/
export const setTaskCheckChange = (id, task, newInput) => {
  return async (dispatch, getState) => {
    //console.log(task, newComplete);
    // uid del usuario
    const uid = getState().auth.uid;
    //se envía el valor a la BBDD
    await db
      .doc(`${uid}/projects/tasks/${id}`)
      .update(newInput)
      .then(() => {
        console.log("La tarea fue editada con exito");
      })
      .catch(err => {
        console.log(err);
      });
    // llamada al reducer para cambiar el state de tasks complete
    dispatch(setCheck(newInput));
    // refrescar tareas del proyecto seleccionado
    dispatch(startLoadingTasksProject(task.idProject));
  };
};

// llamada el reducer para cambiar el check de la tarea
export const setCheck = newInput => ({
  type: types.taskCheck,
  payload: newInput
});

/************** GUARDAMOS LA TAREA EDITADA EN BBDD */
export const startEditTask = (newPriority, id) => {
  return async (dispatch, getState) => {
    // uid del user
    const { uid } = getState().auth;

    // eliminar el id de la nota que recibimos por parametro antes de grabarlo en la bbdd
    const taskToFirebase = { ...newPriority };
    delete taskToFirebase.id;
    // lamada a bbdd para realizar actualización
    await db
      .doc(`${uid}/projects/tasks/${newPriority.id}`)
      .update(taskToFirebase)
      .then(doc => {
        // mensaje de actualización
        Swal.fire("Editar", "La tarea ha sido editada con éxito", "success");
      })
      .catch(err => {
        Swal.fire(
          "Error",
          `Se ha producido un error al editar, error: ${err}`,
          "error"
        );
      });
    // llamar a funcion para quitar la tarea que esta activa
    dispatch(refreshTaskActive(newPriority, id));
  };
};
// llamada el reducer para cambiar el activeTask de la tarea
export const refreshTaskActive = (task, id) => ({
  type: types.taskActiveReflesh,
  payload: {
    id,
    ...task
  }
});

/** BORRA LA TAREA ACTUAL */
// el id que enviamos es el id del proyecto
export const startTaskDelete = id => {
  return (dispatch, getState) => {
    // uid del usuario
    const uid = getState().auth.uid;
    // mensaje de advertencia para confirmar borrado
    Swal.fire({
      title: "¿Seguro que desea eliminar la tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!"
    }).then(result => {
      if (result.value) {
        // llamada a bbdd para borrar tarea
        db.doc(`${uid}/projects/tasks/${id}`).delete();
        // reducer
        dispatch(deleteTask(id));
      }
    });
  };
};

// limpia la tarea eliminada
export const deleteTask = id => ({
  type: types.taskDelete,
  payload: id
});

// limpiar el store de tareas despues de hacer logout
export const taskLogout = () => ({
  type: types.tasksLogoutCleaning
});

/** BORRA TODAS LAS TAREAS DEL PROYECTO ACTUAL */
// el id que enviamos es el id del proyecto
export const startDeletingTasksProject = idProject => {
  return async (dispatch, getState) => {
    //console.log(idProject);
    // uid del usuario
    const uid = getState().auth.uid;

    // borra todas las tareas del proyecto
    const taskRef = db.collection(`${uid}/projects/tasks/`);
    const snapshot = await taskRef.where("idProject", "==", idProject).get();
    //console.log(snapshot);

    const tasksToDelete = [];

    if (snapshot.empty) {
      console.log("No matching documents");
      return;
    }
    // los recorremos e incluimos en array
    snapshot.forEach(doc => {
      tasksToDelete.push({
        //console.log(doc.data());
        // añadir id a la tarea, pues el objeto devuelto por la BBDD no lo incluye
        id: doc.id,
        ...doc.data()
      });
      //console.log(tasksToDelete);
      // extraemos los ids de cada tarea seleccionada y generamos otro array
      const idTasks = tasksToDelete.map(tasksId => {
        return tasksId.id;
      });
      //console.log(idTasks);
      // apuntamos a los ids de cada tarea seleccionada para eliminarlas
      const idTaskToDelete = idTasks.map(idDelete => {
        return taskRef.doc(idDelete).delete();
      });
      console.log(idTaskToDelete);

      // llamada al reducer
      dispatch(deleteProjectTasks());
    });
  };
};
// borra nombre y descripcion del proyecto
export const deleteProjectTasks = () => ({
  type: types.tasksProjectDelete
});
