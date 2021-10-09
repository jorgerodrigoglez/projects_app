//types
import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.messageSetError:
      return {
        ...state,
        msgError: action.payload
      };
    case types.messageRemoveError:
      return {
        ...state,
        msgError: null
      };
    case types.messageStartLoading:
      return {
        ...state,
        loading: true
      };

    case types.messageFinishLoading:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};