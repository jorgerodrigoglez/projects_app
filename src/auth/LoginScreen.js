// react router dom
import { Link } from "react-router-dom";
// hook
import { useForm } from "../hooks/useForm";
// redux 
import{ useDispatch } from "react-redux";
// action - dispatch
import { login } from "../actions/auth";


// COMPONENT
export const LoginScreen = () => {
  // redux
  const dispatch = useDispatch();
  // hook
  const [ formValues, handleInputChange ] = useForm({
    email: "jrg@gmail.com",
    password: "123456"
  });
  // desestructuramos el objeto que retorna el hook
  const { email, password } = formValues;
  // funcion para el login
  const handleLogin = (e) => {
    e.preventDefault();
    //console.log(email, password);
    dispatch( login ( 3454323, 'Jorge RG'));

  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>
        {/* Mensaje de error */}

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
          <div className="google-btn">
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
