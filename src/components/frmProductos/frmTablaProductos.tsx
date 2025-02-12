import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  TableSortLabel,
  IconButton,
  CircularProgress,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// Importamos también Visibility y Link
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../../Services/productoService";
import { getCategorias } from "../../Services/categoriaService";
import { Producto } from "../../interfaces/producto";
import { Categoria } from "../../interfaces/Categoria";
import { useSnackbar } from "notistack";
import ProductoModal from "./ProductoModal";
import socket from "../../Services/socket";

type Order = "asc" | "desc";

const ProductoTable: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [productos, setProductos] = useState<Producto[]>([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  // Se utiliza searchInput para lo que escribe el usuario y search para la consulta real
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState<number | "">("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Producto>("id");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState<Producto | null>(null);

  // Estados para el modal de confirmación
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState<Producto | null>(null);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const { productos, totalProductos } = await getProductos(
        page + 1,
        rowsPerPage,
        search,
        selectedCategoria === "" ? undefined : Number(selectedCategoria)
      );
      setProductos(productos);
      setTotalProductos(totalProductos);
    } catch (error) {
      enqueueSnackbar("Error al cargar los productos", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [page, rowsPerPage, search, selectedCategoria]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        enqueueSnackbar("Error al cargar las categorías", { variant: "error" });
      }
    };

    fetchCategorias();
  }, [enqueueSnackbar]);

  // Escuchamos los eventos de Socket.io para actualizaciones en tiempo real (de otros usuarios)
  useEffect(() => {
    socket.on("producto_creado", (producto: Producto) => {
      console.log("📥 Evento recibido: producto_creado", producto);
      setProductos((prev) => [...prev, producto]);
      enqueueSnackbar("Nuevo producto agregado en tiempo real", { variant: "success" });
    });

    socket.on(
      "producto_actualizado",
      ({ id, producto }: { id: number; producto: Producto }) => {
        console.log("📥 Evento recibido: producto_actualizado", producto);
        setProductos((prev) => prev.map((p) => (p.id === id ? producto : p)));
        enqueueSnackbar("Producto actualizado en tiempo real", { variant: "info" });
      }
    );

    socket.on("producto_eliminado", ({ id }: { id: number }) => {
      console.log("📥 Evento recibido: producto_eliminado", id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      enqueueSnackbar("Producto eliminado en tiempo real", { variant: "error" });
    });

    return () => {
      socket.off("producto_creado");
      socket.off("producto_actualizado");
      socket.off("producto_eliminado");
    };
  }, []);

  const handleRequestSort = (property: keyof Producto) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Actualizamos el valor del input sin disparar la búsqueda
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Al presionar el botón, actualizamos el estado "search" y reiniciamos la página
  const handleSearchButtonClick = () => {
    setSearch(searchInput);
    setPage(0);
  };

  const handleCategoriaChange = async (event: SelectChangeEvent<number | "">) => {
    const value = event.target.value;
    setSelectedCategoria(value === "" ? "" : Number(value));
    setPage(0);
    setLoading(true);
    try {
      const { productos, totalProductos } = await getProductos(
        1,
        rowsPerPage,
        search,
        value === "" ? undefined : Number(value)
      );
      setProductos(productos);
      setTotalProductos(totalProductos);
    } catch (error) {
      enqueueSnackbar("Error al cargar productos por categoría", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProducto = () => {
    setCurrentProducto(null);
    setOpenModal(true);
  };

  const handleEditProducto = (producto: Producto) => {
    setCurrentProducto(producto);
    setOpenModal(true);
  };

  const handleSaveProducto = async (data: {
    nombre: string;
    descripcion: string;
    precio: number;
    codigo: string;
    imagenes: { urlImagen: string }[];
    categorias: { categoriaId: number }[];
  }) => {
    try {
      if (currentProducto) {
        await updateProducto(currentProducto.id, data);
        enqueueSnackbar("Producto actualizado exitosamente", { variant: "success" });
      } else {
        await createProducto(
          data.nombre,
          data.descripcion,
          data.precio,
          data.imagenes,
          data.categorias,
          data.codigo
        );
        enqueueSnackbar("Producto creado exitosamente", { variant: "success" });
      }
      fetchProductos();
      setOpenModal(false);
    } catch (error) {
      enqueueSnackbar("Error al guardar el producto", { variant: "error" });
    }
  };

  const handleOpenConfirm = (producto: Producto) => {
    setProductoToDelete(producto);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setProductoToDelete(null);
    setOpenConfirm(false);
  };

  const handleDeleteProducto = async () => {
    try {
      if (productoToDelete) {
        await deleteProducto(productoToDelete.id);
        enqueueSnackbar("Producto eliminado exitosamente", { variant: "success" });
        fetchProductos();
      }
    } catch (error) {
      enqueueSnackbar("Error al eliminar el producto", { variant: "error" });
    } finally {
      handleCloseConfirm();
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Cargando productos...
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ padding: "1rem" }}>
      {/* Barra de búsqueda y filtros */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2, // Separa los elementos en ambas vistas
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label="Buscar producto (ID, nombre o código)"
          variant="outlined"
          value={searchInput}
          onChange={handleSearchInputChange}
          sx={{ flex: 1 }}
        />

        <Button variant="contained" color="primary" onClick={handleSearchButtonClick}>
          Buscar
        </Button>

        <Select
          value={selectedCategoria}
          onChange={handleCategoriaChange}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">
            <em>Todas las categorías</em>
          </MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </MenuItem>
          ))}
        </Select>

        <Button variant="contained" color="primary" onClick={handleAddProducto}>
          Agregar Producto
        </Button>
      </Box>

      {/* Lista de productos según dispositivo */}
      {isMobile ? (
        // Vista Mobile: cada producto se muestra en un "card" simple
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {productos.map((producto) => (
            <Paper key={producto.id} sx={{ padding: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {producto.nombre}
              </Typography>
              <Typography variant="body2">Código: {producto.codigo || "N/A"}</Typography>
              <Typography variant="body2">
                Precio: ₡{new Intl.NumberFormat("es-CR").format(producto.precio)}
              </Typography>
              {/* Iconos de acciones en móvil */}
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {/* Botón "Ver producto" */}
                <IconButton
                  component={Link}
                  to={`/producto/${producto.id}`}
                  color="primary"
                >
                  <Visibility />
                </IconButton>
                {/* Botón "Editar" */}
                <IconButton color="primary" onClick={() => handleEditProducto(producto)}>
                  <Edit />
                </IconButton>
                {/* Botón "Eliminar" */}
                <IconButton color="secondary" onClick={() => handleOpenConfirm(producto)}>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        // Vista Desktop: tabla completa
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === "id" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleRequestSort("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === "codigo" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "codigo"}
                    direction={orderBy === "codigo" ? order : "asc"}
                    onClick={() => handleRequestSort("codigo")}
                  >
                    Código
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === "nombre" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "nombre"}
                    direction={orderBy === "nombre" ? order : "asc"}
                    onClick={() => handleRequestSort("nombre")}
                  >
                    Nombre
                  </TableSortLabel>
                </TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell sortDirection={orderBy === "precio" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "precio"}
                    direction={orderBy === "precio" ? order : "asc"}
                    onClick={() => handleRequestSort("precio")}
                  >
                    Precio
                  </TableSortLabel>
                </TableCell>
                <TableCell>Imágenes</TableCell>
                <TableCell>Categorías</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>{producto.id}</TableCell>
                  <TableCell>{producto.codigo || "N/A"}</TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{producto.descripcion}</TableCell>
                  <TableCell>
                    ₡{new Intl.NumberFormat("es-CR").format(producto.precio)}
                  </TableCell>
                  <TableCell>
                    {producto.imagenes.map((imagen) => (
                      <img
                        key={imagen.id}
                        src={imagen.urlImagen}
                        alt={producto.nombre}
                        style={{ width: "50px", height: "50px", marginRight: "5px" }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    {producto.categorias.map((categoria) => (
                      <Typography key={categoria.categoriaId}>
                        {categoria.categoria.nombre}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    {/* Botón "Ver producto" */}
                    <IconButton
                      component={Link}
                      to={`/producto/${producto.id}`}
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                    {/* Botón "Editar" */}
                    <IconButton color="primary" onClick={() => handleEditProducto(producto)}>
                      <Edit />
                    </IconButton>
                    {/* Botón "Eliminar" */}
                    <IconButton color="secondary" onClick={() => handleOpenConfirm(producto)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Paginador siempre visible */}
      <Box sx={{ mt: 2 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalProductos}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </Box>

      <ProductoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveProducto}
        producto={currentProducto}
      />

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            ¿Estás seguro de que deseas eliminar el producto "{productoToDelete?.nombre}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteProducto} color="secondary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductoTable;
