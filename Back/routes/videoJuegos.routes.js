const express = require("express");
const router = express.Router();
const Videojuego = require("../models/videoJuegos");


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

//  Actualizar únicamente el stock (soft delete)
router.put("/:id/stock", validarVideojuegoId, async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const juego = await Videojuego.findByPk(id);
    if (!juego) return res.status(404).json({ error: "Videojuego no encontrado" });

    juego.stock = stock; // true o false
    await juego.save();

    res.json({ message: "Stock actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar stock" });
  }
});


module.exports = router;
