import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'
export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const clientKey = ctx.request.header('apiKey');
    const serverKey = env.get('API_KEY')
    if(!clientKey || serverKey !== clientKey){
      return ctx.response.unauthorized('invalid key')
    }
    await next();
  }
} 