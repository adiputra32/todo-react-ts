import { createHashRouter } from "react-router-dom";
import ErrorPage from "../pages/errors";
import NotFound from "../pages/errors/404";
import WelcomePage from "../pages/welcome-page";
import Home from "../pages/home";
import NewList from "../pages/new-list";
import EditList from "../pages/edit-list";

export const routes = createHashRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/new-list",
        element: <NewList />,
      },
      {
        path: "/edit-list/:id",
        element: <EditList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
