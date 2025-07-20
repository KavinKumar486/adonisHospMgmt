import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'

declare module '@adonisjs/core/http' {
  interface Request {
    user?: any
  }
}

export default class AuthJwt {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const authHeader = request.header('authorization') 
    console.log('Debug: Received Authorization header:', authHeader)
    const token = request.header('authorization')?.replace('Bearer ', '')
    if (!token) {
      return response.unauthorized({ error: 'No token provided' })
    }
    try {
      if (!process.env.JWT_SECRET) {
        return response.unauthorized({ error: 'JWT secret not configured' })
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      console.log('Debug: Token verified successfully. Decoded payload:', decoded)
      request['user'] = decoded
    } catch (error) {
      console.log('Debug: Token verification failed:', error.message)
      return response.unauthorized({ error: 'Invalid or expired token' })
    }

    return next()
  }
}
