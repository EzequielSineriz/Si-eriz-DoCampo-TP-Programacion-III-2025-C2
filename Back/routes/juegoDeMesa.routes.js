const express = require("express");
const router = express.Router();
const JuegoDeMesa = require("../models/juegoDeMesa");
const multer = require("multer");

const {
  crearJuegoDeMesa,
  traerJuegoDeMesa,
  traerJuegoDeMesaPorId,
  actualizarJuegoDeMesa,
  eliminarJuegoDeMesa
} = require("../controllers/juegodemesa.controller.js");

// multer
const storage = multer.diskStorage({
  destination: "public/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const { validarJuegoDeMesa, validarJuegoDeMesaId, validarJuegoDeMesaPUT } =
  require("../middleware/juegosdemesa.middleware.js");

// POST
router.post("/", upload.single("imagen"), validarJuegoDeMesa, crearJuegoDeMesa);

// GET
router.get("/", traerJuegoDeMesa);
router.get("/:id", validarJuegoDeMesaId, traerJuegoDeMesaPorId);

// PUT
router.put("/:id", upload.single("imagen"), validarJuegoDeMesaId, validarJuegoDeMesaPUT, actualizarJuegoDeMesa);

// DELETE
router.delete("/:id", validarJuegoDeMesaId, eliminarJuegoDeMesa);

// 🟡 Actualizar stock
router.put("/:id/stock", validarJuegoDeMesaId, async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const juego = await JuegoDeMesa.findByPk(id);
    if (!juego) return res.status(404).json({ error: "Juego de mesa no encontrado" });

    juego.stock = stock;
    await juego.save();

    res.json({ message: "Stock actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar stock" });
  }
});


module.exports = router;
