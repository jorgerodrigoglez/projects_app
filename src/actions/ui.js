// types
import { types } from "../types/types";

// controla la accion de la ventana modal
export const uiOpenModal = () => ({
  type: types.uiOpenModal,
});

export const uiCloseModal = () => ({
    type: types.uiCloseModal,
  });