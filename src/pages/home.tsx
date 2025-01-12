import React, { useState } from "react";
import "../styles/home.css";
import Carousel from "react-material-ui-carousel";
import Image1 from "../assets/logo.png"; // Ejemplo de imagen 1
import Image2 from "../assets/infoEnvios.png"; // Ejemplo de imagen 2
import Image3 from "../assets/comocomprar.png"; // Ejemplo de imagen 3
import Image4 from "../assets/comohacerelpago.png"; // Ejemplo de imagen 2
 3
import Image6 from "../assets/consejos.png"; // Ejemplo de imagen 3
import Image7 from "../assets/horario.png"; // Ejemplo de imagen 3



import { Modal, Box } from "@mui/material";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image); // Abrir modal con la imagen seleccionada
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Cerrar modal
  };

  return (
    <div className="home-container">
      <div className="parallax">
        <div className="parallax-content">
          <h1>Amber Designs</h1>
          <p>Bisutería que brilla a tu manera.</p>
        </div>
      </div>
      <section className="description-section">
        <h2>Bienvenidos a</h2>
        {/* Carrusel con 3 imágenes diferentes */}
        <Carousel
          indicators={true}
          navButtonsAlwaysVisible={true}
          sx={{
            marginBottom: "2rem",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "1200px",
            margin: "0 auto", // Centrar el carrusel
          }}
        >
          {[Image1, Image7,Image2, Image3,Image4,Image6].map((image, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5e8da",
                borderRadius: "8px",
                height: "600px", // Altura más grande para las imágenes
                overflow: "hidden",
                cursor: "zoom-in",
              }}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image}
                alt={`Amber Designs Image ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  objectFit: "cover", // Ajustar la imagen para que ocupe más espacio
                }}
              />
            </div>
          ))}
        </Carousel>
        <p style={{fontWeight:"bolder",fontSize:"1.5rem"}}>
          Nuestra tienda ofrece una selección única de collares, pulseras y bolsos hechos
          con amor y diseñados para destacar tu personalidad. Explora nuestras
          categorías y encuentra la pieza perfecta para ti o un ser querido.
        </p>
      </section>

      {/* Modal para mostrar la imagen seleccionada en grande */}
      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Box
          sx={{
            outline: "none",
            width: "80vw", // Ancho máximo para controlar el tamaño
            height: "80vh", // Altura máxima para controlar el tamaño
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={selectedImage || ""}
            alt="Imagen ampliada"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
