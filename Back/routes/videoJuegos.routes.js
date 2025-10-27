// Rutas para la entidad Videojuego (CRUD)
const express = require("express");
const router = express.Router();
const Videojuego = require("../models/videoJuegos.js");
const { crearVideojuego, traerVideojuegos, traerVideojuegosPorId, actualizarVideojuego, eliminarVideojuego} = require("../controllers/videojuego.controller.js");
const {validarVideojuego, validarVideojuegoId} = require("../middleware/videojuegos.mw.js");



//         == POST ==
// Aplica la validación antes de crear un videojuego
router.post("/", validarVideojuegoId);
router.post("/", validarVideojuego);
// POST /videojuegos - crear un nuevo videojuego
router.post("/", crearVideojuego);


//          == GET ==
//Valido Id antes de traer un videojuego
//router.get("/", validarVideojuegoId);
// GET /videojuegos - obtener todos los videojuegos
router.get("/", traerVideojuegos);
//Valido Id antes de traer un videojuego
router.get("/", validarVideojuegoId);
// GET /videojuegos/:id - obtener un videojuego por su ID
router.get("/:id", traerVideojuegosPorId);

//            == PUT ==
// Valido Id antes de actualizar un videojuego
router.put("/:id", validarVideojuegoId);
router.put("/:id", validarVideojuego);
// PUT /videojuegos/:id - actualizar un videojuego
router.put("/:id", actualizarVideojuego);

// Valido Id antes de eliminar un videojuego
router.delete("/:id", validarVideojuegoId);
// DELETE /videojuegos/:id - eliminar un videojuego
router.delete("/:id", eliminarVideojuego);

module.exports = router;