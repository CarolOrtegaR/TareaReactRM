import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Characters from "./pages/Characters";
import Details from "./pages/Details";
import Search from "./pages/Search";

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/details" element={<Details />} />
      <Route path="/search" element={<Search />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
export default App;
