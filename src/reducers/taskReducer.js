//types
import { types } from "../types/types";

const initialState = {
  tasks: []
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.taskAdd:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    /*case types.tasksLoad:
      return {
        ...state,
        tasks: [...action.payload]
      };*/
    case types.tasksProject:
      //console.log(action.payload);
      return {
        ...state,
        tasks: [...action.payload]
      };

    default:
      return state;
  }
};
