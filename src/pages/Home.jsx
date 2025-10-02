// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerAutos } from "../services/autoService";

export default function Home() {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await obtenerAutos(); // llamada simulada a API
        setAutos(data);
      } catch (error) {
        console.error("Error al cargar autos:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  if (cargando) {
    return <p className="p-6 text-center text-lg"> Cargando autos...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Autos de F1 2024</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {autos.map((auto) => (
          <div
            key={auto.id}
            className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <img src={auto.img} alt={auto.nombre} className="rounded-xl mb-3" />
            <h2 className="text-xl font-semibold">{auto.nombre}</h2>
            <p className="text-gray-400">{auto.escuderia}</p>
            <Link
              to={`/auto/${auto.id}`}
              className="mt-3 inline-block bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
