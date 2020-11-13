async function validateSignUp(e) {

    let usuario = {
        user: document.getElementById('usuario').value,
        pass: document.getElementById('password').value,
        repeatPass: document.getElementById('repeat-password').value,
    };

    let respuesta = await fetch('/login/comparar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'


        },
        body: JSON.stringify(usuario),
    });

    if (await respuesta.json()) {
        alert('Usuario creado! Por favor, inicie sesión');
        window.location.href = 'http://localhost:3000/html/login.html';
    } else {
        alert('No se ha podido crear el usuario.');
        window.location.href = 'http://localhost:3000/html/signUp.html';
    }
}

document.getElementById('signUp').addEventListener('click', validateSignUp);