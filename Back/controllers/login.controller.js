const bcrypt = require("bcrypt");
const sequelize = require("../db/sequelize");
const Admin = require("../models/admin");


// 👉 GET /login
const mostrarLogin = (req, res) => {
  res.render("login", { message: null, type: null });
};

// 👉 POST /login

const procesarLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar admin
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.render("login", {
        message: "Usuario incorrecto",
        type: "error"
      });
    }

    // Comparar contraseña
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.render("login", {
        message: "Contraseña incorrecta",
        type: "error"
      });
    }

    // Login OK
    return res.redirect("/admin");

  } catch (err) {
    console.error("Error en login:", err);
    return res.render("login", {
      message: "Error interno",
      type: "error"
    });
  }
};

module.exports = {
  mostrarLogin,
  procesarLogin,
};