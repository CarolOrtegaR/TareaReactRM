import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => { logout(); navigate("/login", { replace: true }); };

  return (
    <header style={{background:"#0f172a",color:"#fff"}}>
      <div style={{maxWidth:1100, margin:"0 auto", padding:16, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <strong>Rick&Morty App</strong>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <span style={{opacity:.8, fontSize:14}}>{user?.email}</span>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
