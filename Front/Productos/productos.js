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

const saludo = document.getElementById("saludo");
const nombre = localStorage.getItem("nombre") || "Invitado";
saludo.textContent = "Bienvenido, " + nombre;

