const connection = require('./../../db/mongo.js')

const dbName = "myApp"

//Handler for GET request
const getCitiesHandler = async ctx => {
    const client = await connection.getConnection()
    const cities = await fetchCitiesFromDB(client, ctx.params.countryName)
    ctx.body = JSON.stringify(cities)
}

//Handler for POST request
const postCitiesHandler = ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
}

//Fetch cities from the database
const fetchCitiesFromDB = (client, countryName) => {
    const db = client.db(dbName),
          collection = db.collection('cities')
    return collection.find({country:countryName}).toArray()
}

module.exports.getCitiesHandler = getCitiesHandler
module.exports.postCitiesHandler = postCitiesHandler