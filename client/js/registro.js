//const { json } = require("express");

let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
/*let btnActualizar = document.querySelector("#btnActualizar");
btnActualizar.addEventListener("click", sumar);
let btnCargar = document.querySelector("#btnCargar");
btnCargar.addEventListener("click", sumar);
let btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", sumar);
let btnMostrar = document.querySelector("#btnMostrar");
btnMostrar.addEventListener("click", sumar);
//console.log(load());*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let vehiculos = [];

async function agregar() {
    console.log("Funcion Agregar");
    let marca = document.querySelector('#marca').value;
    let patente = document.querySelector('#patente').value;
    let año = parseInt(document.querySelector('#año').value);
    let precio = parseInt(document.querySelector('#precio').value);
    let tipo = document.querySelector('#tipo').value;

    let renglon = {
        "marca": marca,
        "patente": patente,
        "año" : año,
        "precio": precio,
        "tipo":tipo
    }
    let respuesta = await fetch('http://localhost:3000/productos',{
        method: 'POST',	
        mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(renglon),
	});

    if (respuesta.ok) {
        vehiculos.push(renglon);
        mostrarTablaVehiculos();
    }else{
        console.log('hubo un error');
    }
    
}

function mostrarTablaVehiculos() {
    let html = "";
    for (let i = 0; i < vehiculos.length; i++) {
    registro=vehiculos[i];
    html += `
               <tr>
                   <td scope="row">${registro.marca}</td>
                   <td scope="row">${registro.patente}</td>
                   <td scope="row">${registro.año}</td>
                   <td scope="row">${registro.precio}</td>
                   <td scope="row">${registro.tipo}</td>
                </tr>
           `;
    }
   
   document.querySelector("#tblVehiculos").innerHTML = html;
   }
   let botonesBorrar = document.querySelectorAll(".btn-delete-producto");
   let botonesUpd = document.querySelectorAll(".btnUpdProd");
   botonesBorrar.forEach(boton => {
       boton.addEventListener("click", btnBorrarClick);
   });
   botonesUpd.forEach(boton => {
       boton.addEventListener("click", btnUpdClick);
   });


/*async function btnBorrarClick(){
   let pos = this.getAttribute("pos");
   let response = await fetch(`/productos/${pos}`,{
       method: "DELETE",
       headers:{
           "Content-Type": "application/json"
       }
   });
   console.log("borrando elemento pos " + pos );
   load();
}

async function btnUpdClick(){
   let pos = this.getAttribute("pos");
   let renglon = {
       "nombreProducto": document.getElementById(`prod${pos}`).value,
       "precio": document.getElementById(`prec${pos}`).value
   }
   let response = await fetch(`/productos/${pos}`,{
       method: "PUT",
       headers:{
           "Content-Type": "application/json"
       },
       body: JSON.stringify(renglon)
   });
   console.log("Actualizamos elemento pos " + pos );
   mostrarTablaCompras();
}*/

   async function load() {
    let container = document.querySelector("#use-ajax");
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Loading';
    container.appendChild(h1);
    try {
        let response = await fetch('http://localhost:3000/productos');
        if (response.ok) {
            let t = await response.json();
            console.log(t);
            vehiculos = [...vehiculos, ...t];
        }
        else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (response) {
        console.log(response);
        container.innerHTML = "<h1>Connection error</h1>";
    };
    h1.parentNode.removeChild(h1);
    mostrarTablaVehiculos();
}

    load();
