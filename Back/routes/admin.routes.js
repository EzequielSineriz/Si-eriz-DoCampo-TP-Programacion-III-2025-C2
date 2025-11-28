const express = require("express");
const router = express.Router();
const { crearAdmin } = require("../controllers/admin.controller.js");
const { mostrarActualizar } = require("../controllers/actualizarproductos.controller.js");

const { mostrarAlta } =
  require("../controllers/altaproducto.controller.js");


// GET

router.get("/altaproducto", mostrarAlta);

router.get("/actualizarproducto", mostrarActualizar);


// POST
router.post("/admins", crearAdmin);
module.exports = router;