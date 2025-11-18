async function eliminar(tipo, id) {
  const base = tipo === "videojuego" ? "videojuegos" : "juegosdemesa";

  const r = await Swal.fire({
    title: "¿Seguro?",
    text: "El juego pasará a estar SIN STOCK",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
  });

  if (r.isConfirmed) {

    const res = await fetch(`/${base}/${id}/stock`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: false })
    });

    if (!res.ok) {
      Swal.fire("Error", "No se pudo actualizar el stock", "error");
      return;
    }

    Swal.fire("Actualizado", "El juego ahora está sin stock", "success");
    setTimeout(() => location.reload(), 700);
  }
}

async function darAlta(tipo, id) {
  const base = tipo === "videojuego" ? "videojuegos" : "juegosdemesa";

  const res = await fetch(`/${base}/${id}/stock`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock: true })
  });

  if (!res.ok) {
    Swal.fire("Error", "No se pudo dar de alta el stock", "error");
    return;
  }

  Swal.fire("Listo", "Stock dado de alta correctamente", "success");
  setTimeout(() => location.reload(), 700);
}
