import { AppRouter } from "./routes/AppRouter";
// redux
import { Provider } from "react-redux";
import { store } from "./store/store";

// COMPONENT
export const ProjectsApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
