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
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Paper, TableSortLabel, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, Typography, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria, } from "../../Services/categoriaService";
import CategoriaModal from "./CategoriaModal";
import { useSnackbar } from "notistack";
import Loading from "../../pages/Loading";
const CategoriaTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [categorias, setCategorias] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [loading, setLoading] = useState(true); // Estado para mostrar el loader
    const [open, setOpen] = useState(false);
    const [currentCategoria, setCurrentCategoria] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [categoriaToDelete, setCategoriaToDelete] = useState(null);
    useEffect(() => {
        const fetchCategorias = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield getCategorias();
                setCategorias(data);
                setFilteredCategorias(data);
            }
            catch (error) {
                enqueueSnackbar("Error al cargar las categorías", { variant: "error" });
                console.error("Error al cargar las categorías:", error);
            }
            finally {
                setLoading(false); // Oculta el loader después de cargar los datos
            }
        });
        fetchCategorias();
    }, [enqueueSnackbar]);
    useEffect(() => {
        const filtered = categorias.filter((categoria) => categoria.nombre.toLowerCase().includes(search.toLowerCase()));
        setFilteredCategorias(filtered);
    }, [search, categorias]);
    const handleRequestSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };
    const sortedCategorias = filteredCategorias.sort((a, b) => {
        if (orderBy) {
            if (order === "asc") {
                return a[orderBy] < b[orderBy] ? -1 : 1;
            }
            return a[orderBy] > b[orderBy] ? -1 : 1;
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
    const handleOpenModal = (categoria) => {
        setCurrentCategoria(categoria || null);
        setNombre((categoria === null || categoria === void 0 ? void 0 : categoria.nombre) || "");
        setDescripcion((categoria === null || categoria === void 0 ? void 0 : categoria.descripcion) || "");
        setOpen(true);
    };
    const handleCloseModal = () => {
        setOpen(false);
        setNombre("");
        setDescripcion("");
    };
    const handleSaveCategoria = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (currentCategoria) {
                yield updateCategoria(currentCategoria.id, nombre, descripcion);
                enqueueSnackbar("Categoría actualizada exitosamente", {
                    variant: "success",
                });
            }
            else {
                yield createCategoria(nombre, descripcion);
                enqueueSnackbar("Categoría creada exitosamente", { variant: "success" });
            }
            const updatedCategorias = yield getCategorias();
            setCategorias(updatedCategorias);
            setFilteredCategorias(updatedCategorias);
            handleCloseModal();
        }
        catch (error) {
            enqueueSnackbar("Error al guardar la categoría", { variant: "error" });
        }
    });
    const handleOpenConfirm = (categoria) => {
        setCategoriaToDelete(categoria);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setCategoriaToDelete(null);
        setOpenConfirm(false);
    };
    const handleDeleteCategoria = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (categoriaToDelete) {
                yield deleteCategoria(categoriaToDelete.id);
                enqueueSnackbar("Categoría eliminada exitosamente", {
                    variant: "success",
                });
                const updatedCategorias = yield getCategorias();
                setCategorias(updatedCategorias);
                setFilteredCategorias(updatedCategorias);
                handleCloseConfirm();
            }
        }
        catch (error) {
            enqueueSnackbar("Error al eliminar la categoría", { variant: "error" });
        }
    });
    if (loading)
        return _jsx(Loading, {});
    return (_jsx(Box, { sx: { padding: "1rem" }, children: loading ? (_jsxs(Box, { sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
            }, children: [_jsx(CircularProgress, {}), _jsx(Typography, { variant: "h6", sx: { marginTop: 2 }, children: "Cargando categor\u00EDas..." })] })) : (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                    }, children: [_jsx(TextField, { label: "Buscar categor\u00EDa", variant: "outlined", value: search, onChange: handleSearchChange, sx: { flex: 1, marginRight: "1rem" } }), _jsx(IconButton, { color: "primary", onClick: () => handleOpenModal(), sx: { backgroundColor: "#1976d2", color: "white" }, children: _jsx(AddIcon, { focusable: "false" }) })] }), _jsxs(TableContainer, { component: Paper, children: [_jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { sortDirection: orderBy === "id" ? order : false, children: _jsx(TableSortLabel, { active: orderBy === "id", direction: orderBy === "id" ? order : "asc", onClick: () => handleRequestSort("id"), children: "ID" }) }), _jsx(TableCell, { sortDirection: orderBy === "nombre" ? order : false, children: _jsx(TableSortLabel, { active: orderBy === "nombre", direction: orderBy === "nombre" ? order : "asc", onClick: () => handleRequestSort("nombre"), children: "Nombre" }) }), _jsx(TableCell, { children: "Descripci\u00F3n" }), _jsx(TableCell, { children: "Acciones" })] }) }), _jsx(TableBody, { children: sortedCategorias
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((categoria) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: categoria.id }), _jsx(TableCell, { children: categoria.nombre }), _jsx(TableCell, { children: categoria.descripcion }), _jsxs(TableCell, { children: [_jsx(IconButton, { color: "primary", onClick: () => handleOpenModal(categoria), children: _jsx(EditIcon, {}) }), _jsx(IconButton, { color: "secondary", onClick: () => handleOpenConfirm(categoria), children: _jsx(DeleteIcon, {}) })] })] }, categoria.id))) })] }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 15], component: "div", count: filteredCategorias.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, labelRowsPerPage: "Filas por p\u00E1gina:", labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}` })] }), _jsx(CategoriaModal, { open: open, onClose: handleCloseModal, onSave: handleSaveCategoria, nombre: nombre, descripcion: descripcion, setNombre: setNombre, setDescripcion: setDescripcion, isEditing: !!currentCategoria }), _jsxs(Dialog, { open: openConfirm, onClose: handleCloseConfirm, children: [_jsx(DialogTitle, { children: "Confirmar eliminaci\u00F3n" }), _jsx(DialogContent, { children: _jsxs(DialogContentText, { children: ["\u00BFEst\u00E1s seguro de que deseas eliminar la categor\u00EDa \"", categoriaToDelete === null || categoriaToDelete === void 0 ? void 0 : categoriaToDelete.nombre, "\"?"] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseConfirm, children: "Cancelar" }), _jsx(Button, { onClick: handleDeleteCategoria, color: "secondary", variant: "contained", children: "Eliminar" })] })] })] })) }));
};
export default CategoriaTable;
