// types
import { types } from "../types/types";

// mensajes de error de formulario de login y register
export const setError = err => ({
  type: types.messageSetError,
  payload: err
});
export const removeError = () => ({
  type: types.messageRemoveError
});

// loading del boton login y register
export const startLoading = () => ({
  type: types.messageStartLoading
});
export const finishLoading = () => ({
  type: types.messageFinishLoading
});