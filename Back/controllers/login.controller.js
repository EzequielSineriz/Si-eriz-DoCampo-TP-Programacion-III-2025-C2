const bcrypt = require("bcrypt");
const sequelize = require("../db/sequelize");
const Admin = require("../models/admin");


// GET /login
const mostrarLogin = (req, res) => {
  res.render("login", { message: null, type: null, redirect: null });
};

//  POST /login

const procesarLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar admin
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.render("login", {
        message: "Usuario incorrecto",
        type: "error",
        redirect: null
      });
    }

    // Comparar contraseña
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.render("login", {
        message: "Contraseña incorrecta",
        type: "error",
        redirect: null
      });
    }

    // Login OK
    return res.render("login", {
      message: "Inicio de sesión exitoso",
      type: "success",
      redirect: "/admin"
    });

  } catch (err) {
    console.error("Error en login:", err);
    return res.render("login", {
      message: "Error interno",
      type: "error",
      redirect : null
    });
  }
};


module.exports = {
  mostrarLogin,
  procesarLogin,
};