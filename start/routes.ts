/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'


Route.get('/', async () => {
  return { message: 'Welcome to Gamastik' }
})

Route.group(()=> {

  // Batik
  Route.group(()=>{

    Route.get('/discovery', 'BatiksController.discovery').as('batik.discovery')

    Route.get('/:id', 'BatiksController.show').as('batik.id')

    Route.post('/search', 'BatiksController.search').as('batik.search')

  }).prefix('/batik')

  // User
  Route.post('/login', 'AuthController.login').as('auth.login')

  Route.post('/register', 'AuthController.register').as('auth.register')

  Route.post('/logout', 'AuthController.logout').as('auth.logout').middleware('auth')

  Route.get('/profile/:id', 'AuthController.profile').as('auth.profile').middleware('auth')

  Route.get('/id', 'AuthController.id').as('auth.id').middleware('auth')

  // Quiz
  Route.resource('/quiz', 'QuizzesController').apiOnly().middleware({'*': 'auth'})

  // Score
  Route.group(()=>{

    Route.get('/', 'ScoresController.index').as('score.index').middleware('auth')

    Route.post('/:id', 'ScoresController.insert').as('score.insert').middleware('auth')

  }).prefix('/score')

  // HealthCheck
  Route.get('/health', async ({response}) => {

    const report = await HealthCheck.getReport()
    
    return report.healthy ? response.ok(report) : response.badRequest(report)

  }).as('health')

}).prefix('/api')
