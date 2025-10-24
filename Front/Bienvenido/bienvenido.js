const btnModoOscuro = document.getElementById("modoOscuroBtn");
btnModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");
  btnModoOscuro.textContent = document.body.classList.contains("modo-oscuro")
    ? "☀️"
    : "🌙";
});

const input = document.getElementById("input");
const boton = document.getElementById("boton");

boton.addEventListener("click", function() {
    const nombre = input.value;
    window.location.href = "../Productos/productos.html";

});

