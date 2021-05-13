import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Model
import User from 'App/Models/User'

// Validator
import AuthLoginValidator from 'App/Validators/AuthLoginValidator'
import AuthRegisterValidator from 'App/Validators/AuthRegisterValidator'

export default class AuthController {
    public async login({auth, request, response}: HttpContextContract){

        const data = await request.validate(AuthLoginValidator)

        const {email , password} = data
        
        const token = await auth.use('api').attempt(email, password)

        return response.status(200).json({message: "Login Success! ", token: token })
      
    }

    public async register({request, response}: HttpContextContract){

        const data = await request.validate(AuthRegisterValidator)

        const { name, email, password, repassword } = data;

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
        try {

            await auth.use('api').logout()

            return response.json({message: "Is Logged Out"})

        } catch (error) {

            return response.json({message: "Logged Out Failed", error})
        }

    }

    public async profile(){
        return {message: "Profile"}
    }
}
