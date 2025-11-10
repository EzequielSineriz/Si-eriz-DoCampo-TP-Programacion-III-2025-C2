const Producto = require("../models/productos"); // Import the juego de mesa model

const traerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } 
  
  catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

const traerProductosPorId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    res.status(200).send(producto);
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
};

module.exports = { traerProductos, traerProductosPorId };