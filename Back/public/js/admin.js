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
    setTimeout(() => location.reload(), 800);
  }
}
