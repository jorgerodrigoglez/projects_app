
// iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const OptionsTasks = ({ showTasks, toggleTasks }) => {

  return (
    <div className="options__menu">
      {showTasks ? (
        <button
          className="options__menu__hidden--btn"
          onClick={() => toggleTasks()}
        >
          Ocultar completadas
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="options__menu__hidden--btn--icon"
          />
        </button>
      ) : (
        <button
          className="options__menu__hidden--btn"
          onClick={() => toggleTasks()}
        >
          Mostrar completadas
          <FontAwesomeIcon
            icon={faEye}
            className="options__menu__hidden--btn--icon"
          />
        </button>
      )}
    </div>
  );
};

export default OptionsTasks;
