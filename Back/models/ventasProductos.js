const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize.js");

const VentasProductos = sequelize.define("VentasProductos", {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "VentasProductos",
});

module.exports = VentasProductos;