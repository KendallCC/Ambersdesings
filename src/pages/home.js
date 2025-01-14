import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "../styles/home.css";
import Carousel from "react-material-ui-carousel";
import Image1 from "../assets/logo.png";
import Image2 from "../assets/infoEnvios.png";
import Image3 from "../assets/comocomprar.png";
import Image4 from "../assets/comohacerelpago.png";
import Image6 from "../assets/consejos.png";
import Image7 from "../assets/horario.png";
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
                            maxWidth: "100%",
                            margin: "0 auto",
                        }, children: [Image1, Image7, Image2, Image3, Image4, Image6].map((image, index) => (_jsx("div", { style: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#f5e8da",
                                borderRadius: "8px",
                                height: "40vh", // Altura relativa para pantallas pequeñas
                                maxHeight: "500px",
                                overflow: "hidden",
                                cursor: "zoom-in",
                            }, onClick: () => handleImageClick(image), children: _jsx("img", { src: image, alt: `Amber Designs Image ${index + 1}`, style: {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain", // Ajustar la imagen sin recortar
                                } }) }, index))) }), _jsx("p", { style: { fontWeight: "bolder", fontSize: "1.2rem", textAlign: "center" }, children: "Nuestra tienda ofrece una selecci\u00F3n \u00FAnica de collares, pulseras y bolsos hechos con amor y dise\u00F1ados para destacar tu personalidad. Explora nuestras categor\u00EDas y encuentra la pieza perfecta para ti o un ser querido." })] }), _jsx(Modal, { open: !!selectedImage, onClose: handleCloseModal, sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                }, children: _jsx(Box, { sx: {
                        outline: "none",
                        width: "80vw",
                        height: "80vh",
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
