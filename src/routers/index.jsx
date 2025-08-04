import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <h1> hello</h1>,
      },
      {
        path: "*",
        element: <h1> Not Foud</h1>,
      },
    ],
  },
]);

export default router;
