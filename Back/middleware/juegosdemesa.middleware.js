const zod = require("zod");

const JuegoDeMesaCrear = zod.object({
  nombre: zod.string().min(2, "El nombre es obligatorio"),
  descripcion: zod.string().min(8, "La descripcion es obligatoria"),
  precio: zod.number().min(1, "El precio es obligatorio"),
  stock: zod.boolean(),
  imagen: zod.string().min(1, "La imagen es obligatoria"),
});

const validarJuegoDeMesa = (req, res, next) => {
  try {
    JuegoDeMesaCrear.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const validarJuegoDeMesaId = (req, res, next) => {
  const idSchema = zod.object({
    id: zod.string().regex(/^\d+$/, "El ID debe ser un número entero positivo"),
  });
  try {
    idSchema.parse(req.params);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = { validarJuegoDeMesa, validarJuegoDeMesaId };
