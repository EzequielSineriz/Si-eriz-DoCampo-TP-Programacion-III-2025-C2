const params = new URLSearchParams(window.location.search);

const id = params.get('id');
const tipo = params.get('tipo');

console.log('ID:', id);
console.log('Tipo:', tipo);

document.getElementById('id-input').value = id;
document.getElementById('tipo-input').value = tipo;
const categoria = (tipo === "videojuego") ? "videojuegos" : "juegosdemesa"

async function cargarDatos(categoria, id) {
    console.log(categoria, id);
    try {
        const datos = await fetch(`http://localhost:3000/${categoria}`,);
        const jsonDatos = await datos.json();

        console.log('Datos:', jsonDatos);
        const item = jsonDatos.find(i => i.id == id);
        console.log('Item:', item);

        console.log('Nombre:', item.nombre);   
        document.getElementById('actualizacion-de').textContent = `Actualizando: ${item.nombre}`;   
        document.getElementById('nombre-input').value = item.nombre;
        document.getElementById('descripcion-input').value = item.descripcion;
        document.getElementById('precio-input').value = item.precio;
    }

    catch (error) {
        console.error('Error:', error)
    }
}

document.getElementById('boton-salir').addEventListener('click', () => {window.location.href = '/admin';});

document.getElementById('boton-actualizar').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre-input').value;
    const descripcion = document.getElementById('descripcion-input').value;
    const precio = document.getElementById('precio-input').value;
    const imagen = document.getElementById('imagen-input').files[0];

    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    console.log('Precio:', precio);
    console.log('Imagen:', imagen);
    console.log('ID:', id);
    console.log('Tipo:', tipo)

    if (!nombre || !descripcion || !precio) {
        swal.fire({
            icon: "error",
            title: "Error",
            text: "Complete todos los campos",
        });
        return;
    }

    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);

    if (imagen) {
        formData.append("imagen", imagen);
    }

    try {
        const res = await fetch(`http://localhost:3000/${categoria}/${id}`, {
            method: "PUT",
            body: formData,
        });
        const respuesta = await res.json();
        console.log(respuesta);


        swal.fire({
            icon: "success",
            title: "Éxito",
            text: `${nombre} actualizado correctamente`,
        }).then(() => {window.location.href = "/admin";});

    }   
    
    catch (error) {
        console.error("Error:", error);
        swal.fire({
            icon: "error",
            title: "Error Interno",
            text: "No se puedieron actualizar los datos",
        });
    }
}

);


cargarDatos(categoria, id);