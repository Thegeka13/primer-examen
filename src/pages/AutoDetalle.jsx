import { useParams, Link } from "react-router-dom";
import { autos } from "../data/autos";

export default function AutoDetalle() {
  const { id } = useParams();
  const auto = autos.find((a) => a.id === id);

  if (!auto) {
    return <p className="p-6">Auto no encontrado </p>;
  }

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
        🔙 Volver
      </Link>
    </div>
  );
}
