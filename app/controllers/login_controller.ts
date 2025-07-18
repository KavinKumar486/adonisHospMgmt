import type { HttpContext } from '@adonisjs/core/http'
import Doctor from '#models/doctor'
import jwt from 'jsonwebtoken'  // Import SignCallback for types
// import authConfig from '#config/auth'  // Your minimal auth config for secret/expiration
const jwtExpiration= process.env.JWT_EXPIRATION;
const jwtSecret  = process.env.JWT_SECRET;

export default class LoginController {
  public async verify({ request, response }: HttpContext) {
    const { name } = request.only(['name'])
    const doctor = await Doctor.findBy('name', name)
    if (!doctor) {
      
      return response.unauthorized({ error: 'Invalid name' })
    }
  
    const payload = {
      id: doctor.id,
      name: doctor.name,
      expertise: doctor.expertise,
    }

    if (!jwtSecret || typeof jwtSecret !== 'string') {
      throw new Error('JWT secret is missing or invalid in authConfig')
    }

    const jwtExpiresIn: string | number = typeof jwtExpiration === 'string' || typeof jwtExpiration === 'number'
      ? jwtExpiration
      : '1h'

    
    const token = jwt.sign(payload, jwtSecret as string);
   

    return response.ok({
      message: 'Verified',
      token,  
      type: 'bearer',
      user: {
        id: doctor.id,
        name: doctor.name,
        expertise: doctor.expertise,
      },
    })
  }
}
