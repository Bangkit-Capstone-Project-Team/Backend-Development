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

    public async show({params, response}: HttpContextContract){

        const id = params.id

        const result =  await axios.get('http://batikita.herokuapp.com/index.php/batik/all')

        let data = result.data.hasil.filter(element => element.id == id)
        data = data[0]
        
        return response.status(200).json({message: "Show Success", data: data})
         
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
