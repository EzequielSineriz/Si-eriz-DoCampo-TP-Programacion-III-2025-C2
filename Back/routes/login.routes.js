const express = require("express");
const router = express.Router();

const {
  mostrarLogin,
  procesarLogin,
} = require("../controllers/login.controller");

// Rutas de login

router.get("/login", mostrarLogin);
router.post("/login", procesarLogin);

module.exports = router;
