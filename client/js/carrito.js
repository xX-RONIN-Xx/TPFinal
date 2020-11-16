let carrito = [];

function mostrarTablaProductos() {
    let html = "";
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito.length)
        car = carrito[i];
        if(car.image!=undefined && car.name!=undefined && car.description!=undefined && car.price!=null && car.category!=undefined){
        html += `
               <tr>
               <td><img src="${car.image}" class="img-tabla"></td>
               <td>${car.name}</td>
               <td>${car.description}</td>
               <td>${car.price}</td>
               <td>${car.category}</td>
               <td><button type="submit" class="btn btn-danger" pos="${i}">Borrar</button></td>
               
                </tr>
           `;
        }
    }

    document.querySelector("#tblProductos").innerHTML = html;
    addButtonBehavior(".btn-danger", btnBorrarClick);
    sumar();
}

function addButtonBehavior(btnClass, fn) {
    let botones = document.querySelectorAll(btnClass);
    botones.forEach(boton => {
        boton.addEventListener("click", fn);
    });
}

//vaciar carrito
let btnVaciar = document.querySelector("#vaciar");
btnVaciar.addEventListener("click", vaciar);

let btnComprar=document.querySelector("#comprar");
btnComprar.addEventListener("click", vaciar);


async function vaciar(){
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
    let pos = this.getAttribute("pos");
    let response = await fetch(`/carrito/${pos}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("borrando elemento pos " + pos);
    window.location.href = '../html/carrito.html';
}

function sumar() {
    console.log("Funcion Sumar");
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].price;
    }
    let max = carrito[0].price;
    for (let car of carrito) {
        if (max < car.price)
            max = car.price;
    }
    document.querySelector("#total").innerHTML =
        "<p>Total: $" + total + "</p>" 
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
        let response = await fetch('http://localhost:3000/carrito');
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

async function llamarBack(verbo, path, body = null) {
    let request = {
        method: verbo,
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (body) {
        request.body = JSON.stringify(body);
    }
    return response = await fetch(path, request);
}


load();

