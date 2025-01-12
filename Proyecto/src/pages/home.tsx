import React from "react";
import "../styles/home.css";
import Logo from "../assets/logo2.png"; // Importa la imagen
const Home: React.FC = () => {
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
        <img src={Logo} alt="Logo de AmberDesings" />
        <p>
          Nuestra tienda ofrece una selección única de collares, pulseras y bolsos hechos
          con amor y diseñados para destacar tu personalidad. Explora nuestras
          categorías y encuentra la pieza perfecta para ti o un ser querido.
        </p>
      </section>
    </div>
  );
};

export default Home;
