const Venta = require("./ventas.js");
const Producto = require("./productos.js");
const VentasProductos = require("./ventasProductos.js");

Venta.belongsToMany(Producto, { through: VentasProductos, foreignKey: "id_venta" });
Producto.belongsToMany(Venta, { through: VentasProductos, foreignKey: "id_producto" });

module.exports = { Venta, Producto, VentasProductos };