import React, { useState } from "react";

// momment
import moment from "moment";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions project
import { newProject } from "../../../actions/projects";

export const ProjectBar = ({ toggle }) => {
  // moment
  const date = moment();
  // react-redux
  const dispatch = useDispatch();
  // para ocultar el boton del toggle
  const { active } = useSelector(state => state.projects);
  // state
  const [toggleBtn, setToggleBtn] = useState(true);
  // guardar el proyecto
  const handleNewProject = e => {
    e.preventDefault();
    dispatch(newProject());
  };
  // funcion para abrir formulario
  const openForm = e => {
    e.preventDefault();
    toggle();
    setToggleBtn(true);
  };

  return (
    <div className="bar__project">
      <span>{date.format("LLLL")}</span>

      <div className="bar__project__box">
        <div className="project__new" onClick={handleNewProject}>
          <div className="add__project">
            <i className="fas fa-plus-circle fa-5x"></i>
          </div>
        </div>
        {active && (
          <div className="btn-active" onClick={openForm}>
            <div className="toggle__btn">
              {toggleBtn ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
