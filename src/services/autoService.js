import { autos } from "../data/autos";

export function obtenerAutos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(autos);
    }, 1500);
  });
}

export function obtenerAutoPorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const auto = autos.find((a) => a.id === id);
      if (auto) {
        resolve(auto);
      } else {
        reject(new Error("Auto no encontrado"));
      }
    }, 1000);
  });
}
