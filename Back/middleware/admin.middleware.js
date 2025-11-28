const { z } = require("zod");

const adminZod = z.object({
  username: z.string()
    .min(3, "El usuario debe tener al menos 3 caracteres"),
  password: z.string()
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

module.exports = adminZod;
