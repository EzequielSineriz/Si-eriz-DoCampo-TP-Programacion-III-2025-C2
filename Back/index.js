const express = require("express");
const cors = require("cors");
require("dotenv").config(); // <- añadido
const sequelize = require("./db/sequelize");
const path = require("path"); // 👈 Importar el modulo path
const app = express();
const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true })); // 👈 necesario para leer los datos del form
require("./models/asociaciones.js");


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
const juegosDeMesaRoutes = require("./routes/juegoDeMesa.routes.js");
app.use("/juegosdemesa", juegosDeMesaRoutes);
const productosRoutes = require("./routes/productos.routes.js");
app.use("/productos", productosRoutes);
const ventasRoutes = require("./routes/ventas.routes.js");
app.use("/ventas", ventasRoutes);

app.get("/login", (req, res) => {
  res.render("login", { message: null, type: null });
});


const ADMIN_USER = "admin";
const passOriginal = "1234"; // Contraseña original
const complejidad = 10; // Nivel de complejidad para el hash

const ADMIN_PASS_HASH = bcrypt.hashSync(passOriginal, complejidad); // Contraseña encriptada

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER) {
    return res.render("login", {
      message: "Usuario incorrecto",
      type: "error",
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, ADMIN_PASS_HASH);

  if (!isPasswordValid) {
    return res.render("login", {
      message: "Contraseña incorrecta",
      type: "error",
    });
  }
   // ✅ Si todo está OK, mostrar mensaje y redirigir
  return res.redirect("/admin");
    });

//app.get("/dashboard", (req, res) => {
//  res.render("dashboard", {
//    message: "Bienvenido!",
//    type: "success"
//  });
//});
const Videojuego = require("./models/videoJuegos");
const JuegoDeMesa = require("./models/juegoDeMesa");

app.get("/admin", async (req, res) => {
  const videojuegos = await Videojuego.findAll();
  const juegosMesa = await JuegoDeMesa.findAll();

  res.render("dashboard", { videojuegos, juegosMesa });
});



app.get("/index", (req, res) => {
  res.render("index", { user: ADMIN_USER });
});



// Sincronizar base de datos y levantar servidor
sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada");
  app.listen(3000, () => console.log(" Servidor corriendo en http://localhost:3000"));
});
