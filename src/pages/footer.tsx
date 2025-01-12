import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#d9d9d9", // Fondo gris claro
        color: "#000", // Texto negro
        padding: "1rem 0",
        mt: "auto", // Empuja el footer hacia el fondo
        textAlign: "center",
        borderTop: "1px solid #ccc", // Línea sutil arriba
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          &copy; 2025 Amber Designs. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
