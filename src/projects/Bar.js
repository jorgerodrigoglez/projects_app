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
    <div>
        <h3>
          <span> {name}</span>
        </h3>
      <button className="btn btn--black" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};
