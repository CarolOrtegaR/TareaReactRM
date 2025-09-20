import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Characters from "./pages/Characters";

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/characters" element={<Characters />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
export default App;
