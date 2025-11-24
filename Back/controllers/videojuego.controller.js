const Videojuego = require("../models/videoJuegos"); // Import the Videojuego model

const crearVideojuego = async (req, res) => {
  try {

    // 1. Tomar datos.
    const body = req.body;

    const nombre = body.nombre;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const stock = body.stock;
    const imagen = req.file ? req.file.originalname : null;


    // const { nombre, descripcion, precio, stock, imagen} = req.body;

    // 2. Hacer algo con los datos.
    const resultado = await Videojuego.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: "/" + imagen,
    });
    
    // 3. Dar respuesta.
    res.status(201).send(resultado);
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(400).send({ message: "Falta algún parametro" });
    } else {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }}};

const traerVideojuegos = async (req, res) => {
  try {
    const videojuegos = await Videojuego.findAll();
    res.json(videojuegos);
  } catch (error) {
    console.error("❌ Error al obtener videojuegos:", error);
    res.status(500).json({ error: "Error al obtener videojuegos" });
  }
};

const traerVideojuegosPorId = async (req, res) => {
  try {
    const videojuego = await Videojuego.findByPk(req.params.id);
    res.status(200).send(videojuego);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
};

const actualizarVideojuego = async (req, res) => {
  const { id } = req.params;
  const juego = await Videojuego.findByPk(id);
  if (!juego){
    return res.status(404).json({ error: "Juego no encontrado" })};

  if (req.file) {
    juego.imagen = "/" + req.file.originalname;
  }

  Object.assign(juego, req.body);

  await juego.save();

  res.json({ message: "Actualizado: ", juego });
};

const eliminarVideojuego = async (req, res) => {
    try {
      const juego = await Videojuego.findByPk(req.params.id);

      if (!juego) {
        return res.status(404).send({ message: "Videojuego no encontrado" });
      }

      await juego.update(
        {
          stock: false,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    res.status(200).send(juego);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
};

module.exports = { crearVideojuego, traerVideojuegos, traerVideojuegosPorId, actualizarVideojuego, eliminarVideojuego };   