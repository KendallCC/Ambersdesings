import React, { useState } from "react";
import "../styles/home.css";
import Carousel from "react-material-ui-carousel";
import Image1 from "../assets/logo.png";
import Image2 from "../assets/infoEnvios.png";
import Image3 from "../assets/comocomprar.png";
import Image4 from "../assets/comohacerelpago.png";
import Image6 from "../assets/consejos.png";
import Image7 from "../assets/horario.png";

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
        {/* Carrusel con imágenes responsivas */}
        <Carousel
          indicators={true}
          navButtonsAlwaysVisible={true}
          sx={{
            marginBottom: "2rem",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          {[Image1, Image7, Image2, Image3, Image4, Image6].map((image, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5e8da",
                borderRadius: "8px",
                height: "40vh", // Altura relativa para pantallas pequeñas
                maxHeight: "500px",
                overflow: "hidden",
                cursor: "zoom-in",
              }}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image}
                alt={`Amber Designs Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Ajustar la imagen sin recortar
                }}
              />
            </div>
          ))}
        </Carousel>
        <p style={{ fontWeight: "bolder", fontSize: "1.2rem", textAlign: "center" }}>
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
            width: "80vw",
            height: "80vh",
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
