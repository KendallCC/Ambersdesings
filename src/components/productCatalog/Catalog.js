var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Pagination, } from "@mui/material";
import { getProductosPaginados } from "../../Services/productoService";
import { Skeleton } from "@mui/material";
const CategoriaProductos = () => {
    const { id } = useParams(); // Captura el ID de la categoría desde la URL
    const [productosPorPagina, setProductosPorPagina] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const rowsPerPage = 8; // Número de productos por página
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductos = (currentPage) => __awaiter(void 0, void 0, void 0, function* () {
            if (productosPorPagina[currentPage]) {
                // Si ya cargamos los productos de esta página, no volvemos a hacer la solicitud
                return;
            }
            setLoading(true);
            try {
                const { productos, totalPages } = yield getProductosPaginados(currentPage, rowsPerPage);
                setProductosPorPagina((prev) => (Object.assign(Object.assign({}, prev), { [currentPage]: productos })));
                setTotalPages(totalPages);
            }
            catch (error) {
                console.error("Error al cargar productos:", error);
            }
            finally {
                setLoading(false);
            }
        });
        if (id) {
            fetchProductos(page);
        }
    }, [id, page, productosPorPagina]);
    const handlePageChange = (event, value) => {
        setPage(value); // Cambia la página
    };
    const handleViewDetails = (productoId) => {
        navigate(`/producto/${productoId}`); // Navega a la página de detalles del producto
    };
    const productos = productosPorPagina[page] || [];
    return (_jsxs(Box, { sx: { padding: "2rem" }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, textAlign: "center", fontWeight: "bold", children: "Productos de la Categor\u00EDa" }), loading ? (_jsx(Box, { sx: { display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }, children: _jsx(Grid, { container: true, spacing: 3, justifyContent: "center", children: Array.from(new Array(rowsPerPage)).map((_, index) => (_jsxs(Grid, { item: true, xs: 12, sm: 6, md: 4, lg: 3, children: [_jsx(Skeleton, { variant: "rectangular", width: "100%", height: 200 }), _jsx(Skeleton, { variant: "text", width: "80%" }), _jsx(Skeleton, { variant: "text", width: "60%" })] }, index))) }) })) : productos.length === 0 ? (_jsx(Box, { sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }, children: _jsx(Typography, { variant: "h6", children: "No se encontraron productos en esta categor\u00EDa." }) })) : (_jsxs(_Fragment, { children: [_jsx(Grid, { container: true, spacing: 3, justifyContent: "center", children: productos.map((producto) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, lg: 3, children: _jsxs(Card, { sx: { boxShadow: 3, borderRadius: 2 }, children: [_jsx(CardMedia, { component: "img", height: "200", image: producto.imagenes.length > 0
                                            ? producto.imagenes[0].urlImagen
                                            : "https://via.placeholder.com/300x200", alt: producto.nombre, sx: { objectFit: "cover" }, loading: "lazy" // Carga diferida
                                     }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", fontWeight: "bold", children: producto.nombre }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["\u20A1", producto.precio] }), _jsx(Button, { variant: "contained", color: "primary", fullWidth: true, sx: { marginTop: 1 }, onClick: () => handleViewDetails(producto.id), children: "Ver m\u00E1s" })] })] }) }, producto.id))) }), _jsx(Box, { sx: { display: "flex", justifyContent: "center", marginTop: "2rem" }, children: _jsx(Pagination, { count: totalPages, page: page, onChange: handlePageChange, color: "primary" }) })] }))] }));
};
export default CategoriaProductos;
