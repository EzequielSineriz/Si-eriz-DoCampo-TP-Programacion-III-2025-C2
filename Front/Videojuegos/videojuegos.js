const videojuegos = [
  { id: 1, nombre: "God of War", descripcion: "Aventura épica en el mundo nórdico", precio: 80, stock: true, imagen: "../img/games/godofwar.jpg" },
  { id: 2, nombre: "Elden Ring", descripcion: "Mundo abierto desafiante", precio: 90, stock: false, imagen: "../img/games/eldenring.jpg" },
  { id: 3, nombre: "FIFA 25", descripcion: "Simulador de fútbol", precio: 70, stock: true, imagen: "../img/games/fifa25.jpg" },
  { id: 4, nombre: "Cyberpunk 2077", descripcion: "RPG futurista", precio: 75, stock: true, imagen: "../img/games/cyberpunk.jpg" },
  { id: 5, nombre: "The Witcher 3", descripcion: "Cacería salvaje", precio: 60, stock: true, imagen: "../img/games/witcher3.jpg" },
  { id: 6, nombre: "Minecraft", descripcion: "Construye y sobrevive", precio: 40, stock: true, imagen: "../img/games/minecraft.jpg" },
  { id: 7, nombre: "Halo Infinite", descripcion: "Acción futurista", precio: 85, stock: false, imagen: "../img/games/halo.jpg" },
  { id: 8, nombre: "GTA V", descripcion: "Mundo abierto", precio: 70, stock: true, imagen: "../img/games/gtav.jpg" },
  { id: 9, nombre: "Red Dead Redemption 2", descripcion: "Aventura en el oeste", precio: 95, stock: true, imagen: "../img/games/rdr2.jpg" },
  { id: 10, nombre: "Resident Evil 4", descripcion: "Terror y acción", precio: 85, stock: true, imagen: "../img/games/re4.jpg" },
  { id: 11, nombre: "Forza Horizon 5", descripcion: "Carreras épicas", precio: 78, stock: true, imagen: "../img/games/forza5.jpg" },
  { id: 12, nombre: "Assassin's Creed Mirage", descripcion: "Sigilo en Bagdad", precio: 82, stock: true, imagen: "../img/games/acmirage.jpg" },
  { id: 13, nombre: "Call of Duty MW3", descripcion: "Shooter militar", precio: 88, stock: true, imagen: "../img/games/codmw3.jpg" },
  { id: 14, nombre: "Spider-Man 2", descripcion: "Superhéroes y acción", precio: 90, stock: true, imagen: "../img/games/spiderman2.jpg" },
  { id: 15, nombre: "Hogwarts Legacy", descripcion: "Magia y aventuras", precio: 85, stock: true, imagen: "../img/games/hogwarts.jpg" },
];

let paginaActual = 1;
const porPagina = 9;
let carrito = [];

// === Referencias DOM ===
const contenedor = document.getElementById("contenedorVideojuegos");
const paginacion = document.getElementById("paginacion");
const buscador = document.getElementById("buscador");
const buscarBtn = document.getElementById("buscarBtn");
const modoOscuroBtn = document.getElementById("modoOscuroBtn");

// === Renderizado ===
function renderizar(videojuegosFiltrados) {
  contenedor.innerHTML = "";

  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const pagina = videojuegosFiltrados.slice(inicio, fin);

  if (pagina.length === 0) {
    contenedor.innerHTML = "<p class='text-center text-muted'>No se encontraron resultados.</p>";
    paginacion.innerHTML = "";
    return;
  }

  pagina.forEach(v => {
    const card = document.createElement("div");
    card.classList.add("col-12", "col-md-6", "col-lg-4");
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${v.imagen}" class="card-img-top" alt="${v.nombre}">
        <div class="card-body text-center d-flex flex-column">
          <h5 class="card-title">${v.nombre}</h5>
          <p class="card-text">${v.descripcion}</p>
          <p class="text-${v.stock ? "success" : "danger"} fw-bold">${v.stock ? "Disponible" : "No disponible"}</p>
          <p class="fw-bold">$${v.precio.toFixed(2)}</p>
          <div class="mt-auto">
            <input type="number" min="1" max="10" value="1" class="form-control mb-2 cantidad" ${!v.stock ? "disabled" : ""}>
            <button class="btn btn-primary w-100" ${!v.stock ? "disabled" : ""} onclick="agregarAlCarrito(${v.id})">
              Agregar al carrito 🛒
            </button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  renderizarPaginacion(videojuegosFiltrados.length);
}

function renderizarPaginacion(total) {
  const totalPaginas = Math.ceil(total / porPagina);
  paginacion.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item", i === paginaActual ? "active" : "");
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
  const filtrados = videojuegos.filter(v => v.nombre.toLowerCase().includes(texto));

  // Reinicia la página si se hace una nueva búsqueda
  if (paginaActual > Math.ceil(filtrados.length / porPagina)) {
    paginaActual = 1;
  }

  renderizar(filtrados);
}

// === Carrito ===
function agregarAlCarrito(id) {
  const videojuego = videojuegos.find(v => v.id === id);
  if (!videojuego || !videojuego.stock) return;

  const card = [...document.querySelectorAll(".card")].find(c => 
    c.querySelector("h5").textContent === videojuego.nombre
  );

  const cantidad = parseInt(card.querySelector(".cantidad").value);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...videojuego, cantidad });
  }

  console.log("🛒 Carrito actual:", carrito);
  alert(`Se agregaron ${cantidad} unidad(es) de ${videojuego.nombre} al carrito.`);
}

// === Modo oscuro ===
modoOscuroBtn.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");
  modoOscuroBtn.textContent = document.body.classList.contains("modo-oscuro") ? "☀️" : "🌙";
});

// === Inicial ===
renderizar(videojuegos);

// === Eventos ===
buscarBtn.addEventListener("click", filtrar);
buscador.addEventListener("keyup", filtrar);

