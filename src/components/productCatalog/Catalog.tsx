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
import { getProductosPorCategoria } from "../../Services/productoService";
import { Producto } from "../../interfaces/producto";

const CategoriaProductos: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Captura el ID de la categoría desde la URL
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8; // Número de productos por página
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      if (id) {
        try {
          const data = await getProductosPorCategoria(parseInt(id, 10));
          setProductos(data);
        } catch (error) {
          console.error("Error al cargar productos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductos();
  }, [id]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleViewDetails = (productoId: number) => {
    navigate(`/producto/${productoId}`); // Navega a la página de detalles del producto
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography variant="h6">Cargando productos...</Typography>
      </Box>
    );
  }

  const paginatedProductos = productos.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Productos de la Categoría
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {paginatedProductos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={producto.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={
                  producto.imagenes.length > 0
                    ? producto.imagenes[0].urlImagen
                    : "https://via.placeholder.com/300x200"
                }
                alt={producto.nombre}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                ₡{producto.precio}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 1 }}
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
          count={Math.ceil(productos.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CategoriaProductos;