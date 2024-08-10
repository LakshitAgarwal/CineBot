import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./Components/Login.jsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Browse from "./Components/Browse.jsx";
import AiSearch from "./Components/AiSearch.jsx";
import Favourites from "./Components/Favourites.jsx";

// Creating the router using createHashRouter
const appRouter = createHashRouter([
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
      {
        path: "/search",
        element: <AiSearch />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
    ],
  },
]);

// Rendering the app with the RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
