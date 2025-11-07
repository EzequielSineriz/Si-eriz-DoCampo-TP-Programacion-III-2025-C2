// modo oscuro

const btnModoOscuro = document.getElementById("modoOscuroBtn");
const btnSalir = document.getElementById("boton-salir");
const btnDescargar = document.getElementById("boton-descargar");
const body = document.body;

if (localStorage.getItem("modoOscuro") === "true") {
  body.classList.add("modo-oscuro");
  btnModoOscuro.textContent = "🌙";
}

btnModoOscuro.addEventListener("click", () => {
  body.classList.toggle("modo-oscuro");

  const modoOscuroActivo = body.classList.contains("modo-oscuro");
  localStorage.setItem("modoOscuro", modoOscuroActivo);

  btnModoOscuro.textContent = modoOscuroActivo ? "🌙" : "☀️";
});

// productos

const productosDiv = document.getElementById("productos");


async function getProductos() {
  const carritoVideojuegos = JSON.parse(localStorage.getItem("carritoVideojuegos")) || [];
  const carritoJuegosDeMesa = JSON.parse(localStorage.getItem("carritoJuegosDeMesa")) || [];
  const carrito = [...carritoVideojuegos, ...carritoJuegosDeMesa];
  let precioTotal = 0;
  const nombreCliente = localStorage.getItem("nombre") || "nombre";
  document.getElementById("nombreCliente").textContent = `Cliente: ${nombreCliente}`;

  for (let item of carrito) {
    try{
      const response = await fetch('http://localhost:3000/' + item.tipo + '/' + item.id);
      const producto = await response.json();
      let productoLinea = document.createElement("p");
      productoLinea.textContent = `${producto.nombre} - ${item.cantidad} - $${producto.precio * item.cantidad}`;
      precioTotal += producto.precio * item.cantidad;
      productosDiv.appendChild(productoLinea);
    }
    catch(error){
      console.error("Error al obtener el producto: ", item, error);
    }
  }

  let separador = document.createElement("h2");
  separador.textContent = "---------------------------------";
  productosDiv.appendChild(separador);
  let totalLinea = document.createElement("h3");
  totalLinea.textContent = `Total: $${precioTotal}`;
  productosDiv.appendChild(totalLinea);
}


// botones
btnSalir.onclick = () => {
  localStorage.setItem("carritoVideojuegos", JSON.stringify([]));
  localStorage.setItem("carritoJuegosDeMesa", JSON.stringify([]));
  localStorage.removeItem("nombre");
  window.location.href = "../Bienvenido/bienvenido.html";
}

btnDescargar.onclick = () => {
  const pdfElement = document.getElementById("ticket");

  const opciones = {
    margin: [10, 10, 10, 10],
    filename: "ticket_dualplay.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    }
  };

  html2pdf().set(opciones).from(pdfElement).save();
};

getProductos();