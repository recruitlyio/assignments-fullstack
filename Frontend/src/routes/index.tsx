import { RouteObject } from "react-router-dom";
import Home from "../pages/Home/home";
import Match from "../pages/Match/match";
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
