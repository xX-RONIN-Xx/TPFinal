
async function fnAgregarPedido(){
    let urlPost= "http://localhost:3000/pedido-personalizado/new-pedido"
    let x = document.querySelector("#dim-x").value;
    let y = document.querySelector("#dim-y").value;
    let z = document.querySelector("#dim-z").value;
    let color = document.querySelector("#color").value;
    let filamento = document.querySelector("#sel1").value;
    let altura= document.querySelector("#alt").value;
    let temperatura = document.querySelector("#temperatura").value;
    let relleno = document.querySelector("#infill").value;
    let comentarios= document.querySelector("#comment").value;
    //let cliente = document.querySelector("#").value;
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
                        let clienteId = element.id_cliente;
                    }
                    return clienteId
                })
            })
            //
            .then(a => {
    //
    let registry = {

        "dimesion_x": parseInt(x),
        "dimension_y":parseInt(y),
        "dimension_z": parseInt(z),
        "colores": color,
        "tipo_filamento":filamento,
        "altura_capa": parseInt(altura),
        "temperatura": parseInt(temperatura),
        "relleno":parseInt(relleno),
        "comentarios": comentarios,
        "cliente_id_cliente":parseInt(clienteId)
        
    }
    console.log(registry);
    let rta= await

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
            let id = data.id_producto;
            
        })
        .catch(function (e) {
            console.log(e);
        })
    })
}

document.querySelector("#btnPers").addEventListener('click',fnAgregarPedido);


