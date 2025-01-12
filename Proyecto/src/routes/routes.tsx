import Home from "../pages/home";
import About from "../pages/about";
import NotFound from "../pages/notfound";

const routes = [
  {
    path: "/",
    element: <Home />, // Usamos JSX aquí
  },
  {
    path: "/about",
    element: <About />, // JSX correcto
  },
  {
    path: "*",
    element: <NotFound />, // JSX correcto
  },
];

export default routes;
