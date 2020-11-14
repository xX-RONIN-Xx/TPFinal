document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const url = "http://localhost:3000/productos";
    //funcion para que la tabla de productos se genere dinamicamente

    async function mostrarTabla() {
     
        try {
            let response = llamarBack("GET", '/productos');
            console.log(response.ok)
            console.log(response)
            if (!response.ok) {
                let t = await response.json();
                console.log(t);
                compras = [...t];
            } else
                //container.innerHTML = "<h1>Error - Failed URL!</h1>";
                console.log('no entro al if')
        } catch (response) {
            console.log(response);
            //container.innerHTML = "<h1>Connection error</h1>";
     };
        //catch (response) {
           // console.log(response);
            // container.innerHTML = "<h1>Connection error</h1>";
     };
   // };
    mostrarTabla();

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
        return await fetch(path, request);
    }
});
    /*fetch(url)
        .then(r => {
            if (!r.ok) {
                console.log("Error!")
            }
            console.log(r);
            return r.json();
        })
        .then(jsonData => {              
            let tamañoRegistry=jsonData.length-1;
            console.log(jsonData);
            let items;
            html=`<ul id="tabla">`;
            for(let i=0;i<=tamañoRegistry;i++ ){
                items=jsonData[i];
                html+=                    
                        `<li>
                            <img src="${items.image}" class="img-responsive" alt="Imagen de ${items.name}"><br>
                            Nombre:</span> ${items.name}<br>
                            Descripción: <span class="spanDescript">${items.description}</span><br>
                            Stock: ${items.stock}<br>
                            Precio: $${items.price}<br>
                            Categoria: ${items.category}<br>
                            <input type=button  id="${items._id}" value="Agregar al carrito" class="btn-warning">
                        </li>`
              }
             html+=`</ul>`
             document.querySelector("#listaHorizontal").innerHTML=html;
            })
            
        .catch(function (e) {
            console.log(e);
        })*/
    /*        let botones = document.querySelectorAll(".btn-warning");
                botones.forEach(element => {
                    element.addEventListener("click", function () {
                        let idDelBoton = this.id;
                        console.log(idDelBoton);
                    })
                })
        
    }
/* ********************************** 

        fetch(url)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {              
                let tamañoRegistry=jsonData.registry.length-1;
                let items;
                html=`<ul id="tabla">`;
                for(let i=0;i<=tamañoRegistry;i++ ){
                    items=jsonData.registry[i];
                    html+=                    
                            `<li>
                                <img src="${items.image}" class="img-responsive" alt="Imagen de ${items.name}"><br>
                                Nombre:</span> ${items.name}<br>
                                Descripción: <span class="spanDescript">${items.description}</span><br>
                                Stock: ${items.stock}<br>
                                Precio: $${items.price}<br>
                                Categoria: ${items.category}<br>
                                <input type=button  id="${items._id}" value="Agregar al carrito" class="btn-warning">
                            </li>`
                  }
                  html+=`</ul>`
                  document.querySelector("#listaHorizontal").innerHTML=html;
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
        
    }


    mostrarTabla();


    //seccion de inputs

    let fnAgregar = () => {
        let id = document.querySelector("#inputId").value;
        let name = document.querySelector("#inputName").value;
        let description = document.querySelector("#inputDescription").value;
        let price = document.querySelector("#inputPrice").value;
        let stock = document.querySelector("#inputStock").value;
        let category = document.querySelector("#inputCategory").value;
        let image = document.querySelector("#inputImage").value;
        let productos=[];
        let registry = {
            "id": "p7",
            "name": name,
            "description": description,
            "price": price,
            "stock": stock,
            "category": category,
            "image": image
        }
        console.log(registry);

        /* 
     borrarInputs();
        fetch(url, {
            method: "POST",
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(registry),
        }).then(r => {
            if (!r.ok) {
                console.log("Error!")
            }
            return r.json()
        })
            .then(data => {
                console.log(data);
                productos.push(registry);
                mostrarTabla();
                // document.querySelector("#tablaID").innerHTML = "";
            })
            .catch(function (e) {
                console.log(e);
            })
    }
    fetch(url)
        .then((response) => mostrarTabla());


//   filtrado   *****************************************************
/*
let fnFiltrar =(categoria)=>{
    document.querySelector("#listaHorizontal").innerHTML="";
    fetch(url)
            .then(r => {
                if (!r.ok) {
                    console.log("Error!")
                }
                return r.json()
            })
            .then(jsonData => {              
                let tamañoRegistry=jsonData.registry.length-1;
                let items;
            
                for(let i=0;i<=tamañoRegistry;i++ ){
                    items=jsonData.registry[i];
                    if (items._id==categoria){       
                    //document.querySelector("#tablaID").innerHTML+=
                    html+=                    
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
                let html1=`<ul id="tabla">`+html +`</ul>`;
               
                  document.querySelector("#listaHorizontal").innerHTML=html1;
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

    document.querySelector("#btnGuardar").addEventListener('click', function () {
        fnAgregar();
    });
    let filterCat=document.querySelectorAll(".catFilter");
    filterCat.forEach(element => {
        element.addEventListener('click', function(e){
            e.preventDefault();
            fnFiltrar(this.id);
        } )
    });

    */

