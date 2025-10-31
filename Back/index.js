const express = require("express");
const cors = require("cors");
require("dotenv").config(); // <- añadido
const sequelize = require("./db/sequelize");
const path = require("path"); // 👈 Importar el modulo path
const app = express();

// Configurar EJS como motor de vistas
//let ejs = require('ejs');
app.set('view engine', 'ejs');

// Usar ruta absoluta para evitar problemas según desde dónde se inicie el proceso
app.set('views', path.join(__dirname, 'views'));


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

app.get("/", (req, res) => {
  // Renderizo mi vista index.ejs
  //   res.send("<h1>Hola</h1>");
  res.render("layout", { path: "index" });
});

// Sincronizar base de datos y levantar servidor
sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada");
  app.listen(3000, () => console.log(" Servidor corriendo en http://localhost:3000"));
});
