import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./Components/Login.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Components/Browse.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
