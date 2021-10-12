import React, { useEffect, useState } from "react";
// firebase
import { firebase } from "../firebase/firebase-config";
// redux
import { useDispatch } from "react-redux";
// react router dom
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
// comppnents
import { AuthRouter } from "./AuthRouter";
import { ProjectsScreen } from "../projects/ProjectsScreen";
// action auth
import { login } from "../actions/auth";
// routes
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
// helper que lista los proyectos creado en la BBDD de firebase
//import { loadProjects } from "../helpers/loadProjects";
// action projects
import { startLoadingProjects } from "../actions/projects";

// COMPONENT
export const AppRouter = () => {
  // redux
  const dispatch = useDispatch();
  // estado para asegurar que la respuesta de la BBDD de firebase se ha producido
  // la respuesta debe de darse antes de pasar a realizar otras tareas
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect para mantener al usuario logeado
  // cuando el estado de la autenticacion de firebase cambia hay que ejecutar el siguiente procedimiento para que la informacion del usuario, esto es, el estado del usuario no se borre al refrescar la pagina
  // tiene que responder antes de realizar cualquier otra accion ya que eso generaria un error
  useEffect(() => {
    // esta funcion va a estar observando si el usuario ha cambiado o permanece logeado en la app
    firebase.auth().onAuthStateChanged( async user => {
      //console.log(user);
      //si no estoy autenticado user va a regresar un null
      //si user tiene algo, no viene vacio, entonces pregunta si existe uid, sino existe el if no se ejecuta
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        // comprobar autenticación del usuario
        setIsLoggedIn(true);
        // helper - loadNotes - extrae las notas de la BBDD tal como las necesitamos y le enviamos el uid del user de la BBDD - esto regresará los proyectos, creamos una nueva funcion en actions projects.js
        // projects es un array de objetos
        //loadProjects(user.uid);
        //const projects = await loadProjects( user.uid );
        // accion que dispara el almacenamiento de los proyectos en el store
        dispatch( startLoadingProjects( user.uid ))
      } else {
        // comprobar autenticación del usuario
        setIsLoggedIn(false);
      }
      // la BBDD a respondido correctamente
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  // controla el estado de la repuesta de firebase
  if (checking) {
    return <h1>Cargando la aplicación...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/"
            component={ProjectsScreen}
            isAuthenticated={isLoggedIn}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
