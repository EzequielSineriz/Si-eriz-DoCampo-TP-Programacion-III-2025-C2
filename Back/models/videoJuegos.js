const sequelize = require("../db/sequelize.js");
const { DataTypes } = require("sequelize");
const Productos = require("./productos.js");
const { id } = require("zod/v4/locales");

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
      defaultValue: true,
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
      id_origen: videojuego.id,
    });
  } 
  catch (error) {
    console.error("Error:", error);
  }
});

Videojuego.afterUpdate(async (videojuego, options) => {
  try {
    await Productos.update({nombre: videojuego.nombre, precio: videojuego.precio,},
      {where: {id_origen: videojuego.id, tipo_producto: "Videojuego",},}
    );

    console.log("Actualizado:", videojuego.nombre);
  } 
  
  catch (error) {
    console.error("Error productos:", error);
  }
});

Videojuego.afterDestroy(async (videojuego, options) => {
  console.log(videojuego.nombre)
  try {
    await Productos.destroy({where: {id_origen: videojuego.id, tipo_producto: "Videojuego",},});

    console.log("Eliminado:", videojuego.nombre);
  } 
  
  catch (error) {
    console.error("Error producto:", error);
  }
});


module.exports = Videojuego;