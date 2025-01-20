import Home from "../pages/home";
import About from "../pages/about";
import NotFound from "../pages/notfound";
import CategoriaTable from "../components/frmCategoria/frmTablaCategorias";
import ProductoTable from "../components/frmProductos/frmTablaProductos";
import CategoriaProductos from "../components/productCatalog/Catalog";
import ProductoDetalles from "../components/productCatalog/ProductoDetalles";
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
  {
    path: "/categoria/table",
    element: <CategoriaTable/>, // JSX correcto
  },
  {
    path: "/producto/table",
    element: <ProductoTable/>, // JSX correcto
  },
  {
    path: "/categorias/:id",
    element: <CategoriaProductos/>, // JSX correcto
  },
  {
    path: "/producto/:id",
    element: <ProductoDetalles/>, // JSX correcto
  },
  
];


export default routes;
