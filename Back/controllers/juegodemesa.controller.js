const JuegoDeMesa = require("../models/juegoDeMesa"); // Import the juego de mesa model

const crearJuegoDeMesa = async (req, res) => {
  try {

    // 1. Tomar datos.
    const body = req.body;

    const nombre = body.nombre;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const stock = body.stock;
    const imagen = body.imagen;


    // const { nombre, descripcion, precio, stock, imagen} = req.body;

    // 2. Hacer algo con los datos.
    const resultado = await JuegoDeMesa.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: imagen,
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

    const resultadoDelUpdate = await JuegoDeMesa.update(
      {
        nombre: nombre,
        descripcion: descripcion,
        stock: stock,
        precio: precio,
        imagen: imagen,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).send(resultadoDelUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }};

const eliminarJuegoDeMesa = async (req, res) => {
     try {
    console.log(req.body);
    const resultado = await JuegoDeMesa.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
};

module.exports = { crearJuegoDeMesa, traerJuegoDeMesa, traerJuegoDeMesaPorId, actualizarJuegoDeMesa, eliminarJuegoDeMesa };   