var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Modal, Paper, } from "@mui/material";
import { getProductoById } from "../../Services/productoService";
import Carousel from "react-material-ui-carousel";
const ProductoDetalles = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        const fetchProducto = () => __awaiter(void 0, void 0, void 0, function* () {
            if (id) {
                try {
                    const data = yield getProductoById(parseInt(id, 10));
                    console.log(data);
                    setProducto(data);
                }
                catch (error) {
                    console.error("Error al cargar el producto:", error);
                }
                finally {
                    setLoading(false);
                }
            }
        });
        fetchProducto();
    }, [id]);
    const handleImageClick = (url) => {
        setSelectedImage(url); // Abre el modal con la imagen seleccionada
    };
    const handleCloseModal = () => {
        setSelectedImage(null); // Cierra el modal
    };
    if (loading) {
        return (_jsx(Box, { sx: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }, children: _jsx(CircularProgress, {}) }));
    }
    if (!producto) {
        return _jsx(Typography, { children: "No se encontr\u00F3 el producto." });
    }
    return (_jsxs(Box, { sx: {
            padding: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }, children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", textAlign: "center", gutterBottom: true, sx: { marginBottom: "1rem", color: "#333" }, children: producto.nombre }), _jsxs(Typography, { variant: "h6", fontWeight: "bold", textAlign: "center", gutterBottom: true, sx: { marginBottom: "1rem", color: "#555" }, children: ["C\u00F3digo: ", producto.codigo || "N/A"] }), _jsx(Carousel, { indicators: true, navButtonsAlwaysVisible: true, sx: { marginBottom: "1.5rem", borderRadius: "8px", overflow: "hidden" }, children: producto.imagenes.map((imagen) => (_jsx(Box, { sx: {
                        position: "relative",
                        backgroundColor: "#f0f0f0", // Fondo para rellenar el espacio sobrante
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: "zoom-in",
                        height: "400px", // Asegurar que todas las imágenes tengan la misma altura
                    }, onClick: () => handleImageClick(imagen.urlImagen), children: _jsx("img", { src: imagen.urlImagen, alt: producto.nombre, style: {
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain", // Asegura que la imagen se ajuste sin recortarse
                            borderRadius: "8px",
                            transition: "transform 0.3s ease",
                        }, onMouseOver: (e) => (e.currentTarget.style.transform = "scale(1.05)"), onMouseOut: (e) => (e.currentTarget.style.transform = "scale(1)") }) }, imagen.id))) }), _jsxs(Paper, { elevation: 3, sx: { padding: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }, children: [_jsx(Typography, { variant: "h6", sx: { marginBottom: "1rem", fontWeight: "bold", color: "#444" }, children: "Detalles del Producto" }), _jsx(Typography, { variant: "body1", sx: { marginBottom: "0.5rem", color: "#555" }, children: producto.descripcion }), _jsxs(Typography, { variant: "h5", sx: { fontWeight: "bold", color: "#2e7d32" }, children: ["Precio: \u20A1", new Intl.NumberFormat("es-CR").format(producto.precio)] })] }), _jsx(Button, { variant: "contained", color: "success", sx: {
                    display: "block",
                    margin: "0 auto",
                    padding: "0.8rem 2rem",
                    fontSize: "1rem",
                }, href: `https://wa.me/62469920?text=${encodeURIComponent(`Hola, estoy interesado en el producto: ${producto.nombre} (Código: ${producto.codigo || "N/A"}), me gustaría saber más información.`)}`, target: "_blank", children: "Consultar por WhatsApp" }), _jsx(Modal, { open: !!selectedImage, onClose: handleCloseModal, sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }, children: _jsx("img", { src: selectedImage || "", alt: "Imagen ampliada", style: {
                        maxWidth: "90%",
                        maxHeight: "90%",
                        objectFit: "contain",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    } }) })] }));
};
export default ProductoDetalles;
