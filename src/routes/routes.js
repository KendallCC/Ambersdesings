import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(Home, {}), // Usamos JSX aquí
    },
    {
        path: "/about",
        element: _jsx(About, {}), // JSX correcto
    },
    {
        path: "*",
        element: _jsx(NotFound, {}), // JSX correcto
    },
    {
        path: "/categorias/table",
        element: _jsx(CategoriaTable, {}), // JSX correcto
    },
    {
        path: "/producto/table",
        element: _jsx(ProductoTable, {}), // JSX correcto
    },
    {
        path: "/categorias/:id",
        element: _jsx(CategoriaProductos, {}), // JSX correcto
    },
    {
        path: "/producto/:id",
        element: _jsx(ProductoDetalles, {}), // JSX correcto
    },
];
export default routes;
