const sequelize = require("../db/sequelize.js");
const { DataTypes } = require("sequelize");

const Productos = sequelize.define(
  "Productos",
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tipo_producto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_origen: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Productos",
    timestamps: false,
  }
);

module.exports = Productos;