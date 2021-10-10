// react router dom
import { Link } from "react-router-dom";
// libreria de validaciones
// yarn add validator
import validator from "validator";
// redux
import { useDispatch, useSelector } from "react-redux";
// hook
import { useForm } from "../hooks/useForm";
// actions - messages
import { setError, removeError } from "../actions/messages";
// actions - auth
import { startRegisterWithEmailPasswordName } from "../actions/auth";

// COMPONENT
export const RegisterScreen = () => {
  // redux
  const dispatch = useDispatch();
  // redux - desestructuramos msgError del state messages
  const { msgError, loading} = useSelector(state => state.messages);
  // hook
  const [formValues, handleInputChange] = useForm({
    name: "Jorge",
    email: "jrg@gmail.com",
    password: "123456",
    password2: "123456"
  });
  // desertructuracion de valores del formulario
  const { name, email, password, password2 } = formValues;
  // funcion para registro de usuarios
  const handleRegister = e => {
    e.preventDefault();
    //console.log(name, email, password, password2);
    if (isFormValid()) {
      console.log("Formulario correcto");
      dispatch(startRegisterWithEmailPasswordName(name,email,password));
    }
  };
  // control de errores de formulario
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("El nombre es obligatorio"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("El email no es valido"));
      return false;
    } else if (password !== password2) {
      dispatch(setError("Los passwords deben ser iguales"));
      return false;
    } else if (password.length < 5) {
      dispatch(setError("El Password debería tener al menos 6 caracteres"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        {/* Mensaje de error */}
        {msgError && <div className="auth__alert--error">{msgError}</div>}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          // loading del state message
          disabled={loading}
        >
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already Register?
        </Link>
      </form>
    </>
  );
};
