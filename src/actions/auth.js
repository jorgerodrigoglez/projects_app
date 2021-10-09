// types
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";

/* dispatch se encarga de enviar la respectiva accion los reducers y como los nombres de los types son únicos solo hay un reducer que va a ejecutar esa acción */

/**** REGISTRO DE USUARIOS */
// action login con email y password firebase
export const startRegisterWithEmailPasswordName = (name, email, password) => {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        // async await para que no pase a la siguiente peticion hasta que se resuelva la anterior
        // para extraer el displayName que viene como null en la peticion
        await user.updateProfile({ displayName: name });
        //console.log(user);
        //llamamos a la funcion login para enviar los datos al reducer y hacer el login
        dispatch(login(user.uid, user.displayName));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

/**** LOGIN USUARIOS*/
export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        //console.log(user);
        //llamamos a la funcion login para enviar los datos al reducer
        dispatch(login(user.uid, user.displayName));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action login con google firebase
export const startGoogleLogin = () => {
  return dispatch => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      // devuelve una promesa, se desestructura el user de la peticion a la bbdd
      .then(({ user }) => {
        //console.log(user);
        //llamamos a la funcion login para enviar los datos al reducer
        dispatch(login(user.uid, user.displayName));
      });
  };
};

// logica para realizar el login, envia la información al reducer y éste la ejecuta
export const login = (uid, displayName) => ({
  // action del reducer
  type: types.login,
  payload: {
    uid,
    displayName
  }
});
