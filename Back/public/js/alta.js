const params = new URLSearchParams(window.location.search);

const tipo = params.get('tipo');

console.log('Tipo:', tipo);

document.getElementById('tipo-input').value = tipo;

document.getElementById('boton-salir').addEventListener('click', () => {window.location.href = '/admin';});



document.getElementById('boton-alta').addEventListener('click', async () => {

    const nombre = document.getElementById('nombre-input').value;
    const descripcion = document.getElementById('descripcion-input').value;
    let precio = document.getElementById('precio-input').value;
    let stock = parseInt(document.getElementById('stock-input').value);
    const imagen = document.getElementById('imagen-input').files[0];

    if (!nombre || !descripcion || !precio || !imagen || isNaN(stock)) {
        swal.fire({
            icon: "error",
            title: "Error",
            text: "Complete todos los campos",
        });
        return;
    }

    stock = stock === 1 ? true : false;
    precio = parseFloat(precio);

    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("imagen", imagen);

    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    console.log('Precio:', precio);
    console.log('Imagen:', imagen.name);
    console.log('Stock:', stock);
    console.log('Tipo:', tipo);

    console.log("STOCK:", stock);
    const categoria = (tipo === "videojuego") ? "videojuegos" : "juegosdemesa";

    
    try {
        const res = await fetch(`http://localhost:3000/${categoria}`, {
            method: "POST",
            body: formData,
        });

        const respuesta = await res.json();
        console.log(respuesta);

        swal.fire({
            icon: "success",
            title: "Éxito",
            text: `${nombre} creado correctamente`,
        }).then(() => {window.location.href = "/admin"});

    }

    catch (error) {
        console.error('Error al crear el producto:', error);
        swal.fire({
            icon: "error",
            title: "Error Interno",
            text: "No se pudo agregar el producto",
        });
    }
}
);
