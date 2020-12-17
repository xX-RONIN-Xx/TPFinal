let carrito = [];

//Muestra la tabla de carrito que puede ver el administrador.

function mostrarTablaCarrito() {
    let html = "";
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito.length)
        car = carrito[i];
        html +=
            `<tr>>
                    <td>${car.id_carrito}</td>
                    <td>${car.cantidad}</td>
                    <td>${car.cliente_id_cliente}</td>
                    <td>${car.producto_id_producto}</td>
                    <td><button type="submit" class="btn btn-danger btn-delete" id="${car.id_carrito}" pos="${i}">Borrar</button></td>
                    <td><button type="submit" class="btn btn-primary btn-edit" id="${car.id_carrito}" pos="${i}">Editar</button></td>
                </tr>`;
    }
    document.querySelector("#tblCarrito").innerHTML = html;
    let botonesBorrar = document.querySelectorAll(".btn-delete");
    botonesBorrar.forEach(e => {
        e.addEventListener("click", btnBorrar);
    });
    let botonesEdit = document.querySelectorAll(".btn-edit");
    botonesEdit.forEach(e => {
        e.addEventListener("click", btnEditar);
    });
}

//Borra un carrito.

async function btnBorrar() {
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
    window.location.href = 'http://localhost:3000/adminPers.html';
}




async function load() {
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
    mostrarTablaCarrito();
}


load();

//Edita un carrito

function btnEditar() {
    let idBtnedit = this.id;
    let urlEd = "http://localhost:3000/carrito"
    let urlId = urlEd + '/' + idBtnedit;
    let datos;
    fetch(urlId)
        .then(r => {
            if (!r.ok) {
                console.log("Error!")
            }
            return r.json()
        })
        .then(jsonData => {
            datos = auxLlenarinputs(jsonData);
            console.log(datos);
            document.querySelector("#inputCantidad").focus();
            document.querySelector("#btnAceptarEdicion").addEventListener('click', function () {
                aceptChanges(urlId);
            });
        })
        .catch(function (e) {
            console.log(e);
        });
}

//Función que llena los inputs con los datos del carrito a editar.

function auxLlenarinputs(datos) {
    document.querySelector("#inputIdCar").value = datos.id_carrito;
    document.querySelector("#inputCantidad").value = datos.cantidad;
    document.querySelector("#inputCliente").value = datos.cliente_id_cliente;
    document.querySelector("#inputProducto").value = datos.producto_id_producto;
    document.querySelector("#inputEstado").value = datos.estado;
}

//Funcion que guarda los cambios de un carrito editado.

async function aceptChanges(urlE) {
    let id = document.querySelector("#inputIdCar").value;
    let cantidad = document.querySelector("#inputCantidad").value;
    let cliente = document.querySelector("#inputCliente").value;
    let producto = document.querySelector("#inputProducto").value;
    let estado = document.querySelector("#inputEstado").value;

    let registry = {
        "id_carrito": id,
        "cantidad": cantidad,
        "cliente_id_cliente": cliente,
        "producto_id_producto": producto,
        "estado": estado
    }
    let response = await fetch(urlE, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registry)
    })
}