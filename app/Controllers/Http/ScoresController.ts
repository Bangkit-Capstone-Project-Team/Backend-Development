import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Model
import Score from 'App/Models/Score'

export default class ScoresController {
    public async index({response}: HttpContextContract){

        const score = await Score.query().preload('user', (query) => {
            query.select('name')
        })

        return response.status(200).json({message: "Score Get Success", data: score})
    }

    public async insert({request, auth, params, response}: HttpContextContract){

        const score = request.input('score')

        if (auth.user?.id === Number(params.id)){

            const data = await Score.updateOrCreate({userId: auth.user.id}, {score: score})

            return {mesage: "store _ score", data: data}

        }

    }

}
