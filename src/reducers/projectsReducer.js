//types
import { types } from "../types/types";

const initialState = {
  projects: [],
  active: null
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.projectActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      };
    case types.projectAddNew:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case types.projectsLoad:
      // da error - action.payload is not iterable
      // console.log(action.payload) -- retorna una promesa
      // solucion - hacer asincrona la funcion que devuelve los proyectos(helper) - const projects = await loadProjects( user.uid ); en appRouter con su async en la funcion
      return {
        ...state,
        projects: [...action.payload]
      };
    case types.projectUpdated:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload.project : project
        )
      };
    case types.projectDelete:
      return {
        ...state,
        active: null,
        projects: state.projects.filter(project => project.id !== action.payload)
      };
      case types.projectLogoutCleaning:
      return {
        ...state,
        active: null,
        projects: []
      };

    default:
      return state;
  }
};
