import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/notfound.css"; // Archivo de estilos para animaciones y diseño

const NotFound = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="animation-wrapper">
        <div className="girl-animation">
          <div className="head"></div>
          <div className="hair"></div>
          <div className="body"></div>
          <div className="arms">
            <div className="left-arm"></div>
            <div className="right-arm"></div>
          </div>
          <div className="hands">
            <div className="left-hand"></div>
            <div className="right-hand"></div>
          </div>
          <div className="legs">
            <div className="left-leg"></div>
            <div className="right-leg"></div>
          </div>
          <div className="table">
            <div className="tools"></div>
            <div className="jewelry"></div>
          </div>
        </div>
      </div>
      <div className="message-container">
        <h1>Error 404</h1>
        <p>Página no encontrada, por favor regrese aquí.</p>
        <button className="home-button" onClick={redirectToHome}>
          Ir a Inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
