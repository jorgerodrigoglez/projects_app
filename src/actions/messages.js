// types
import { types } from "../types/types";

export const setError = err => ({
  type: types.messageSetError,
  payload: err
});

export const removeError = () => ({
  type: types.messageRemoveError
});