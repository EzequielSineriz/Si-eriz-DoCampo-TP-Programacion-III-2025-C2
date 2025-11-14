import Swal from 'sweetalert2'

// or via CommonJS
const Swal = require('sweetalert2')

const message = "<%= message || '' %>";
const type = "<%= type || '' %>";

if (message) {
  Swal.fire({
    icon: type === "success" ? "success" : "error",
    title: message,
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
