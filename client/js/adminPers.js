
const url = "http://localhost:3000/pedido-personalizado/get-all";

let personalizados = [];

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
    addButtonBehavior(".btn-danger", btnBorrarClick);
}


function addButtonBehavior(btnClass, fn) {
    let botones = document.querySelectorAll(btnClass);
    botones.forEach(boton => {
        boton.addEventListener("click", fn);
    });
}

async function btnBorrarClick() {
    let idBorrar = this.id;
        console.log(idBorrar);
        let urlBorrar = "http://localhost:3000/pedido-personalizado";
        let urlDelete= urlBorrar + '/' + idBorrar;
    let response = await fetch(urlDelete, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("borrando elemento pos " + pos);
    window.location.href = 'personalizados.html';
}

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


async function fnAgregarProductoPers(){
    let urlPost= "http://localhost:3000/producto/new-producto"
    let name = document.querySelector("#inputName").value;
    let description = document.querySelector("#inputDescription").value;
    let price = document.querySelector("#inputPrice").value;
    let stock = document.querySelector("#inputStock").value;
    let category = document.querySelector("#inputCategory").value;
    let img= document.querySelector("#inputImage").value;
    let pers = document.querySelector("#inputPers").value;
    
    let registry = {

        "nombre": name,
        "descripcion": description,
        "precio": parseInt(price),
        "stock": parseInt(stock),
        "categoria_id_categoria":parseInt(category),
        "pedido_personalizado_id_pedido": parseInt(pers),
        "direccion": img
        
    }
    console.log(registry);
    let rta= await

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

document.querySelector("#btnAgregarPers").addEventListener('click',fnAgregarProductoPers);

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
                    <td>${pro.categoria_id_categoria}</td>
                    <td>${pro.pedido_personalizado_id_pedido}</td>
                    <td><button type="submit" class="btn btn-danger btn-delete-producto" id="${per.id_producto}" pos="${i}">Borrar</button></td>
                    <td><button type="submit" class="btn btn-primary btn-edit-product" id="${per.id_producto}" pos="${i}">Editar</button></td>
                </tr>`;
    }
    document.querySelector("#tblProductos").innerHTML = html;
    addButtonBehavior(".btn-danger", btnBorrarClick);
}

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



