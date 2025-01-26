import React, { useState } from "react";
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

const drawerWidth = 240;

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Acerca de nosotros", path: "/about" },
];

const categories = [
  {
    id: 1,
    nombre: "Bolsos",
    subcategorias: [
      { id: 13, nombre: "Bolsos Cruzados" },
      { id: 14, nombre: "Bolsos Casuales" },
    ],
  },
  {
    id: 2,
    nombre: "Salveques",
    subcategorias: [
      { id: 16, nombre: "Salveques de Hombre" },
      { id: 17, nombre: "Salveques de Mujer" },
    ],
  },
  {
    id: 3,
    nombre: "Pulseras",
    subcategorias: [
      { id: 20, nombre: "Pulseras 14 de Febrero" },
      { id: 23, nombre: "Pulseras Macrame para Compartir" },
      { id: 24, nombre: "Pulseras Macrame Personalizadas" },  
    ],
  },
  {
    id: 4,
    nombre: "Otros",
    subcategorias: [
      { id: 18, nombre: "Mochila de Viaje" },
      { id: 19, nombre: "Relojes" },
      { id: 25, nombre: "Acero" }
    ],
  },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setAnchorEl(null);
    setSubMenuAnchorEl(null);
    setSelectedCategory([]);
    setMobileOpen(false); // Cierra el menú móvil
  };

  const handleSubMenuOpen = (event: React.MouseEvent<HTMLElement>, subcategories: any[]) => {
    setSubMenuAnchorEl(event.currentTarget);
    setSelectedCategory(subcategories);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
    setMobileOpen(false); // Cierra el menú móvil
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
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
      </List>
      <Divider />
      {/* Categorías como Dropdown en Móvil */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleMainMenuOpen}>
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
              fontWeight: "bolder",
              textDecoration: "underline",
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
            <Button
              onClick={handleMainMenuOpen}
              sx={{ color: "black", fontWeight: "bold", textDecoration: "underline" }}
              aria-controls="category-menu"
              aria-haspopup="true"
            >
              Categorías
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMainMenuClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            onClick={(e) => handleSubMenuOpen(e, category.subcategorias)}
          >
            {category.nombre}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={subMenuAnchorEl}
        open={Boolean(subMenuAnchorEl)}
        onClose={handleSubMenuClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {selectedCategory.map((subcategory) => (
          <MenuItem
            key={subcategory.id}
            component={Link}
            to={`/categorias/${subcategory.id}`}
            onClick={handleMainMenuClose}
          >
            {subcategory.nombre}
          </MenuItem>
        ))}
      </Menu>

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
