import { Body, Controller, Post, Put } from '@nestjs/common';
import { userInfo, UserInfo } from 'os';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {

    constructor(private loginService:LoginService){}
    
    @Post('validar')
    public login(@Body() userInfo:any):boolean{
        return this.loginService.login(userInfo);
    }

    @Put('agregar')
    public agregar(@Body() userInfo: any){
        return this.loginService.addUser(userInfo);
    }

    @Post('comparar')
    public comparar(@Body() userInfo: any):boolean{
        return this.loginService.compareUser(userInfo);
    }
}
