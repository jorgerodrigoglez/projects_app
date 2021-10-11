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
        notes: [action.payload, ...state.notes]
      };
    case types.projectLoad:
      // da error - action.payload is not iterable
      // console.log(action.payload) -- retorna una promesa
      // solucion - hacer asincrona la funcion que devuelve los proyectos(helper) - const projects = await projectNotes( user.uid ); en appRouter con su async en la funcion
      return {
        ...state,
        notes: [...action.payload]
      };
    case types.projectUpdated:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? action.payload.note : note
        )
      };
   
    default:
      return state;
  }
};