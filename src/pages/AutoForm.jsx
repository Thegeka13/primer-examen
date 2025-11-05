// src/pages/AutoForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../Context/AppContext";

export default function AutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { autos, addAuto, editAuto, getAutoById } = useApp();

  const autoEditar = id ? getAutoById(id) : null;

  const [form, setForm] = useState({
    nombre: "",
    escuderia: "",
    img: "",
  });

  useEffect(() => {
    if (autoEditar) {
      setForm({
        nombre: autoEditar.nombre,
        escuderia: autoEditar.escuderia,
        img: autoEditar.img,
      });
    }
  }, [autoEditar]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nombre || !form.escuderia || !form.img) {
      alert("Completa todos los campos");
      return;
    }

    if (autoEditar) {
      editAuto(id, form);
    } else {
      addAuto(form);
    }

    navigate("/");
  }

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">{autoEditar ? "Editar Auto" : "Nuevo Auto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder="Nombre del auto"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="escuderia" className="form-label">
            Escudería
          </label>
          <input
            type="text"
            id="escuderia"
            name="escuderia"
            value={form.escuderia}
            onChange={handleChange}
            className="form-control"
            placeholder="Escudería"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="img" className="form-label">
            URL de imagen
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={form.img}
            onChange={handleChange}
            className="form-control"
            placeholder="https://..."
          />
        </div>

        <button type="submit" className="btn btn-success">
          {autoEditar ? "Guardar cambios" : "Agregar Auto"}
        </button>
      </form>
    </div>
  );
}
