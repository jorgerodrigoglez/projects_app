// types
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";

/* dispatch se encarga de enviar la respectiva accion los reducers y como los nombres de los types son únicos solo hay un reducer que va a ejecutar esa acción */

/* LOGIN **********/
// dispatch de prueba sincrono para simular un login
export const startLoginEmailPassword = (email, password) => {
    // accion regresa un callback / redux-thunk
    return dispatch => {
        setTimeout(() => {
            dispatch(login(123456, "Jorge"));
        }, 3500);
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