require("dotenv").config();
const bcrypt = require("bcrypt");


const sequelize = require("../db/sequelize");
const Admin = require("../models/admin");

(async () => {
  try {
    await sequelize.sync();

    const hash = await bcrypt.hash("1234", 10);

    await Admin.create({
      username: "admin",
      password: hash
    });

    console.log("✔ Admin creado exitosamente");
    process.exit();
  } catch (e) {
    console.error("❌ Error:", e);
    process.exit(1);
  }
})();