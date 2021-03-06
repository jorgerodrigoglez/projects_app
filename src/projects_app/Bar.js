// redux
import { useDispatch, useSelector } from "react-redux";
// action auth
import { startLogout } from "../actions/auth";

export const Bar = () => {
  // redux
  const dispatch = useDispatch();
  // desestructuramos el state de auth para extraer el name
  const { name } = useSelector(state => state.auth);
  // funcion para realizar el logout
  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div className="bar">
      <h3 className="bar__title">
        <span className="bar__title"> Bienvenido: <span className="bar__title__name" >{name}</span></span>
      </h3>
      <button className="bar__logout--btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};
