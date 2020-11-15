document.addEventListener("DOMContentLoaded", function () {

    "use strict";
    //defino la url del mock
    const url = "http://localhost:3000/productos";
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
                    html +=
                        `<li>
                                <img src="${items.image}" class="img-responsive" alt="Imagen de ${items.name}"><br>
                                Nombre:</span> ${items.name}<br>
                                Descripción: <span class="spanDescript">${items.description}</span><br>
                                Stock: ${items.stock}<br>
                                Precio: $${items.price}<br>
                                Categoria: ${items.category}<br>
                                <input type=button  id="${items._id}" value="Agregar al carrito" class="btn-warning">
                                <td><span class="badge badge-danger"><button type=submit class="btn btn-danger btn-delete-producto" pos="${i}" id="${items._id}">Borrar</button></span></td>
                            </li>`
                }
                html += `</ul>`
                document.querySelector("#listaHorizontal").innerHTML = html;
                let botonesBorrar = document.querySelectorAll(".btn-delete-producto");
                botonesBorrar.forEach(e => {
                    e.addEventListener("click", btnBorrarClick);
                });
            })

            .catch(function (e) {
                console.log(e);
            })
        let botones = document.querySelectorAll(".btn-warning");
        botones.forEach(element => {
            element.addEventListener("click", function () {
                let idDelBoton = this._id;
                console.log(idDelBoton);
            })
        })


    }

    mostrarTabla();

    let ID = function () {
        let valor = '_ID' + Math.random().toString(36).substr(2, 9);
        console.log(valor);
        return valor;
    };
    ID();

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
       window.location.href='../productos.html';
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
    }
    fetch(url)
        .then((response) => mostrarTabla());


    //   filtrado   *****************************************************

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
                let tamañoRegistry = jsonData.registry.length - 1;
                let items;

                for (let i = 0; i <= tamañoRegistry; i++) {
                    items = jsonData.registry[i];
                    if (items._id == categoria) {
                        //document.querySelector("#tablaID").innerHTML+=
                        html +=
                            `<li>
                                <img src="${items.image}" class="img-responsive" alt="Imagen de ${items.name}"><br>
                                Nombre: ${items.name}<br>
                                Descripción: <span class="spanDescript">${items.description}</span><br>
                                Stock: ${items.stock}<br>
                                Precio: ${items.price}<br>
                                Categoria: ${items.category}<br>
                                <input type=button id="${items._id}" value="Agregar al carrito" class="btn-warning">
                            </li> <br>`
                    }
                    console.log(html)
                }
                let html1 = `<ul id="tabla">` + html + `</ul>`;

                document.querySelector("#listaHorizontal").innerHTML = html1;
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
