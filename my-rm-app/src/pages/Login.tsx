import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = await login(email.trim(), password);
    if (ok) navigate("/characters");
    else setError("Credenciales inválidas. Revisa tu correo y contraseña.");
  };

  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8fafc", padding:16}}>
      <form onSubmit={onSubmit} style={{width:360, background:"#fff", padding:24, borderRadius:16, boxShadow:"0 6px 24px rgba(0,0,0,.06)"}}>
        <h1 style={{textAlign:"center"}}>Iniciar sesión</h1>

        <label>Correo electrónico</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"100%", padding:10, marginTop:6, marginBottom:12}}/>

        <label>Contraseña</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:"100%", padding:10, marginTop:6}}/>

        {error && <p style={{color:"#dc2626", marginTop:10}}>{error}</p>}
        <button type="submit" style={{width:"100%", marginTop:16}}>Entrar</button>
        <p style={{opacity:.7, fontSize:12, textAlign:"center", marginTop:10}}>user@mail.com/123456 • admin@mail.com/admin</p>
      </form>
    </div>
  );
};
export default Login;
