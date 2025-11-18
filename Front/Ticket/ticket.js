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

  const productosDiv = document.getElementById("productos");
  productosDiv.innerHTML = "";

  let precioTotal = 0;

  // Fecha
  const fecha = new Date().toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  document.getElementById("fechaTicket").textContent = `Fecha: ${fecha}`;

  // Cliente
  const nombreCliente = localStorage.getItem("nombre") || "Invitado";
  document.getElementById("nombreCliente").textContent = `Cliente: ${nombreCliente}`;

  // Productos
  for (let item of carrito) {
    try {
      const response = await fetch('http://localhost:3000/' + item.tipo + '/' + item.id);
      const producto = await response.json();

      const subtotal = producto.precio * item.cantidad;
      precioTotal += subtotal;
    
      const fila = document.createElement("div");
      fila.classList.add("fila-producto");

      fila.innerHTML = `
        <span class="col col-producto">${producto.nombre}</span>
        <span class="col col-precio">$${producto.precio}</span>
        <span class="col col-cantidad">${item.cantidad}</span>
        <span class="col col-subtotal">$${subtotal}</span>
      `;
      productosDiv.appendChild(fila);

    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }

  document.getElementById("totalFinal").textContent = `Total: $${precioTotal}`;
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