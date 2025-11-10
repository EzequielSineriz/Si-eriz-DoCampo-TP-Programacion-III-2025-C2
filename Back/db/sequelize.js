require("dotenv").config()
const { Sequelize } = require("sequelize");

const stringDb = process.env.STRING_DB;

if (!stringDb) {
  throw new Error("❌ STRING_DB no está definido en el archivo .env");
}

const sequelize = new Sequelize(stringDb, {
  logging: false, // opcional: desactiva logs de SQL
});

sequelize.sync({ alter: true })
  .then(() => console.log("Base de datos sincronizada correctamente"))
  .catch(err => console.error("Error al sincronizar la base de datos:", err));

module.exports = sequelize;
  