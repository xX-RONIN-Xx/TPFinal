
document.querySelector("#Agregar").addEventListener("click",agregar);
document.querySelector("#btnTotal").addEventListener("click", sumar);
document.querySelector("#eliminar").addEventListener("click", eliminar);

let baseDeDatos = [
    {
        id: 1,
        nombre: 'Patata',
        precio: 1,
        imagen: "../images/tp/shaka"
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1.2,
        imagen: 'cebolla.jpg'
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 2.1,
        imagen: 'calabacin.jpg'
    },
    {
        id: 4,
        nombre: 'Fresas',
        precio: 0.6,
        imagen: 'fresas.jpg'
    }

]


let compras = [];

//#########################################
function agregar(){
        console.log("Funcion Agregar");
        let id = document.querySelector('#id').value;
        let producto = document.querySelector('#producto').value;
        let descripcion = document.querySelector('#producto').value;
        let precio = parseInt(document.querySelector('#precio').value);
        let imagen = document.querySelector("#imagen").
        console.log(producto, precio);
    
        let renglon = {
            "id" : id,
            "nombreProducto": producto,
            "precio": precio
        }
    
}


function mostrarTablaProductos() {
    let html = "";
    for (let i = 0; i < productos.length; i++) {
    compras=productos[i];
    html += `
               <tr>
                   <td scope="row">${compra.imagen}</td>
                   <td scope="row">${compra.producto}</td>
                   <td scope="row">${compra.descripcion}</td>
                   <td scope="row">${compra.precio}</td>
                   <button type="button" class="btn btn-outline-danger id="btn-borrar">Borrar</button>
                </tr>
           `;
    }
   
   document.querySelector("#tblProductos").innerHTML = html;
   }

   mostrarTablaProductos();
   let botonesBorrar = document.querySelectorAll(".btn-delete-producto");

