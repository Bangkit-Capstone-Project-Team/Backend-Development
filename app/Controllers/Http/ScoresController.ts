import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Model
import Score from 'App/Models/Score'

export default class ScoresController {

/**
  * @swagger
  * /api/score:
  *   get:
  *     security:
  *       - bearerAuth: []
  *     tags:
  *       - Score
  *     summary: API for Score
  *     responses:
  *       200:
  *         description: Get All Scores
  *         example:
  *           message: Hello Guess
  */

    public async index({response}: HttpContextContract){

        const score = await Score.query().preload('user', (query) => {
            query.select('name')
        })

        return response.status(200).json({message: "Score Get Success", data: score})
    }

/**
  * @swagger
  * /api/score/{id}:
  *   post:
  *     security:
  *       - bearerAuth: []
  *     tags:
  *       - Score
  *     summary: API for Score
  *     parameters:
  *       - name: id
  *         description: ID of the score
  *         in: path
  *         required: true
  *         type: integer
  *     requestBody:
  *         required: true
  *         content:
  *           application/x-www-form-urlencoded:
  *             schema:
  *               type: object
  *               properties:
  *                 score:
  *                   type: integer
  *     responses:
  *       200:
  *         description: Storing score
  *         example:
  *           message: Hello Guess
  */

    public async insert({request, auth, params, response}: HttpContextContract){

        const score = request.input('score')

        if (auth.user?.id === Number(params.id)){

            const data = await Score.updateOrCreate({userId: auth.user.id}, {score: score})

            return response.json({mesage: "store _ score", data: data}) 

        }

    }

}
