var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Pagination, } from "@mui/material";
import { getProductosPorCategoria } from "../../Services/productoService";
const CategoriaProductos = () => {
    const { id } = useParams(); // Captura el ID de la categoría desde la URL
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const rowsPerPage = 8; // Número de productos por página
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductos = () => __awaiter(void 0, void 0, void 0, function* () {
            if (id) {
                try {
                    const data = yield getProductosPorCategoria(parseInt(id, 10));
                    setProductos(data);
                }
                catch (error) {
                    console.error("Error al cargar productos:", error);
                }
                finally {
                    setLoading(false);
                }
            }
        });
        fetchProductos();
    }, [id]);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handleViewDetails = (productoId) => {
        navigate(`/producto/${productoId}`); // Navega a la página de detalles del producto
    };
    if (loading) {
        return (_jsx(Box, { sx: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }, children: _jsx(Typography, { variant: "h6", children: "Cargando productos..." }) }));
    }
    const paginatedProductos = productos.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    return (_jsxs(Box, { sx: { padding: "2rem" }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, textAlign: "center", fontWeight: "bold", children: "Productos de la Categor\u00EDa" }), _jsx(Grid, { container: true, spacing: 3, justifyContent: "center", children: paginatedProductos.map((producto) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, lg: 3, children: _jsxs(Card, { sx: { boxShadow: 3, borderRadius: 2 }, children: [_jsx(CardMedia, { component: "img", height: "200", image: producto.imagenes.length > 0
                                    ? producto.imagenes[0].urlImagen
                                    : "https://via.placeholder.com/300x200", alt: producto.nombre, sx: { objectFit: "cover" } }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", fontWeight: "bold", children: producto.nombre }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["\u20A1", producto.precio] }), _jsx(Button, { variant: "contained", color: "primary", fullWidth: true, sx: { marginTop: 1 }, onClick: () => handleViewDetails(producto.id), children: "Ver m\u00E1s" })] })] }) }, producto.id))) }), _jsx(Box, { sx: { display: "flex", justifyContent: "center", marginTop: "2rem" }, children: _jsx(Pagination, { count: Math.ceil(productos.length / rowsPerPage), page: page, onChange: handlePageChange, color: "primary" }) })] }));
};
export default CategoriaProductos;
