
const message = "<%= message || '' %>";
const type = "<%= type || '' %>";
const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")

document.getElementById("btnIngresar").onclick = () => {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  if (usuario !== "" && contrasena !== "" && usuario !== "admin" && contrasena !== 1234) {
    Swal.fire({
      icon: type === "success" ? "success" : "error",
      title: "Contraseña Incorrecta",
      confirmButtonColor: "#0077ff",
      background: "#0a0f1a",
      color: "#fff",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      if (type === "success") {
        window.location.href = "/index";
      }
    });
  }
}

document.getElementById("autoIngreso").onclick = function () {
  contrasena.value = 1234;
  usuario.value = "admin";
};