// react router dom
import { Link } from "react-router-dom";

// COMPONENT
export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form>
        {/* Mensaje de error */}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          // del loading del state ui
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
