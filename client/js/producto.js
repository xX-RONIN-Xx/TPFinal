document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    //defino la url del mock
    const url = "http://localhost:3000/mock.json";
    //funcion para que la tabla de productos se genere dinamicamente
    let html="";
    let mostrarTabla = () => {
        //document.querySelector("#divTabla").innerHTML = "";
        //llamado a mi json para traer los productos
        //document.querySelector("#tablaID").innerHTML="";
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
                    //document.querySelector("#tablaID").innerHTML+=
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
     borrarInputs();*/
        fetch(url, {
            "method": "POST",
            
            "body": JSON.stringify(registry)
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
});


/*
               //el console.log lo uso para ver que y como me trae la respuesta
                //console.log(jsonData)
                /*esta es la parte en que la tabla dinamica no se mostraba en 4 columnas, sino que me generaba
                un producto debajo de otro, entonces quiero mostrar 4 columnas y lo que hago es usar una matriz,
                por un lado corto el arreglo registry(que es el areglo de productos)en 4 jsons. y luego itero 
                los elementos de cada uno de esos jsons
                
                //declaro mis variables
                let items;
                let matriz = new Array();
                let tamañoRegistry = jsonData.registry.length;
                let iteraciones = Math.trunc(tamañoRegistry / 4);

                /* la parte que sigue tiene un bug, pero ya se que hacer para solucionarlo, lugo lo subo.
                ya que el slice no esta bien aplicado.
                if (!((tamañoRegistry % 4) == 0)) {
                    iteraciones += 1;
                }
                let ini = 0;
                let fin = 4;
                //console.log(iteraciones);
                for (let inicio = 0; inicio < iteraciones; inicio++) {
                    matriz[inicio] = jsonData.registry.slice(ini, fin);
                    ini += 4;
                    fin += 4;
                    // console.log(matriz)
                }


                let tamañoMatriz = matriz.length;
                console.log(matriz)
                let html = "";
                let html2 = "";
                //en esta parte armo el html con cada vector de 4 jsons
                for (let i = 0; i < tamañoMatriz; i++) {
                    html += `<div class="row">`;
                    html2 = "";
                    //console.log(items[0].name)
                    // for (let j = 0; j < 1; j++) {
                    matriz[i].forEach(element => {

                        console.log(element)
                        //items = matriz[i][j];

                        //aca armo el html con la informacion de cada json(o sea, cada producto) de forma individual
                        html2 +=
                            `<div class="col-6 col-md-3">
                                    <img src="${element.name}" class="img-responsive" style="width:100%" alt="Imagen de ${element.name}">
                                    <p>${element.name}</p>
                                    <input type=button   id="${element._id}" value="Agregar al carrito" class="btn-warning">
                                </div>`
                        //}
                        html += html2 + `</div>`;
                    });
                }
 
 */



 /*
 **************************************************************************************************************************
 document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    //defino la url del mock
    const url = "http://localhost:3000/mock.json";
    //funcion para que la tabla de productos se genere dinamicamente
    let html="";
    let mostrarTabla = () => {
        //document.querySelector("#divTabla").innerHTML = "";
        //llamado a mi json para traer los productos
        //document.querySelector("#tablaID").innerHTML="";
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
                    //document.querySelector("#tablaID").innerHTML+=
                    html+=
                    `<tr>
                            <td><img src="${items.image}" class="img-responsive" alt="Imagen de ${items.name}"><br>
                            ${items.name}<br>
                            ${items.description}<br>
                            ${items.stock}<br>
                            ${items.price}<br>
                            ${items.category}<br>
                            <input type=button class="identificador"  id="${items._id}" value="Agregar al carrito" class="btn-warning">
                            </td>
                        </tr> <br>`
                        /*
                        <td><img src="${items.image}" class="img-responsive" alt="Imagen de ${items.name}"></td>
                            <td>${items.name}</td>
                            <td>${items.descritcion}</td>
                            <td>${items.stock}</td>
                            <td>${items.price}</td>
                            <td>${items.category}</td>
                            <td><input type=button class="identificador"  id="${items._id}" value="Agregar al carrito" class="btn-warning"></td>
                        </tr> <br>`
                        
                    }
                    document.querySelector("#tablaID").innerHTML=html;
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
  
          /* tablaArrayDeJsons.push(pieza);
           crearBodyTabla(tablaArrayDeJsons.length -1)
       
       console.log(tablaArrayDeJsons);
       borrarInputs();
          fetch(url, {
              "method": "POST",
              "headers": { "Content-Type": "application/json" },
              "body": JSON.stringify(registry)
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
  
  
      document.querySelector("#btnGuardar").addEventListener('click', function () {
          fnAgregar();
      });
  
  });
  
  
  /*
                 //el console.log lo uso para ver que y como me trae la respuesta
                  //console.log(jsonData)
                  /*esta es la parte en que la tabla dinamica no se mostraba en 4 columnas, sino que me generaba
                  un producto debajo de otro, entonces quiero mostrar 4 columnas y lo que hago es usar una matriz,
                  por un lado corto el arreglo registry(que es el areglo de productos)en 4 jsons. y luego itero 
                  los elementos de cada uno de esos jsons
                  
                  //declaro mis variables
                  let items;
                  let matriz = new Array();
                  let tamañoRegistry = jsonData.registry.length;
                  let iteraciones = Math.trunc(tamañoRegistry / 4);
  
                  /* la parte que sigue tiene un bug, pero ya se que hacer para solucionarlo, lugo lo subo.
                  ya que el slice no esta bien aplicado.
                  if (!((tamañoRegistry % 4) == 0)) {
                      iteraciones += 1;
                  }
                  let ini = 0;
                  let fin = 4;
                  //console.log(iteraciones);
                  for (let inicio = 0; inicio < iteraciones; inicio++) {
                      matriz[inicio] = jsonData.registry.slice(ini, fin);
                      ini += 4;
                      fin += 4;
                      // console.log(matriz)
                  }
  
  
                  let tamañoMatriz = matriz.length;
                  console.log(matriz)
                  let html = "";
                  let html2 = "";
                  //en esta parte armo el html con cada vector de 4 jsons
                  for (let i = 0; i < tamañoMatriz; i++) {
                      html += `<div class="row">`;
                      html2 = "";
                      //console.log(items[0].name)
                      // for (let j = 0; j < 1; j++) {
                      matriz[i].forEach(element => {
  
                          console.log(element)
                          //items = matriz[i][j];
  
                          //aca armo el html con la informacion de cada json(o sea, cada producto) de forma individual
                          html2 +=
                              `<div class="col-6 col-md-3">
                                      <img src="${element.name}" class="img-responsive" style="width:100%" alt="Imagen de ${element.name}">
                                      <p>${element.name}</p>
                                      <input type=button   id="${element._id}" value="Agregar al carrito" class="btn-warning">
                                  </div>`
                          //}
                          html += html2 + `</div>`;
                      });
                  }
   
   */