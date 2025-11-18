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
      defaultValue: true,
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
      id_origen: juego.id,
    });
  }
  
  catch (error) {
    console.error("Error:", error);
  }
});

JuegoDeMesa.afterUpdate(async (juego, options) => {
  try {
    await Productos.update({nombre: juego.nombre, precio: juego.precio,},
          {where: {id_origen: juego.id, tipo_producto: "Juego de mesa",
        },
      }
    );

    console.log("Actualizado:", juego.nombre);
  } 
  
  catch (error) {
    console.error("Error productos:", error);
  }
});

JuegoDeMesa.afterDestroy(async (juego, options) => {
  console.log(juego.nombre)
  try {
    await Productos.destroy({where: {id_origen: juego.id, tipo_producto: "Juego de mesa",},});

    console.log("Eliminado:", juego.nombre);
  }
  
  catch (error) {
    console.error("Error producto:", error);
  }
});

module.exports = JuegoDeMesa;