import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AutoDetalle from "./pages/AutoDetalle";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-red-700 p-4">
        <Link to="/" className="text-2xl font-bold">🏎️ F1 Autos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auto/:id" element={<AutoDetalle />} />
      </Routes>
    </div>
  );
}