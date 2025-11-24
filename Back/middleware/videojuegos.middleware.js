const zod = require("zod");

const VideojuegoCrear = zod.object({
  nombre: zod.string().min(2, "El nombre es obligatorio"),
  descripcion: zod.string().min(8, "La descripcion es obligatoria"),
  precio: zod.string().min(1, "El precio es obligatorio").transform(val => Number(val)),
  stock: zod.string().transform(val => val === "true" || val === "1").optional(),
  imagen: zod.string().optional(),
});

const validarVideojuego = (req, res, next) => {
  try {
    if (req.file) {
      req.body.imagen = req.file.originalname;
    } 
    
    else {
      req.body.imagen = "";
    }

    const parsed = VideojuegoCrear.parse(req.body);
    req.body = parsed;

    next();

  } 
  
  catch (error) {
    console.log(error);
    res.status(400).send({ message: error.errors });
  }
};

const validarVideojuegoId = (req, res, next) => {
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

const validarVideojuegoPUT = (req, res, next) => {
  try {
    if (req.file) {
      req.body.imagen = "/" + req.file.originalname;
    } 

    const parsed = VideojuegoCrear.parse(req.body);
    req.body = parsed;

    next();

  } 
  
  catch (error) {
    console.log(error);
    res.status(400).send({ message: error.errors });
  }
};

module.exports = { validarVideojuego, validarVideojuegoId, validarVideojuegoPUT};












