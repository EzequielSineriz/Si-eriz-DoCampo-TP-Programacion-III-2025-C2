const express = require("express");
const router = express.Router();

const {
  crearJuegoDeMesa,
  traerJuegoDeMesa,
  traerJuegoDeMesaPorId,
  actualizarJuegoDeMesa,
  eliminarJuegoDeMesa
} = require("../controllers/juegodemesa.controller.js");

const { validarJuegoDeMesa, validarJuegoDeMesaId } =
  require("../middleware/juegosdemesa.middleware.js");

// POST
router.post("/", validarJuegoDeMesa, crearJuegoDeMesa);

// GET
router.get("/", traerJuegoDeMesa);
router.get("/:id", validarJuegoDeMesaId, traerJuegoDeMesaPorId);

// PUT
router.put("/:id", validarJuegoDeMesaId, validarJuegoDeMesa, actualizarJuegoDeMesa);

// DELETE
router.delete("/:id", validarJuegoDeMesaId, eliminarJuegoDeMesa);

module.exports = router;
