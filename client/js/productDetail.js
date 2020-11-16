/*function processParams(){
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
        console.log(response);
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
}*/

const url = "http://localhost:3000/productos";


function verDetalle() {
    let idImagen = this.id;
    console.log(idImagen);
    let urlId = url + '/' + idImagen;
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

async function auxComprar(jsonData){
    let container = document.querySelector("#use-ajax");
let respuesta = await fetch(url,{
    method: 'GET',	
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData),
});

if (respuesta.ok) {
    let t = await respuesta.json();
            document.querySelector("#img").setAttribute("src",t['image']);
            document.querySelector("#name").innerHTML = t['name'];
            document.querySelector("#price").innerHTML = t['price'];
            document.querySelector("#description").innerHTML = t['description'];
            document.querySelector("#category").innerHTML = t['category'];
    console.log('ok');
} else {
    console.log('hubo un error');
};
}

verDetalle();
