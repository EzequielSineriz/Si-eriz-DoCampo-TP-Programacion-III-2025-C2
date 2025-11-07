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

// === Variables globales ===
let juegosdemesa = [];
let paginaActual = 1;
const porPagina = 6;

// === Referencias DOM ===
const contenedor = document.getElementById("contenedorJuegosDeMesa");
const paginacion = document.getElementById("paginacion");
const buscador = document.getElementById("buscador");
const buscarBtn = document.getElementById("buscarBtn");
const modoOscuroBtn = document.getElementById("modoOscuroBtn");

// === Obtener juegos de mesa desde el backend ===
async function cargarJuegosDeMesa() {
  try {
    const res = await fetch("http://localhost:3000/juegosdemesa");
    juegosdemesa = await res.json();
    console.log("Lista de juegos de mesa:", juegosdemesa);
    juegosdemesa.forEach(v => console.log("Imagen:", v.imagen)); // para saber donde apunta la imagen
    renderizar(juegosdemesa);
  } catch (error) {
    console.error("Error al cargar juegos de mesa:", error);
    contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar los juegos de mesa.</p>`;
  }
}

// === Renderizado ===
function renderizar(juegosdemesaFiltrados) {
  contenedor.innerHTML = "";

  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const pagina = juegosdemesaFiltrados.slice(inicio, fin);

  if (pagina.length === 0) {
    contenedor.innerHTML =
      "<p class='text-center text-muted'>No se encontraron resultados.</p>";
    paginacion.innerHTML = "";
    return;
  }

  pagina.forEach((v) => {
    const card = document.createElement("div");
    card.classList.add("col-12", "col-md-6", "col-lg-4");
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="http://localhost:3000/public${
          v.imagen
        }" class="card-img-top" alt="${v.nombre}">
        <div class="card-body text-center d-flex flex-column">
          <h5 class="card-title">${v.nombre}</h5>
          <p class="card-text">${v.descripcion}</p>
          <p class="text-${v.stock ? "success" : "danger"} fw-bold">${
      v.stock ? "Disponible" : "No disponible"
    }</p>
          <p class="fw-bold">$${v.precio.toFixed(2)}</p>
          <div class="mt-auto">
            <input type="number" min="1" max="10" value="1" class="form-control mb-2 cantidad" ${
              !v.stock ? "disabled" : ""
            }>
            <button class="btn btn-primary w-100" ${
              !v.stock ? "disabled" : ""
            } onclick="agregarAlCarrito(${v.id})">
              Agregar al carrito 🛒
            </button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  renderizarPaginacion(juegosdemesaFiltrados.length);
}

function renderizarPaginacion(total) {
  const totalPaginas = Math.ceil(total / porPagina);
  paginacion.innerHTML = "";

  if (totalPaginas <= 1) return; // Evita paginación innecesaria

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === paginaActual) {
      li.classList.add("active");
    }

    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      paginaActual = i;
      filtrar();
    });
    paginacion.appendChild(li);
  }
}



// === Filtrado ===
function filtrar() {
  const texto = buscador.value.toLowerCase().trim();
  const filtrados = juegosdemesa.filter(v => v.nombre.toLowerCase().includes(texto));

  // Reinicia la pagina si se hace una nueva busqueda
  if (paginaActual > Math.ceil(filtrados.length / porPagina)) {
    paginaActual = 1;
  }

  renderizar(filtrados);
}

// === Carrito ===
function agregarAlCarrito(id) {
  const juegodemesa = juegosdemesa.find(v => v.id === id);
  if (!juegodemesa || !juegodemesa.stock) return;

  const card = [...document.querySelectorAll(".card")].find(c => 
    c.querySelector("h5").textContent === juegodemesa.nombre
  );

  let carrito = JSON.parse(localStorage.getItem("carritoJuegosDeMesa")) || [];

  const cantidad = parseInt(card.querySelector(".cantidad").value);

  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += cantidad;
  } 
  
  else {
    carrito.push({
      id: juegodemesa.id,
      cantidad: cantidad,
      tipo: "juegosdemesa"
    });
  }

  localStorage.setItem("carritoJuegosDeMesa", JSON.stringify(carrito));
  console.log("Carrito actual:", carrito);

 Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Agregado al carrito",
  showConfirmButton: false,
  timer: 1000,
  theme: body.classList.contains("modo-oscuro") ? "dark" : "light"
});
}

// === Inicial ===
//renderizar(juegfosdemesa);
cargarJuegosDeMesa();

// === Eventos ===
buscarBtn.addEventListener("click", filtrar);
buscador.addEventListener("keyup", filtrar);


