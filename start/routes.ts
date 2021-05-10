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
  return { hello: 'world' }
})

Route.group(()=> {

  // Batik
  Route.group(()=>{

    Route.get('/discovery', 'BatiksController.discovery').as('batik.discovery')

    Route.get('/:id', 'BatiksController.show').as('batik.id')

    Route.post('/search', 'BatiksController.search').as('batik.search')

  }).prefix('/batik')

  // User
  Route.post('/login', async () => { return {message: "login"} } ).as('auth.login')

  Route.post('/register', 'AuthController.register').as('auth.register')

  Route.post('/logout', async () => { return {message: "logout"} }).as('auth.logout')

  // HealthCheck
  Route.get('/health', async ({response}) => {
    const report = await HealthCheck.getReport()

    return report.healthy ? response.ok(report) : response.badRequest(report)
  }).as('health')

}).prefix('/api')
