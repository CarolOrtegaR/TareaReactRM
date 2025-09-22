// src/pages/Search.tsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

const API = "https://rickandmortyapi.com/api/character";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}?name=${query}`);
      if (!res.ok) throw new Error("No se encontraron resultados");
      const data = await res.json();
      setResults(data.results);
    } catch (err: any) {
      setResults([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <Navbar />
      <div className="container">
        <h1 className="title">Buscar Personaje</h1>

        <form onSubmit={onSearch} style={{ marginBottom:16, display:"flex", gap:8 }}>
          <input
            type="text"
            placeholder="Nombre del personaje"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ flex:1, padding:8 }}
          />
          <button type="submit">Buscar</button>
        </form>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "#dc2626" }}>{error}</p>}

        <div className="grid">
          {results.map(c => (
            <article key={c.id} className="card">
              <img src={c.image} alt={c.name} className="thumb" />
              <h2 className="card-title">{c.name}</h2>
              <p>{c.species} • {c.status}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
