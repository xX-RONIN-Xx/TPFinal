import { Body, Controller, Post } from '@nestjs/common';
import { userInfo, UserInfo } from 'os';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {

    constructor(private loginService:LoginService){
    }
    @Post('validar')
    public login(@Body() userInfo:any):boolean{
        return this.loginService.login(userInfo);
    }
}
