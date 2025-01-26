import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Pagination,
} from "@mui/material";
import { getProductosPorCategoriaPaginados } from "../../Services/productoService";
import { Producto } from "../../interfaces/producto";
import { Skeleton } from "@mui/material";
import "../../styles/CategoriaProductos.css";

const CategoriaProductos: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la categoría
  const [productosPorPagina, setProductosPorPagina] = useState<{
    [page: number]: Producto[];
  }>({});
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [categoriaNombre, setCategoriaNombre] = useState<string | null>(null); // Nuevo estado para el nombre de la categoría
  const rowsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    // Resetear el estado cuando cambia la categoría (id)
    setProductosPorPagina({});
    setPage(1); // Reinicia a la primera página cuando cambie la categoría
    setTotalPages(0);
    setCategoriaNombre(null); // Reinicia el nombre de la categoría
  }, [id]);

  useEffect(() => {
    const fetchProductos = async (currentPage: number) => {
      if (productosPorPagina[currentPage]) {
        return;
      }

      setLoading(true);
      try {
        if (id) {
          const { productos, totalPages } = await getProductosPorCategoriaPaginados(
            id,
            currentPage,
            rowsPerPage
          );

          setProductosPorPagina((prev) => ({ ...prev, [currentPage]: productos }));
          setTotalPages(totalPages);

          // Si hay productos, obtener el nombre de la categoría desde el primer producto
          if (productos.length > 0) {
            setCategoriaNombre(  productos[0].categorias[0]?.categoria?.nombre || "Categoría no encontrada");
          } else {
            setCategoriaNombre("Categoría no encontrada");
          }
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setCategoriaNombre("Categoría no encontrada");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos(page);
  }, [id, page, productosPorPagina]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleViewDetails = (productoId: number) => {
    navigate(`/producto/${productoId}`);
  };

  const productos = productosPorPagina[page] || [];

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
        sx={{ marginBottom: "1rem" }}
      >
        {categoriaNombre || "Cargando categoría..."}
      </Typography>
      {loading ? (
        <Box className="skeleton-container">
          <Grid container spacing={2} justifyContent="center">
            {Array.from(new Array(rowsPerPage)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{
                    width: "100%",
                    height: 200,
                    borderRadius: "8px",
                  }}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{ width: "80%", margin: "0.5rem auto" }}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{ width: "60%", margin: "0.5rem auto" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : productos.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Typography variant="h6">No se encontraron productos en esta categoría.</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {productos.map((producto) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={producto.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    padding: 1.5,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      producto.imagenes.length > 0
                        ? producto.imagenes[0].urlImagen
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={producto.nombre}
                    sx={{
                      objectFit: "contain",
                      maxHeight: 200,
                    }}
                    loading="lazy"
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {producto.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₡{new Intl.NumberFormat("es-CR").format(producto.precio)}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 1.5 }}
                      onClick={() => handleViewDetails(producto.id)}
                    >
                      Ver más
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CategoriaProductos;
