import React, { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
// hook useForm
//import { useForm } from "../../hooks/useForm";

const FormProject = () => {
  // react-redux
  const dispatch = useDispatch();

  return (
    <div className="notes__main--content">
      <div className="notes__content">
        <input
          name="title"
          type="text"
          placeholder="Título"
          className="project__title--input"
          //value={title}
          //onChange={handleInputChange}
        />

        <textarea
          name="description"
          cols="40"
          rows="2"
          placeholder="Descripción"
          className="project__description"
          //value={description}
          //onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
};

export default FormProject;
