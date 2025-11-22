const params = new URLSearchParams(window.location.search);

const id = params.get('id');
const tipo = params.get('tipo');

console.log('ID:', id);
console.log('Tipo:', tipo);

document.getElementById('id-input').value = `ID: ${id}`;
document.getElementById('tipo-input').value = `Tipo: ${tipo}`;

document.getElementById('boton-salir').addEventListener('click', () => {window.location.href = '/admin';});