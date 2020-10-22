    document.addEventListener("DOMContentLoaded", function () {
        "use strict";
        //defino la url del mock
        const url = "../mock.json";
        //funcion para que la tabla de productos se genere dinamicamente
        let mostrarTabla = () => {
            document.querySelector("#tablaID").innerHTML = "";
            //llamado a mi json para traer los productos
            fetch(url)
                .then(r => {
                    if (!r.ok) {
                        console.log("Error!")
                    }
                    return r.json()
                })
                .then(jsonData => {
                    //el console.log lo uso para ver que y como me trae la respuesta
                    console.log(jsonData)
                    /*esta es la parte en que la tabla dinamica no se mostraba en 4 columnas, sino que me generaba
                    un producto debajo de otro, entonces quiero mostrar 4 columnas y lo que hago es usar una matriz,
                    por un lado corto el arreglo registry(que es el areglo de productos)en 4 jsons. y luego itero 
                    los elementos de cada uno de esos jsons
                    */
                    //declaro mis variables
                    let items;
                    let cortar = 0;
                    let matriz = [];
                    let tamañoRegistry = jsonData.registry.length;
                    let iteraciones = Math.trunc(tamañoRegistry / 4);

                    /* la parte que sigue tiene un bug, pero ya se que hacer para solucionarlo, lugo lo subo.
                    ya que el slice no esta bien aplicado.
                    /*if ((!tamañoRegistry % 4)==0){
                        iteraciones+=1;
                    }*/
                   console.log(iteraciones);
                    for (let inicio = 0; inicio < iteraciones; inicio++) {
                        matriz[inicio] = jsonData.registry.slice(cortar);
                        cortar += 4;
                        console.log(cortar)
                    }
                    console.log(matriz)
                    let tamañoMatriz = matriz.length;
                    let html = "";
                    let html2 = "";
                    //en esta parte armo el html con cada vector de 4 jsons
                    for (let i = 0; i < tamañoMatriz; i++) {
                        html += `<div class="row">`;
                        html2 = "";
                        for (let j = 0; j < 4; j++) {
                            items = matriz[i][j];
                            //aca armo el html con la informacion de cada json(o sea, cada producto) de forma individual
                            html2 +=
                                `<div class="col-6 col-md-3">
                                    <img src="${items.imagen}" class="img-responsive" style="width:100%" alt="Imagen de ${items.name}">
                                    <p>${items.name}</p>
                                    <input type=button class="identificador"  id="${items._id}" value="Agregar al carrito">
                                </div>`
                        }
                        html += html2 + `</div>`;
                    }
                    //los junto y los muestro en la pagina
                    document.querySelector("#tablaID").innerHTML = html;
                    //le asigno un boton a cada uno para agregarlo al carrito y ademas le paso un identificador unico
                    //que por ahora esta harcodeado, pero luego se va a generar solo al ingresar los datos
                    let botones = document.querySelectorAll(".identificador");
                    botones.forEach(element => {
                        element.addEventListener("click", function () {
                            let idDelBoton = this.id;
                            console.log(idDelBoton);
                        });
    
                    });
    
                })
    
                .catch(function (e) {
                    console.log(e);
                })
        }
    
        mostrarTabla();
    
    });
    
    
    
    