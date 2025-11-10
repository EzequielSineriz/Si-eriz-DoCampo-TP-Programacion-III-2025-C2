const express = require("express");
const router = express.Router();
const { crearVenta } = require("../controllers/ventas.controller.js");
const  Ventas = require("../models/ventas.js");

router.post("/", crearVenta);

router.get("/", async (req, res) => {
    try {
        const ventas = await Ventas.findAll();
        res.json(ventas);
    } 

    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error" });
    }
});

module.exports = router;