const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const adminZod = require("../middleware/admin.middleware");

const crearAdmin = async (req, res) => {
  try {
    // Validar con Zod
    const data = adminZod.parse(req.body);

    // Verificar si ya existe
    const existe = await Admin.findOne({ where: { username: data.username } });
    if (existe) {
      return res.status(400).json({ error: "El username ya existe" });
    }

    // Encriptar password
    const hash = await bcrypt.hash(data.password, 10);

    // Crear admin
    const nuevoAdmin = await Admin.create({
      username: data.username,
      password: hash
    });

    res.status(201).json({
      message: "Admin creado correctamente",
      admin: {
        id: nuevoAdmin.id,
        username: nuevoAdmin.username
      }
    });

  } catch (e) {
    if (e.name === "ZodError") {
      return res.status(400).json({ error: e.errors });
    }

    console.error(e);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { crearAdmin };
