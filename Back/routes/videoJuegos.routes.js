const express = require("express");
const router = express.Router();
const Videojuego = require("../models/videoJuegos");
const path = require("path");
const multer = require("multer");

const {
  crearVideojuego,
  traerVideojuegos,
  traerVideojuegosPorId,
  actualizarVideojuego,
  eliminarVideojuego
} = require("../controllers/videojuego.controller.js");

// multer
const storage = multer.diskStorage({
  destination: "public/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const { validarVideojuego, validarVideojuegoId , validarVideojuegoPUT} =
  require("../middleware/videojuegos.middleware.js");

// POST
router.post("/", upload.single("imagen"), validarVideojuego, crearVideojuego);

// GET
router.get("/", traerVideojuegos);
router.get("/:id", validarVideojuegoId, traerVideojuegosPorId);

// PUT
router.put("/:id", upload.single("imagen"), validarVideojuegoId, validarVideojuegoPUT, actualizarVideojuego);

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
