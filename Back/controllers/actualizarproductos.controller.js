
const sequelize = require("../db/sequelize");

// get
const mostrarActualizar = (req, res) => {
  res.render("actualizarproducto", { message: null, type: null });
};

module.exports = {
  mostrarActualizar
};