import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Model
import Quiz from 'App/Models/Quiz'

// Validator
import QuizValidator from 'App/Validators/QuizValidator'

export default class QuizzesController {

/**
  * @swagger
  * /api/quiz:
  *   get:
  *     security:
  *       - bearerAuth: []
  *     tags:
  *       - Quiz
  *     summary: API for Quiz
  *     responses:
  *       200:
  *         description: Get All Quiz
  *         example:
  *           message: Hello Guess
  */

    public async index({response}: HttpContextContract){

        try {
            const quiz = await Quiz.all()

            return response.status(200).json({message: "Indexing Success", data: quiz})

        } catch (error) {

            return response.status(200).json({message: "Indexing Failed", error: error})

        }
        
    }

/**
  * @swagger
  * /api/quiz:
  *   post:
  *     security:
  *       - bearerAuth: []
  *     tags:
  *       - Quiz
  *     summary: API for Quiz
  *     requestBody:
  *       required: true
  *       content:
  *         application/x-www-form-urlencoded:
  *           schema:
  *             type: object
  *             properties:
  *               name:
  *                 type: string
  *               email:
  *                 type: string
  *               password:
  *                 type: string
  *               repassword:
  *                 type: string
  *     responses:
  *       200:
  *         description: Get Batik
  *         example:
  *           message: Hello Guess
  */

    public async store({request, response}: HttpContextContract){
        try {

            const data = await request.validate(QuizValidator)

            console.log(data);

            const { number_question, question, choice_a, choice_b, choice_c, choice_d, answer } = data

            const quiz = await Quiz.create({
                numberQuestion: number_question,
                question: question,
                choiceA: choice_a,
                choiceB: choice_b,
                choiceC: choice_c ,
                choiceD: choice_d,
                answer: answer,
            })

            return response.status(200).json({message: "Storing Success", data: quiz})

        } catch (error) {

            return response.status(400).json({message: "Storing Failed", error: error})

        }
    }

/**
  * @swagger
  * /api/quiz/{id}:
  *   get:
  *     security:
  *       - bearerAuth: []
  *     tags:
  *       - Quiz
  *     summary: API for Quiz
  *     parameters:
  *       - name: id
  *         description: ID of the batik
  *         in: path
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: Get Batik
  *         example:
  *           message: Hello Guess
  */

    public async show({params, response}: HttpContextContract){
        const id = params.id

        const quiz = await Quiz.findOrFail(id)

        return response.status(200).json({message: "Show Success", data: quiz})
    }

/**
  * @swagger
  * /api/quiz/{id}:
  *   put:
  *     security:
  *       - bearerAuth: []
  *     tags:
  *       - Quiz
  *     summary: API for Quiz
  *     parameters:
  *       - name: id
  *         description: ID of the batik
  *         in: path
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: Get Batik
  *         example:
  *           message: Hello Guess
  */

    public async update({request, params, response}: HttpContextContract){
        const id = params.id

        const quiz = await Quiz.findOrFail(id)

        const data = await request.validate(QuizValidator)

        const { number_question, question, choice_a, choice_b, choice_c, choice_d, answer } = data

        if (number_question){
            quiz.numberQuestion = number_question;
        }

        if (question){
            quiz.question = question;
        }
        
        if (choice_a){
            quiz.choiceA = choice_a;
        }

        if (choice_b){
            quiz.choiceB = choice_b;
        }

        if (choice_c){
            quiz.choiceC = choice_c;
        }

        if (choice_d){
            quiz.choiceD = choice_d;
        }

        if (answer){
            quiz.answer = answer;
        }
        
        await quiz.save()

        return response.status(200).json({message: "Update Success", data: quiz})
    }

/**
  * @swagger
  * /api/quiz/{id}:
  *   delete:
  *     security:
  *       - bearerAuth: []
  *     tags:
  *       - Quiz
  *     summary: API for Quiz
  *     parameters:
  *       - name: id
  *         description: ID of the batik
  *         in: path
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: Get Batik
  *         example:
  *           message: Hello Guess
  */

    public async destroy({params, response}: HttpContextContract){
        const id = params.id

        const quiz = await Quiz.findOrFail(id)

        await quiz.delete()

        return response.status(200).json({message: "Destroy Success"})
    }
}
