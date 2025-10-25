const express = require("express");
const router = express.Router();
const Videojuego = require("../models/videoJuegos.js");
/**
 * Espera que en el body estén los parámetros:
 *
 * nombre
 * descripcion
 * precio
 * stock
 * imagen
 * 
 */
router.post("/", async (req, res) => {
  try {
    console.log(req.body); // para saber que llega por el body

    // 1. Tomar datos.
    const body = req.body;

    const nombre = body.nombre;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const stock = body.stock;
    const imagen = body.imagen;


    // const { nombre, descripcion, precio, stock, imagen} = req.body;

    // 2. Hacer algo con los datos.
    const resultado = await Videojuego.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: imagen,
    });

    // 3. Dar respuesta.
    res.status(201).json(resultado);
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(400).send({ message: "Falta algún parametro" });
    } else {
      console.log(error);
      res.status(500).send({ message: "Error interno" });
    }
  }
});

// GET /videojuegos - obtener todos los videojuegos
router.get("/", async (req, res) => {
  try {
    const videojuegos = await Videojuego.findAll();
    res.json(videojuegos);
  } catch (error) {
    console.error("❌ Error al obtener videojuegos:", error);
    res.status(500).json({ error: "Error al obtener videojuegos" });
  }
});

/**
 * Espera que el id venga en parametro de ruta
 */
router.get("/:id", async (req, res) => {
  try {
    const videojuego = await Videojuego.findByPk(req.params.id);
    res.status(200).send(videojuego);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
});

/**
 * Espera que en el body estén los parámetros:
 *
 * nombre
 * descripcion
 * precio
 * stock
 * imagen
 * Espera que el id venga en parámetro de ruta
 */
router.put("/:id", async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen} = req.body;

    const resultadoDelUpdate = await Videojuego.update(
      {
        nombre: nombre,
        descripcion: descripcion,
        stock: stock,
        precio: precio,
        imagen: imagen,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).send(resultadoDelUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const resultado = await Videojuego.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
});

module.exports = router;