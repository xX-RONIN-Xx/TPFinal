let clienteId;
function fnAgregarPedido() {

    let x = document.querySelector("#dim-x").value;
    let y = document.querySelector("#dim-y").value;
    let z = document.querySelector("#dim-z").value;
    let color = document.querySelector("#color").value;
    let filamento = document.querySelector("#sel1").value;
    let altura = document.querySelector("#alt").value;
    let temperatura = document.querySelector("#temperatura").value;
    let relleno = document.querySelector("#infill").value;
    let comentarios = document.querySelector("#comment").value;
   
    fetch("http://localhost:3000/cliente/get-all")
        .then(r => {
            if (!r.ok) {
                console.log("Error!")
            }
            return r.json()
        })
        .then(jsonData => {
            let clienteConectado = window.sessionStorage.getItem('cliente');
            jsonData.forEach(element => {
                if (element.usuario == clienteConectado) {
                    clienteId = element.id_cliente;
                    console.log("Hola",clienteId);
                }
            })
        })
        //
        .then(a => {
            //
            let jsonData = {

                "dimesion_x": parseInt(x),
                "dimension_y": parseInt(y),
                "dimension_z": parseInt(z),
                "colores": color,
                "tipo_filamento": filamento,
                "altura_capa": parseInt(altura),
                "temperatura": parseInt(temperatura),
                "relleno": parseInt(relleno),
                "comentarios": comentarios,
                "cliente_id_cliente": parseInt(clienteId)

            }
            console.log(jsonData);
            auxAgregar(jsonData);
        })
}



async function auxAgregar(jsonData) {
    let urlPost = "http://localhost:3000/pedido-personalizado/new-pedido";

    let rta = await fetch(urlPost, {
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

        })
        .catch(function (e) {
            console.log(e);
        })
    }

document.querySelector("#btnPers").addEventListener('click', fnAgregarPedido);

let clienteConectado = window.sessionStorage.getItem('cliente');
console.log(clienteConectado);
let clientes=[];
async function loadclientes() {
        let response = await fetch('http://localhost:3000/cliente/get-all');
        let clienteId;
        if (response.ok) {
            let t = await response.json();
            console.log(t);
            let clienteConectado = window.sessionStorage.getItem('cliente');
            console.log(clienteConectado);
            clientes = [...clientes, ...t];
            console.log(clientes.id_cliente);
        
            for (let i = 0; i < clientes.length ; i++) {
                if (clientes.usuario == clienteConectado) {
                    clienteId = clientes.id_cliente;
                    console.log("Hola",clienteId);
                }
            }
        }
    }

    loadclientes();

