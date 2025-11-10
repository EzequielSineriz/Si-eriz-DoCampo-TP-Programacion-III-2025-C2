const Producto = require("../models/productos");

const traerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } 
  
  catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error" });
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