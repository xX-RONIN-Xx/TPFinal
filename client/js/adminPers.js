
const url = "http://localhost:3000/pedido-personalizado/get-all";
document.querySelector("#btnAgregarCarrito").addEventListener('click', fnAgregarCarrito);
let personalizados = [];

//Muestra todos los pedidos personalizados ingresados por los clientes.

function mostrarTablaPers() {
    let html = "";
    for (let i = 0; i < personalizados.length; i++) {
        console.log(personalizados.length)
        per = personalizados[i];
        html +=
            `<tr>
                    <td>${per.id_pedido}</td>
                    <td>${per.dimesion_x}</td>
                    <td>${per.dimension_y}</td>
                    <td>${per.dimension_z}</td>
                    <td>${per.colores}</td>
                    <td>${per.tipo_filamento}</td>
                    <td>${per.altura_capa}</td>
                    <td>${per.temperatura}</td>
                    <td>${per.relleno}</td>
                    <td>${per.comentarios}</td>
                    <td>${per.cliente_id_cliente}</td>
                    <td><button type="submit" class="btn btn-danger" id="${per.id_pedido}" pos="${i}">Borrar</button></td>
                </tr>`;
    }
    document.querySelector("#tblPersonalizados").innerHTML = html;
    addButtonBehavior(".btn-danger", borrarClick);
}


function addButtonBehavior(btnClass, fn) {
    let botones = document.querySelectorAll(btnClass);
    botones.forEach(boton => {
        boton.addEventListener("click", fn);
    });
}
//Borra un pedido personalizado.

async function borrarClick() {
    let idBorrar = this.id;
    console.log(idBorrar);
    let urlBorrar = "http://localhost:3000/pedido-personalizado";
    let urlDelete = urlBorrar + '/' + idBorrar;
    let response = await fetch(urlDelete, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    window.location.href = 'http://localhost:3000/adminPers.html';
}

//Trae todos los pedidos personalziados.

async function load() {
    try {
        let response = await fetch('http://localhost:3000/pedido-personalizado/get-all');
        if (response.ok) {
            let t = await response.json();
            console.log(t);
            personalizados = [...personalizados, ...t];
            console.log(personalizados);
        }
        else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (response) {
        console.log(response);
        container.innerHTML = "<h1>Connection error</h1>";
    };
    mostrarTablaPers();
}

load();

// "Transforma" un pedido personalizado a producto al agregarlo a la tabla Productos.

async function fnAgregarProductoPers() {
    let urlPost = "http://localhost:3000/producto/new-producto"
    let name = document.querySelector("#inputName").value;
    let description = document.querySelector("#inputDescription").value;
    let price = document.querySelector("#inputPrice").value;
    let stock = document.querySelector("#inputStock").value;
    let category = document.querySelector("#inputCategory").value;
    let img = document.querySelector("#inputImage").value;
    let pers = document.querySelector("#inputPers").value;

    let registry = {

        "nombre": name,
        "descripcion": description,
        "precio": parseInt(price),
        "stock": parseInt(stock),
        "categoria_id_categoria": parseInt(category),
        "pedido_personalizado_id_pedido": parseInt(pers),
        "direccion": img

    }
    console.log(registry);
    let rta = await

        fetch(urlPost, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registry),
        }).then(r => {
            if (!r.ok) {
                console.log("Error!")
            }
            return r.json()
        })
            .then(data => {
                console.log(data)
                let id = data.id_producto;
            })
            .catch(function (e) {
                console.log(e);
            })
}

document.querySelector("#btnAgregarPers").addEventListener('click', fnAgregarProductoPers);

//Muestra sólo los productos personalizados

let productos = [];

function mostrarTablaProductosPers() {
    let html = "";
    for (let i = 0; i < productos.length; i++) {
        console.log(productos.length)
        pro = productos[i];
        html +=
            `<tr>
                    <td>${pro.id_producto}</td>
                    <td>${pro.nombre}</td>
                    <td>${pro.descripcion}</td>
                    <td>${pro.precio}</td>
                    <td>${pro.categoria.nombre}</td>
                    <td>${pro.pedido_personalizado_id_pedido}</td>
                    <td><button type="submit" class="btn btn-danger btn-delete-producto" id="${pro.id_producto}" pos="${i}">Borrar</button></td>
                    <td><button type="submit" class="btn btn-primary btn-edit-product" id="${pro.id_producto}" pos="${i}">Editar</button></td>
            </tr>`;
    }
    document.querySelector("#tblProductos").innerHTML = html;
    let botonesBorrar = document.querySelectorAll(".btn-delete-producto");
    botonesBorrar.forEach(e => {
        e.addEventListener("click", borrar);
    });
    let botonesEdit = document.querySelectorAll(".btn-edit-product");
    botonesEdit.forEach(e => {
        e.addEventListener("click", btnEdit);
    });

}



//Borra un producto personalizado.

async function borrar() {
    let idBtn = this.id;
    console.log("hola", idBtn);
    let urlB = "http://localhost:3000/producto";
    let urlDel = urlB + '/' + idBtn;
    let response = await fetch(urlDel, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    window.location.href='http://localhost:3000/adminPers.html';
}

//Lista los productos personalizados(Los que tienen ID distinto de null).

async function loadProductosPers() {
    try {
        let response = await fetch('http://localhost:3000/producto/get-allPers');
        if (response.ok) {
            let t = await response.json();
            console.log(t);
            productos = [...productos, ...t];
            console.log(productos);
        }
        else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (response) {
        console.log(response);
        container.innerHTML = "<h1>Connection error</h1>";
    };
    mostrarTablaProductosPers();
}

loadProductosPers();

//Edita un producto personalizado

function btnEdit() {
    let idBtnedit = this.id;
    let urlEd = "http://localhost:3000/producto"
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
            console.log(jsonData)
            auxLlenarinputs(jsonData);
            document.querySelector("#inputName").focus();
            document.querySelector("#btnAceptar").addEventListener('click', function () {
                aceptChanges(urlId);
            });
        })
        .catch(function (e) {
            console.log(e);
        });
}

//Función que llena los inputs con los datos del producto a editar.

function auxLlenarinputs(datos) {
    console.log(datos+"gjg  ")
    document.querySelector("#inputId").value = datos.id_producto;
    document.querySelector("#inputName").value = datos.nombre;
    document.querySelector("#inputDescription").value = datos.descripcion;
    document.querySelector("#inputPrice").value = datos.precio;
    document.querySelector("#inputStock").value = datos.stock
    document.querySelector("#inputCategory").value = datos.categoria_id_categoria;
    document.querySelector("#inputPers").value = datos.pedido_personalizado_id_pedido;
   
}

//Funcion que guarda los cambios de un producto editado.

async function aceptChanges(urlE) {
    let name = document.querySelector("#inputName").value;
    let description = document.querySelector("#inputDescription").value;
    let price = document.querySelector("#inputPrice").value;
    let stock = document.querySelector("#inputStock").value;
    let category = document.querySelector("#inputCategory").value;
    let pers = document.querySelector("#inputPers").value;
    let id = document.querySelector("#inputId").value;
    let registry = {
        "id_producto": id,
        "nombre": name,
        "descripcion": description,
        "precio": price,
        "stock": stock,
        "categoria_id_categoria": category,
        "pedido_personalizado_id_pedido": pers
    }
    let response = await fetch(urlE, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registry)
    })
}

//El admin agrega un producto personalizado al carrito del cliente que corresponde.

async function fnAgregarCarrito() {
    let urlCarrito = "http://localhost:3000/carrito/new-carrito";
    let cantidad = document.querySelector("#inputCantidad").value;
    let cliente = document.querySelector("#inputCliente").value;
    let producto = document.querySelector("#inputProducto").value;
    let estado = "pendiente";

    let registry = {

        "cantidad": parseInt(cantidad),
        "cliente_id_cliente": parseInt(cliente),
        "producto_id_producto": parseInt(producto),
        "estado": estado

    }
    console.log(registry);
    let rta = await

        fetch(urlCarrito, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registry),
        }).then(r => {
            if (!r.ok) {
                console.log("Error!")
            }
            return r.json()
        })
            .then(data => {
                console.log(data)
                let id = data.id_producto;
            })
            .catch(function (e) {
                console.log(e);
            })
}









