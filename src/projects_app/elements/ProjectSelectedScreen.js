import React, { useEffect, useRef } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// hook useForm
import { useForm } from "../../hooks/useForm";
// action projects
import { activeProject, startSaveProject } from "../../actions/projects";
import { FormTask } from "./tasks/FormTask";


export const ProjectSelectedScreen = ({toggle}) => {
  // react-redux
  const dispatch = useDispatch();

  // redux - desestructuramos el active del state projects
  // para edición de datos del proyecto
  const { active: project } = useSelector(state => state.projects);
  //console.log(project);
  // hook para editar datos del proyecto activo
  const [formValues, handleInputChange, reset] = useForm(project);
  // desestructuramos el objeto que retorna el hook
  const { title, description } = formValues;
  //console.log(title, description);

  // hay que cambiar el estado cuando cambia el proyecto activo, ya que éste no cambia por si solo
  // se guarda la referencia del proyecto active.id actual
  const activeId = useRef(project.id);
  // si cambia el id del proyecto activo, entonces lo cambiamos
  useEffect(() => {
    if (project.id !== activeId.current) {
      reset(project);
      // establecemos el nuevo proyecto activo
      activeId.current = project.id;
    }
  }, [project, reset]);
  // actualiza los datos del proyecto activo
  useEffect(() => {
    // activeProject, esta en el action de projects
    // Aunque el id este repetido se sobrescribe al enviar el objeto completo
    dispatch(activeProject(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  // funcion para editar un proyecto
  const handleEditProject = e => {
    e.preventDefault();
    //console.log(project);
    dispatch(startSaveProject(project));
  };

  return (
    <>
   
      <div className="project__form">
        <div className="project__form__content">
      
          <input
            type="text"
            placeholder="Título"
            className="project__title--input"
            name="title"
            value={title}
            onChange={handleInputChange}
          />

          <textarea
            cols="40"
            rows="2"
            placeholder="Descripción"
            className="project__description"
            name="description"
            value={description}
            onChange={handleInputChange}
          ></textarea>
          <button className="save__btn" onClick={handleEditProject}>
            Save...
          </button>
        </div>
      </div>

      <div className="project__header">
        <h1 className="project__title__screen">{project.title}</h1>
        <p className="project__description__screen">{project.description}</p>
      </div>
      
      <FormTask />
    </>
  );
};
