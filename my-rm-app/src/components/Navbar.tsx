// src/components/NavBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => { logout(); navigate("/login", { replace: true }); };

  return (
    <header style={{ background: "#0f172a", color: "#fff" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <strong>Rick&Morty App</strong>
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link to="/characters" style={linkStyle}>Personajes</Link>
          <Link to="/details" style={linkStyle}>Detalles</Link>
          <Link to="/search" style={linkStyle}>Buscar</Link>
        </nav>

        {/* --- Usuario y Cierra sesion --- */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
         
          <button onClick={onLogout} style={btnStyle}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/* --- Estilos simples reusables --- */
const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 500,
};
const btnStyle: React.CSSProperties = {
  background: "#1e293b",
  color: "#fff",
  border: "1px solid #334155",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
};
