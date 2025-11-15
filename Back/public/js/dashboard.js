
async function cargarDatos() {
  const [videoRes, mesaRes] = await Promise.all([
    fetch("/videojuegos"),
    fetch("/juegosdemesa"), 
  ]);

  const videojuegos = await videoRes.json();
  const juegosMesa = await mesaRes.json();

  renderCards(videojuegos, "videojuegos", "videojuego");
  renderCards(juegosMesa, "juegosMesa", "juegoMesa");
}

function renderCards(lista, contenedorId, tipo) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML =
      "<p class='text-muted'>No hay elementos cargados.</p>";
    return;
  }

  lista.forEach((p) => {
    contenedor.innerHTML += `
            <div class="col-md-3 mb-3">
              <div class="card shadow-sm h-100">
                <img src="http://localhost:3000/public${p.imagen}"
                     class="card-img-top"
                     style="height:200px;object-fit:cover;">

                <div class="card-body d-flex flex-column">
                  <h5>${p.nombre}</h5>
                  <p>$${p.precio}</p>

                  <div class="mt-auto">
                    <button onclick="editar('${tipo}', ${p.id})"
                            class="btn btn-warning w-100 mb-2">
                      ✏ Editar
                    </button>

                    <button onclick="eliminar('${tipo}', ${p.id})"
                            class="btn btn-danger w-100">
                      🗑 Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
  });
}

async function eliminar(tipo, id) {
  const nombre = tipo === "videojuego" ? "videojuegos" : "juegos-mesa";

  const r = await Swal.fire({
    title: "¿Seguro?",
    text: "El elemento será eliminado",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
  });

  if (r.isConfirmed) {
    await fetch(`/${nombre}/${id}`, { method: "DELETE" });
    Swal.fire("Eliminado", "", "success");
    cargarDatos();
  }
}

function editar() {
  window.location.href = "./editarProducto";
  
}

cargarDatos();
