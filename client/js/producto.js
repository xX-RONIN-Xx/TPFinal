document.addEventListener("DOMContentLoaded", function () {

    "use strict";
    //defino la url del mock
    const url = "http://localhost:3000/productos";
    const urlCarrito = "http://localhost:3000/carrito";
    //funcion para que la tabla de productos se genere dinamicamente
    let html = "";


    let mostrarTabla = () => {
        fetch(url)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {
                let tamañoRegistry = jsonData.length - 1;
                let items;
                html = `<ul id="tabla">`;
                for (let i = 0; i <= tamañoRegistry; i++) {
                    items = jsonData[i];
                    //<a ><img src="${items.image}" class="img-responsive img" id="${items._id}" alt="Imagen de ${items.name}"></a><br>
                    html +=
                        `<li>
                                <a><img src="${items.image}" class="img-responsive img" id="${items._id}" alt="Imagen de ${items.name}"></a><br>
                                Nombre:</span> ${items.name}<br>
                                Descripción: <span class="spanDescript">${items.description}</span><br>
                                Precio: $${items.price}<br>
                                Stock: ${items.stock}<br>
                                Categoria: ${items.category}<br>
                                <span class="badge badge-danger"><input type=button  id="${items._id}" value="Comprar" class="btn btn-warning"></span>
                                <td class="ocultar"><span class="badge badge-danger"><button class="btn btn-primary btn-edit-product" pos="${i}" id="${items._id}">Editar</button></span></td>
                                <td class="ocultar"><span class="badge badge-danger"><button class="btn btn-danger btn-delete-producto" pos="${i}" id="${items._id}">Borrar</button></span></td>
                            </li>`
                }
                html += `</ul>`
                document.querySelector("#listaHorizontal").innerHTML = html;
                let botonesBorrar = document.querySelectorAll(".btn-delete-producto");
                botonesBorrar.forEach(e => {
                    e.addEventListener("click", btnBorrarClick);
                });

                let botones = document.querySelectorAll(".btn-warning");
                botones.forEach(e => {
                    e.addEventListener("click", btnComprar);
                });

                let botonesEdit = document.querySelectorAll(".btn-edit-product");
                botonesEdit.forEach(e => {
                    e.addEventListener("click", btnEdit);
                });

                let imgbtn=document.querySelectorAll(".img");
                    imgbtn.forEach(e=>{
                        e.addEventListener("click", verDetalle);
                    })
            })

            .catch(function (e) {
                console.log(e);
            })



    }

    mostrarTabla();

    let ID = function () {
        let valor = '_ID' + Math.random().toString(36).substr(2, 9);
        return valor;
    };


function verDetalle(){
    let id=this.id;
    console.log(id)
    fetch(url)
    .then(r => {
        if (!r.ok) {console.log("Error!")
        }
        return r.json()
    })
    .then(jsonData => {
        console.log(id)
        document.querySelector(".background").innerHTML="";

        let tamJD= jsonData.length - 1;
        let items;
        let html="";
        for (let i = 0; i <= tamJD; i++) {
            items = jsonData[i];
            if(items._id==id){

                 html= `<div class="card">
                            <img src="${items.image}" style="width:100%">
                            <h1>${items.name}</h1>
                            <p id="price" class="price">${items.price}</p>
                            <p id="description">${items.description}</p>
                            <p id="category">${items.category}</p>
                            <p id="Comprar"><button class="btn btn-primary">Comprar</button></p>
                        </div>
                        <div class="mt-5 w-25 mx-auto">
                            <a class="btn btn-primary" href="../productos.html" role="button id="btnComprarDet" ">Volver a Productos</a>
                        </div>`;
                        document.querySelector(".background").innerHTML=html;
                        document.querySelector("#btnComprarDet").addEventListener("click",btnComprar());
            }
        }

    })
    .catch(function (e) {
        console.log(e);
    })
}
    //seccion de inputs

    //*********borrar producto */
    async function btnBorrarClick() {
        let pos = this.getAttribute("pos");
        let response = await fetch(`productos/${pos}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        mostrarTabla();
        //       window.location.href='../productos.html';
    }

    //*******comprar producto */
    function btnComprar() {
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
        console.log('ok');
    } else {
        console.log('hubo un error');
    }
 }
 async function load() {
   
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
    
}


 /*function auxComprar(jsonData){
    console.log(jsonData);
   fetch(urlCarrito, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData),
    }).then(r => {
        if (!r.ok) {
            console.log("Error!")
        }
        return r.json()
    })
        .then(data => {
            console.log(data)
            // document.querySelector("#tablaID").innerHTML = "";
        })
        .catch(function (e) {
            console.log(e);
        });
}*/
let fnBorrarInputs=()=>{
    document.querySelector("#inputName").value="";
    document.querySelector("#inputDescription").value="";
    document.querySelector("#inputPrice").value="";
    document.querySelector("#inputStock").value="";
    document.querySelector("#inputCategory").value="";
    document.querySelector("#inputImage").value="";
}


    let fnAgregar = () => {
        //let id = document.querySelector("#inputId").value;
        let name = document.querySelector("#inputName").value;
        let description = document.querySelector("#inputDescription").value;
        let price = document.querySelector("#inputPrice").value;
        let stock = document.querySelector("#inputStock").value;
        let category = document.querySelector("#inputCategory").value;
        let image = document.querySelector("#inputImage").value;
        let id = ID();
        let registry = {
            "_id": id,
            "name": name,
            "description": description,
            "price": price,
            "stock": stock,
            "category": category,
            "image": image
        }
        console.log(registry);

        fetch(url, {
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
                // document.querySelector("#tablaID").innerHTML = "";
            })
            .catch(function (e) {
                console.log(e);
            })
            fnBorrarInputs();
    }
    fetch(url)
        .then((response) => mostrarTabla());

/* ***************************** */
//editar******************
/* *********************** */
    function btnEdit(){
        let idBtnedit = this.id;
        let urlId = url + '/' + idBtnedit;
        let datos;
        fetch(urlId)
            .then(r => {
                if (!r.ok) {
                     console.log("Error!")
                     }
                return r.json()
            })
            .then(jsonData => {
               datos=auxLlenarinputs(jsonData);
               document.querySelector("#inputName").focus();
               document.querySelector("#btnAceptar").addEventListener('click', function () {
                aceptChanges(urlId);
            });
            })
            .catch(function (e) {
                console.log(e);
            });
    }
function auxLlenarinputs(datos){
    document.querySelector("#inputId").value=datos._id;
    document.querySelector("#inputName").value=datos.name;
    document.querySelector("#inputDescription").value=datos.description;
    document.querySelector("#inputPrice").value=datos.price;
    document.querySelector("#inputStock").value=datos.stock
    document.querySelector("#inputCategory").value=datos.category;
    document.querySelector("#inputImage").value=datos.image;
}

async function aceptChanges(urlE){
    let name = document.querySelector("#inputName").value;
    let description = document.querySelector("#inputDescription").value;
    let price = document.querySelector("#inputPrice").value;
    let stock = document.querySelector("#inputStock").value;
    let category = document.querySelector("#inputCategory").value;
    let image = document.querySelector("#inputImage").value;
    let id = document.querySelector("#inputId").value;
        let registry = {
            "_id": id,
            "name": name,
            "description": description,
            "price": price,
            "stock": stock,
            "category": category,
            "image": image
        }
    let response = await fetch(urlE, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(registry)
    })
    //mostrarTabla();
console.log("se guardo")
fnBorrarInputs();
}
    //   filtrado   *****************************************************

    let fnFiltrar = (categoria) => {
        //let approved= students.filter(student=>student.score>11)
       
        console.log(categoria)
        document.querySelector("#listaHorizontal").innerHTML = "";
        fetch(url)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {
               
             let prodFiltrados=jsonData.filter(Data=>Data.category==categoria);
             if (categoria=="todos"){
                 prodFiltrados=jsonData;
             }
                
              console.log(prodFiltrados);
              console.log(prodFiltrados[0].image)
              let tamanio=prodFiltrados.length;
              html = `<ul id="tabla">`;
              let item;
                for (let i = 0; i < tamanio; i++) {
                    item = prodFiltrados[i];
                    console.log(item.name)
                    html +=
                        `<li>
                                <a href="html/productDetail.html"><img src="${item.image}" class="img-responsive" alt="Imagen de ${item.name}"></a><br>
                                Nombre:</span> ${item.name}<br>
                                Descripción: <span class="spanDescript">${item.description}</span><br>
                                Stock: ${item.stock}<br>
                                Precio: $${item.price}<br>
                                Categoria: ${item.category}<br>
                                <span class="badge badge-danger"><input type=button  id="${item._id}" value="Comprar" class="btn btn-warning"></span>
                                <td><span class="badge badge-danger"><button class="btn btn-primary btn-delete-producto" pos="${i}" id="${item._id}">Editar</button></span>
                                <td><span class="badge badge-danger"><button class="btn btn-danger btn-delete-producto" pos="${i}" id="${item._id}">Borrar</button></span></td>
                            </li>`
                }
                html += `</ul>`
                document.querySelector("#listaHorizontal").innerHTML = html;
                let botonesBorrar = document.querySelectorAll(".btn-delete-producto");
                botonesBorrar.forEach(e => {
                    e.addEventListener("click", btnBorrarClick);
                });

                let botones = document.querySelectorAll(".btn-warning");
                botones.forEach(e => {
                    e.addEventListener("click", btnComprar);
                });
                    
            })

            .catch(function (e) {
                console.log(e);
            })
        let botones = document.querySelectorAll(".btn-warning");
        botones.forEach(element => {
            element.addEventListener("click", function () {
                let idDelBoton = this.id;
                console.log(idDelBoton);
            })
        })
    };

    document.querySelector("#btnAgregar").addEventListener('click', function () {
        fnAgregar();
    });
    let filterCat = document.querySelectorAll(".catFilter");
    filterCat.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            fnFiltrar(this.id);
        })
    });
});


/*
async function auxComprar(jsonData){
    
    let id = jsonData._id;
    let name = jsonData.name;
    let description = jsonData.description;
    let price = jsonData.price;
    let stock = jsonData.stock;
    let category = jsonData.category;
    let image = jsonData.image;
    let registry = {
        "_id": id,
        "name": name,
        "description": description,
        "price": price,
        "stock": stock,
        "category": category,
        "image": image
    }

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
            // document.querySelector("#tablaID").innerHTML = "";
        })
        .catch(function (e) {
            console.log(e);
        });
}
*/