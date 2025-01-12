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
import { Categoria } from "../interfaces/Categoria"; // Interfaz de categoría

const drawerWidth = 240;

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Acerca de nosotros", path: "/about" },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Estado para las categorías dinámicas

  // Obtener categorías dinámicamente al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias(); // Obtén las categorías desde el servicio
        setCategorias(data); // Actualiza el estado con las categorías obtenidas
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleCategorySelect = () => {
    setMobileMenuAnchor(null); // Cierra el menú desplegable
    setMobileOpen(false); // Cierra el Drawer
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding >
            <ListItemButton component={Link} to={item.path} onClick={() => setMobileOpen(false)}>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", textDecoration: "underline" }}>
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {/* Categorías como Dropdown en Móvil */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleMobileMenuOpen}>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", textDecoration: "underline" }}>
                    Categorías
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </List>
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
      >
        {categorias.map((categoria) => (
          <MenuItem
            key={categoria.id}
            component={Link}
            to={`/categorias/${categoria.id}`} // Ajusta la ruta según el id de la categoría
            onClick={handleCategorySelect}
          >
            {categoria.nombre}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#bb695b",
          height: "auto",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", sm: "flex-start" },
            alignItems: "center",
            height: "56px",
          }}
        >
          {/* Icono de menú en móvil */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>

          {/* Título en móvil */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              display: { xs: "block", sm: "none" },
              color: "black",
              fontWeight:"bolder",
              textDecoration: "underline"
            }}
          >
            Amber Designs
          </Typography>

          {/* Botones en versión de escritorio */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: "black", fontWeight: "bold", textDecoration: "underline" }}
              >
                {item.label}
              </Button>
            ))}
            {/* Categorías como Dropdown en Escritorio */}
            <Button
              onClick={handleMenuOpen}
              sx={{ color: "black", fontWeight: "bold", textDecoration: "underline" }}
              aria-controls="dropdown-menu"
              aria-haspopup="true"
            >
              Categorías
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {categorias.map((categoria) => (
                <MenuItem
                  key={categoria.id}
                  component={Link}
                  to={`/categorias/${categoria.id}`}
                  onClick={handleMenuClose}
                >
                  {categoria.nombre}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento al abrir
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{}}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
