const JuegoDeMesa = require("../models/juegoDeMesa");

const crearJuegoDeMesa = async (req, res) => {
  try {

    const body = req.body;

    const nombre = body.nombre;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const stock = body.stock;
    const imagen = body.imagen;


    const resultado = await JuegoDeMesa.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: imagen,
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
    try {
    const { nombre, descripcion, precio, stock, imagen} = req.body;
    const juego = await JuegoDeMesa.findByPk(req.params.id);

    await juego.update(
      {
        nombre: nombre,
        descripcion: descripcion,
        stock: stock,
        precio: precio,
        imagen: imagen,
      }
    );

    res.status(200).send(juego);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
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