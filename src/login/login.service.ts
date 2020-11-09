import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { User } from './user';

@Injectable()
export class LoginService {
    public login(userInfo: any): boolean{
        let userLogged = new User(userInfo.user, userInfo.pass);
        let users = this.getUsers();
        for(const user of users){
            if(user.getUser() == userLogged.getUser() && user.getPass() == userLogged.getPass()){
                return true;
            }
        }
        return false;
    }


    private getUsers(): User[]{
        let archivo = fs.readFileSync('../../resources/users.csv','utf8');
        const elementos = archivo.split('\n').map(p => p.replace('\r','')).map(p => p.split(','));
        let listaUsers : User[] = [];
        for(let i = 0; i < elementos.length; i++){
            let user = new User(elementos[i][0],elementos[i][1]);
            listaUsers.push(user);
        }
        return listaUsers;
    }
}


