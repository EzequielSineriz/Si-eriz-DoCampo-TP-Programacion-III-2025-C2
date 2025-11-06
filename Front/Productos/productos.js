// modo oscuro

const btnModoOscuro = document.getElementById("modoOscuroBtn");
const btnVolver = document.getElementById("btnVolver");
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

btnVolver.addEventListener("click", () => {
  carrito = [];
  carritoVideojuegos = JSON.parse(localStorage.getItem("carritoVideojuegos"));
  carritoJuegosDeMesa = JSON.parse(localStorage.getItem("carritoJuegosDeMesa"));
  carrito.push(... carritoVideojuegos, ...carritoJuegosDeMesa);
  console.log(carrito);
  if (carrito.length === 0) {
    window.location.href = "../Bienvenido/bienvenido.html";}

  else {
    Swal.fire({
      title: "¿Está seguro que desea volver?",
      text: "Al volver a la pagina principal se eliminará el carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Volver",
      cancelButtonText: "Cancelar",
    })
    
    .then((resultado) => {
      if (resultado.isConfirmed) {
        localStorage.removeItem("nombre");
        localStorage.setItem("carritoVideojuegos", JSON.stringify([]));
        localStorage.removeItem("carritoJuegosDeMesa", JSON.stringify([]));
        window.location.href = "../Bienvenido/bienvenido.html";
      } 

    else if (resultado.dismiss === Swal.DismissReason.cancel) {}
  })
  };

});


const saludo = document.getElementById("saludo");
const nombre = localStorage.getItem("nombre") || "Invitado";
saludo.textContent = "Bienvenido, " + nombre;
