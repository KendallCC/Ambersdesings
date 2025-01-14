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
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Paper, TableSortLabel, IconButton, CircularProgress, Typography, Button, } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../../Services/productoService";
import { useSnackbar } from "notistack";
import ProductoModal from "./ProductoModal";
const ProductoTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [currentProducto, setCurrentProducto] = useState(null);
    useEffect(() => {
        const fetchProductos = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield getProductos();
                setProductos(data);
                setFilteredProductos(data);
            }
            catch (error) {
                enqueueSnackbar("Error al cargar los productos", { variant: "error" });
            }
            finally {
                setLoading(false);
            }
        });
        fetchProductos();
    }, [enqueueSnackbar]);
    useEffect(() => {
        const filtered = productos.filter((producto) => producto.nombre.toLowerCase().includes(search.toLowerCase()) ||
            (producto.codigo && producto.codigo.toLowerCase().includes(search.toLowerCase())));
        setFilteredProductos(filtered);
    }, [search, productos]);
    const handleRequestSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };
    const sortedProductos = filteredProductos.sort((a, b) => {
        if (!orderBy)
            return 0;
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (typeof aValue === "string" && typeof bValue === "string") {
            return order === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
            return order === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleOpenModal = (producto) => {
        setCurrentProducto(producto || null);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setCurrentProducto(null); // Resetea el estado del producto actual
        setOpenModal(false);
    };
    const handleSaveProducto = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (currentProducto) {
                // Editar producto
                yield updateProducto(currentProducto.id, data);
                enqueueSnackbar("Producto actualizado exitosamente", { variant: "success" });
            }
            else {
                // Crear producto
                yield createProducto(data.nombre, data.descripcion, data.precio, data.imagenes, data.categorias);
                enqueueSnackbar("Producto creado exitosamente", { variant: "success" });
            }
            const updatedProductos = yield getProductos();
            setProductos(updatedProductos);
            setFilteredProductos(updatedProductos);
        }
        catch (error) {
            enqueueSnackbar("Error al guardar el producto", { variant: "error" });
        }
        finally {
            handleCloseModal();
        }
    });
    const handleDeleteProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                yield deleteProducto(id);
                enqueueSnackbar("Producto eliminado exitosamente", { variant: "success" });
                const updatedProductos = productos.filter((producto) => producto.id !== id);
                setProductos(updatedProductos);
                setFilteredProductos(updatedProductos);
            }
            catch (error) {
                enqueueSnackbar("Error al eliminar el producto", { variant: "error" });
            }
        }
    });
    if (loading)
        return (_jsxs(Box, { sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
            }, children: [_jsx(CircularProgress, {}), _jsx(Typography, { variant: "h6", sx: { marginTop: 2 }, children: "Cargando productos..." })] }));
    return (_jsxs(Box, { sx: { padding: "1rem" }, children: [_jsxs(Box, { sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }, children: [_jsx(TextField, { label: "Buscar producto (nombre o c\u00F3digo)", variant: "outlined", value: search, onChange: handleSearchChange, sx: { flex: 1, marginRight: "1rem" } }), _jsx(Button, { variant: "contained", color: "primary", onClick: () => handleOpenModal(), children: "Agregar Producto" })] }), _jsxs(TableContainer, { component: Paper, children: [_jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { sortDirection: orderBy === "id" ? order : false, children: _jsx(TableSortLabel, { active: orderBy === "id", direction: orderBy === "id" ? order : "asc", onClick: () => handleRequestSort("id"), children: "ID" }) }), _jsx(TableCell, { sortDirection: orderBy === "codigo" ? order : false, children: _jsx(TableSortLabel, { active: orderBy === "codigo", direction: orderBy === "codigo" ? order : "asc", onClick: () => handleRequestSort("codigo"), children: "C\u00F3digo" }) }), _jsx(TableCell, { sortDirection: orderBy === "nombre" ? order : false, children: _jsx(TableSortLabel, { active: orderBy === "nombre", direction: orderBy === "nombre" ? order : "asc", onClick: () => handleRequestSort("nombre"), children: "Nombre" }) }), _jsx(TableCell, { children: "Descripci\u00F3n" }), _jsx(TableCell, { sortDirection: orderBy === "precio" ? order : false, children: _jsx(TableSortLabel, { active: orderBy === "precio", direction: orderBy === "precio" ? order : "asc", onClick: () => handleRequestSort("precio"), children: "Precio" }) }), _jsx(TableCell, { children: "Im\u00E1genes" }), _jsx(TableCell, { children: "Categor\u00EDas" }), _jsx(TableCell, { children: "Acciones" })] }) }), _jsx(TableBody, { children: sortedProductos
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((producto) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: producto.id }), _jsx(TableCell, { children: producto.codigo || "N/A" }), _jsx(TableCell, { children: producto.nombre }), _jsx(TableCell, { children: producto.descripcion }), _jsxs(TableCell, { children: ["\u20A1", producto.precio] }), _jsx(TableCell, { children: producto.imagenes.map((imagen) => (_jsx("img", { src: imagen.urlImagen, alt: producto.nombre, style: { width: "50px", height: "50px", marginRight: "5px" } }, imagen.id))) }), _jsx(TableCell, { children: producto.categorias.map((categoria) => (_jsx(Typography, { children: categoria.categoria.nombre }, categoria.categoriaId))) }), _jsxs(TableCell, { children: [_jsx(IconButton, { color: "primary", onClick: () => handleOpenModal(producto), children: _jsx(Edit, {}) }), _jsx(IconButton, { color: "secondary", onClick: () => handleDeleteProducto(producto.id), children: _jsx(Delete, {}) })] })] }, producto.id))) })] }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 15], component: "div", count: filteredProductos.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, labelRowsPerPage: "Filas por p\u00E1gina:", labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}` })] }), _jsx(ProductoModal, { open: openModal, onClose: handleCloseModal, onSave: handleSaveProducto, producto: currentProducto })] }));
};
export default ProductoTable;
