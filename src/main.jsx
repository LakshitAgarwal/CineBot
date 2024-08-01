import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./Components/Login.jsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

const appRouter = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
