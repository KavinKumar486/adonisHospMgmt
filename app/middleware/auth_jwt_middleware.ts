import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
// import authConfig from '#config/auth'

// Extend the Request interface to include 'user'
declare module '@adonisjs/core/http' {
  interface Request {
    user?: any
  }
}

export default class AuthJwt {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const token = request.header('authorization')?.replace('Bearer ', '')
    if (!token) {
      return response.unauthorized({ error: 'No token provided' })
    }

    try {
      if (!process.env.jwtSecret) {
        return response.unauthorized({ error: 'JWT secret not configured' })
      }
      const decoded = jwt.verify(token, process.env.jwtSecret as string)
      
      request['user'] = decoded
    } catch (error) {
      return response.unauthorized({ error: 'Invalid or expired token' })
    }

    await next()
  }
}
