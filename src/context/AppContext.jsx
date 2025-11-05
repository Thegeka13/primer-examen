// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // para generar IDs únicos

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- Usuario ---
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem("usuario");
    return stored ? JSON.parse(stored) : null;
  });

  function login(nombre) {
    const u = { nombre };
    setUsuario(u);
    localStorage.setItem("usuario", JSON.stringify(u));
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  // --- Autos ---
  const [autos, setAutos] = useState(() => {
    const stored = localStorage.getItem("autos");
    return stored ? JSON.parse(stored) : [];
  });

  // Crear auto
  function addAuto(auto) {
    const nuevo = { ...auto, id: uuidv4() };
    const nuevos = [...autos, nuevo];
    setAutos(nuevos);
    localStorage.setItem("autos", JSON.stringify(nuevos));
  }

  // Editar auto
  function editAuto(id, actualizado) {
    const nuevos = autos.map(a => (a.id === id ? { ...actualizado, id } : a));
    setAutos(nuevos);
    localStorage.setItem("autos", JSON.stringify(nuevos));
  }

  // Eliminar auto
  function deleteAuto(id) {
    const nuevos = autos.filter(a => a.id !== id);
    setAutos(nuevos);
    localStorage.setItem("autos", JSON.stringify(nuevos));
  }

  // Obtener auto por id
  function getAutoById(id) {
    return autos.find(a => a.id === id);
  }

  return (
    <AppContext.Provider
      value={{
        usuario,
        login,
        logout,
        autos,
        addAuto,
        editAuto,
        deleteAuto,
        getAutoById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook para usar el contexto
export function useApp() {
  return useContext(AppContext);
}
