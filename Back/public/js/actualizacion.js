const params = new URLSearchParams(window.location.search);

const id = params.get('id');
const tipo = params.get('tipo');

console.log('ID:', id);
console.log('Tipo:', tipo);

document.getElementById('id-input').value = id;
document.getElementById('tipo-input').value = tipo;

document.getElementById('boton-salir').addEventListener('click', () => {window.location.href = '/admin';});

document.getElementById('boton-actualizar').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre-input').value;
    const descripcion = document.getElementById('descripcion-input').value;
    const precio = document.getElementById('precio-input').value;
    const imagen = document.getElementById('imagen-input').value;
    const id = document.getElementById('id-input').value;
    const tipo = document.getElementById('tipo-input').value;

    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    console.log('Precio:', precio);
    console.log('Imagen:', imagen);
    console.log('ID:', id);
    console.log('Tipo:', tipo)
    }
);
