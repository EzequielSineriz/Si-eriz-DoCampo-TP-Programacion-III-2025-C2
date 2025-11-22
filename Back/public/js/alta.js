const params = new URLSearchParams(window.location.search);

const tipo = params.get('tipo');

console.log('Tipo:', tipo);

document.getElementById('tipo-input').value = `Tipo: ${tipo}`;

document.getElementById('boton-salir').addEventListener('click', () => {window.location.href = '/admin';});