import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
       
      </Link>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <div className="dropdown">
          <button className="dropdown-btn">Categorías</button>
          <div className="dropdown-content">
            <Link to="/collares">Collares</Link>
            <Link to="/bolsos">Bolsos</Link>
            <Link to="/pulseras">Pulseras</Link>
          </div>
        </div>
        <Link to="/about">Acerca de nosotros</Link>
      </div>
    </nav>
  );
};

export default Navbar;
