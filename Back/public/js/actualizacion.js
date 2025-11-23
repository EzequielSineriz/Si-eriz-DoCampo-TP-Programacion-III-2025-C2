const params = new URLSearchParams(window.location.search);

const id = params.get('id');
const tipo = params.get('tipo');

console.log('ID:', id);
console.log('Tipo:', tipo);

document.getElementById('id-input').value = id;
document.getElementById('tipo-input').value = tipo;

document.getElementById('boton-salir').addEventListener('click', () => {window.location.href = '/admin';});