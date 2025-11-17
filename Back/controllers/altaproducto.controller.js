
const sequelize = require("../db/sequelize");

// get
const mostrarAlta = (req, res) => {
  res.render("altaProducto", { message: null, type: null });
};

module.exports = {
  mostrarAlta
};