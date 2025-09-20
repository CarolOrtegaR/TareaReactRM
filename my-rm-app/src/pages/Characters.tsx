import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";


interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown" | string;
  species: string;
  image: string;
}
interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

const API = "https://rickandmortyapi.com/api/character";

const Characters: React.FC = () => {
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
          // Si por alguna razón la página actual está fuera del rango, forzamos el tope
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

  const goPrev = () => {
    if (canPrev) setPage(p => Math.max(1, p - 1));
  };
  const goNext = () => {
    if (canNext) setPage(p => Math.min(totalPages, p + 1));
  };

  // Badge simple para el estado
  const statusBadge = (status: Character["status"]) => {
    const base: React.CSSProperties = {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
    };
    if (status === "Alive") return <span style={{...base, background:"#dcfce7", color:"#166534"}}>Vivo</span>;
    if (status === "Dead")  return <span style={{...base, background:"#fee2e2", color:"#991b1b"}}>Muerto</span>;
    return <span style={{...base, background:"#e5e7eb", color:"#374151"}}>Desconocido</span>;
  };

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <Navbar />
      <div className="container">
        <h1 className="title">Personajes de Rick & Morty</h1>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center" style={{ color: "#dc2626" }}>{error}</p>}

        <div className="grid">
          {items.map(c => (
            <article key={c.id} className="card">
              <img src={c.image} alt={c.name} className="thumb" />
              <div>
                <h2 className="card-title">{c.name}</h2>
                <p className="muted">
                  {c.species} • {statusBadge(c.status)}
                </p>
            </div>
            </article>
          ))}
        </div>

        {/* Controles de paginación seguros */}
        <div className="pager">
          <button className="btn" onClick={goPrev} disabled={!canPrev}>Anterior</button>
          <span className="muted">
            Página {page} de {totalPages}
          </span>
          <button className="btn" onClick={goNext} disabled={!canNext}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default Characters;
