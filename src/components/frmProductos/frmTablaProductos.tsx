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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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
import { useDebounce } from "../hooks/useDebounce";
type Order = "asc" | "desc";

const ProductoTable: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
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
        debouncedSearch,
        selectedCategoria === "" ? undefined : Number(selectedCategoria) // Filtra por categoría si está seleccionada
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
  }, [page, rowsPerPage, debouncedSearch]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleCategoriaChange = async (event: SelectChangeEvent<number | "">) => {
    const value = event.target.value;
    setSelectedCategoria(value === "" ? "" : Number(value));
    setPage(0);
  
    setLoading(true);
    try {
      const { productos, totalProductos } = await getProductos(
        1, // Resetea a la primera página
        rowsPerPage,
        search,
        value === "" ? undefined : Number(value) // Si no hay categoría seleccionada, no se pasa categoriaId
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label="Buscar producto (ID, nombre o código)"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: 1, marginRight: "1rem" }}
        />
        <Select
          value={selectedCategoria}
          onChange={handleCategoriaChange}
          displayEmpty
          sx={{ minWidth: 200, marginRight: "1rem" }}
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

      <TableContainer component={Paper}>
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
                  <IconButton
                    color="primary"
                    onClick={() => handleEditProducto(producto)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenConfirm(producto)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      </TableContainer>

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
            ¿Estás seguro de que deseas eliminar el producto "
            {productoToDelete?.nombre}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteProducto}
            color="secondary"
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductoTable;
