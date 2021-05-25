import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Model
import User from 'App/Models/User'

// Validator
import AuthLoginValidator from 'App/Validators/AuthLoginValidator'
import AuthRegisterValidator from 'App/Validators/AuthRegisterValidator'

export default class AuthController {

/**
  * @swagger
  * paths:
  *   /api/login:
  *     post: 
  *       tags:
  *         - Auth
  *       summary: API for Login
  *       requestBody:
  *         required: true
  *         content:
  *           application/x-www-form-urlencoded:
  *             schema:
  *               type: object
  *               properties:
  *                 email:
  *                   type: string
  *                 password:
  *                   type: string
  *       responses: 
  *         '200':
  *           description: Authentificate
  */

    public async login({auth, request, response}: HttpContextContract){

        const data = await request.validate(AuthLoginValidator)

        const {email , password} = data
        
        const token = await auth.use('api').attempt(email, password, {
            expiresIn: '30days'
        })

        return response.status(200).json({message: "Login Success! ", token: token })
      
    }


/**
  * @swagger
  * paths:
  *   /api/register:
  *     post: 
  *       tags:
  *         - Auth
  *       summary: API for Register
  *       requestBody:
  *         required: true
  *         content:
  *           application/x-www-form-urlencoded:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 email:
  *                   type: string
  *                 password:
  *                   type: string
  *                 repassword:
  *                   type: string
  *       responses: 
  *         '200':
  *           description: Authentificate
  */
    
    public async register({request, response}: HttpContextContract){

        // User
        const data = await request.validate(AuthRegisterValidator)

        const { name, email, password, repassword } = data;

        // Score

        if (repassword === password){

            const user = await User.create({name, email, password})

            return response.status(200).json({message: "Register Success!", user: user})
            
        }else{

            return response.status(200).json({message: "Register Failed", error: "The Passwords are not same"})
        }
    }

/**
  * @swagger
  * paths:
  *   /api/logout:
  *     post:
  *       security:
  *         - bearerAuth: []
  *       tags:
  *         - Auth
  *       summary: API for Logout
  *       responses: 
  *         '200':
  *           description: Authentificate
  */

    public async logout({auth, response}: HttpContextContract){
       
        await auth.use('api').logout()

        return response.json({message: "Is Logged Out"})

    }

/**
  * @swagger
  * paths:
  *   /api/profile/{id}:
  *     get:
  *       security:
  *         - bearerAuth: []
  *       tags:
  *         - Auth
  *       summary: API for Porfile
  *       parameters:
  *         - name: id
  *           description: ID of the User
  *           in: path
  *           required: true
  *           type: integer
  *       responses: 
  *         '200':
  *           description: Searched
  */

    public async profile({auth, params, response}: HttpContextContract){

        if (auth.user?.id === Number(params.id) ){

            return response.status(200).json({message: "This Is Auth", data: auth.user, })

        }else{

            return response.status(400).json({message: "Sorry! It is not You"})

        }
        
    }

/**
  * @swagger
  * paths:
  *   /api/id:
  *     get:
  *       security:
  *         - bearerAuth: []
  *       tags:
  *         - Auth
  *       summary: API for ID
  *       responses: 
  *         '200':
  *           description: Authentificate
  */

    public async id({auth, response}: HttpContextContract){

        const id = auth.user?.id

        return response.status(200).json({message: "Ssst!, Your ID is : ", id: id})
    }
}
