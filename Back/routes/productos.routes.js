const express = require("express");
const router = express.Router();

const {
  traerProductos,
  traerProductosPorId
} = require("../controllers/productos.controller.js");

// GET
router.get("/", traerProductos);
router.get("/:id", traerProductosPorId);

module.exports = router;