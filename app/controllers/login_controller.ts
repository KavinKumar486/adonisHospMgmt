// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/http-server";

export default class LoginController {
    async verify({request,response}:HttpContext){
        const { name,pass }= request.body();
        console.log(request.all())
        console.log(name,pass);
        response.send('Verified')

    }
}       