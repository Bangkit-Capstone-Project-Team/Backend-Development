import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Model
import User from 'App/Models/User'

export default class AuthController {
    public async login({auth, request, response}: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(email, password)
            return response.status(200).json({message: "Login Success! ", token })
        } catch (error) {
            return response.badRequest('Invalid credentials')
        }

        
    }

    public async register({request, response}: HttpContextContract){
        const name = request.input('name')
        const email = request.input('email')
        const password  = request.input('password')
        const repassword = request.input('repassword')

        if (repassword == password){

            try {

                const user = await User.create({name, email, password})
                
                return response.status(200).json({message: "Register Success!", user: user})

            } catch (error) {

                return response.status(400).json({message: "Register Failed!", error})
            }
            
        }
    }

    public async logout({auth, response}: HttpContextContract){
        await auth.use('api').logout()
    }
}
