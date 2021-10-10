
import PropTypes from "prop-types";
// react router dom
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  //console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      component={ props =>
        isAuthenticated ? (
            <Redirect to="/" /> 
        ) : (
            <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};