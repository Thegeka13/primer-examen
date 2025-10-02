import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerAutoPorId } from "../services/autoService";

export default function AutoDetalle() {
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

    cargarAuto();
  }, [id]);

  if (cargando) return <p className="p-6 text-center"> Cargando detalles...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <img src={auto.img} alt={auto.nombre} className="rounded-xl mb-4" />
      <h2 className="text-3xl font-bold mb-2">{auto.nombre}</h2>
      <p><b>Escudería:</b> {auto.escuderia}</p>
      <p><b>Pilotos:</b> {auto.piloto}</p>
      <p><b>Año:</b> {auto.año}</p>

      <Link
        to="/"
        className="mt-4 inline-block bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
      >
       Volver
      </Link>
    </div>
  );
}
