import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home";
import Errors from './../erros/Errors';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <Errors />,
    children:
      [
        {
          path: "/",
          element: <Home />
        },
      ]
  },
]);
