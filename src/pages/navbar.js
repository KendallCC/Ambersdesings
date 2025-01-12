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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { getCategorias } from "../Services/categoriaService"; // Función para obtener las categorías
const drawerWidth = 240;
const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Acerca de nosotros", path: "/about" },
];
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);
    const [categorias, setCategorias] = useState([]); // Estado para las categorías dinámicas
    // Obtener categorías dinámicamente al montar el componente
    useEffect(() => {
        const fetchCategorias = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield getCategorias(); // Obtén las categorías desde el servicio
                setCategorias(data); // Actualiza el estado con las categorías obtenidas
            }
            catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        });
        fetchCategorias();
    }, []);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };
    const handleCategorySelect = () => {
        setMobileMenuAnchor(null); // Cierra el menú desplegable
        setMobileOpen(false); // Cierra el Drawer
    };
    const drawer = (_jsxs(Box, { sx: { textAlign: "center" }, children: [_jsx(Divider, {}), _jsxs(List, { children: [navItems.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { component: Link, to: item.path, onClick: () => setMobileOpen(false), children: _jsx(ListItemText, { primary: _jsx(Typography, { sx: { fontWeight: "bold", textDecoration: "underline" }, children: item.label }) }) }) }, item.label))), _jsx(Divider, {}), _jsx(List, { children: _jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { onClick: handleMobileMenuOpen, children: _jsx(ListItemText, { primary: _jsx(Typography, { sx: { fontWeight: "bold", textDecoration: "underline" }, children: "Categor\u00EDas" }) }) }) }) })] }), _jsx(Menu, { anchorEl: mobileMenuAnchor, open: Boolean(mobileMenuAnchor), onClose: handleMobileMenuClose, children: categorias.map((categoria) => (_jsx(MenuItem, { component: Link, to: `/categorias/${categoria.id}`, onClick: handleCategorySelect, children: categoria.nombre }, categoria.id))) })] }));
    return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(AppBar, { component: "nav", sx: {
                    backgroundColor: "#bb695b",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    overflow: "hidden",
                }, children: _jsxs(Toolbar, { sx: {
                        display: "flex",
                        justifyContent: { xs: "space-between", sm: "flex-start" },
                        alignItems: "center",
                        height: "56px",
                    }, children: [_jsx(IconButton, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: handleDrawerToggle, sx: { display: { sm: "none" }, color: "black" }, children: _jsx(MenuIcon, {}) }), _jsx(Typography, { variant: "h6", component: "div", sx: {
                                flexGrow: 1,
                                textAlign: "center",
                                display: { xs: "block", sm: "none" },
                                color: "black",
                                fontWeight: "bolder",
                                textDecoration: "underline"
                            }, children: "Amber Designs" }), _jsxs(Box, { sx: { flexGrow: 1, display: { xs: "none", sm: "flex" } }, children: [navItems.map((item) => (_jsx(Button, { component: Link, to: item.path, sx: { color: "black", fontWeight: "bold", textDecoration: "underline" }, children: item.label }, item.label))), _jsx(Button, { onClick: handleMenuOpen, sx: { color: "black", fontWeight: "bold", textDecoration: "underline" }, "aria-controls": "dropdown-menu", "aria-haspopup": "true", children: "Categor\u00EDas" }), _jsx(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose, children: categorias.map((categoria) => (_jsx(MenuItem, { component: Link, to: `/categorias/${categoria.id}`, onClick: handleMenuClose, children: categoria.nombre }, categoria.id))) })] })] }) }), _jsx(Drawer, { variant: "temporary", open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                    keepMounted: true, // Mejor rendimiento al abrir
                }, sx: {
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }, children: drawer }), _jsx(Box, { component: "main", sx: {}, children: _jsx(Toolbar, {}) })] }));
};
export default Navbar;
