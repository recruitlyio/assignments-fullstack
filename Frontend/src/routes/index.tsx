import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import Match from "../pages/match";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/match",
    element: <Match />,
  },
];
