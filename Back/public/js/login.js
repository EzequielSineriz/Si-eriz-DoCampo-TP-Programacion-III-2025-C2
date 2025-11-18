const usuario = document.getElementById("usuario");
const contrasena = document.getElementById("contrasena");
const btnIngresar = document.getElementById("btnIngresar");

// Mensajes que vienen del backend
const message = window.loginMessage;
const type = window.loginType;
const redirect = window.loginRedirect;

// Si hay mensaje del backend → mostrar SWEETALERT
if (message) {
  Swal.fire({
    icon: type,
    title: message,
    confirmButtonColor: "#0077ff",
    background: "#0a0f1a",
    color: "#fff",
    timer: 1800,
    showConfirmButton: false,
  }).then(() => {
    if (type === "success" && redirect) {
      window.location.href = redirect;
    }
  });
}

// VALIDACIÓN BÁSICA DEL FORM ANTES DE ENVIARLO
btnIngresar.addEventListener("click", () => {
  if (usuario.value === "" || contrasena.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Completa todos los campos",
      background: "#0a0f1a",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
  }});

// BOTÓN DE INGRESO AUTOMÁTICO (para facilitar testing)
const autoIngreso = document.getElementById("autoIngreso");
autoIngreso.addEventListener("click", () => {
  usuario.value = "admin";
  contrasena.value = 1234;
  //btnIngresar.click();
});