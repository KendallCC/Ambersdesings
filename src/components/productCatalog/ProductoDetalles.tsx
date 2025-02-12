import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Modal,
  Paper,
} from "@mui/material";
import { Producto } from "../../interfaces/producto";
import { getProductoById } from "../../Services/productoService";
import Carousel from "react-material-ui-carousel";

const ProductoDetalles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      if (id) {
        try {
          const data = await getProductoById(parseInt(id, 10));
          
          
          setProducto(data);
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducto();
  }, [id]);

  const handleImageClick = (url: string) => {
    setSelectedImage(url); // Abre el modal con la imagen seleccionada
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Cierra el modal
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
        <CircularProgress />
      </Box>
    );
  }

  if (!producto) {
    return <Typography>No se encontró el producto.</Typography>;
  }

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ marginBottom: "1rem", color: "#333" }}
      >
        {producto.nombre}
      </Typography>
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ marginBottom: "1rem", color: "#555" }}
      >
        Código: {producto.codigo || "N/A"}
      </Typography>
      <Carousel
        indicators={true}
        navButtonsAlwaysVisible={true}
        sx={{ marginBottom: "1.5rem", borderRadius: "8px", overflow: "hidden" }}
      >
        {producto.imagenes.map((imagen) => (
          <Box
            key={imagen.id}
            sx={{
              position: "relative",
              backgroundColor: "#f0f0f0", // Fondo para rellenar el espacio sobrante
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              cursor: "zoom-in",
              height: "400px", // Asegurar que todas las imágenes tengan la misma altura
            }}
            onClick={() => handleImageClick(imagen.urlImagen)}
          >
            <img
              src={imagen.urlImagen}
              alt={producto.nombre}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain", // Asegura que la imagen se ajuste sin recortarse
                borderRadius: "8px",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Box>
        ))}
      </Carousel>
      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{ marginBottom: "1rem", fontWeight: "bold", color: "#444" }}
        >
          Detalles del Producto
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "0.5rem", color: "#555" }}>
          {producto.descripcion}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
          Precio: ₡{new Intl.NumberFormat("es-CR").format(producto.precio)}
        </Typography>
      </Paper>
      <Button
        variant="contained"
        color="success"
        sx={{
          display: "block",
          margin: "0 auto",
          padding: "0.8rem 2rem",
          fontSize: "1rem",
        }}
        href={`https://wa.me/62469920?text=${encodeURIComponent(
          `Hola, estoy interesado en el producto: ${producto.nombre} (Código: ${producto.codigo || "N/A"}), me gustaría saber más información.`
        )}`}
        target="_blank"
      >
        Consultar por WhatsApp
      </Button>

      {/* Modal para mostrar la imagen seleccionada */}
      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={selectedImage || ""}
          alt="Imagen ampliada"
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            objectFit: "contain",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Modal>
    </Box>
  );
};

export default ProductoDetalles;
