const Ventas = require("../models/ventas.js");
const VentasProductos = require("../models/ventasProductos.js");
const Productos = require("../models/productos.js");

// Crear el get de traer ventas... 


const crearVenta = async (req, res) => {
  const { cliente, productos } = req.body;

  try {
    let total = 0;

    for (const item of productos) {
        console.log(item)
        const producto = await Productos.findOne({where: {id_origen: item.id, tipo_producto: item.tipo,}});
        total += producto.precio * item.cantidad;
    }

    const venta = await Ventas.create({ cliente, precioFinal: total });

    for (const item of productos) {
        const producto = await Productos.findOne({where: {id_origen: item.id, tipo_producto: item.tipo,}});
        await VentasProductos.create({
            id_venta: venta.id,
            id_producto: producto.id_producto,
            cantidad: item.cantidad,
            subtotal: producto.precio * item.cantidad,
        });
    }

    res.status(201).json({ message: "Venta guardada", venta });
  } 
  
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error interno" });
  }
};

module.exports = { crearVenta };