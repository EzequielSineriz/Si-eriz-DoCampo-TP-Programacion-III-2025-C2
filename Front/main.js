const archivoDeAmbiente = "./ambiente.json";
let apiUrl = "";

async function traer(){
    const response = await fetch(apiUrl);
    const json = await response.json();
    console.log(json);
}

document.addEventListener("DOMContentLoaded", async () => {
    const respuestaAmbiente = await fetch(archivoDeAmbiente);

    if(!respuestaAmbiente.ok){
        console.log("archivo de ambiente del front no configurado");
    }

    const ambiente = await respuestaAmbiente.json();
    apiUrl = ambiente.apiUrl;

    traer();
});