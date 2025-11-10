const sequelize = require("../db/sequelize.js");
const { DataTypes } = require("sequelize");

const Ventas = sequelize.define(
  "Ventas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precioFinal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Ventas",
  }
);

module.exports = Ventas;