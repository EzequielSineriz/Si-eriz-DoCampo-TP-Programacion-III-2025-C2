const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype;
    const [tipo, extension] = mimetype.split("/");
    if (tipo !== "image") {
      cb(new Error("No es imagen"));
    } else {
      const nombre = file.originalname.replace(/\s+/g, "_") + "-" + Date.now() + "." + extension;
      cb(null, nombre);
    }
  },
});

// Validación y límites
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 200000, // 200 KB
  },
  fileFilter: (req, file, callback) => {
    const tiposPermitidos = /jpg|jpeg|png/;
    const tipo = file.mimetype.split("/")[1];
    const esImagen = tiposPermitidos.test(tipo);

    if (esImagen) callback(null, true);
    else callback(new Error("La imagen no es una imagen permitida"));
  },
  storage: storage,
});

module.exports = upload;
