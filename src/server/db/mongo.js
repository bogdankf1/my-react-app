const mongo = require('mongodb')

let db = null

const hostname = '127.0.0.1',
      dbPort = 27017

//Connect to database
const connect = async () => {
    return db = await mongo.connect(`mongodb://${hostname}:${dbPort}`)
}

const getConnection = () => db

module.exports.connect = connect
module.exports.getConnection = getConnection