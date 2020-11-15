async function validateLogin(e) {
    let usuario = {
        user: document.getElementById('usuario').value,
        pass: document.getElementById('password').value,
    };

    let respuesta = await fetch('/login/validar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'


        },
        body: JSON.stringify(usuario),
    });

    if (await respuesta.json()) {
        window.sessionStorage.setItem('userLogged', true);
        window.sessionStorage.setItem('user', usuario);

        if (usuario.user == 'lucas' || usuario.user == 'mauricio' || usuario.user == 'rocio') {
            window.sessionStorage.setItem('admin', true);
        } else {
            window.sessionStorage.setItem('admin', false);
        }

        window.location.href = 'http://localhost:3000';
    }
    else {
        alert('El nombre de usuario o la contraseña son incorrectos!');
        window.location.href = 'http://localhost:3000/html/login.html';
        /*document.getElementById('usuario').focus();
        document.getElementById('login').setAttribute('data-toggle', 'modal');
        document.getElementById('login').setAttribute('data-target', '#myModal');*/
    }
}

document.getElementById('login').addEventListener('click', validateLogin);