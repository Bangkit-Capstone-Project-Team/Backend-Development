import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Axios
const axios = require('axios');


export default class BatiksController {

/**
  * @swagger
  * /api/batik/discovery:
  *   get:
  *     tags:
  *       - Batik
  *     summary: API for Batik
  *     responses:
  *       200:
  *         description: Get All Batik
  *         example:
  *           message: Hello Guess
  */
    
    public async discovery({response}: HttpContextContract){
        await axios.get('http://batikita.herokuapp.com/index.php/batik/all')
        .then((result) => {
            return response.status(200).json( result.data.hasil )
            
        }).catch((err) => {
            return response.json({message: err})
            
        });

    }

/**
  * @swagger
  * /api/batik/{id}:
  *   get:
  *     tags:
  *       - Batik
  *     summary: API for Batik
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

        const result =  await axios.get('http://batikita.herokuapp.com/index.php/batik/all')

        let data = result.data.hasil.filter(element => element.id == id)
        data = data[0]
        
        return response.status(200).json({message: "Show Success", data: data})
         
    }

/**
  * @swagger
  * paths:
  *   /api/batik/search:
  *     post: 
  *       tags:
  *         - Batik
  *       summary: API for Batik
  *       requestBody:
  *         required: true
  *         content:
  *           application/x-www-form-urlencoded:
  *             schema:
  *               type: object
  *               properties:
  *                 search:
  *                   type: string
  *       responses: 
  *         '200':
  *           description: Searched
  */

    public async search({request, response}: HttpContextContract){

        let keyword = request.input('search');

        await axios.get(`http://batikita.herokuapp.com/index.php/batik/${keyword}`)
        .then((result) => {
            return response.status(200).json( result.data.hasil )

        }).catch((err) => {
            return response.json({message: err})

        });

    }

    public async daerah({request, response}: HttpContextContract){

        const daerah = request.input('daerah')

        let batik = await axios.get('http://batikita.herokuapp.com/index.php/batik/all')

        let array = batik.data.hasil;
        const data = [] as any ;

        array = array.filter( (element, index) => {

            if (element.daerah_batik.toLowerCase() == daerah.toLowerCase()){

                data.push(element)
                
            }
        })

        return response.json({message: "Filter by daerah", data: data})

    }
}
