document.addEventListener("DOMContentLoaded", function () {

    "use strict";
    //defino las url
    const url = "http://localhost:3000/producto/get-all";
    const urlComprar = "http://localhost:3000/producto";
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
                let admin=window.sessionStorage.getItem('admin');
                for (let i = 0; i <= tamañoRegistry; i++) {
                    items = jsonData[i];
                    html +=
                        `<li>
                            <a><img src="${items.imagen_producto.direccion}" class="img-responsive img" id="${items.id_producto}" alt=""></a><br>
                            Nombre:</span> ${items.nombre}<br>
                            Descripción: <span class="spanDescript">${items.descripcion}</span><br>
                            Precio: $${items.precio}<br>
                            Stock: ${items.stock}<br>
                            Categoria: ${items.categoria.nombre}<br>                
                            <span class="badge badge-danger"><input type=button  id="${items.id_producto}" value="Comprar" class="btn btn-warning"></span>`
                            if(admin=="true"){
                                html+=`
                                <td><span class="badge badge-danger"><button class="btn btn-primary btn-edit-product" pos="${i}" id="${items.id_producto}">Editar</button></span></td>
                                <td><span class="badge badge-danger"><button class="btn btn-danger btn-delete-producto" pos="${i}" id="${items.id_producto}">Borrar</button></span></td>`
                            }
                      html+=`
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

                let imgbtn = document.querySelectorAll(".img");
                imgbtn.forEach(e => {
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
    function verDetalle(e) {
        e.preventDefault();
        let id = this.id;
        fetch(url)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {
                //borro el contenido la pagina productos menos el navbar y el footer
                document.querySelector(".background").innerHTML = "";
                let tamJD = jsonData.length - 1;
                let items;
                let html = "";
                for (let i = 0; i <= tamJD; i++) {
                    items = jsonData[i];
                    if (items.id_producto == id) {
                        html = 
                        `<div class="card">
                            <img src="${items.imagen_producto.direccion}" style="width:100%">
                            <h2>${items.nombre}</h2>
                            <p id="price" class="price">$${items.precio}</p>
                            <p id="description">${items.descripcion}</p>
                            <p id="category">${items.categoria.nombre}</p>
                            <p id="Comprar"><button id="${items.id_producto}" class="btn btn-primary btnComprarDet" >Comprar</button></p>
                        </div>
                        <div class="mt-5 w-25 mx-auto">
                            <a class="btn btn-primary" href="../productos.html" role="button">Volver a Productos</a>
                        </div>`;
                        document.querySelector(".background").innerHTML = html;
                        document.querySelector(".btnComprarDet").addEventListener("click", btnComprar);
                    }
                }

            })
            .catch(function (e) {
                console.log(e);
            });
    };

    //borrar producto
    async function btnBorrarClick() {
        let pos = this.getAttribute("pos");
        let response = await fetch(`http://localhost:3000/producto/`+pos, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        mostrarTabla();
    }
    //comprar producto
    let urlID = "http://localhost:3000/producto";
    function btnComprar() {
        let idDelBoton = this.id;
        console.log(idDelBoton);
        let urlId = urlID + '/' + idDelBoton;
        let datos;
        fetch(urlId)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {
                datos = auxComprar(jsonData);
                load();
            })
            .catch(function (e) {
                console.log(e);
            });
    }

    let urlCarritoPost = "http://localhost:3000/carrito/new-carrito";
    async function auxComprar(jsonData) {
        console.log(jsonData)
        let respuesta = await fetch(urlCarritoPost, {
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
            let response = await fetch(urlCarritoPost);
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
    let fnBorrarInputs = () => {
        document.querySelector("#inputName").value = "";
        document.querySelector("#inputDescription").value = "";
        document.querySelector("#inputPrice").value = "";
        document.querySelector("#inputStock").value = "";
        document.querySelector("#inputCategory").value = "";
        document.querySelector("#inputImage").value = "";
    }
    //funcion que agrega productos nuevos
  
    let fnAgregar = () => {
        let urlPost= "http://localhost:3000/producto/new-producto"
        let name = document.querySelector("#inputName").value;
        let description = document.querySelector("#inputDescription").value;
        let price = document.querySelector("#inputPrice").value;
        let stock = document.querySelector("#inputStock").value;
        let category = document.querySelector("#inputCategory").value;
        let pers = document.querySelector("#inputPers").value;
        //let id = 11;
        
        let registry = {
            "nombre": name,
            "descripcion": description,
            "precio": parseInt(price),
            "stock": parseInt(stock),
            "categoria_id_categoria": parseint(category),
            "pedido_personalizado_id_pedido": null
        }
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
            })
            .catch(function (e) {
                console.log(e);
            })
        fnBorrarInputs();
    }

    document.querySelector("#btnAgregar").addEventListener('click', function () {
        fnAgregar();
    });


    let fnAgregarImg = () => {
        let urlPost= "http://localhost:3000/imagen-producto/new-imagen"
       
        let direccion = document.querySelector("#inputImage").value;
        let id = ID();
        let registry = {
            "direccion": direccion,
            "producto_id_producto": id_producto
        }
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
            })
            .catch(function (e) {
                console.log(e);
            })
        //fnBorrarInputs();
    }

    document.querySelector("#btnAgregar").addEventListener('click', function () {
        fnAgregar();
    });


    //editar******************

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
                datos = auxLlenarinputs(jsonData);
                console.log(datos);
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
    function auxLlenarinputs(datos) {
        document.querySelector("#inputId").value = datos.id_producto;
        document.querySelector("#inputName").value = datos.nombre;
        document.querySelector("#inputDescription").value = datos.descripcion;
        document.querySelector("#inputPrice").value = datos.precio;
        document.querySelector("#inputStock").value = datos.stock
        document.querySelector("#inputCategory").value = datos.categoria_id_categoria;
        document.querySelector("#inputPers").value=datos.pedido_personalizado_id_pedido;
        //document.querySelector("#inputImage").value = datos.imagen_producto.direccion;
    }
    //funcion que guarda los cambios de un producto editado
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
            //"imagen_producto": image
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
        let prodFiltrados=[];
    
        fetch(url)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {
                console.log(jsonData);
                for(let i=0; i<jsonData.length;i++){
                    if(jsonData[i].categoria.nombre==categoria){
                        prodFiltrados.push(jsonData[i]);
                    }
                }
                if (categoria == "todos") {
                    prodFiltrados = jsonData;
                }
                let tamanio = prodFiltrados.length;
                html = `<ul id="tabla">`;
                let items;
                let admin=window.sessionStorage.getItem('admin');
                console.log(admin)
                for (let i = 0; i < tamanio; i++) {
                    items = prodFiltrados[i];
                    html +=
                        `<li>
                    <a><img src="${items.imagen_producto.direccion}" class="img-responsive img" id="${items.id_producto}" alt="Imagen de"></a><br>
                    Nombre:</span> ${items.nombre}<br>
                    Descripción: <span class="spanDescript">${items.descripcion}</span><br>
                    Precio: $${items.precio}<br>
                    Stock: ${items.stock}<br>
                    Categoria: ${items.categoria.nombre}<br>                
                    <span class="badge badge-danger"><input type=button  id="${items.id_producto}" value="Comprar" class="btn btn-warning"></span>`
                    if(admin=="true"){
                        html+=`
                        <td><span class="badge badge-danger"><button class="btn btn-primary btn-edit-product" pos="${i}" id="${items.id_producto}">Editar</button></span></td>
                        <td><span class="badge badge-danger"><button class="btn btn-danger btn-delete-producto" pos="${i}" id="${items.id_producto}">Borrar</button></span></td>`
                    }
              html+=`
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

                let imgbtn = document.querySelectorAll(".img");
                imgbtn.forEach(e => {
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