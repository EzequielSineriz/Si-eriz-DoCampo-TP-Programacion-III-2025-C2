const express = require("express");
const router = express.Router();

const { mostrarActualizar } = require("../controllers/actualizarproductos.controller.js");

const { mostrarAlta } =
  require("../controllers/altaproducto.controller.js");


// GET

router.get("/altaproducto", mostrarAlta);

router.get("/actualizarproducto", mostrarActualizar);

module.exports = router;