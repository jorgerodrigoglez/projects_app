import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setValues] = useState(initialState);

  // si no es enviado el newFormState, sera enviado el intialState
  // el reset es utilizado en
  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  return [formValues, setValues, handleInputChange, reset];
};