const JuegoDeMesa = require("../models/juegoDeMesa");

const crearJuegoDeMesa = async (req, res) => {
  try {

    const body = req.body;

    const nombre = body.nombre;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const stock = body.stock;
    const imagen = req.file ? req.file.originalname : null;


    const resultado = await JuegoDeMesa.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: "/" + imagen,
    });
    
    res.status(201).send(resultado);
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(400).send({ message: "Falta algún parametro" });
    } else {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }}};

const traerJuegoDeMesa = async (req, res) => {
  try {
    const juegos = await JuegoDeMesa.findAll();
    res.json(juegos);
  } catch (error) {
    console.error("❌ Error al obtener juegos de mesa:", error);
    res.status(500).json({ error: "Error al obtener juegos de mesa" });
  }
};

const traerJuegoDeMesaPorId = async (req, res) => {
  try {
    const juego = await JuegoDeMesa.findByPk(req.params.id);
    res.status(200).send(juego);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
};

const actualizarJuegoDeMesa = async (req, res) => {
  const { id } = req.params;
  const juego = await JuegoDeMesa.findByPk(id);
  if (!juego){
    return res.status(404).json({ error: "Juego no encontrado" })};

  if (req.file) {
    juego.imagen = "/" + req.file.originalname;
  }

  Object.assign(juego, req.body);

  await juego.save();

  res.json({ message: "Actualizado: ", juego });
};

const eliminarJuegoDeMesa = async (req, res) => {
    try {
      const juego = await JuegoDeMesa.findByPk(req.params.id);

      if (!juego) {
        return res.status(404).send({ message: "Juego de mesa no encontrado" });
      }

      await juego.destroy();

    res.status(200).send(juego);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
};

module.exports = { crearJuegoDeMesa, traerJuegoDeMesa, traerJuegoDeMesaPorId, actualizarJuegoDeMesa, eliminarJuegoDeMesa };   