function processParams(){
    let paramstr = window.location.search.substr(1);
    console.log(paramstr);
    let paramarr = paramstr.split("&"); // [index=1]
    let params = [];
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("="); //["index",1]
        params[tmparr[0]] = tmparr[1];// {"index": 1}
    }
    return params
}


async function load() {
    let container = document.querySelector("#use-ajax");
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Loading';
    container.appendChild(h1);
    try {
        let params = processParams(); //{"index": 1}
        console.log(params);
        let response = await fetch(`http://localhost:3000/productos/${params["index"]}`); // llama al endpoint /productos/1
        if (response.ok) {
            let t = await response.json();
            document.querySelector("#img").setAttribute("src",t['image'])
            document.querySelector("#name").innerHTML = t['name'];
            document.querySelector("#price").innerHTML = t['price'];
            document.querySelector("#description").innerHTML = t['description'];
            document.querySelector("#category").innerHTML = t['category'];
        }
        else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (response) {
        container.innerHTML = "<h1>Connection error</h1>";
    };
    h1.parentNode.removeChild(h1);
}

load();
function verDetalle() {
    let idDelBoton = this.id;
    console.log(idDelBoton);
    let urlId = url + '/' + idDelBoton;
    let datos;
    fetch(urlId)
        .then(r => {
            if (!r.ok) {
                 console.log("Error!")
                 }
            return r.json()
        })
        .then(jsonData => {
            datos=auxComprar(jsonData);
            load();

        })
        .catch(function (e) {
            console.log(e);
        });
}

let carrito = [];
async function auxComprar(jsonData){
let respuesta = await fetch(urlCarrito,{
    method: 'POST',	
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData),
});

if (respuesta.ok) {
    carrito.push(jsonData);
    mostrarTablaProductos();
    console.log('ok');
} else {
    console.log('hubo un error');
}
}
async function load2() {

try {
    let response = await fetch(urlCarrito);
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

mostrarTablaProductos();
}