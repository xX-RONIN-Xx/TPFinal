import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { User } from './user';

@Injectable()
export class LoginService {

    public login(userInfo: any): boolean {
        let userLogged = new User(userInfo.user, userInfo.pass);
        let users = this.getUsers();
        for (const user of users) {
            if (user.getUser() == userLogged.getUser() && user.getPass() == userLogged.getPass()) {
                return true;
            }
        }
        return false;
    }

    private getUsers(): User[] {
        let archivo = fs.readFileSync('./resources/users.csv', 'utf8');
        const elementos = archivo.split('\n').map(p => p.replace('\r', '')).map(p => p.split(','));
        let listaUsers: User[] = [];
        for (let i = 0; i < elementos.length; i++) {
            let user = new User(elementos[i][0], elementos[i][1]);
            listaUsers.push(user);
        }
        return listaUsers;
    }

    public addUser(userInfo: any) {
        let user = `${userInfo.user},${userInfo.pass}`;
        let archivo = fs.readFileSync('./resources/users.csv', 'utf8');
        fs.writeFileSync('./resources/users.csv', `${archivo}${user}\n`);
    }

    public compareUser(userInfo: any): boolean {
        let userLogged = new User(userInfo.user, userInfo.pass);
        let users = this.getUsers();

        if (userInfo.pass != '' && userInfo.user != '') {
            if (userInfo.pass === userInfo.repeatPass) {
                for (const user of users) {
                    if (user.getUser() != userLogged.getUser()) {
                        this.addUser(userLogged);
                        return true;
                    } else {
                        console.log('el nombre no está disponible');
                        return false;
                    }
                }
            } else {
                // alert('Las contraseñas no coinciden! Inténtelo de nuevo. ');
                //window.location.href = 'http://localhost:3000/html/signUp.html';
                console.log('no coinciden las contraseñas');
                return false;
            }
        } else {
            //alert('Debes completar todos los campos!');
            //window.location.href = 'http://localhost:3000/html/signUp.html';
            console.log('debe completar todos los campos');
            return false;
        }
    }
}


