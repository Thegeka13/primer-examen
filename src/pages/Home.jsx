// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { usuario, autos, deleteAuto } = useApp();
  const navigate = useNavigate();

  if (!usuario) {
    return (
      <p className="p-4 text-center text-warning">
        Debes iniciar sesión para ver los autos.
      </p>
    );
  }

  if (!autos.length) {
    return (
      <div className="p-4 text-center">
        <p className="fs-5 mb-3">No hay autos registrados.</p>
        <button
          onClick={() => navigate("/auto/nuevo")}
          className="btn btn-success"
        >
          Agregar Auto
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 fw-bold">Autos de F1 2024</h1>
        <button
          onClick={() => navigate("/auto/nuevo")}
          className="btn btn-success"
        >
          Nuevo Auto
        </button>
      </div>

      <div className="row g-4">
        {autos.map((auto) => (
          <div key={auto.id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src={auto.img}
                className="card-img-top rounded"
                alt={auto.nombre}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{auto.nombre}</h5>
                <p className="card-text text-muted">{auto.escuderia}</p>

                <div className="mt-auto d-flex gap-2 flex-wrap">
                  <Link
                    to={`/auto/${auto.id}`}
                    className="btn btn-danger btn-sm flex-grow-1"
                  >
                    Ver detalles
                  </Link>

                  <Link
                    to={`/auto/editar/${auto.id}`}
                    className="btn btn-warning btn-sm flex-grow-1 text-white"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => {
                      if (window.confirm("¿Eliminar este auto?"))
                        deleteAuto(auto.id);
                    }}
                    className="btn btn-secondary btn-sm flex-grow-1"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
