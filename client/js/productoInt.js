// Carga lista de personal
let listaProductos = [];

async function loadList() {
    
    try {
        let response = await fetch('http://localhost:3000/producto/get-all');
        console.log(response);
        if (response.ok) {
           
            let t = await response.json();
            console.log(t);
            listaProductos = t; 
            cargarProd(); 
            
        }
        else {
            listaHorizontal.innerHTML = "<h1>Error - Failed URL!</h1>";
        }
    }
    catch (response) {
        listaHorizontal.innerHTML = "<h1>Connection error</h1>";
    };
}

function cargarProd() {
    let html = ""; 
    for (let i = 0; i < listaProductos.length; i++) {
        html += `
            ${listaProductos[i].id_producto}
            ${listaProductos[i].nombre}  
            ${listaProductos[i].descripcion}   
            ${listaProductos[i].precio}
            ${listaProductos[i].stock}  
            ${listaProductos[i].categria_id_categoria}  
            ${listaProductos[i].pedido_personalizado_id_pedido}    
           `;
    }
    document.querySelector("#listaHorizontal").innerHTML = html;
}

loadList();
