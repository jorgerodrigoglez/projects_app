// react router dom
import { Link } from "react-router-dom";
// yarn add validator
import validator from "validator";
// hook
import { useForm } from "../hooks/useForm";
// redux
import { useDispatch, useSelector } from "react-redux";
// action - auth  
import { startLoginEmailPassword, startGoogleLogin } from "../actions/auth";
// action - messages
import { setError,removeError } from "../actions/messages";

// COMPONENT
export const LoginScreen = () => {
  // redux
  const dispatch = useDispatch();
  // redux - desestructuramos msgError del state messages
  const { msgError } = useSelector(state => state.messages);
  // hook
  const [formValues, handleInputChange] = useForm({
    email: "jrg@gmail.com",
    password: "123456"
  });
  // desestructuramos el objeto que retorna el hook
  const { email, password } = formValues;
  // funcion para hacer el login con email y password
  const handleLogin = e => {
    e.preventDefault();
    //console.log(email, password);
    //console.log(email, password);
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };
  // funcion para realizar el login con google
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  // funcion para validar los campos del formulario
  const isFormValid = () => {
    if(email === ""){
      dispatch(setError("El email es obligatorio"));
      return false;
    }
    else if (!validator.isEmail(email)) {
      dispatch(setError("El email no es valido"));
      return false;
    } else if (password === "") {
      dispatch(setError("Es necesario poner el password"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>
        {/* Mensaje de error */}
        {msgError && <div className="auth__alert--error">{msgError}</div>}

        <input
          type="text"
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
        <button
          type="submit"
          className="btn btn-primary btn-block"
          // del loading del state ui
        >
          Login
        </button>

        <div className="auth__social--networks">
          <p>Login with social networks</p>
          {/* btn google */}
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new acount
        </Link>
      </form>
    </>
  );
};
