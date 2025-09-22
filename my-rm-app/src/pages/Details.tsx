// src/pages/Details.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
}

interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

const API = "https://rickandmortyapi.com/api/character";

const Details: React.FC = () => {
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState<ApiInfo | null>(null);
  const [items, setItems] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}?page=${page}`);
        if (!res.ok) throw new Error("Error al cargar personajes");
        const data: { info: ApiInfo; results: Character[] } = await res.json();
        if (!cancelled) {
          setInfo(data.info);
          setItems(data.results);
          if (page > data.info.pages) setPage(data.info.pages);
          if (page < 1) setPage(1);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [page]);

  const totalPages = info?.pages ?? 1;
  const canPrev = !loading && page > 1;
  const canNext = !loading && page < totalPages;
  const goPrev = () => { if (canPrev) setPage(p => Math.max(1, p - 1)); };
  const goNext = () => { if (canNext) setPage(p => Math.min(totalPages, p + 1)); };

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <Navbar />
      <div className="container">
        <h1 className="title">Detalles de Personajes</h1>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center" style={{ color: "#dc2626" }}>{error}</p>}

        <div className="grid">
          {items.map(c => (
            <article key={c.id} className="card" style={{ padding:16 }}>
              <img src={c.image} alt={c.name} className="thumb" />
              <div>
                <h2 className="card-title">{c.name}</h2>
                <p><strong>Especie:</strong> {c.species}</p>
                <p><strong>Estado:</strong> {c.status}</p>
                <p><strong>Género:</strong> {c.gender}</p>
                <p><strong>Origen:</strong> {c.origin.name}</p>
                <p><strong>Ubicación:</strong> {c.location.name}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="pager">
          <button className="btn" onClick={goPrev} disabled={!canPrev}>Anterior</button>
          <span className="muted">Página {page} de {totalPages}</span>
          <button className="btn" onClick={goNext} disabled={!canNext}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
