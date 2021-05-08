import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Axios
const axios = require('axios');


export default class BatiksController {
    public async discovery({response}: HttpContextContract){
        await axios.get('http://batikita.herokuapp.com/index.php/batik/all')
        .then((result) => {
            return response.status(200).json( result.data.hasil )
            
        }).catch((err) => {
            return response.json({message: err})
            
        });

    }

    public async show({response}: HttpContextContract){

        const result =  await axios.get('http://batikita.herokuapp.com/index.php/batik/all')
        console.log(result.data);
        
        return response.json({message: "/:id"}) 
    }

    public async search({request, response}: HttpContextContract){

        let keyword = request.input('search');

        await axios.get(`http://batikita.herokuapp.com/index.php/batik/${keyword}`)
        .then((result) => {
            return response.status(200).json( result.data.hasil )

        }).catch((err) => {
            return response.json({message: err})

        });

    }
}
