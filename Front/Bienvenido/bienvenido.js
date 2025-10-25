const input = document.getElementById("input");
const boton = document.getElementById("boton");

// modo oscuro
const btnModoOscuro = document.getElementById("modoOscuroBtn");
const body = document.body;

if (localStorage.getItem("modoOscuro") === "true") {
  body.classList.add("modo-oscuro");
  btnModoOscuro.textContent = "🌑";
}

btnModoOscuro.addEventListener("click", () => {
  body.classList.toggle("modo-oscuro");

  const modoOscuroActivo = body.classList.contains("modo-oscuro");
  localStorage.setItem("modoOscuro", modoOscuroActivo);

  btnModoOscuro.textContent = modoOscuroActivo ? "🌑" : "🌙";
});

boton.addEventListener("click", function() {
    const error = document.getElementById("error");
    if (input.value.length < 3 || input.value.length > 11) {
        error.textContent = "El nombre debe tener entre 3 y 11 caracteres";
    }
    else {
        localStorage.setItem("nombre", input.value);
        window.location.href = "../Productos/productos.html";
    }
});

input.addEventListener("input", function() {
  this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
});

