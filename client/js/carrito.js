let carrito = [];

function getFilteredByKey(array,value) {
    let filtrado=[];
   array.forEach(element => {
      if( element.cliente_id_cliente==value){
        filtrado.push(element)
      }
   });
   return filtrado;
}

function mostrarTablaProductos() {

    //////////////////////////////////////////////////
    let clienteId;
    let carritoCliente = [];
    fetch("http://localhost:3000/cliente/get-all")
        .then(r => {
            if (!r.ok) {
                console.log("Error!")
            }
            return r.json()
        })
        .then(jsonData => {
            let clienteConectado = window.sessionStorage.getItem('cliente');
            jsonData.forEach(element => {
                if (element.usuario == clienteConectado) {
                    clienteId = element.id_cliente;
                    console.log("Hola", clienteId);
                }
            })
        })
        .then(a => {
            carritoCliente = getFilteredByKey(carrito, clienteId);
            /////////////////////////////////////////////////
            let html = "";
            for (let i = 0; i < carritoCliente.length; i++) {
               
                console.log(carritoCliente)
                console.log(carritoCliente.length)
                car = carritoCliente[i];
                html +=
                    `<tr>
                    <td>${car.producto.nombre}</td>
                    <td>${car.producto.descripcion}</td>
                    <td>${car.cantidad}</td>
                    <td>${car.producto.precio}</td>
         
                    <td><button type="submit" class="btn btn-danger btn-delete" id="${car.id_carrito}">Borrar</button></td>
                </tr>`;
            }

            document.querySelector("#tblCarrito").innerHTML = html;

            let botonesBorrar = document.querySelectorAll(".btn-delete");
            botonesBorrar.forEach(e => {
                e.addEventListener("click", btnBorrarClick);
            });

            sumar(carritoCliente);
        })
}

//vaciar carrito
let btnVaciar = document.querySelector("#vaciar");
btnVaciar.addEventListener("click", vaciar);

let btnComprar = document.querySelector("#comprar");
btnComprar.addEventListener("click", vaciar);


async function vaciar() {
    let response = await fetch('http://localhost:3000/carrito', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("borrando elemento pos ");
    window.location.href = '../html/carrito.html';
}

async function btnBorrarClick() {
    let idBtn = this.id;
    console.log("hola", idBtn);
    let urlB = "http://localhost:3000/carrito";
    let urlDel = urlB + '/' + idBtn;

    let response = await fetch(urlDel, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    window.location.href = 'http://localhost:3000/html/carrito.html';
}

function sumar(carrito) {
    document.querySelector("#total").innerHTML ="";
    console.log("Funcion Sumar");
    if (carrito.length >= 1) {
        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            total += carrito[i].producto.precio*carrito[i].cantidad;
        }
       /* let max = carrito[0].producto.precio;
        for (let car of carrito) {
            if (max < car.producto.precio)
                max = car.producto.precio;
        }*/
        document.querySelector("#total").innerHTML =
            "<p>Total: $" + total + "</p>"
    }
}


let obj = {
    "functions": { "sumar": sumar }
}



async function load() {
    let container = document.querySelector("#use-ajax");
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Loading';
    container.appendChild(h1);
    try {
        let response = await fetch('http://localhost:3000/carrito/get-all');
        if (response.ok) {
            let t = await response.json();
            console.log(t);
            carrito = [...carrito, ...t];
            console.log(carrito);
        }
        else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (response) {
        console.log(response);
        container.innerHTML = "<h1>Connection error</h1>";
    };
    h1.parentNode.removeChild(h1);
    mostrarTablaProductos();
}
load();

