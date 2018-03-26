const connection = require('./../../db/mongo.js')

const dbName = "myApp"

//Handler for GET request
const getCountriesHandler = async ctx => {
    const client = await connection.getConnection()
    const countries = await fetchCountriesFromDB(client)
    ctx.body = JSON.stringify(countries)
}

//Handler for POST request
const postCountriesHandler = ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
}

//Fetch countries from the database
const fetchCountriesFromDB = client => {
    const db = client.db(dbName),
          collection = db.collection('countries')
    return collection.find({}).toArray()
}

module.exports.getCountriesHandler = getCountriesHandler
module.exports.postCountriesHandler = postCountriesHandler