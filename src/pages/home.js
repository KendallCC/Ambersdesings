import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "../styles/home.css";
import Carousel from "react-material-ui-carousel";
import Image1 from "../assets/logo.png"; // Ejemplo de imagen 1
import Image2 from "../assets/infoEnvios.png"; // Ejemplo de imagen 2
import Image3 from "../assets/comocomprar.png"; // Ejemplo de imagen 3
import Image4 from "../assets/comohacerelpago.png"; // Ejemplo de imagen 2
3;
import Image6 from "../assets/consejos.png"; // Ejemplo de imagen 3
import Image7 from "../assets/horario.png"; // Ejemplo de imagen 3
import { Modal, Box } from "@mui/material";
const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (image) => {
        setSelectedImage(image); // Abrir modal con la imagen seleccionada
    };
    const handleCloseModal = () => {
        setSelectedImage(null); // Cerrar modal
    };
    return (_jsxs("div", { className: "home-container", children: [_jsx("div", { className: "parallax", children: _jsxs("div", { className: "parallax-content", children: [_jsx("h1", { children: "Amber Designs" }), _jsx("p", { children: "Bisuter\u00EDa que brilla a tu manera." })] }) }), _jsxs("section", { className: "description-section", children: [_jsx("h2", { children: "Bienvenidos a" }), _jsx(Carousel, { indicators: true, navButtonsAlwaysVisible: true, sx: {
                            marginBottom: "2rem",
                            borderRadius: "8px",
                            overflow: "hidden",
                            maxWidth: "1200px",
                            margin: "0 auto", // Centrar el carrusel
                        }, children: [Image1, Image7, Image2, Image3, Image4, Image6].map((image, index) => (_jsx("div", { style: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#f5e8da",
                                borderRadius: "8px",
                                height: "600px", // Altura más grande para las imágenes
                                overflow: "hidden",
                                cursor: "zoom-in",
                            }, onClick: () => handleImageClick(image), children: _jsx("img", { src: image, alt: `Amber Designs Image ${index + 1}`, style: {
                                    maxWidth: "100%",
                                    height: "100%",
                                    objectFit: "cover", // Ajustar la imagen para que ocupe más espacio
                                } }) }, index))) }), _jsx("p", { style: { fontWeight: "bolder", fontSize: "1.5rem" }, children: "Nuestra tienda ofrece una selecci\u00F3n \u00FAnica de collares, pulseras y bolsos hechos con amor y dise\u00F1ados para destacar tu personalidad. Explora nuestras categor\u00EDas y encuentra la pieza perfecta para ti o un ser querido." })] }), _jsx(Modal, { open: !!selectedImage, onClose: handleCloseModal, sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                }, children: _jsx(Box, { sx: {
                        outline: "none",
                        width: "80vw", // Ancho máximo para controlar el tamaño
                        height: "80vh", // Altura máxima para controlar el tamaño
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }, children: _jsx("img", { src: selectedImage || "", alt: "Imagen ampliada", style: {
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                        } }) }) })] }));
};
export default Home;
