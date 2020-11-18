document.addEventListener("DOMContentLoaded", function () {

    "use strict";
    //defino las url
    const url = "http://localhost:3000/productos";
    const urlCarrito = "http://localhost:3000/carrito";
    let carrito = [];
    //funcion para que la tabla de productos se genere dinamicamente
    let html = "";
// esta funcion genera dinamicamente la tabla en la pagina de productos
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
                //cargo la tabla
                document.querySelector("#listaHorizontal").innerHTML = html;
                // se programan los botones
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
// funcion que genera un ID aleatorio
    let ID = function () {
        let valor = '_ID' + Math.random().toString(36).substr(2, 9);
        return valor;
    };
//funcion para ver un producto en particular, se carga mediante partial render
function verDetalle(e){
    e.preventDefault();
    let id=this.id;
    fetch(url)
    .then(r => {
        if (!r.ok) {console.log("Error!")
        }
        return r.json()
    })
    .then(jsonData => {
        //borro el contenido la pagina productos menos el navbar y el footer
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
                            <p id="price" class="price">$${items.price}</p>
                            <p id="description">${items.description}</p>
                            <p id="category">${items.category}</p>
                            <p id="Comprar"><button id="${items._id}" class="btn btn-primary btnComprarDet" >Comprar</button></p>
                        </div>
                        <div class="mt-5 w-25 mx-auto">
                            <a class="btn btn-primary" href="../productos.html" role="button">Volver a Productos</a>
                        </div>`;
                        document.querySelector(".background").innerHTML=html;
                        document.querySelector(".btnComprarDet").addEventListener("click",btnComprar);
            }
        }

    })
    .catch(function (e) {
        console.log(e);
    });
};
  
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
 //funcion que carga productos al carrito
 async function load() {
    try {
        let response = await fetch(urlCarrito);
        if (response.ok) {
            let t = await response.json();
            carrito = [...carrito, ...t];
        }
        else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (response) {
        container.innerHTML = "<h1>Connection error</h1>";
    };
};
//funcion que borra los input luego de usarlos para agregar productos o editar
let fnBorrarInputs=()=>{
    document.querySelector("#inputName").value="";
    document.querySelector("#inputDescription").value="";
    document.querySelector("#inputPrice").value="";
    document.querySelector("#inputStock").value="";
    document.querySelector("#inputCategory").value="";
    document.querySelector("#inputImage").value="";
}
//funcion que agrega prductos nuevos
    let fnAgregar = () => {
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
            })
            .catch(function (e) {
                console.log(e);
            })
            fnBorrarInputs();
    }

    document.querySelector("#btnAgregar").addEventListener('click', function () {
        fnAgregar();
    });
   
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
    //funcion que llena los inputs con los datos del producto a editar 
function auxLlenarinputs(datos){
    document.querySelector("#inputId").value=datos._id;
    document.querySelector("#inputName").value=datos.name;
    document.querySelector("#inputDescription").value=datos.description;
    document.querySelector("#inputPrice").value=datos.price;
    document.querySelector("#inputStock").value=datos.stock
    document.querySelector("#inputCategory").value=datos.category;
    document.querySelector("#inputImage").value=datos.image;
}
//funcion que guarda los cambios de un producto editado
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
fnBorrarInputs();
}

    //   filtrado  productos por categoria *****************************************************
    let fnFiltrar = (categoria) => {
        document.querySelector("#listaHorizontal").innerHTML = "";
        fetch(url)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {
             let prodFiltrados=jsonData.filter(Data => Data.category==categoria);
             if (categoria=="todos"){
                 prodFiltrados=jsonData;
             }
              let tamanio=prodFiltrados.length;
              html = `<ul id="tabla">`;
              let items;
                for (let i = 0; i < tamanio; i++) {
                    items = prodFiltrados[i];
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
        let botones = document.querySelectorAll(".btn-warning");
        botones.forEach(element => {
            element.addEventListener("click", function () {
                let idDelBoton = this.id;
            })
        })
    };
 
    let filterCat = document.querySelectorAll(".catFilter");
    filterCat.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            fnFiltrar(this.id);
        })
    });
});