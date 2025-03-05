import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Intentar abrir la base de datos con manejo de errores
export const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
}).catch((err) => {
  console.error("Error al abrir la base de datos", err);
  throw err; // Lanzar el error si no se puede abrir la base de datos
});