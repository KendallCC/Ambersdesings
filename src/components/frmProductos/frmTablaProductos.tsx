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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../../Services/productoService";
import { getCategorias } from "../../Services/categoriaService";
import { Producto } from "../../interfaces/producto";
import { Categoria } from "../../interfaces/Categoria";
import { useSnackbar } from "notistack";
import ProductoModal from "./ProductoModal";

type Order = "asc" | "desc";

const ProductoTable: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState<number | "">("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Producto>("id");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
        setFilteredProductos(data);
      } catch (error) {
        enqueueSnackbar("Error al cargar los productos", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        enqueueSnackbar("Error al cargar las categorías", { variant: "error" });
      }
    };

    fetchProductos();
    fetchCategorias();
  }, [enqueueSnackbar]);

  useEffect(() => {
    let filtered = productos;

    if (search) {
      filtered = filtered.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(search.toLowerCase()) ||
          (producto.codigo?.toLowerCase().includes(search.toLowerCase())) ||
          producto.id.toString().includes(search)
      );
    }

    if (selectedCategoria) {
      filtered = filtered.filter((producto) =>
        producto.categorias.some((categoria) => categoria.categoriaId === selectedCategoria)
      );
    }

    setFilteredProductos(filtered);
  }, [search, selectedCategoria, productos]);

  const handleRequestSort = (property: keyof Producto) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedProductos = filteredProductos.sort((a, b) => {
    if (!orderBy) return 0;
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
  };

  const handleCategoriaChange = (event: SelectChangeEvent<number | "">) => {
    const value = event.target.value;
    setSelectedCategoria(value === "" ? "" : Number(value));
  };

  const handleAddProducto = () => {
    setCurrentProducto(null); // Asegura que no haya un producto seleccionado
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
      const updatedProductos = await getProductos();
      setProductos(updatedProductos);
      setFilteredProductos(updatedProductos);
      setOpenModal(false);
    } catch (error) {
      enqueueSnackbar("Error al guardar el producto", { variant: "error" });
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
            {sortedProductos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((producto) => (
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
                      onClick={() => deleteProducto(producto.id)}
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
          count={filteredProductos.length}
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
    </Box>
  );
};

export default ProductoTable;
