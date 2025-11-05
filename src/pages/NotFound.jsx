// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm bg-light">
            <div className="card-body">
              <h1 className="display-1 fw-bold mb-4 text-danger">404</h1>
              <p className="lead mb-4">¡Ups! Este auto se perdió en la pista 🏎️💨</p>
              
              <img
                src="https://i.ibb.co/6FJk4Lq/f1-car.png"
                alt="Auto F1 perdido"
                className="img-fluid mb-4"
                style={{ maxHeight: "250px" }}
              />

              <Link to="/" className="btn btn-danger btn-lg">
                Volver al pit stop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
