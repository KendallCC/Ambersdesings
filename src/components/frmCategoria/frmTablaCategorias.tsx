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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../../Services/categoriaService";
import { Categoria } from "../../interfaces/Categoria";
import CategoriaModal from "./CategoriaModal";
import { useSnackbar } from "notistack";
import Loading from "../../pages/Loading";



type Order = "asc" | "desc";

const CategoriaTable: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filteredCategorias, setFilteredCategorias] = useState<Categoria[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Categoria>("id");
  const [loading, setLoading] = useState(true); // Estado para mostrar el loader

  const [open, setOpen] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState<Categoria | null>(
    null
  );
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(
    null
  );

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
        setFilteredCategorias(data);
      } catch (error) {
        enqueueSnackbar("Error al cargar las categorías", { variant: "error" });
        console.error("Error al cargar las categorías:", error);
      } finally {
        setLoading(false); // Oculta el loader después de cargar los datos
      }
    };

    fetchCategorias();
  }, [enqueueSnackbar]);

  useEffect(() => {
    const filtered = categorias.filter((categoria) =>
      categoria.nombre.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategorias(filtered);
  }, [search, categorias]);

  const handleRequestSort = (property: keyof Categoria) => {
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

  const handleOpenModal = (categoria?: Categoria) => {
    setCurrentCategoria(categoria || null);
    setNombre(categoria?.nombre || "");
    setDescripcion(categoria?.descripcion || "");
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNombre("");
    setDescripcion("");
  };

  const handleSaveCategoria = async () => {
    try {
      if (currentCategoria) {
        await updateCategoria(currentCategoria.id, nombre, descripcion);
        enqueueSnackbar("Categoría actualizada exitosamente", {
          variant: "success",
        });
      } else {
        await createCategoria(nombre, descripcion);
        enqueueSnackbar("Categoría creada exitosamente", { variant: "success" });
      }
      const updatedCategorias = await getCategorias();
      setCategorias(updatedCategorias);
      setFilteredCategorias(updatedCategorias);
      handleCloseModal();
    } catch (error) {
      enqueueSnackbar("Error al guardar la categoría", { variant: "error" });
    }
  };

  const handleOpenConfirm = (categoria: Categoria) => {
    setCategoriaToDelete(categoria);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setCategoriaToDelete(null);
    setOpenConfirm(false);
  };

  const handleDeleteCategoria = async () => {
    try {
      if (categoriaToDelete) {
        await deleteCategoria(categoriaToDelete.id);
        enqueueSnackbar("Categoría eliminada exitosamente", {
          variant: "success",
        });
        const updatedCategorias = await getCategorias();
        setCategorias(updatedCategorias);
        setFilteredCategorias(updatedCategorias);
        handleCloseConfirm();
      }
    } catch (error) {
      enqueueSnackbar("Error al eliminar la categoría", { variant: "error" });
    }
  };

  if (loading) return <Loading />;
  
  return (
    <Box sx={{ padding: "1rem" }}>
      {/* Mostrar el loader mientras carga */}
      {loading ? (
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
            Cargando categorías...
          </Typography>
        </Box>
      ) : (
        <>
          {/* Campo de búsqueda y botón de agregar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <TextField
              label="Buscar categoría"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              sx={{ flex: 1, marginRight: "1rem" }}
            />
            <IconButton
              color="primary"
              onClick={() => handleOpenModal()}
              sx={{ backgroundColor: "#1976d2", color: "white" }}
            >
              <AddIcon focusable="false"/>
            </IconButton>
          </Box>

          {/* Tabla de categorías */}
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
                  <TableCell
                    sortDirection={orderBy === "nombre" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "nombre"}
                      direction={orderBy === "nombre" ? order : "asc"}
                      onClick={() => handleRequestSort("nombre")}
                    >
                      Nombre
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCategorias
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((categoria) => (
                    <TableRow key={categoria.id}>
                      <TableCell>{categoria.id}</TableCell>
                      <TableCell>{categoria.nombre}</TableCell>
                      <TableCell>{categoria.descripcion}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenModal(categoria)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleOpenConfirm(categoria)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={filteredCategorias.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${
                  count !== -1 ? count : `más de ${to}`
                }`
              }
            />
          </TableContainer>

          {/* Modal para agregar/editar */}
          <CategoriaModal
            open={open}
            onClose={handleCloseModal}
            onSave={handleSaveCategoria}
            nombre={nombre}
            descripcion={descripcion}
            setNombre={setNombre}
            setDescripcion={setDescripcion}
            isEditing={!!currentCategoria}
          />

          {/* Confirmación de eliminación */}
          <Dialog open={openConfirm} onClose={handleCloseConfirm}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar la categoría "
                {categoriaToDelete?.nombre}"?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirm}>Cancelar</Button>
              <Button
                onClick={handleDeleteCategoria}
                color="secondary"
                variant="contained"
              >
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default CategoriaTable;
