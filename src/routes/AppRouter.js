// react router dom
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// comppnents
import { AuthRouter } from "./AuthRouter";
import { ProjectsScreen } from "../projects/ProjectsScreen";

// COMPONENT
export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={ProjectsScreen} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
