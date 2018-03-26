//Require needed modules
const Koa = require('koa'),
      Router = require('koa-router'),
      cors = require('koa2-cors'),
      bodyParser = require('koa-bodyparser'),
      connection = require('./db/mongo.js'),
      cityActions = require('./api/city/city-actions.js'),
      countryActions = require('./api/country/country-actions.js'),
      middlewares = require('./api/middlewares.js'),
      login = require('./api/authentication/login.js'),
      signup = require('./api/authentication/signup.js')

//Create Koa application and router
const app = new Koa(),
      router = new Router()

//Set server hostname and port 
const hostname = '127.0.0.1',
      port = 3001
//GET requests
router.get('/api/country/list', countryActions.getCountriesHandler)
router.get('/api/city/list/:countryName', cityActions.getCitiesHandler)

//POST requests
router.post('/api/country', countryActions.postCountriesHandler)
router.post('/api/city', cityActions.postCitiesHandler)
router.post('/api/login', login.loginHandler)
router.post('/api/signup', signup.signUpHandler)

//Use middlewares
app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(middlewares.logger)

//Server initialize method
const init = async () => {
    const client = await connection.connect()
}

//Server run method
const run = async () => {
    await init()
    //Listen server
    app.listen(port, () => {
        console.log(`Koa server listening on http://${hostname}:${port}`)
    })
}

//Run server
run()