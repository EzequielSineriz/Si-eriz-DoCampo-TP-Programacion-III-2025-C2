const express = require("express");
const cors = require("cors");
require("dotenv").config(); // <- añadido
const sequelize = require("./db/sequelize");
const path = require("path"); // 👈 Importar el modulo path
const app = express();


//                       === Middleware ===

// Servir archivos estáticos desde la carpeta "public" usando una ruta absoluta
// Esto evita problemas sin importar desde donde se inicie el servidor.
app.use('/public', express.static(path.join(__dirname, 'public')));

// Permitir solicitudes desde cualquier origen (para desarrollo)
app.use(cors());

// Para parsear JSON
app.use(express.json());

// Rutas
const videojuegosRoutes = require("./routes/videoJuegos.routes.js");
app.use("/videojuegos", videojuegosRoutes);

const juegosDeMesaRoutes = require("./routes/juegoDeMesa.routes.js");
app.use("/juegosdemesa", juegosDeMesaRoutes);

// Sincronizar base de datos y levantar servidor
sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada");
  app.listen(3000, () => console.log(" Servidor corriendo en http://localhost:3000"));
});
