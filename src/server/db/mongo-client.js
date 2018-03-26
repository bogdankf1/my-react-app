//Require needed modules
const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      fs = require('fs')
      
//Get data from .json files
const cities = JSON.parse(fs.readFileSync('./../data/cities.json')),
      countries = JSON.parse(fs.readFileSync('./../data/countries.json')),
      users = JSON.parse(fs.readFileSync('./../data/users.json'))

// Database host, port, name
const hostname = '127.0.0.1',
      dbPort = 27017,
      dbName = 'myApp'

//Add users to database
const insertUsers = db => {
    const collection = db.collection('users')
    collection.insertMany(users, (err, result) => {
        assert.equal(err, null)
        assert.equal(users.length, result.ops.length)
        console.log(`Inserted ${result.ops.length} users!`)
    })
}

//Add countries to database
const insertCountries = db => {
    const collection = db.collection('countries')
    collection.insertMany(countries, (err, result) => {
        assert.equal(err, null)
        assert.equal(countries.length, result.ops.length)
        console.log(`Inserted ${result.ops.length} countries into the collection`)
    })
}

//Add cities to database
const insertCities = db => {
    const collection = db.collection('cities')
    collection.insertMany(cities, (err, result) => {
        assert.equal(err, null)
        assert.equal(cities.length, result.ops.length)
        console.log(`Inserted ${result.ops.length} cities into the collection`)
    })
}

//Remove all countries from database
const removeAllCountries = db => {
    const collection = db.collection('countries')
    collection.deleteMany({}, (err, result) => {
        assert.equal(err, null)
        console.log("All countries removed!")
    }) 
}

//Remove all cities from database
const removeAllCities = db => {
    const collection = db.collection('cities')
    collection.deleteMany({}, (err, result) => {
        assert.equal(err, null)
        console.log("All cities removed!")
    }) 
}

//Remove all users from database
const removeAllUsers = db => {
    const collection = db.collection('users')
    collection.deleteMany({}, (err, result) => {
        assert.equal(err, null)
        console.log("All users removed!")
    }) 
}

//Find all users
const findAllUsers = async db => {
    const collection = db.collection('users')
    const allUsers = await collection.find({}).toArray()
    console.log(allUsers)
}

//Connect to database from mongo client
MongoClient.connect(`mongodb://${hostname}:${dbPort}`, async (err, client) => {
    assert.equal(null, err)
    console.log(`Connected successfully to mongodb://${hostname}:${dbPort}`)
    const db = client.db(dbName)
    // await removeAllUsers(db)
    // await removeAllCountries(db)
    // await removeAllCities(db) 
    // await insertCountries(db) 
    // await insertCities(db)
    // await insertUsers(db)
    await findAllUsers(db)
    await client.close()
})