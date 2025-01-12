import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography, Container } from "@mui/material";
const Footer = () => {
    return (_jsx(Box, { component: "footer", sx: {
            backgroundColor: "#d9d9d9", // Fondo gris claro
            color: "#000", // Texto negro
            padding: "1rem 0",
            mt: "auto", // Empuja el footer hacia el fondo
            textAlign: "center",
            borderTop: "1px solid #ccc", // Línea sutil arriba
        }, children: _jsx(Container, { maxWidth: "lg", children: _jsx(Typography, { variant: "body2", sx: { fontWeight: "bold" }, children: "\u00A9 2025 Amber Designs. Todos los derechos reservados." }) }) }));
};
export default Footer;
