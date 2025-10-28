const express = require("express");
const router = express.Router();

const {
  crearVideojuego,
  traerVideojuegos,
  traerVideojuegosPorId,
  actualizarVideojuego,
  eliminarVideojuego
} = require("../controllers/videojuego.controller.js");

const { validarVideojuego, validarVideojuegoId } =
  require("../middleware/videojuegos.middleware.js");

// POST
router.post("/", validarVideojuego, crearVideojuego);

// GET
router.get("/", traerVideojuegos);
router.get("/:id", validarVideojuegoId, traerVideojuegosPorId);

// PUT
router.put("/:id", validarVideojuegoId, validarVideojuego, actualizarVideojuego);

// DELETE
router.delete("/:id", validarVideojuegoId, eliminarVideojuego);

module.exports = router;
