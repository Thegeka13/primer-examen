// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AutoDetalle from "./pages/AutoDetalle";
import AutoForm from "./pages/AutoForm";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AppProvider, useApp } from "./context/AppContext";

function Nav() {
  const { usuario, logout } = useApp();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <a className="navbar-brand" href="/">🏎️ F1 Autos</a>

        <div className="collapse navbar-collapse justify-content-end">
          {usuario ? (
            <>
              <span className="navbar-text me-3">Hola, {usuario.nombre}</span>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <a className="nav-link text-light" href="/login">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}


// Página protegida
function PrivateRoute({ children }) {
  const { usuario } = useApp();
  return usuario ? children : <Login />;
}

// Componente principal
export default function App() {
  return (
    <AppProvider>
      <div className="container py-4">

        <Nav />

        <Routes>
          <Route
    path="/"
    element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    }
  />
  <Route
    path="/auto/:id"
    element={
      <PrivateRoute>
        <AutoDetalle />
      </PrivateRoute>
    }
  />
  <Route
    path="/auto/editar/:id"
    element={
      <PrivateRoute>
        <AutoForm />
      </PrivateRoute>
    }
  />
  <Route
    path="/auto/nuevo"
    element={
      <PrivateRoute>
        <AutoForm />
      </PrivateRoute>
    }
  />
  <Route path="/login" element={<Login />} />
  <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppProvider>
  );
}
