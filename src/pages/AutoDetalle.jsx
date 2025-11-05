// src/pages/AutoDetalle.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerAutoPorId } from "../services/autoService";
import { useApp } from "../context/AppContext";

export default function AutoDetalle() {
  const { usuario } = useApp();
  const { id } = useParams();
  const [auto, setAuto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarAuto() {
      try {
        const data = await obtenerAutoPorId(id);
        setAuto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    if (usuario) {
      cargarAuto();
    } else {
      setCargando(false);
    }
  }, [id, usuario]);

  if (!usuario) {
    return (
      <p className="p-4 text-center text-warning fw-semibold">
        Debes iniciar sesión para ver los detalles.
      </p>
    );
  }

  if (cargando)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span className="ms-2">Cargando detalles...</span>
      </div>
    );

  if (error)
    return (
      <p className="p-4 text-center text-danger fw-semibold">
        {error}
      </p>
    );

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <img
          src={auto.img}
          alt={auto.nombre}
          className="card-img-top"
          style={{ objectFit: "cover", height: "300px" }}
        />
        <div className="card-body">
          <h2 className="card-title fw-bold mb-3">{auto.nombre}</h2>
          <p className="card-text">
            <strong>Escudería:</strong> {auto.escuderia}
          </p>
          <p className="card-text">
            <strong>Pilotos:</strong> {auto.piloto}
          </p>
          <p className="card-text">
            <strong>Año:</strong> {auto.año}
          </p>
          <Link to="/" className="btn btn-danger mt-4">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
