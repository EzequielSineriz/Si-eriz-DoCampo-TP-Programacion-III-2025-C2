// modo oscuro

const btnModoOscuro = document.getElementById("modoOscuroBtn");
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

// carrito

let carritoVideojuegos = JSON.parse(localStorage.getItem("carritoVideojuegos")) || [];
let carritoJuegosDeMesa = JSON.parse(localStorage.getItem("carritoJuegosDeMesa")) || [];
let precioFinalElemento = document.getElementById("precio-final");
const contenedorJuegos = document.getElementById("juegos");
const btnFinalizar = document.getElementById("btnFinalizar");
let carrito = [];
carrito.push(...carritoJuegosDeMesa, ...carritoVideojuegos);


async function cargarJuegos() {

  console.log(carrito);
  
  if (carrito.length === 0) {
    btnFinalizar.disabled = true;
  }

  else {
    btnFinalizar.disabled = false;
  }

  for (const producto of carrito) {
    const div = document.createElement("div");
    div.classList.add("juegoCarrito");
    let res;

    try{
      res = await fetch("http://localhost:3000/" + producto.tipo + "/" + producto.id);
      
      const juego = await res.json();
      const precioUnidad = juego.precio;

      const juegoImagen = document.createElement("img");
      juegoImagen.src = "http://127.0.0.1:5500/Back/public/" + juego.imagen;;
      div.appendChild(juegoImagen); 

      const juegoNombre = document.createElement("h3");
      juegoNombre.textContent = juego.nombre;
      div.appendChild(juegoNombre);

      const botones = document.createElement("section");

      const precio = document.createElement("h3");
      precio.textContent = juego.precio * producto.cantidad + "$";
      botones.appendChild(precio);

      const botonReducir = document.createElement("button");
      botonReducir.className = "btn btn-primary botonReducir";
      botonReducir.textContent = " - ";
      botones.appendChild(botonReducir);

      const inputCantidad = document.createElement("input");
      inputCantidad.className = 'input-cantidad form-control input';
      inputCantidad.value = producto.cantidad;
      inputCantidad.min = 1;
      inputCantidad.readOnly = true;
      botones.appendChild(inputCantidad);

      const botonAumentar = document.createElement("button");
      botonAumentar.className = "btn btn-primary botonAumentar";
      botonAumentar.textContent = " + ";
      botones.appendChild(botonAumentar);

      console.log(juego.precio);

      const botonEliminar = document.createElement("button");
      botonEliminar.className = "btn btn-danger";
      botonEliminar.textContent = " 🗑️ ";
      botones.appendChild(botonEliminar);

      div.appendChild(botones);

      function updatePrecio() {
        const total = precioUnidad * producto.cantidad;
        precio.textContent = total + "$";
        inputCantidad.value = producto.cantidad;
      }
      
      botonAumentar.addEventListener("click", () => {
        updateCarrito("aumentar", producto);
        updatePrecio();
        recalcularTotal();
      });

      botonReducir.addEventListener("click", () => {
        if (producto.cantidad > 1) {
          updateCarrito("reducir", producto);
          updatePrecio();
          recalcularTotal();
        }
      });
      
      botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(producto, div);
        recalcularTotal();
      });

      contenedorJuegos.appendChild(div);
    
      recalcularTotal();}

    catch (error) {
      console.error("Error al cargar " + producto.nombre + ": " + error);
  }
}

function eliminarDelCarrito(producto, div) {
  let carritoCambiar = producto.tipo === "videojuegos" ? carritoVideojuegos : carritoJuegosDeMesa;
  const tipoStorage = producto.tipo === "videojuegos" ? "carritoVideojuegos" : "carritoJuegosDeMesa";

  const index = carritoCambiar.findIndex(item => item.id === producto.id);

  if (index !== -1) {
    carritoCambiar.splice(index, 1);
    div.remove();
    localStorage.setItem(tipoStorage, JSON.stringify(carritoCambiar));
  }
}

async function recalcularTotal() {
  let total = 0;
  const todos = [...carritoVideojuegos, ...carritoJuegosDeMesa];

  for (const item of todos) {
 
    let res = await fetch("http://localhost:3000/" + item.tipo + "/" + item.id);
    const juego = await res.json();
    total += item.cantidad * juego.precio;
  }

  precioFinalElemento.textContent = total + "$";
}

function updateCarrito(funcion, producto) {
  const carrito = [...carritoVideojuegos, ...carritoJuegosDeMesa];
  let carritoCambiar = producto.tipo === "videojuegos" ? carritoVideojuegos : carritoJuegosDeMesa;

  const index = carritoCambiar.findIndex(item => item.id === producto.id);

  if (index !== -1) {
    if (funcion === "aumentar") {
      carritoCambiar[index].cantidad++;
      producto.cantidad = carritoCambiar[index].cantidad;
    }

    if (funcion === "reducir" && carritoCambiar[index].cantidad > 1) {
      carritoCambiar[index].cantidad--;
      producto.cantidad = carritoCambiar[index].cantidad;
    }
  }

  const tipoStorage = producto.tipo === "videojuegos" ? "carritoVideojuegos" : "carritoJuegosDeMesa";
  localStorage.setItem(tipoStorage, JSON.stringify(carritoCambiar));
  if (carrito.length === 0) {
    btnFinalizar.disabled = true;
  }

  else {
    btnFinalizar.disabled = false;
  }
}
}

btnFinalizar.onclick = async () => {
  try {
    const venta = {
      cliente: localStorage.getItem("nombre") || "Invitado",
      productos: [...carritoVideojuegos.map(item => ({ id: item.id, tipo: "Videojuego", cantidad: item.cantidad })), 
                  ...carritoJuegosDeMesa.map(item => ({ id: item.id, tipo: "Juego de mesa", cantidad: item.cantidad }))]
    };

    console.log(venta);

    const respuesta = await fetch("http://localhost:3000/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta),
    });
  }

  catch (error) {
      console.error("Error al finalizar la compra:", error);
    }

    window.location.href='../Ticket/ticket.html';
}

cargarJuegos();

