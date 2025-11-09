const sequelize = require("../db/sequelize.js");
const { DataTypes } = require("sequelize");
const Productos = require("./productos.js");

const JuegoDeMesa = sequelize.define(
  "JuegoDeMesa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "JuegosDeMesa",
  }
);

JuegoDeMesa.afterCreate(async (juego, options) => {
  try {
    await Productos.create({
      nombre: juego.nombre,
      precio: juego.precio,
      tipo_producto: "Juego de mesa",
    });
  }
  
  catch (error) {
    console.error("Error:", error);
  }
});

module.exports = JuegoDeMesa;