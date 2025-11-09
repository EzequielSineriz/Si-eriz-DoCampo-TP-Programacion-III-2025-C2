const sequelize = require("../db/sequelize.js");
const { DataTypes } = require("sequelize");
const Productos = require("./productos.js");

const Videojuego = sequelize.define(
  "Videojuego",
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
    tableName: "Videojuegos",
  }
);

Videojuego.afterCreate(async (videojuego) => {
  try {
    await Productos.create({
      nombre: videojuego.nombre,
      precio: videojuego.precio,
      tipo_producto: "Videojuego",
    });
  } 
  catch (error) {
    console.error("Error:", error);
  }
});

module.exports = Videojuego;

