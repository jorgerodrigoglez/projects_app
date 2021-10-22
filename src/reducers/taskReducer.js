//types
import { types } from "../types/types";

const initialState = {
  tasks: [],
  complete: false,
  activeTask: null
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.taskAdd:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };

    case types.tasksProject:
      //console.log(action.payload);
      return {
        ...state,
        tasks: [...action.payload]
      };
    case types.taskCheck:
      //console.log(action.payload);
      return {
        ...state,
        complete: action.payload
      };
    case types.taskActive:
      return {
        ...state,
        activeTask: {
          ...action.payload
        }
      };
    case types.taskActiveReflesh:
      return {
        ...state,
        activeTask: null
      };
    case types.taskDelete:
      return {
        ...state,
        activeTask: null,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case types.tasksLogoutCleaning:
    case types.tasksProjectDelete:
      return {
        ...state,
        tasks: [],
        activeTask: null,
        complete: false
      };
    default:
      return state;
  }
};
