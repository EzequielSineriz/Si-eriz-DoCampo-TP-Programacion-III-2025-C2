const btnModoOscuro = document.getElementById("modoOscuroBtn");
btnModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");
  btnModoOscuro.textContent = document.body.classList.contains("modo-oscuro")
    ? "☀️"
    : "🌙";
});
